import JobList from "./JobList";

const JobListingsPage = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Find Your Dream Job
      </h1>
      <JobList />
    </div>
  );
};

export default JobListingsPage;
