"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getJobs } from "@/service/jobService";
import JobModal from "@/components/JobModal/JobModal";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ApplicantModal from "@/components/ApplicantModal/ApplicantModal";  

const Page = () => {
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<JobData[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [salaryRangeFilter, setSalaryRangeFilter] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
      setFilteredJobs(data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  useEffect(() => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter && categoryFilter !== "all") {
      filtered = filtered.filter((job) =>
        job.category.toLowerCase().includes(categoryFilter.toLowerCase())
      );
    }

    if (locationFilter && locationFilter !== "all") {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (salaryRangeFilter && salaryRangeFilter !== "all") {
      const [min, max] = salaryRangeFilter.split("-").map(Number);
      filtered = filtered.filter((job) => {
        const [jobMin, jobMax] = job.salary
          .replace(/[^0-9-]/g, "")
          .split("-")
          .map(Number);
        return jobMin >= min && jobMax <= max;
      });
    }

    setFilteredJobs(filtered);
  }, [searchTerm, categoryFilter, locationFilter, salaryRangeFilter, jobs]);

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setLocationFilter("");
    setSalaryRangeFilter("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-8">
      <div className="w-full max-w-7xl space-y-6">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <Input
            type="text"
            placeholder="Search jobs by title, company, category, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Select
            value={categoryFilter}
            onValueChange={(value) => setCategoryFilter(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Software">Software</SelectItem>
              <SelectItem value="Hardware">Hardware</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={locationFilter}
            onValueChange={(value) => setLocationFilter(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="New York">New York</SelectItem>
              <SelectItem value="San Francisco">San Francisco</SelectItem>
              <SelectItem value="Remote">Remote</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={salaryRangeFilter}
            onValueChange={(value) => setSalaryRangeFilter(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Salary Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Salaries</SelectItem>
              <SelectItem value="0-50000">$0 - $50,000</SelectItem>
              <SelectItem value="50000-100000">$50,000 - $100,000</SelectItem>
              <SelectItem value="100000-150000">$100,000 - $150,000</SelectItem>
              <SelectItem value="150000-300000">$150,000 - $300,000</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Clear Filters Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-end"
        >
          <Button
            onClick={clearFilters}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Clear Filters
          </Button>
        </motion.div>

        {/* Job Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          {filteredJobs?.map((job) => (
            <Card
              key={job.id}
              className="w-full p-6 shadow-2xl rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:scale-105 transition-transform duration-300"
            >
              <CardHeader className="pb-4 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <CardTitle className="text-2xl font-extrabold tracking-wide">
                    {job.company}
                  </CardTitle>
                  <CardDescription className="text-lg opacity-80">
                    {job.title}
                  </CardDescription>
                </motion.div>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="text-base leading-relaxed"
                >
                  {job.category}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center text-sm font-medium opacity-90">
                    <span className="flex items-center space-x-2">
                      📍 <span>{job.location}</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      💰 <span>{job.salary}</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-medium opacity-90">
                    <span className="flex items-center space-x-2">
                      ⏳ <span>{job.type}</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      📅{" "}
                      <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <ApplicantModal jobId={job.id} isOpen={true} onClose={() => {}} />
                    <JobModal fetchData={fetchData} jobId={job.id} />
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Page;