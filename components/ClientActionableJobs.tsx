// components/ClientActionableJobs.tsx
"use client"
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import ClientPagination from "./ClientPagination";
import ClientJobGrid from "./ClientJobGrid";

interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    description: string;
    job_url: string;
    source: string;
    date_posted: string;
    date_scraped: string;
    external_id: string;
    extracted_salary: string;
    skills: string;
    job_type: string;
}

interface FetchJobsResponse {
    jobs: Job[];
    total: number;
    timestamp: string;
    page: number;
    pageSize: number;
}
// Removed ClientActionableJobsProps interface
// interface ClientActionableJobsProps {
//     searchParams: ReadonlyURLSearchParams;
// }

// Updated component to remove props parameter
const ClientActionableJobs: React.FC = () => {
    const params = useSearchParams();
    const query = params.get('query') || '';
    const page = params.get('page') ? parseInt(params.get('page') as string) : 1;
    const pageSize = 6;

    const [jobs, setJobs] = useState<Job[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                let data;
                if (query) {
                    const searchBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
                    const searchResponse = await fetch(
                        `${searchBaseUrl}/api/search?query=${query}&page=${page}&pageSize=${pageSize}`
                    );
                    data = await searchResponse.json();
                } else {
                    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
                    const response = await fetch(
                            `${baseUrl}/api/jobs?page=${page}&pageSize=${pageSize}`
                        );
                        data = await response.json() as FetchJobsResponse;
                }
                setJobs(data.jobs);
                setTotal(data.total);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [page, pageSize, query]);

    return (
        <>
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* Loading skeleton */}
                </div>
            ) : (
                <>
                    <ClientJobGrid jobs={jobs} />
                    <ClientPagination 
                        total={total}
                        currentPage={page}
                        pageSize={pageSize}
                    />
                </>
            )}
        </>
    );
}


export default ClientActionableJobs;