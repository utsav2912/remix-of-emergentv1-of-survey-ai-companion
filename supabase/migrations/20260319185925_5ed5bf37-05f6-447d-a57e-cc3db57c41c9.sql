
-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- 1. PROFILES
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  irdai_license TEXT,
  city TEXT,
  subscription_tier TEXT NOT NULL DEFAULT 'free',
  claims_used INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. CLAIMS
CREATE TABLE public.claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'Draft',
  vehicle_make TEXT,
  vehicle_model TEXT,
  vehicle_year INT,
  registration_number TEXT,
  idv NUMERIC,
  insurer TEXT,
  policy_number TEXT,
  nil_dep BOOLEAN DEFAULT false,
  compulsory_excess NUMERIC DEFAULT 0,
  voluntary_excess NUMERIC DEFAULT 0,
  cause_of_loss TEXT,
  loss_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own claims" ON public.claims FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own claims" ON public.claims FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own claims" ON public.claims FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own claims" ON public.claims FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_claims_updated_at BEFORE UPDATE ON public.claims FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. PARTS_LINES
CREATE TABLE public.parts_lines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id UUID NOT NULL REFERENCES public.claims(id) ON DELETE CASCADE,
  part_name TEXT,
  part_category TEXT,
  repair_replace TEXT,
  qty NUMERIC DEFAULT 1,
  unit_rate NUMERIC DEFAULT 0,
  depreciation_pct NUMERIC DEFAULT 0,
  net_amount NUMERIC DEFAULT 0,
  source TEXT DEFAULT 'manual',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.parts_lines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own parts" ON public.parts_lines FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.claims WHERE claims.id = parts_lines.claim_id AND claims.user_id = auth.uid()));
CREATE POLICY "Users can insert own parts" ON public.parts_lines FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.claims WHERE claims.id = parts_lines.claim_id AND claims.user_id = auth.uid()));
CREATE POLICY "Users can update own parts" ON public.parts_lines FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.claims WHERE claims.id = parts_lines.claim_id AND claims.user_id = auth.uid()));
CREATE POLICY "Users can delete own parts" ON public.parts_lines FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.claims WHERE claims.id = parts_lines.claim_id AND claims.user_id = auth.uid()));

-- 4. LABOUR_LINES
CREATE TABLE public.labour_lines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id UUID NOT NULL REFERENCES public.claims(id) ON DELETE CASCADE,
  description TEXT,
  amount NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.labour_lines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own labour" ON public.labour_lines FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.claims WHERE claims.id = labour_lines.claim_id AND claims.user_id = auth.uid()));
CREATE POLICY "Users can insert own labour" ON public.labour_lines FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.claims WHERE claims.id = labour_lines.claim_id AND claims.user_id = auth.uid()));
CREATE POLICY "Users can update own labour" ON public.labour_lines FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.claims WHERE claims.id = labour_lines.claim_id AND claims.user_id = auth.uid()));
CREATE POLICY "Users can delete own labour" ON public.labour_lines FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.claims WHERE claims.id = labour_lines.claim_id AND claims.user_id = auth.uid()));

-- 5. PHOTOS
CREATE TABLE public.photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id UUID NOT NULL REFERENCES public.claims(id) ON DELETE CASCADE,
  storage_path TEXT,
  gps_lat DOUBLE PRECISION,
  gps_lng DOUBLE PRECISION,
  captured_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own photos" ON public.photos FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.claims WHERE claims.id = photos.claim_id AND claims.user_id = auth.uid()));
CREATE POLICY "Users can insert own photos" ON public.photos FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.claims WHERE claims.id = photos.claim_id AND claims.user_id = auth.uid()));
CREATE POLICY "Users can delete own photos" ON public.photos FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.claims WHERE claims.id = photos.claim_id AND claims.user_id = auth.uid()));

-- Photos storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('claim-photos', 'claim-photos', false);

CREATE POLICY "Users can upload claim photos" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'claim-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can view own claim photos" ON storage.objects FOR SELECT
  USING (bucket_id = 'claim-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete own claim photos" ON storage.objects FOR DELETE
  USING (bucket_id = 'claim-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
