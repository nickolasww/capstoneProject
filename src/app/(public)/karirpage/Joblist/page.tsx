import { useState } from "react";
import { Link } from "react-router-dom";

const JobList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // Sample job data - you can replace this with actual data from API
  const jobs = [
    {
      id: 1,
      company: "PT. BUKIT AURUMN SEJAHTERA",
      title: "Lorem Ipsum",
      location: "Jakarta",
      salary: "Rp 5.000.000",
    },
    {
      id: 2,
      company: "PT. BUKIT AURUMN SEJAHTERA",
      title: "Lorem Ipsum",
      location: "Bandung",
      salary: "Rp 6.000.000",
    },
    {
      id: 3,
      company: "PT. BUKIT AURUMN SEJAHTERA",
      title: "Lorem Ipsum",
      location: "Surabaya",
      salary: "Rp 5.500.000",
    },
    {
      id: 4,
      company: "PT. BUKIT AURUMN SEJAHTERA",
      title: "Lorem Ipsum",
      location: "Yogyakarta",
      salary: "Rp 4.800.000",
    },
    {
      id: 5,
      company: "PT. BUKIT AURUMN SEJAHTERA",
      title: "Lorem Ipsum",
      location: "Semarang",
      salary: "Rp 5.200.000",
    },
    {
      id: 6,
      company: "PT. BUKIT AURUMN SEJAHTERA",
      title: "Lorem Ipsum",
      location: "Malang",
      salary: "Rp 4.900.000",
    },
  ];

  return (
    <>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                (101) Pekerjaan tersedia
              </h2>
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-auto flex-1 md:max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari Pekerjaan"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <Link
              to="#"
              className="text-blue-600 hover:text-blue-700 font-semibold whitespace-nowrap"
            >
              Liamanan Terkirim?
            </Link>
          </div>

          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-200"
              >
                {/* Company Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      N
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{job.company}</h3>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Job Title */}
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  {job.title}
                </h4>

                {/* Job Details */}
                <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{job.salary}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-gray-300">
                    Lihat detail
                  </button>
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    Lamar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-12 text-center">
            <Link
              to="#"
              className="inline-block text-blue-600 hover:text-blue-700 font-semibold"
            >
              Tampilkan selain nya →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobList;
