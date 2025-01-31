// app/page.tsx
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Topbar from "@/components/Topbar"
import ClientActionableJobs from "@/components/ClientActionableJobs"

const salaryRanges = [
  { label: "$30k - $50k", value: "30-50" },
  { label: "$50k - $80k", value: "50-80" },
  { label: "$80k - $120k", value: "80-120" },
  { label: "$120k - $160k", value: "120-160" },
  { label: "$160k+", value: "160+" },
]

export default async function ActionableJobs() {

    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Topbar />
      <main className="container mx-auto px-4 py-8">
      <div className="rounded-lg p-6 mb-8 mt-12">
  <div className="relative flex flex-col md:flex-row items-center gap-3 max-w-[1000px] mx-auto">
    <div className="relative flex-grow">
      <Input
        placeholder="Job title | Location | Company"
        className="w-full pl-4 bg-white pr-32 py-6 ring-offset-0 focus:ring-1 focus:ring-blue-600 
                   shadow-sm border border-gray-300 rounded-md outline-none focus:outline-none"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
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
      </div>
    </div>

    <Button
      className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-6 border border-blue-600 
                 rounded-md transition-all focus:ring-1 ring-offset-0 focus:outline-none shadow-sm"  
    >
      Action
    </Button>
  </div>
</div>
         <ClientActionableJobs />
      </main>
    </div>
  )
}