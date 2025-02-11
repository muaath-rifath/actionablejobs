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
import { Building2, MapPin, Calendar } from "lucide-react";
import { Job } from "@/types/job";
import Image from "next/image";
import DescriptionSection from "@/components/DescriptionSection";

interface ClientJobGridProps {
  jobs: Job[]
}

const ClientJobGrid: React.FC<ClientJobGridProps> = ({jobs}) => {
   const handleApply = (url: string) => {
        window.open(url, '_blank');
   };

   return (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
       {jobs.map((job) => (
         <Card key={job.id} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
           <CardHeader>
             <div className="flex items-start justify-between">
               <div className="flex-grow">
                 <CardTitle className="text-lg font-bold text-gray-900">
                   {job.title}
                 </CardTitle>
                 <div className="space-y-2 mt-2">
                   <div className="flex items-center text-gray-600">
                     <Building2 className="w-4 h-4 mr-2" />
                     <span>{job.company}</span>
                   </div>
                   <div className="flex items-center text-gray-600">
                     <MapPin className="w-4 h-4 mr-2" />
                     <span>{job.location}</span>
                   </div>
                 </div>
               </div>
               {job.company_logo && (
                 <div className="flex-shrink-0 ml-4">
                   <div className="relative w-12 h-12">
                     <Image
                       src={job.company_logo}
                       alt={`${job.company} logo`}
                       fill
                       className="object-contain rounded"
                       sizes="48px"
                     />
                   </div>
                 </div>
               )}
             </div>
           </CardHeader>
           <CardContent>
             <div className="flex flex-wrap gap-2">
               {job.job_type && (
                 <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                   {job.job_type}
                 </span>
               )}
               {job.is_remote && (
                 <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                   Remote
                 </span>
               )}
             </div>
           </CardContent>
           <CardFooter className="border-t pt-4">
             <div className="flex justify-between items-center w-full gap-2">
               <AlertDialog>
                 <AlertDialogTrigger asChild>
                   <Button
                     variant="outline"
                     className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-600 flex-1"
                   >
                     View Details
                   </Button>
                 </AlertDialogTrigger>
                 <AlertDialogContent className="max-w-[800px] max-h-[80vh] overflow-y-auto">
                   <AlertDialogHeader>
                     <AlertDialogTitle className="text-xl font-bold">
                       {job.title}
                     </AlertDialogTitle>
                     <div className="space-y-4">
                       <div className="grid grid-cols-2 gap-4">
                         <div>
                           <p className="font-semibold text-gray-700">Company</p>
                           <p className="text-gray-600">{job.company}</p>
                         </div>
                         <div>
                           <p className="font-semibold text-gray-700">Location</p>
                           <p className="text-gray-600">{job.location}</p>
                         </div>
                         {job.job_type && (
                           <div>
                             <p className="font-semibold text-gray-700">Job Type</p>
                             <p className="text-gray-600">{job.job_type}</p>
                           </div>
                         )}
                         {job.job_level && (
                           <div>
                             <p className="font-semibold text-gray-700">Level</p>
                             <p className="text-gray-600">{job.job_level}</p>
                           </div>
                         )}
                         {(job.min_amount || job.max_amount) && (
                           <div>
                             <p className="font-semibold text-gray-700">Salary</p>
                             <p className="text-gray-600">
                               {job.currency} 
                               {job.min_amount && job.max_amount 
                                 ? `${job.min_amount.toLocaleString()} - ${job.max_amount.toLocaleString()}`
                                 : job.min_amount 
                                   ? `${job.min_amount.toLocaleString()}+` 
                                   : `Up to ${job.max_amount?.toLocaleString()}`
                               }
                               {job.interval && ` per ${job.interval}`}
                             </p>
                           </div>
                         )}
                       </div>

                       {job.description && (
                         <div>
                           <p className="font-semibold text-gray-700 mb-2">Description</p>
                           <div className="prose prose-sm max-w-none">
                             <DescriptionSection description={job.description} />
                           </div>
                         </div>
                       )}

                       <div className="text-sm text-gray-500 flex items-center">
                         <Calendar className="w-4 h-4 mr-1" />
                         <span>Posted: {job.date_posted || 'Date not specified'}</span>
                       </div>
                     </div>
                   </AlertDialogHeader>
                   <AlertDialogFooter>
                     <AlertDialogCancel className="border-gray-300">Close</AlertDialogCancel>
                     <AlertDialogAction
                       className="bg-emerald-600 hover:bg-emerald-700"
                       onClick={() => handleApply(job.job_url)}
                     >
                       Apply Now
                     </AlertDialogAction>
                   </AlertDialogFooter>
                 </AlertDialogContent>
               </AlertDialog>
               <Button
                 onClick={() => handleApply(job.job_url)}
                 className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1"
               >
                 Apply
               </Button>
             </div>
           </CardFooter>
         </Card>
       ))}
     </div>
   );
}

export default ClientJobGrid;
