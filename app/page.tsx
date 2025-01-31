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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const salaryRanges = [
  { label: "$30k - $50k", value: "30-50" },
  { label: "$50k - $80k", value: "50-80" },
  { label: "$80k - $120k", value: "80-120" },
  { label: "$120k - $160k", value: "120-160" },
  { label: "$160k+", value: "160+" },
]

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  job_url: string;
  source: string;
  date_posted: string;
  date_scraped: string;
  external_id: string;
  extracted_salary: string;
  skills: string[];
  job_type: string;
}


const mockJobs: Job[] = [
    {
        id: "1",
        title: "Senior Software Engineer",
        company: "TechInnovate Inc.",
        location: "San Francisco, CA",
        salary: "$140,000 - $180,000",
        description: "Develop and maintain scalable web applications.",
        job_url: "https://example.com/job1",
        source: "LinkedIn",
        date_posted: "2024-01-20",
        date_scraped: "2024-01-21",
        external_id: "job123",
        extracted_salary: "160000",
        skills: ["React", "TypeScript", "Node.js"],
        job_type: "Full-time",
      },
      {
        id: "2",
        title: "Data Scientist",
        company: "Data Insights Corp",
        location: "New York, NY",
        salary: "$120,000 - $150,000",
        description: "Analyze large datasets to provide business insights.",
        job_url: "https://example.com/job2",
        source: "Indeed",
        date_posted: "2024-01-15",
        date_scraped: "2024-01-16",
        external_id: "job456",
        extracted_salary: "135000",
        skills: ["Python", "Machine Learning", "SQL"],
        job_type: "Full-time",
      },
      {
        id: "3",
        title: "Frontend Developer",
        company: "Web Solutions Ltd.",
        location: "London, UK",
        salary: "£60,000 - £80,000",
        description: "Build interactive user interfaces for web platforms.",
        job_url: "https://example.com/job3",
        source: "Monster",
        date_posted: "2024-01-10",
        date_scraped: "2024-01-11",
        external_id: "job789",
        extracted_salary: "70000",
        skills: ["HTML", "CSS", "JavaScript"],
        job_type: "Contract",
      },
      {
        id: "4",
        title: "Backend Developer",
        company: "Cloud Services Inc.",
        location: "Seattle, WA",
        salary: "$130,000 - $160,000",
        description: "Develop server-side logic and APIs.",
        job_url: "https://example.com/job4",
        source: "Stack Overflow",
        date_posted: "2024-01-05",
        date_scraped: "2024-01-06",
        external_id: "job101",
        extracted_salary: "145000",
        skills: ["Node.js", "Express.js", "MongoDB"],
        job_type: "Full-time",
      },
      {
        id: "5",
        title: "Mobile App Developer",
        company: "Mobile First Apps",
        location: "Los Angeles, CA",
        salary: "$110,000 - $140,000",
        description: "Develop and maintain mobile applications for iOS and Android.",
        job_url: "https://example.com/job5",
        source: "Glassdoor",
        date_posted: "2023-12-30",
        date_scraped: "2023-12-31",
        external_id: "job202",
        extracted_salary: "125000",
        skills: ["React Native", "Swift", "Kotlin"],
        job_type: "Full-time",
      },
      {
          id: "6",
          title: "Project Manager",
          company: "Global Tech Solutions",
          location: "Chicago, IL",
          salary: "$90,000 - $120,000",
          description: "Lead project teams and ensure successful project delivery.",
          job_url: "https://example.com/job6",
          source: "LinkedIn",
          date_posted: "2023-12-25",
          date_scraped: "2023-12-26",
          external_id: "job303",
          extracted_salary: "105000",
          skills: ["Project Management", "Agile", "Scrum"],
          job_type: "Full-time",
        },
]


export default function ActionableJobs() {
  const handleApply = (url: string) => {
    window.open(url, '_blank');
  };
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
            {mockJobs.map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800">{job.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-gray-600 mr-2"></span>
                  <p className="font-medium text-gray-600">{job.company}</p>
                </div>
                <p className="text-gray-600">{job.location}</p>
                <p className="text-gray-600 font-semibold">{job.salary}</p>
              </CardContent>
              <CardFooter className="flex space-x-2">
              <Button
                  variant="ghost"
                  className="border-blue-600 bg-blue-600 text-white w-full hover:text-white hover:bg-blue-700"
                  onClick={() => handleApply(job.job_url)}
                >
                  Apply
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-600 w-full"
                    >
                      View Details
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-[600px]">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-xl font-bold">
                        {job.title}
                      </AlertDialogTitle>
                      <AlertDialogDescription className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="font-semibold text-gray-700">Company</p>
                            <p className="text-gray-600">{job.company}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-700">Location</p>
                            <p className="text-gray-600">{job.location}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-700">Salary</p>
                            <p className="text-gray-600">{job.salary}</p>
                          </div>
                            <div>
                                <p className="font-semibold text-gray-700">Job Type</p>
                                <p className="text-gray-600">{job.job_type}</p>
                            </div>
                        </div>
                        
                        <div>
                          <p className="font-semibold text-gray-700 mb-2">Skills Required</p>
                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill) => (
                              <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                         <div>
                            <p className="font-semibold text-gray-700 mb-2">Description</p>
                            <div className="text-gray-600">
                              {job.description || "No description available"}
                            </div>
                          </div>
                        
                        <div className="text-sm text-gray-500">
                          <p>Posted: {job.date_posted}</p>
                          <p>Job ID: {job.external_id}</p>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="border-gray-300">Close</AlertDialogCancel>
                      <AlertDialogAction className="bg-blue-600 hover:bg-blue-700"  onClick={() => handleApply(job.job_url)}>
                        Apply Now
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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