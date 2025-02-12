"use client";

import React, {   useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getApplicant } from "@/service/jobService"; 
import { Skeleton } from "@/components/ui/skeleton";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";

interface Applicant {
  id: string;
  jobId: string;
  name: string;
  email: string;
  coverLetter: string | null;
  resumeLink: string;
  createdAt: string;
}

const ApplicantModal = ({
  jobId,
  isOpen,
  onClose,
}: {
  jobId: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [applicant, setApplicant] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplicantDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getApplicant(jobId);
      setApplicant(data.applications.applications);
    } catch {
      setError("Failed to fetch job details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogTrigger asChild>
      <Button onClick={fetchApplicantDetails}>View Applicants Details</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-gray-800">
          Applicant Details
        </DialogTitle>
      </DialogHeader>
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-6 w-3/4 rounded-lg bg-gray-200" />
          <Skeleton className="h-4 w-full rounded-lg bg-gray-200" />
          <Skeleton className="h-4 w-full rounded-lg bg-gray-200" />
          <Skeleton className="h-4 w-full rounded-lg bg-gray-200" />
        </div>
      ) : applicant.length > 0 ? (
        applicant.map((app) => (
          <div
            key={app.id}
            className="space-y-4 mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-gray-700">
              <span className="font-semibold text-gray-800">Name:</span> {app.name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-800">Email:</span> {app.email}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-800">Cover Letter:</span>{" "}
              {app.coverLetter || (
                <span className="text-gray-500">Not provided</span>
              )}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-800">Resume Link:</span>{" "}
              <a
                href={app.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {app.resumeLink}
              </a>
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-800">Applied On:</span>{" "}
              {new Date(app.createdAt).toLocaleDateString()}
            </p>
            <hr className="border-gray-200" />
          </div>
        ))
      ) : (
        <p className="text-gray-700">No applicant details found.</p>
      )}
    </DialogContent>
    {error}
  </Dialog>
  );
};

export default ApplicantModal;