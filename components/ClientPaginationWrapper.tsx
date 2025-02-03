// components/ClientPaginationWrapper.tsx
"use client"
import { Suspense } from 'react'
import ClientPagination from './ClientPagination'
import React from 'react'

interface ClientPaginationWrapperProps {
  total: number;
  currentPage: number;
  pageSize: number;
}

export default function ClientPaginationWrapper(props: ClientPaginationWrapperProps) {
  return (
    <Suspense fallback={<div className="animate-pulse text-center">Loading pagination...</div>}>
      <ClientPagination {...props} />
    </Suspense>
  )
}