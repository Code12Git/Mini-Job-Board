"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { createApplication } from "@/service/candidateService";


const ApplyForm = ({ jobId }: { jobId: string }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resumeLink: "",
    coverLetter: "",
    jobId:jobId
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
     try {
      const response = await createApplication(formData, jobId);
      console.log("Application Data:", response);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 2000);
    } catch (err) {
      console.error("Error submitting application:", err);
      setError("Failed to submit application. Please try again.");
      setLoading(false);
    }
  };


  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="shadow-lg p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Apply for Job</CardTitle>
          <p className="text-gray-500 text-sm">Job ID: {jobId}</p>
        </CardHeader>

        <CardContent>
          {success ? (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="text-green-600 font-semibold text-center">
              ✅ Application Submitted Successfully!
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <label className="block text-gray-600">Full Name</label>
                <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <label className="block text-gray-600">Email Address</label>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <label className="block text-gray-600">ResumeLink (Link)</label>
                <Input type="url" name="resumeLink" value={formData.resumeLink} onChange={handleChange} required />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <label className="block text-gray-600">Cover Letter (Optional)</label>
                <Textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  {loading ? <Loader2 className="animate-spin mr-2" /> : "Submit Application"}
                </Button>
              </motion.div>
            </form>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ApplyForm;
