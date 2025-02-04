// components/JobSearch.tsx
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const salaryRanges = [
  { label: "$30k - $50k", value: "30-50" },
  { label: "$50k - $80k", value: "50-80" },
  { label: "$80k - $120k", value: "80-120" },
  { label: "$120k - $160k", value: "120-160" },
  { label: "$160k+", value: "160+" },
];

export default function JobSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState(searchParams.get('query')?.toString() || "");
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLDivElement>(null);

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

    const updateSearchParams = (term: string, salary?: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        params.set('showResults', 'true');

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        if (salary) {
            params.set('salary', salary);
        }

        replace(`${pathname}?${params.toString()}`);
    };

    const fetchSuggestions = async (term: string) => {
        try {
            const response = await fetch(`/api/suggestions?query=${term}`);
            const data = await response.json();
            setSuggestions(data.suggestions);
        } catch(error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const handleInputChange = (value: string) => {
        setSearchTerm(value);
        fetchSuggestions(value);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setSearchTerm(suggestion);
        setSuggestions([]);
        setIsFocused(false);
        updateSearchParams(suggestion);
    };

    const handleSalaryChange = (value: string) => {
        updateSearchParams(searchTerm, value);
    };

    return (
        <div className="relative flex gap-2" ref={inputRef}>
            <div className="flex-grow relative">
                <Input
                    type="text"
                    placeholder="Job title | Location | Company"
                    value={searchTerm}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    className="w-full pl-4 bg-white pr-32 py-6 ring-offset-0 focus:ring-1 focus:ring-emerald-600
                           shadow-sm border border-gray-300 rounded-md outline-none focus:outline-none"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Select onValueChange={handleSalaryChange}>
                        <SelectTrigger className="border-0 shadow-none hover:bg-gray-50 ring-0 focus:ring-0">
                            <SelectValue placeholder="Salary" />
                        </SelectTrigger>
                        <SelectContent>
                            {salaryRanges.map((range) => (
                                <SelectItem key={range.value} value={range.value}>
                                    {range.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
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
                onClick={() => updateSearchParams(searchTerm)}
                className="shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-6 
                          border border-emerald-600 rounded-md transition-all focus:ring-1 ring-offset-0 
                          focus:outline-none shadow-sm"
            >
                Action
            </Button>
        </div>
    );
}
