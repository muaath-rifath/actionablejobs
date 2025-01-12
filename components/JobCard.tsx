import { Job } from '@/types/job';

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
      <div className="mt-2 text-gray-600">
        <p className="font-medium">{job.company}</p>
        <p>{job.location}</p>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
            {job.experienceLevel}
          </span>
          <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
            {job.workType}
          </span>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Posted: {job.postedDate}
      </p>
    </div>
  );
}
