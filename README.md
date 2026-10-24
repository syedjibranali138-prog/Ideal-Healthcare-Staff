# Ideal Healthcare Staffing

A comprehensive, production-oriented healthcare staffing website built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

## Overview
Ideal Healthcare Staffing serves two primary audiences:
1. **Healthcare Professionals**: Travel nurses, allied health specialists, and clinical staff seeking assignments across leading US health systems.
2. **Healthcare Facilities**: Hospitals, trauma centers, and surgical networks seeking credentialed contingent and direct-hire clinical talent.

## Features
- **Editorial Healthcare Aesthetics**: Restrained midnight navy, warm white, and clinical teal visual system designed for trust and readability.
- **Job Discovery Engine**: Real-time multi-criteria filtering by Clinical Specialty, US State, Department, and Contract Type with URL synchronization.
- **Dynamic Job Details & Routing**: Structured clinical descriptions, responsibilities, licensure qualifications, and compensation packages.
- **Secure Candidate Applications**: Multi-stage client and server validation with private resume storage (PDF/DOCX max 5MB).
- **Institutional B2B Lead Capture**: Healthcare facility staffing order intake with census urgency indicators.
- **Protected Administrative Portal**: Secure `/admin` dashboard with job publishing controls, candidate resume access, facility order tracking, and CSV export.
- **Batch CSV Job Import**: CSV upload parser with preview table, field validation, and duplicate handling.
- **Data Layer Architecture**: Supabase PostgreSQL schema with Row Level Security (RLS) policies plus resilient local data store for zero-friction development.

## Tech Stack
- **Framework**: Next.js 15 (App Router, Server Actions)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **Icons**: Lucide React
- **Database & Storage**: PostgreSQL via Supabase with Row Level Security
- **Typography**: Google Inter & clean system fonts

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

For production deployment instructions, database migrations, and environment variable configuration, see [DEPLOYMENT.md](file:///c:/Users/hunain/Desktop/Ideal%20Staffing/DEPLOYMENT.md).
