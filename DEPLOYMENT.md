# Ideal Healthcare Staffing — Production Deployment & Configuration Guide

This document outlines the step-by-step setup, database migration, private storage bucket configuration, and staging/production deployment procedures for **Ideal Healthcare Staffing**.

---

## 1. Environment Variables Configuration

Copy `.env.example` to `.env.local` for local development or enter them into your hosting provider's dashboard (e.g. Vercel, AWS Amplify, Render):

```env
# Supabase Configuration (PostgreSQL Database & Storage)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key-do-not-expose

# Admin Portal Authentication
ADMIN_EMAIL=admin@idealhealthcarestaffing.com
ADMIN_PASSWORD=your-secure-admin-portal-password
ADMIN_SECRET_TOKEN=your-random-32-byte-hex-token

# Email Provider Configuration (Resend / SendGrid / AWS SES)
EMAIL_PROVIDER_API_KEY=re_your_api_key
FROM_EMAIL=notifications@idealhealthcarestaffing.com
ADMIN_NOTIFICATION_EMAIL=leads@idealhealthcarestaffing.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://idealhealthcarestaffing.com
```

---

## 2. Supabase / PostgreSQL Setup & Migration

1. Create a project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Open `supabase/migrations/20250101000000_init_schema.sql` from this repository.
4. Paste and execute the script. This will create:
   - `public.jobs`: Job listings with indexing on specialty, state, and status.
   - `public.applications`: Candidate applications with foreign key reference to jobs.
   - `public.facility_inquiries`: Institutional B2B lead capture.
   - `public.job_alerts`: Candidate subscription alerts.
   - `resumes` Private Storage Bucket: Configured with Row Level Security (RLS) so resumes are never publicly readable.

---

## 3. Storage Bucket & Resume Security

- The database migration automatically creates the `resumes` storage bucket with `public: false`.
- Resumes uploaded through candidate applications are stored securely in `resumes/{jobId}/{timestamp}_{filename}`.
- Candidate files can only be accessed through the protected Admin Portal (`/admin`) using service role authorization.
- Resumes are validated on both client and server:
  - Allowed file formats: PDF (`.pdf`), Word (`.doc`, `.docx`).
  - Maximum file size: 5 MB.

---

## 4. Admin Portal Access

- URL: `/admin`
- Default staging passcode: `ideal2025!` (Override in `.env.local` via `ADMIN_PASSWORD`).
- Capabilities:
  - **Job Management**: Create, edit, publish, unpublish, and close jobs.
  - **Candidate Applications**: Review applicant details, download resumes, update hiring status, and export to CSV.
  - **Facility Orders**: Review staffing specifications, update relationship status, and export leads to CSV.
  - **Batch CSV Import**: Upload, validate, and import job listings directly from external recruiting spreadsheets.

---

## 5. Deployment Steps (Vercel / Node.js Host)

### Deploying to Vercel
1. Push the repository to GitHub / GitLab.
2. In Vercel, click **Add New Project** and import the repository.
3. Set Framework Preset: **Next.js**.
4. Under **Environment Variables**, add the variables from Section 1.
5. Click **Deploy**.

### Building Locally / Standalone
```bash
# Install dependencies
npm install

# Run TypeScript checks & production build
npm run build

# Start production server
npm run start
```

---

## 6. Custom Domain & HTTPS Configuration

1. In your domain registrar (e.g. Cloudflare, GoDaddy, Namecheap), add the required DNS records provided by Vercel:
   - `A` record pointing to `76.76.21.21` (for apex domain `idealhealthcarestaffing.com`)
   - `CNAME` record pointing to `cname.vercel-dns.com` (for `www` subdomain or staging subdomain `staging.idealhealthcarestaffing.com`)
2. Vercel automatically provisions and renews SSL/TLS certificates via Let's Encrypt.
3. Enforce **Always Use HTTPS** and **HSTS** (HTTP Strict Transport Security).

---

## 7. Pre-Launch Verification Checklist

- [ ] **Jobs Directory**: Filters by Specialty, State, and Contract Type return accurate results.
- [ ] **Job Details**: Dynamic slug pages render full qualifications and compensation specs.
- [ ] **Candidate Application**: Test form submission with a sample PDF resume (verify file validation and database insertion).
- [ ] **Facility Inquiry**: Test submission on `/facilities#inquiry-form` (verify lead appears in `/admin`).
- [ ] **Admin Portal**: Log in at `/admin`, test status changes, CSV export, and CSV job import.
- [ ] **Security**: Ensure `.env.local` is never committed to Git and Supabase service-role keys are never exposed in browser bundles.
