'use client';

import { useState } from 'react';

const employmentTypes = ['Full-time', 'Part-time', 'Contract'];

interface FilterOptions {
  employmentTypes: string[];
  experience: string[];
}

export default function Filters({ onFilter }: { onFilter: (filters: FilterOptions) => void }) {
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<string[]>([]);
  const [selectedExperience] = useState<string[]>([]);

  const handleEmploymentTypeChange = (type: string) => {
    const updated = selectedEmploymentTypes.includes(type)
      ? selectedEmploymentTypes.filter(t => t !== type)
      : [...selectedEmploymentTypes, type];
    setSelectedEmploymentTypes(updated);
    onFilter({ employmentTypes: updated, experience: selectedExperience });
  };

  return (
    <div className="w-64 p-4 border-r">
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Employment Type</h3>
        {employmentTypes.map(type => (
          <div key={type} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={type}
              checked={selectedEmploymentTypes.includes(type)}
              onChange={() => handleEmploymentTypeChange(type)}
              className="mr-2"
            />
            <label htmlFor={type}>{type}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
