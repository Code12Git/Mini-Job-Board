"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, DollarSign, Clock } from "lucide-react";
import { getJobById } from "@/service/jobService";
import { useRouter } from "next/navigation";

// Define the Job type
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  createdAt: string;
  category: string;
}

const JobDetails = ({ jobId }: { jobId: string }) => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getJobById(jobId);
        if (!response) {
          throw new Error("Job not found");
        }
        setJob(response);
      } catch (error) {
        console.error("Error fetching job:", error);
        setError("Failed to fetch job details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jobId]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4 rounded-lg" />
        <Skeleton className="h-6 w-1/2 rounded-lg" />
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-full rounded-lg" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!job) {
    return <p className="text-gray-500 text-center">Job not found.</p>;
  }

  const handleApplyNow = () => {
    router.push(`/candidate/apply/${job.id}`);
  };

  return (
    <Card className="shadow-lg p-6">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{job.title}</CardTitle>
        <p className="text-gray-500 text-lg">{job.company}</p>
        <Badge variant="outline" className="mt-2 text-sm">
          {job.type}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-4 text-gray-700">
          <p className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-500" /> {job.location}
          </p>
          <p className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-gray-500" /> {job.salary}
          </p>
          <p className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-500" />{" "}
            {new Date(job.createdAt).toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-gray-600">
            <span className="font-semibold">Category:</span> {job.category}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Job Description</h3>
          <p className="text-gray-600">{job.description}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Responsibilities</h3>
          <ul className="list-disc list-inside text-gray-600">
            {job.responsibilities.map((res, index) => (
              <li key={index}>{res}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Requirements</h3>
          <ul className="list-disc list-inside text-gray-600">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <Button onClick={handleApplyNow} className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
          Apply Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobDetails;