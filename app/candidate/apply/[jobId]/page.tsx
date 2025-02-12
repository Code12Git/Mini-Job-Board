import ApplyForm from "./ApplyForm";

const ApplyPage = ({ params }: { params: { jobId: string } }) => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <ApplyForm jobId={params.jobId} />
    </div>
  );
};

export default ApplyPage;
