// components/CompanyLogo.tsx
"use client"
import React from 'react';
import Image from 'next/image';
import { Building2 } from 'lucide-react';

interface CompanyLogoProps {
  logoUrl: string | null;
  companyName: string;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ logoUrl, companyName }) => {
  const [imageError, setImageError] = React.useState(false);

  if (!logoUrl || imageError) {
    return (
      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
        <Building2 className="w-6 h-6 text-gray-400" />
      </div>
    );
  }

  return (
    <div className="relative w-12 h-12">
      <Image
        src={logoUrl}
        alt={`${companyName} logo`}
        fill
        className="object-contain rounded"
        sizes="48px"
        onError={() => setImageError(true)}
        unoptimized={process.env.NODE_ENV === 'development'}
      />
    </div>
  );
};

export default CompanyLogo;
