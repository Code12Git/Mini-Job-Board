"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getJobById, updateJob } from "@/service/jobService";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { deleteJob } from "@/lib/actions/jobs";

const JobModal = ({ jobId, fetchData }: { jobId: string; fetchData: () => void }) => {
  interface Job {
    title: string;
    company: string;
    category: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
  }

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedJob, setEditedJob] = useState<Job | null>(null);

  const { toast } = useToast();

  const fetchJobDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const jobData = await getJobById(jobId);
      setJob(jobData);
      setEditedJob(jobData);
    } catch {
      setError("Failed to fetch job details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteChangeHandler = async () => {
    try {
      await deleteJob(jobId);
      fetchData();
      toast({ title: "Job Deleted Successfully!" });
    } catch {
      toast({ title: "Failed to delete job", variant: "destructive" });
    }
  };

  const handleEditChange = (field: keyof Job, value: string) => {
    if (editedJob) {
      setEditedJob({ ...editedJob, [field]: value });
    }
  };

  const handleSaveChanges = async () => {
    if (!editedJob) return;

    try {
      await updateJob(jobId, editedJob);
      setJob(editedJob);
      setIsEditing(false);
      fetchData();
      toast({ title: "Job Updated Successfully!" });
    } catch {
      toast({ title: "Failed to update job", variant: "destructive" });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={fetchJobDetails}>View Details</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{job?.title || "Job Details"}</DialogTitle>
          <DialogDescription>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-6 w-3/4 rounded-lg" />
                <Skeleton className="h-4 w-full rounded-lg" />
              </div>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : job ? (
              <div className="space-y-4">
                {Object.keys(job).map((key) => (
                  <Input
                    key={key}
                    value={editedJob ? editedJob[key as keyof Job] : ""}
                    onChange={(e) => handleEditChange(key as keyof Job, e.target.value)}
                    placeholder={key}
                  />
                ))}
                <div className="flex items-center justify-between">
                  {isEditing ? (
                    <Button onClick={handleSaveChanges} className="bg-green-500 hover:bg-green-600">
                      Save Changes
                    </Button>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>Edit</Button>
                  )}
                  <Button onClick={deleteChangeHandler} variant="outline">
                    Delete
                  </Button>
                </div>
              </div>
            ) : (
              <p>No job details available.</p>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default JobModal;
