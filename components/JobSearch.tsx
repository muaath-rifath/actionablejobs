'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Input } from "@/components/ui/input"

export default function JobSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('query')?.toString() || "");
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const handleInputChange = async (term: string) => {
        setSearchTerm(term);
        
        // Update URL with search term
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);

        if (term.length >= 2) {
            try {
                const response = await fetch(`/api/suggestions?query=${term}`);
                const data = await response.json();
                setSuggestions(data.suggestions);
            } catch(error) {
                console.error("Error fetching suggestions:", error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setSearchTerm(suggestion);
        setSuggestions([]);
        
        // Update URL when suggestion is clicked
        const params = new URLSearchParams(searchParams);
        params.set('query', suggestion);
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="relative">
            <Input
                type="text"
                value={searchTerm}
                placeholder="Job title | Location | Company"
                onChange={(e) => handleInputChange(e.target.value)}
                className="w-full pl-4 bg-white pr-32 py-6 ring-offset-0 focus:ring-1 
                          focus:ring-emerald-600 shadow-sm border border-gray-300 
                          rounded-md outline-none focus:outline-none"
            />
            {suggestions.length > 0 && (
                <div className="absolute z-50 w-full bg-white border 
                               rounded-md mt-1 shadow-lg">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="p-3 hover:bg-gray-100 cursor-pointer 
                                     border-b last:border-b-0"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
