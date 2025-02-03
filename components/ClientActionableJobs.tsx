// components/ClientActionableJobs.tsx
"use client"
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import ClientPagination from "./ClientPagination";
import ClientJobGrid from "./ClientJobGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
const fetchJobs = async (page: number, pageSize: number): Promise<FetchJobsResponse> => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/jobs?page=${page}&pageSize=${pageSize}`);
        return await response.json()
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return { jobs: [], total: 0, timestamp: "", page: 0, pageSize: 0 }
        // Optionally, you could throw the error to be caught by an error boundary if you implement one.
        // throw error;
    }
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
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSizeState, setPageSizeState] = useState<number>(6);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            let data;
            if (query) {
                console.log(`Fetching search results for query: "${query}", page: ${page}, pageSize: ${pageSize}`);
                const searchBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
                const searchResponse = await fetch(`${searchBaseUrl}/api/search?query=${query}&page=${page}&pageSize=${pageSize}`);
                data = await searchResponse.json() as FetchJobsResponse;
            } else {
                console.log(`Fetching all jobs for page: ${page}, pageSize: ${pageSize}`);
                data = await fetchJobs(page, pageSize);
            }

            console.log("Fetched data:", data);
            setJobs(data.jobs);
            setTotal(data.total);
            setCurrentPage(data.page);
            setPageSizeState(data.pageSize);
            setLoading(false);
        };
        fetchData();
    }, [page, pageSize, query]);

    return (
        <Suspense fallback={<div className="text-center">Loading Jobs...</div>}>
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {Array.from({ length: 6 }, (_, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                            <CardHeader>
                                <CardTitle className="text-gray-800">Loading...</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex items-center">
                                    <span className="inline-block w-2 h-2 rounded-full bg-gray-600 mr-2 animate-pulse"></span>
                                    <p className="font-medium text-gray-600 animate-pulse">Loading...</p>
                                </div>
                                <p className="text-gray-600 animate-pulse">Loading...</p>
                                <p className="text-gray-600 font-semibold animate-pulse">Loading...</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <>
                    <ClientJobGrid jobs={jobs} />
                    <ClientPagination total={total} currentPage={currentPage} pageSize={pageSizeState} />
                </>
            )}
        </Suspense>
    );
}

export default ClientActionableJobs;