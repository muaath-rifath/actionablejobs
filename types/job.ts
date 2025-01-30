export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description?: string;
  postedDate?: string;
  experienceLevel: string;
  workType: string;
}

export interface JobFilters {
  query: string;
  experienceLevel: string;
  workType: string;
}