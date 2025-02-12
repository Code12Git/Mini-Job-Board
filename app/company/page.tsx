import Link from "next/link";

const page = () => {

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-cyan-50">
       <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-blue-700">
              Company Portal
            </div>
            <div className="flex space-x-6">
              <Link
                href="/company/jobs"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Jobs
              </Link>
              
            </div>
          </div>
        </div>
      </nav>
          
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-5xl font-bold text-blue-700 mb-6">
            Welcome to the Company Portal
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Manage job postings and view applications seamlessly.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/company/jobs/new"
              className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-md hover:bg-purple-50 transition-colors"
            >
              Create Jobs
            </Link>
            <Link
              href="/company/jobs"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-50 transition-colors"
            >
              View Jobs
            </Link>
          </div>
          </div>
    </div>
  );
};

export default page;