"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"
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
    skills: string;
    job_type: string;
  }

export default function ActionableJobs() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 6;
  
    useEffect(() => {
      const fetchJobs = async () => {
        try {
          const response = await fetch('/api/jobs');
          const data = await response.json();
            
            const parsedJobs = data.jobs.map((job: Job) => ({
                ...job,
                skills: job.skills ? job.skills.split(',') : [],
              }));
          setJobs(parsedJobs);
        } catch (error) {
          console.error('Error fetching jobs:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchJobs();
    }, []);


    const handleApply = (url: string) => {
        window.open(url, '_blank');
      };
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

  const getPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Add first page if not included
        if (startPage > 1) {
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink href="#" onClick={() => handlePageChange(1)}>
                        1
                    </PaginationLink>
                </PaginationItem>
            );
             if (startPage > 2) {
              items.push(<PaginationItem key="start-ellipsis"><span >...</span></PaginationItem>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        href="#"
                        onClick={() => handlePageChange(i)}
                        isActive={i === currentPage}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }
      // Add last page if not included
        if (endPage < totalPages) {
             if (endPage < totalPages -1 ) {
                items.push(<PaginationItem key="end-ellipsis"><span >...</span></PaginationItem>);
              }

          items.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink href="#" onClick={() => handlePageChange(totalPages)}>
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }


        return items;
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
          {loading ? (
            <p>Loading jobs...</p>
          ) : (
            currentJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow duration-300 border border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-800">{job.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-gray-600 mr-2"></span>
                  <p className="font-medium text-gray-600">{job.company}</p>
                </div>
                <p className="text-gray-600">{job.location}</p>
                  <p className="text-gray-600 font-semibold">{job.salary || job.extracted_salary}</p>
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
                      <AlertDialogDescription className="space-y-4 overflow-y-auto max-h-[400px]">
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
                                <p className="text-gray-600">{job.salary || job.extracted_salary}</p>
                          </div>
                            <div>
                                <p className="font-semibold text-gray-700">Job Type</p>
                                <p className="text-gray-600">{job.job_type}</p>
                            </div>
                        </div>
                        
                        <div>
                          <p className="font-semibold text-gray-700 mb-2">Skills Required</p>
                          <div className="flex flex-wrap gap-2">
                            {Array.isArray(job.skills) && job.skills.map((skill) => (
                              <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="relative">
                            <p className="font-semibold text-gray-700 mb-2">Description</p>
                            <div className="text-gray-600 ">
                             <DescriptionSection description={job.description} />
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
            
            ))
          )}
          </div>
          { !loading && (
           <Pagination>
              <PaginationContent>
                  <PaginationItem>
                      <PaginationPrevious
                          href="#"
                          onClick={() => handlePageChange(currentPage - 1)}
                         aria-disabled={currentPage === 1}
                      />
                  </PaginationItem>
                  {getPaginationItems()}
                  <PaginationItem>
                      <PaginationNext
                          href="#"
                          onClick={() => handlePageChange(currentPage + 1)}
                          aria-disabled={currentPage === totalPages}
                      />
                  </PaginationItem>
              </PaginationContent>
          </Pagination>
        )}
      </main>
    </div>
  )
}

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
            <Button variant="link" onClick={() => setIsExpanded(true)} className="p-0">
               Read More
             </Button>
           )}
             {isExpanded && (
                 <Button variant="link" onClick={() => setIsExpanded(false)} className="p-0">
                     Read Less
                  </Button>
               )}
        </div>
    );
};