// components/SalarySelect.tsx
"use client"
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SalarySelectProps {
    salaryRanges: { label: string; value: string }[];
}

const SalarySelect: React.FC<SalarySelectProps> = ({ salaryRanges }) => {
    return (
        <Select>
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
    );
}

export default SalarySelect;