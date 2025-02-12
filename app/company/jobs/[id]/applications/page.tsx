import ApplicationsList from "./ApplicationsList";

const ApplicationsPage = ({ params }: { params: { id: string } }) => {
  const jobId = params.id;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Applications for Job ID: {jobId}</h1>
      <ApplicationsList jobId={jobId} />
    </div>
  );
};

export default ApplicationsPage;
