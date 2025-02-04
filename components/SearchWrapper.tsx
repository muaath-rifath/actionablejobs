"use client";

import { Suspense } from 'react';
import ClientActionableJobs from './ClientActionableJobs';
import { useSearchParams } from 'next/navigation';

interface SearchWrapperProps {
    message?: string;
}

const SearchWrapper: React.FC<SearchWrapperProps> = ({ message = "Jobs" }) => {
    const searchParams = useSearchParams();
    const showResults = searchParams.get('showResults') === 'true';

    if (!showResults) {
        return null;
    }

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
