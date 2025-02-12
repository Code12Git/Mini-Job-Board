interface ApplicationProps {
    application: {
      id: string;
      applicantName: string;
      email: string;
      resumeLink: string;
      status: string;
    };
  }
  
  const ApplicationCard = ({ application }: ApplicationProps) => {
    return (
      <div className="border p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold">{application.applicantName}</h2>
        <p className="text-sm text-gray-600">{application.email}</p>
        <a
          href={application.resumeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Resume
        </a>
        <p className="mt-2 text-sm font-semibold">
          Status: <span className="text-purple-600">{application.status}</span>
        </p>
      </div>
    );
  };
  
  export default ApplicationCard;
  