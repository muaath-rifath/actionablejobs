// app/page.tsx
// ... other imports
import ActionButton from "@/components/ActionButton"; // Import ActionButton
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Topbar from "@/components/Topbar"
import SearchWrapper from "@/components/SearchWrapper"
import ClientSearch from "@/components/ClientSearch"
import ClientPaginationWrapper from "@/components/ClientPaginationWrapper";
import { Suspense } from "react";

const salaryRanges = [
  { label: "$30k - $50k", value: "30-50" },
  { label: "$50k - $80k", value: "50-80" },
  { label: "$80k - $120k", value: "80-120" },
  { label: "$120k - $160k", value: "120-160" },
  { label: "$160k+", value: "160+" },
]

interface FetchJobsResponse {
    total: number;
    timestamp: string;
    page: number;
    pageSize: number;
}

const fetchJobs = async (page: number, pageSize: number): Promise<FetchJobsResponse> => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/jobs?page=${page}&pageSize=${pageSize}`);
        const data = await response.json() as FetchJobsResponse;
        return data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return { total: 0, timestamp: "", page: 0, pageSize: 0 };
    }
}

interface ActionableJobsProps {
    searchParams: Promise<{ // Reverted to Promise type for searchParams
        page?: string; // Keep page as optional string
    }>;
}


export default async function ActionableJobs({ searchParams }: ActionableJobsProps) {
    const resolvedParams = (await searchParams) as { page?: string }; // Explicit type assertion here
    const page = resolvedParams?.page ? parseInt(resolvedParams.page) : 1;
    const pageSize = 6;
    const { total, page: currentPage } = await fetchJobs(page, pageSize);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
            <Topbar />
            <main className="container mx-auto px-4 py-8">
                <div className="rounded-lg p-6 mb-8 mt-12">
                    <div className="relative flex flex-col md:flex-row items-center gap-3 max-w-[1000px] mx-auto">
                        <div className="relative flex-grow">
                            <ClientSearch />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                <Select>
                                    <SelectTrigger className="border-0 shadow-none hover:bg-gray-50 ring-0 focus:ring-0">
                                        <SelectValue placeholder="Salary" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {salaryRanges.map((range) => (
                                            <SelectItem key={range.value} value={range.value}>
                                                {range.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        {/* Replace this Button with ActionButton component */}
                        <ActionButton />
                    </div>
                </div>
                <Suspense fallback={<p className="text-center">Loading jobs...</p>}>
                    <SearchWrapper />
                </Suspense>
                <ClientPaginationWrapper
                    total={total}
                    currentPage={currentPage}
                    pageSize={pageSize}
                />
            </main>
        </div>
    );
}