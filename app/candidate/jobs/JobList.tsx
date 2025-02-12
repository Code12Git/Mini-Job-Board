"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import JobCard from "./JobCard";
import { getJobs } from "@/service/jobService";

 interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  category: string;
  url: string;
  createdAt: string;
}

const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getJobs();
        setJobs(response);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to fetch jobs. Please try again later.");
      } finally {
        setLoading(false);  
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="text-center text-red-500 py-6">
        <p>{error}</p>
      </div>
    );
  }

  if (!loading && jobs.length === 0) {
    return (
      <div className="text-center text-gray-500 py-6">
        <p>No jobs found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {loading
        ? Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={index} className="h-36 w-full rounded-lg" />
          ))
        : jobs.map((job) => <JobCard key={job.id} job={job} />)}
    </div>
  );
};

export default JobList;