// app/page.tsx
import Topbar from "@/components/Topbar";
import SearchWrapper from "@/components/SearchWrapper";
import ClientSearch from "@/components/ClientSearch";
import { Suspense } from "react";

// REMOVE: interface ActionableJobsProps
// interface ActionableJobsProps {
//     searchParams: Promise<{
//         page?: string;
//     }>;
// }

// MODIFY: Remove searchParams from function arguments
export default async function ActionableJobs(/* REMOVE: { searchParams }: ActionableJobsProps - REMOVED */) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
            <Topbar />
            <main className="container mx-auto px-4 py-8">
                <div className="rounded-lg p-6 mb-8 mt-12">
                    <div className="relative flex flex-col md:flex-row items-center gap-3 max-w-[1000px] mx-auto">
                        <ClientSearch />
                        {/* ... rest of the search/action button section ... */}
                    </div>
                </div>
                <Suspense fallback={<p className="text-center">Loading jobs...</p>}>
                    <SearchWrapper message="Hello from Page!" />
                </Suspense>
            </main>
        </div>
    );
}