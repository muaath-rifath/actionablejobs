"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Topbar from "@/components/Topbar"

const salaryRanges = [
  { label: "$30k - $50k", value: "30-50" },
  { label: "$50k - $80k", value: "50-80" },
  { label: "$80k - $120k", value: "80-120" },
  { label: "$120k - $160k", value: "120-160" },
  { label: "$160k+", value: "160+" },
]

export default function ActionableJobs() {
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



          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800">Senior Software Engineer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-gray-600 mr-2"></span>
                  <p className="font-medium text-gray-600">TechInnovate Inc.</p>
                </div>
                <p className="text-gray-600">San Francisco, CA</p>
                <p className="text-gray-600 font-semibold">$140,000 - $180,000</p>
              </CardContent>
              <CardFooter className="flex space-x-2">
              <Button
                  variant="ghost"
                  className="border-blue-600 bg-blue-600 text-white w-full hover:text-white hover:bg-blue-700"
                >
                  Apply
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-600 w-full"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
            
            ))}
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" className="text-blue-600 hover:bg-blue-50" />
              </PaginationItem>
              {[1, 2, 3].map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    className="text-blue-600 hover:bg-blue-50"
                    isActive={page === 1}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext href="#" className="text-blue-600 hover:bg-blue-50" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
      </main>
    </div>
  )
}
