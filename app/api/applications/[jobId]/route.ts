import { createApplication,  getApplicationsByJobId } from "@/lib/actions/candidate";
import { NextResponse } from "next/server";


export async function POST(req: Request, { params }: { params: { jobId: string } }) {
  try {
    const { jobId } = params;
    console.log(jobId)
    if (!jobId) {
      return NextResponse.json(
        { error: "jobId is required" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    if (!formData || formData.entries().next().done) {
      return NextResponse.json(
        { error: "Form data is required" },
        { status: 400 }
      );
    }

    const application = await createApplication(jobId, formData);

    return NextResponse.json({ details: application }, { status: 201 });
  } catch (error) {
    console.error("Error creating application:", error);

    const errorMessage = error instanceof Error ? error.message : "Failed to create application";

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
  

export async function GET(req: Request, { params }: { params: { id: string }}) {
  try {
    const { jobId } = params;


    if (!jobId) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }


    const applications = await getApplicationsByJobId(jobId);

 
    if (!applications || applications.length === 0) {
      return NextResponse.json(
        { error: "No applications found for this job" },
        { status: 404 }
      );
    }

    return NextResponse.json({ applications }, { status: 200 });
  } catch (error) {
    console.error("Error fetching applications:", error);

    return NextResponse.json(
      { error: "Failed to fetch applications", details: error.message },
      { status: 500 }
    );
  }
}