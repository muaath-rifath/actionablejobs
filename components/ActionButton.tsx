// components/ActionButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from 'next/navigation'; // Import useRouter and useSearchParams

export default function ActionButton() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleActionClick = () => {
        const currentQuery = searchParams?.get('query') || ''; // Get current search query
        const newSearchParams = new URLSearchParams();
        if (currentQuery) {
            newSearchParams.set('query', currentQuery); // Preserve search query
        }
        newSearchParams.set('page', '1'); // Reset to page 1 for new action
        router.push(`/?${newSearchParams.toString()}`); // Redirect with search query and page 1
    };

    return (
        <Button
            className="shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-6 border border-emerald-600 rounded-md transition-all focus:ring-1 ring-offset-0 focus:outline-none shadow-sm"
            onClick={handleActionClick} // Use handleActionClick function
        >
            Action
        </Button>
    );
}