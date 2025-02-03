// components/SearchWrapper.tsx
"use client";

import { Suspense } from 'react';
import ClientActionableJobs from './ClientActionableJobs';

interface SearchWrapperProps {
    message: string; // Simple string prop for testing
}

const SearchWrapper: React.FC<SearchWrapperProps> = ({ message }) => { // Expect message prop
    console.log("SearchWrapper message prop:", message); // Log the message

    return (
        <Suspense fallback={<div className="text-center">Loading Jobs...</div>}>
            <div>{message} <ClientActionableJobs  /></div> {/* Render message and ClientActionableJobs (without props for now) */}
        </Suspense>
    );
}

export default SearchWrapper;