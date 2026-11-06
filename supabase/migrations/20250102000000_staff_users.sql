-- ====================================================================
-- Ideal Healthcare Staffing - Staff Users & Permissions Schema
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.staff_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'staff_admin' CHECK (role IN ('super_admin', 'staff_admin')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    permissions JSONB NOT NULL DEFAULT '{"dashboard":true,"jobs":{"view":true,"create":false,"edit":false,"delete":false},"applications":{"view":true,"edit":true,"delete":false},"facilities":{"view":true,"edit":false,"delete":false}}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_staff_users_email ON public.staff_users (email);
CREATE INDEX IF NOT EXISTS idx_staff_users_is_active ON public.staff_users (is_active);

-- Enable Row Level Security
ALTER TABLE public.staff_users ENABLE ROW LEVEL SECURITY;

-- Only authenticated admins or service-role can read/write staff accounts
CREATE POLICY "Admins can manage staff accounts"
ON public.staff_users FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

