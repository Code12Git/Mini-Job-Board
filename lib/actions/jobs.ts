"use server";

import prisma from "../prisma";
import { Prisma, Job } from "@prisma/client";
export async function getJobs() {
  return prisma.job.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: { applications: true },
  });
}


export async function getJobById(id: string) {
  return prisma.job.findUnique({
    where: {
      id,
    },
  });
}

export async function createJob(formData: FormData): Promise<Job> {
  try {
    const formValues: Record<string, FormDataEntryValue> =
      Object.fromEntries(formData);

    const title = formValues.title?.toString();
    const description = formValues.description?.toString();
    const company = formValues.company?.toString();
    const location = formValues.location?.toString();
    const url = formValues.url?.toString() || null;
    const category = formValues.category?.toString() || "";
    const type = formValues.type?.toString() || "";
    const salary = formValues.salary?.toString() || "";
    const requirements = formValues.requirements
      ? formValues.requirements
          .toString()
          .replace(/^\[|\]$/g, "")
          .split(",")
          .map((str) => str.trim())
      : [];

    const responsibilities = formValues.responsibilities
      ? formValues.responsibilities
          .toString()
          .replace(/^\[|\]$/g, "")
          .split(",")
          .map((str) => str.trim())
      : [];
    if (!title || !description || !company || !location || !type) {
      throw new Error(
        "All required fields (title, description, company, location,type) must be provided."
      );
    }

    const jobData: Prisma.JobCreateInput = {
      title,
      description,
      company,
      location,
      url,
      category,
      type,
      salary,
      requirements,
      responsibilities,
    };

    const job = await prisma.job.create({ data: jobData });
    return job;
  } catch (error) {
    console.error("Error creating job:", error);
    throw new Error("Failed to create job");
  }
}

export async function updateJob(
  id: string,
  formData: FormData
): Promise<Prisma.JobUpdateInput> {
  try {
    const formValues: Record<string, FormDataEntryValue> =
      Object.fromEntries(formData);
    const title = formValues.title as string;
    const description = formValues.description as string;
    const company = formValues.company as string;
    const location = formValues.location as string;
    const url = formValues.url as string;
    const category = formValues.category as string;
    const type = formValues.type as string;
    const salary = formValues.salary as string;
    const requirements = formValues.requirements
      ? formValues.requirements
          .toString()
          .replace(/^\[|\]$/g, "")
          .split(",")
          .map((str) => str.trim())
      : [];

    const responsibilities =
      formValues.responsibilities
        ?.toString()
        .replace(/^\[|\]$/g, "")
        .split(",")
        .map((str) => str.trim()) || [];

    if (!title || !description || !company || !location) {
      throw new Error("All fields are required.");
    }

    const jobData: Prisma.JobUpdateInput = {
      title,
      description,
      company,
      location,
      url,
      category,
      responsibilities,
      requirements,
      salary,
      type,
    };


    const updatedJob = await prisma.job.update({
      where: {
        id,
      },
      data: jobData,
    });

    return updatedJob;
  } catch (error) {
    console.error("Error updating job:", error);
    throw new Error("Failed to update job");
  }
}

export async function deleteJob(id: string): Promise<Job> {
  try {
    const data = await prisma.job.delete({
      where: {
        id,
      },
    });
    if (!data) {
      throw new Error("Job not found");
    }

    return data;
  } catch (error) {
    console.error("Error deleting job:", error);
    throw new Error("Failed to delete job");
  }
}
