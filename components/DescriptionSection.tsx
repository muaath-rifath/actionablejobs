// components/DescriptionSection.tsx
"use client"
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface DescriptionSectionProps {
  description: string | null;
  maxLength?: number;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ 
  description, 
  maxLength = 300 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!description) {
    return <p className="text-gray-600">No description available</p>;
  }

  const shouldShowReadMore = description.length > maxLength;
  const displayText = isExpanded ? description : description.slice(0, maxLength);

  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown>{displayText}</ReactMarkdown>
      {shouldShowReadMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-emerald-600 hover:text-emerald-700 font-medium mt-2"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

export default DescriptionSection;
