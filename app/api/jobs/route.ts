import { createJob, deleteJob, getJobById, getJobs, updateJob } from "@/lib/actions/jobs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("id");
    if (jobId) {
      const job = await getJobById(jobId);
      return NextResponse.json(job, { status: 200 });
    } else {
      const jobs = await getJobs();
      return NextResponse.json(jobs, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    console.log(formData)
    const job = await createJob(formData);
    return NextResponse.json({details:job}, { status: 201 });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("id");
    if (!jobId) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }


    const formData = await req.formData();
    const updatedJob = await updateJob(jobId, formData);
    return NextResponse.json(updatedJob, { status: 200 });

  } catch (error:unknown) {
    console.error("Error updating job:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to update job", details: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("id");

    if (!jobId) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    const data = await deleteJob(jobId);
    if(!data){
        return NextResponse.json(
            { message: "Job not found" },
            { status: 404 }
        );
    }
    return NextResponse.json(
      { data,message: "Job deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
}
