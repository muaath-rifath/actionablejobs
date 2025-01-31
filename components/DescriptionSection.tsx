// components/DescriptionSection.tsx
"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

interface DescriptionSectionProps {
  description: string;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ description }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 200;
    if (!description) {
        return <p>No description available</p>;
    }

    if (description.length <= maxLength) {
        return <p>{description}</p>;
    }

    const shortDescription = isExpanded ? description : `${description.substring(0, maxLength)}...`;

    return (
        <div>
            <p >{shortDescription}</p>
            {!isExpanded && (
                <Button variant="link" onClick={() => setIsExpanded(true)} className="p-0 text-blue-600">
                    Read More
                </Button>
            )}
            {isExpanded && (
                <Button variant="link" onClick={() => setIsExpanded(false)} className="p-0 text-blue-600">
                    Read Less
                </Button>
            )}
        </div>
    );
};

export default DescriptionSection;