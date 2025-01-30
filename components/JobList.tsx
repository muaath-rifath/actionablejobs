// app/components/JobList.tsx
"use client";
import { Suspense, useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import JobCard from '@/components/JobCard';
import { Job } from '@/types/job';
import Filters from '@/components/components/Filters';
import { useSearchParams } from 'next/navigation';


type SearchParams = {
    query?: string;
    experienceLevel?: string;
    workType?: string;
    location?: string;
};


async function getJobs(searchParams: SearchParams) {
    const query = searchParams.query || '';
    const experienceLevel = searchParams.experienceLevel || '';
    const workType = searchParams.workType || '';
    const location = searchParams.location || '';
  
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/jobs?query=${query}&experienceLevel=${experienceLevel}&workType=${workType}&location=${location}`,
      {
        cache: 'no-store',
      }
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
  
    return response.json();
  }

export default function JobList() {

    const searchParams = useSearchParams();

    const [selectedFilters, setSelectedFilters] = useState<{ employmentTypes: string[], experience: string[] }>({employmentTypes: [], experience: []});


    const handleFilterChange = (filters: { employmentTypes: string[], experience: string[] }) => {
        setSelectedFilters(filters);
    }

    const experienceLevel = selectedFilters?.experience?.join(',');
    const workType = selectedFilters?.employmentTypes?.join(',');
    const query = searchParams.get('query') || '';
    const location = searchParams.get('location') || '';


  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string| null>(null);

  useEffect(() => {
    setLoading(true);
    getJobs({query, experienceLevel, workType, location})
      .then(jobs => setJobs(jobs))
      .catch(err => {
        setError(err.message);
      })
      .finally(() => setLoading(false))
  }, [query, experienceLevel, workType, location])
return (
    <div className="flex">
        <Filters onFilter={handleFilterChange}/>
        <div className="flex-1">
            <div className="mb-8">
            <Suspense>
                <SearchBar />
            </Suspense>
            </div>

            {loading && <div>Loading jobs...</div>}
            {error && <div>Error loading jobs: {error}</div>}
            {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job: Job) => (
                <JobCard key={job.id} job={job} />
                ))}
            </div>
            )}
        </div>
    </div>
);
}