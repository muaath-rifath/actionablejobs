// src/components/ClientSearch.tsx
'use client';
import { Suspense } from 'react'
import JobSearch from './JobSearch';

export default function ClientSearch() {
  return (
    <Suspense fallback={<div className="h-12 bg-gray-100 rounded-md animate-pulse"/>}>
      <JobSearch />
    </Suspense>
  )
}