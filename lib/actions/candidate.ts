import { PrismaClient, Application } from "@prisma/client";
import { Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export async function createApplication(
  jobId: string,
  formData: FormData
): Promise<Application> {
  try {
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const coverLetter = formData.get("coverLetter")?.toString();
    const resumeLink = formData.get("resumeLink")?.toString();

    if (!name || !email || !resumeLink) {
      throw new Error(
        "All required fields (name, email, resumeLink) must be provided."
      );
    }
    console.log( name,email,resumeLink );
    const jobExists = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!jobExists) {
      throw new Error("Job not found.");
    }

    const applicationData: Prisma.ApplicationCreateInput = {
      name,
      email,
      coverLetter,
      resumeLink,
      job: {
        connect: { id: jobId },
      },
    };

    const application = await prisma.application.create({
      data: applicationData,
    });

    return application;
  } catch (error) {
    console.error("Error creating application:", error);
    throw new Error("Failed to create application");
  }
}

export const getApplicationsByJobId = async (id: string) => {
  try {
    const applications = await prisma.job.findUnique({
      where: { id },
      include: { applications: true },
    });
     return applications;
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw new Error("Failed to fetch applications");
  }
};
