// components/SearchWrapper.tsx
"use client";

import { Suspense } from 'react';
import ClientActionableJobs from './ClientActionableJobs';

interface SearchWrapperProps {
    message?: string; // Made optional with ?
}

const SearchWrapper: React.FC<SearchWrapperProps> = ({ message = "Jobs" }) => {
    console.log("SearchWrapper message prop:", message);

    return (
        <Suspense fallback={<div className="text-center">Loading Jobs...</div>}>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">{message}</h2>
                <ClientActionableJobs />
            </div>
        </Suspense>
    );
}

export default SearchWrapper;
