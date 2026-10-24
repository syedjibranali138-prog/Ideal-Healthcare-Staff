export type JobDepartment = 
  | 'Nursing'
  | 'Allied Health'
  | 'Therapy'
  | 'Advanced Practice'
  | 'Healthcare Administration';

export type EmploymentType = 
  | 'Travel Contract'
  | 'Per Diem'
  | 'Permanent / Direct Hire'
  | 'Local Contract';

export type JobStatus = 'draft' | 'published' | 'closed' | 'archived';

export interface Job {
  id: string;
  slug: string;
  title: string;
  department: JobDepartment;
  specialty: string;
  locationCity: string;
  locationState: string;
  employmentType: EmploymentType;
  shift: string;
  durationWeeks?: number;
  payRange?: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  status: JobStatus;
  isUrgent: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ApplicationStatus = 
  | 'new'
  | 'reviewed'
  | 'contacted'
  | 'screening'
  | 'placed'
  | 'archived';

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  specialty: string;
  yearsOfExperience: string;
  primaryLicenseState?: string;
  resumeUrl?: string;
  resumeFilename?: string;
  coverNote?: string;
  consentGiven: boolean;
  status: ApplicationStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export type FacilityInquiryStatus = 
  | 'new'
  | 'contacted'
  | 'in_discussion'
  | 'agreement_sent'
  | 'active_client'
  | 'closed';

export interface FacilityInquiry {
  id: string;
  facilityName: string;
  contactName: string;
  contactTitle?: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  facilityType: string;
  staffingNeeds: string;
  urgency: string;
  details?: string;
  status: FacilityInquiryStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobAlert {
  id: string;
  email: string;
  specialty?: string;
  state?: string;
  employmentType?: string;
  isActive: boolean;
  unsubscribeToken: string;
  createdAt: string;
}

export interface JobFiltersState {
  search: string;
  department: string;
  specialty: string;
  state: string;
  employmentType: string;
  sortBy: 'newest' | 'pay';
}
