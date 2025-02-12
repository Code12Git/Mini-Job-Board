"use client";

import { useParams } from "next/navigation";
import JobDetails from "./JobDetails";

const JobDetailsPage = () => {
  const params = useParams();
  const jobId = params?.id as string;

  if (!jobId) return <p>Job not found</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <JobDetails jobId={jobId} />
    </div>
  );
};

export default JobDetailsPage;