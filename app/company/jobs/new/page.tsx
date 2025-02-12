"use client";
import { createJob } from "@/service/jobService";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  title: string;
  description: string;
  category: string;
  company: string;
  location: string;
  type: string;
  url: string;
  salary: string;
}

const JobPostForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    location: "",
    company: "",
    salary: "",
    url: "",
    type: "",
  });
  const { toast } = useToast();

  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null); // Clear error when user starts typing
  };

  const validateForm = () => {
    const {
      title,
      company,
      description,
      category,
      salary,
      type,
      location,
      url,
    } = formData;

    if (!title) {
      setError("Please provide a valid job title");
      return false;
    }
    if (!company) {
      setError("Please provide a valid company name");
      return false;
    }
    if (!description) {
      setError("Please provide a valid description");
      return false;
    }
    if (!category) {
      setError("Please provide a valid category");
      return false;
    }
    if (!salary) {
      setError("Please provide a valid salary range");
      return false;
    }
    if (!type) {
      setError("Please provide a valid job type");
      return false;
    }
    if (!location) {
      setError("Please provide a valid location");
      return false;
    }
    if (!url) {
      setError("Please provide a valid URL");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await createJob(formData);
      setLoading(false);
      setError(null);
      toast({
        title: "Job Created Successfully",
      });
      router.push("/company/jobs");
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        company: "",
        salary: "",
        url: "",
        type: "",
      });
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error) {
        if (error instanceof Error && (error as { response?: { data?: { error?: string } } }).response?.data?.error) {
          setError((error as any).response.data.error);
        } else {
          setError("Failed to create job. Please try again.");
        }
      } else {
        setError("Failed to create job. Please try again.");
      }
      console.error("Error creating job:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 to-pink-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">
          Create a New Job Post
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter job title"
              required
            />
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <label className="block text-sm font-medium text-gray-700">
              Job Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter job description"
              required
            />
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <label className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter company name"
              required
            />
          </motion.div>

          {/* Category */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <label className="block text-sm font-medium text-gray-700">
              Job Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Product Management">Product Management</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
            </select>
          </motion.div>

          {/* Type */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <label className="block text-sm font-medium text-gray-700">
              Job Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="" disabled>
                Select a type
              </option>
              <option value="Full Time">Full Time</option>
              <option value="Remote">Remote</option>
              <option value="Part-time">Part-Time</option>
              <option value="Contract">Contract</option>
            </select>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter location"
              required
            />
          </motion.div>

          {/* Salary Range */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <label className="block text-sm font-medium text-gray-700">
              Salary Range
            </label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter salary range"
              required
            />
          </motion.div>

          {/* URL */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <label className="block text-sm font-medium text-gray-700">
              Job URL
            </label>
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter job URL"
              required
            />
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex justify-center"
          >
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : "Create Job Post"}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default JobPostForm;
