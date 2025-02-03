// components/JobSearch.tsx
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import { Input } from "@/components/ui/input"

export default function JobSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const handleSearch = useDebouncedCallback(async (term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');

        if (term) {
            params.set('query', term);
            // Fetch suggestions
            try {
                const response = await fetch(`/api/suggestions?query=${term}`);
                const data = await response.json();
                setSuggestions(data.suggestions);
            } catch(error){
              console.error("Error fetching suggestions:", error);
            }
        } else {
            params.delete('query');
            setSuggestions([]);
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative">
            <Input
                type="text"
                placeholder="Job title | Location | Company"
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('query')?.toString()|| ""}
                className="w-full pl-4 bg-white pr-32 py-6 ring-offset-0 focus:ring-1 focus:ring-emerald-600
                           shadow-sm border border-gray-300 rounded-md outline-none focus:outline-none"
            />
            {suggestions.length > 0 && (
                <div className="absolute w-full bg-white border rounded-md mt-1">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSearch(suggestion)}
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}