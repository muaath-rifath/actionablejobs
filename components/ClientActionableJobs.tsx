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

const ClientActionableJobs: React.FC = () => {
    const params = useSearchParams();
    const query = params.get('query') || '';
    const page = params.get('page') ? parseInt(params.get('page') as string) : 1;
    const showResults = params.get('showResults') === 'true';
    const pageSize = 6;

    const [jobs, setJobs] = useState<Job[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!showResults) return;

        setLoading(true);
        const fetchData = async () => {
            try {
                let data;
                if (query) {
                    const searchResponse = await fetch(
                        `/api/search?query=${query}&page=${page}&pageSize=${pageSize}`
                    );
                    data = await searchResponse.json();
                } else {
                    const response = await fetch(
                        `/api/jobs?page=${page}&pageSize=${pageSize}`
                    );
                    data = await response.json();
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
    }, [page, pageSize, query, showResults]);

    if (!showResults) return null;

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
