'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function JobSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState(searchParams.get('query')?.toString() || "");
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLDivElement>(null);

    // Handle clicks outside of the search component
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchSuggestions = async (term: string) => {
        try {
            const response = await fetch(`/api/suggestions?query=${term}`);
            const data = await response.json();
            setSuggestions(data.suggestions);
        } catch(error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        params.set('showResults', 'true');

        if (searchTerm) {
            params.set('query', searchTerm);
        } else {
            params.delete('query');
        }

        replace(`${pathname}?${params.toString()}`);
    };

    const handleInputChange = (value: string) => {
        setSearchTerm(value);
        fetchSuggestions(value);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setSearchTerm(suggestion);
        setSuggestions([]);
        setIsFocused(false);
    };

    return (
        <div className="relative flex gap-2" ref={inputRef}>
            <div className="flex-grow">
                <Input
                    type="text"
                    placeholder="Job title | Location | Company"
                    value={searchTerm}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    className="w-full pl-4 bg-white pr-32 py-6 ring-offset-0 focus:ring-1 focus:ring-emerald-600
                           shadow-sm border border-gray-300 rounded-md outline-none focus:outline-none"
                />
                {isFocused && suggestions.length > 0 && (
                    <div className="absolute w-full bg-white border rounded-md mt-1 shadow-lg z-50">
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Button
                onClick={handleSearch}
                className="shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-6 
                          border border-emerald-600 rounded-md transition-all focus:ring-1 ring-offset-0 
                          focus:outline-none shadow-sm"
            >
                Search Jobs
            </Button>
        </div>
    );
}
