// components/ClientJobGrid.tsx
"use client"
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DescriptionSection from "@/components/DescriptionSection";

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
interface ClientJobGridProps {
  jobs:Job[]
}

const ClientJobGrid:React.FC<ClientJobGridProps>= ({jobs}) => {
   const handleApply = (url: string) => {
        window.open(url, '_blank');
      };
    return (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
         { jobs.map((job) => (
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
                  className="border-emerald-600 bg-emerald-600 text-white w-full hover:text-white hover:bg-emerald-700"
                   onClick={() => handleApply(job.job_url)}
                >
                  Apply
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-600 w-full"
                    >
                      View Details
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-[600px]">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-xl font-bold">
                        {job.title}
                      </AlertDialogTitle>
                      <div className="space-y-4 overflow-y-auto max-h-[400px]">
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
                            {Array.isArray(job.skills) ? job.skills.map((skill) => (
                              <span key={skill} className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                                {skill}
                              </span>
                            )) : <p className="text-gray-600">Skills not specified.</p>}
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
                      </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="border-gray-300">Close</AlertDialogCancel>
                      <AlertDialogAction className="bg-emerald-600 hover:bg-emerald-700"  onClick={() => handleApply(job.job_url)}>
                        Apply Now
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>

            ))}
          </div>
    )
}

export default ClientJobGrid;