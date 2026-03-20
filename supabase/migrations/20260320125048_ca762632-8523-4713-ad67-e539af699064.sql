
CREATE TABLE public.ila_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  claim_ref_no text NOT NULL,
  survey_datetime timestamptz NOT NULL DEFAULT now(),
  location_lat double precision,
  location_lng double precision,
  location_address text,
  registration_number text NOT NULL,
  cause_of_loss text NOT NULL,
  visible_damage text[] DEFAULT '{}',
  vehicle_driveable text NOT NULL,
  towing_required boolean DEFAULT false,
  towing_company text,
  towing_amount numeric,
  preliminary_estimate numeric,
  scene_notes text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.ila_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own submissions" ON public.ila_submissions
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own submissions" ON public.ila_submissions
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own submissions" ON public.ila_submissions
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Add ila_id column to claims table for linking
ALTER TABLE public.claims ADD COLUMN IF NOT EXISTS ila_id uuid REFERENCES public.ila_submissions(id);
