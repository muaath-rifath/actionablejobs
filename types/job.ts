// types/job.ts
export interface Job {
  id: string;
  site: string;
  job_url: string;
  job_url_direct: string | null;
  title: string;
  company: string;
  location: string;
  date_posted: string | null;
  job_type: string | null;
  salary_source: string | null;
  interval: string | null;
  min_amount: number | null;
  max_amount: number | null;
  currency: string | null;
  is_remote: boolean | null;
  job_level: string;
  job_function: string | null;
  listing_type: string | null;
  emails: string | null;
  description: string | null;
  company_industry: string | null;
  company_url: string | null;
  company_logo: string | null;
  company_url_direct: string | null;
  company_addresses: string | null;
  company_num_employees: string | null;
  company_revenue: string | null;
  company_description: string | null;
  source: string;
}



export interface JobFilters {
  query: string;
  experienceLevel: string;
  workType: string;
}