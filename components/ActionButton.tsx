"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from 'next/navigation';

export default function ActionButton() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleActionClick = () => {
        const currentQuery = searchParams?.get('query') || '';
        const newSearchParams = new URLSearchParams();
        
        if (currentQuery) {
          newSearchParams.set('query', currentQuery);
          newSearchParams.set('page', '1');
          newSearchParams.set('showResults', 'true');
          router.push(`/?${newSearchParams.toString()}`);
        }
      };

    return (
        <Button
            className="shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-6 border border-emerald-600 rounded-md transition-all focus:ring-1 ring-offset-0 focus:outline-none shadow-sm"
            onClick={handleActionClick}
        >
            Action
        </Button>
    );
}
