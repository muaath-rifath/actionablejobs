// app/page.tsx
import React, { Suspense } from "react"
import Topbar from "@/components/Topbar"
import SearchWrapper from "@/components/SearchWrapper"
import ClientSearch from "@/components/ClientSearch"

export default function ActionableJobs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Topbar />
      <main className="container mx-auto px-4 py-8">
        <div className="rounded-lg p-6 mb-8 mt-12">
          <div className="relative flex flex-col md:flex-row items-center gap-3 max-w-[1000px] mx-auto">
            <div className="relative flex-grow">
              <Suspense fallback={<div className="h-12 bg-gray-100 rounded-md animate-pulse"/>}>
                <ClientSearch />
              </Suspense>
            </div>
          </div>
        </div>
        <Suspense fallback={<div className="text-center">Loading jobs...</div>}>
          <SearchWrapper message="" />
        </Suspense>
      </main>
    </div>
  )
}
