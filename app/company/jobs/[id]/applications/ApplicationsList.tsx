"use client";

import { useEffect, useState } from "react";
import ApplicationCard from "./ApplicationCard";

interface Application {
  id: string;
  applicantName: string;
  email: string;
  resumeLink: string;
  status: string;
}

const ApplicationsList = ({ jobId }: { jobId: string }) => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const response = await fetch(`/api/applications?jobId=${jobId}`);
      const data = await response.json();
      setApplications(data);
    };

    fetchApplications();
  }, [jobId]);

  return (
    <div className="grid gap-4">
      {applications.length > 0 ? (
        applications.map((app) => <ApplicationCard key={app.id} application={app} />)
      ) : (
        <p className="text-gray-600">No applications found.</p>
      )}
    </div>
  );
};

export default ApplicationsList;
