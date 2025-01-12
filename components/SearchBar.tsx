'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Suspense } from 'react';

interface SearchBarProps {
  defaultValue?: string;
}

function SearchBarContent({ defaultValue = '' }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    router.push(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <input
        type="text"
        defaultValue={searchParams.get('query') ?? defaultValue}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search jobs..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default function SearchBar(props: SearchBarProps) {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchBarContent {...props} />
    </Suspense>
  );
}
