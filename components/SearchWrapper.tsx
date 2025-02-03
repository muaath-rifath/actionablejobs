// components/SearchWrapper.tsx
"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ClientActionableJobs from './ClientActionableJobs';

// Removed SearchWrapperProps interface - it's not needed
export default function SearchWrapper() { // Updated: Removed props from function definition
    const searchParams = useSearchParams();

    return (
        <Suspense fallback={<div className="text-center">Loading Jobs...</div>}>
            <ClientActionableJobs searchParams={searchParams} />
        </Suspense>
    );
}