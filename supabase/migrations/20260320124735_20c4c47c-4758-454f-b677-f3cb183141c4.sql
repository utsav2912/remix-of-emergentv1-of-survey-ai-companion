
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'assistant',
ADD COLUMN IF NOT EXISTS default_mode text NOT NULL DEFAULT 'desktop';

-- Add validation trigger instead of CHECK constraint
CREATE OR REPLACE FUNCTION public.validate_profile_role()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.role NOT IN ('surveyor', 'assistant') THEN
    RAISE EXCEPTION 'Invalid role: %. Must be surveyor or assistant.', NEW.role;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_profile_role_trigger
BEFORE INSERT OR UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.validate_profile_role();
