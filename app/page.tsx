import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-pink-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-purple-700">
              Candidate Portal
            </div>
            <div className="flex space-x-6">
              <Link
                href="/candidate/jobs"
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                Jobs
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center py-20">
        <h1 className="text-5xl font-bold text-purple-700 mb-6">
          Welcome to the Candidate Portal
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Explore job opportunities and manage your profile seamlessly.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/candidate/jobs"
            className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-md hover:bg-purple-50 transition-colors"
          >
            Browse Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}