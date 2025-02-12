"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MapPin, DollarSign, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  createdAt: string;
}

const JobCard = ({ job }: { job: Job }) => {
  const router = useRouter();

  const handleApplyNow = () => {
    router.push(`/candidate/jobs/${job.id}`);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="shadow-lg hover:shadow-2xl transition-all cursor-pointer">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{job.title}</CardTitle>
          <p className="text-gray-500 text-sm">{job.company}</p>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-4 h-4 text-gray-500" />
            {job.location}
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <DollarSign className="w-4 h-4 text-gray-500" />
            {job.salary}
          </p>
          <p className="flex items-center gap-2 text-gray-500 text-sm">
            <Clock className="w-4 h-4 text-gray-500" />
            {new Date(job.createdAt).toLocaleString()}{" "}
          </p>
          <Button
            onClick={handleApplyNow}
            className="w-full mt-3 bg-purple-600 hover:bg-purple-700"
          >
            Apply Now
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JobCard;
