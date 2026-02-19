import { useState } from "react";
// import { Link } from "react-router-dom";
import { Search, Share2, MapPin } from "lucide-react";
import LogoBas from "@/assets/logo PT BAS.png";

const JobList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample job data
  const jobs = [
    {
      id: 1,
      company: "PT. Bukit Aurumn Sejahtera",
      title: "Supervisor Headquarter",
      location: "Kediri, Jawa Timur",
    },
    {
      id: 2,
      company: "PT. Bukit Aurumn Sejahtera",
      title: "Supervisor Headquarter",
      location: "Kediri, Jawa Timur",
    },
    {
      id: 3,
      company: "PT. Bukit Aurumn Sejahtera",
      title: "Supervisor Headquarter",
      location: "Kediri, Jawa Timur",
    },
    {
      id: 4,
      company: "PT. Bukit Aurumn Sejahtera",
      title: "Supervisor Headquarter",
      location: "Kediri, Jawa Timur",
    },
    {
      id: 5,
      company: "PT. Bukit Aurumn Sejahtera",
      title: "Supervisor Headquarter",
      location: "Kediri, Jawa Timur",
    },
    {
      id: 6,
      company: "PT. Bukit Aurumn Sejahtera",
      title: "Supervisor Headquarter",
      location: "Kediri, Jawa Timur",
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="mb-8 w-full">
          <div className="relative w-full md:max-w-xl">
            <input
              type="text"
              placeholder="Cari Pekerjaan"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400 font-medium"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Header Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 w-full gap-4">
          <h2 className="text-lg font-bold text-[#48892F]">
            (180) pekerjaan tersedia
          </h2>
          <div className="w-full sm:w-auto flex justify-end">
             <button className="text-gray-900 font-semibold border-b-2 border-gray-800 pb-1 text-base">
              Lamaran Terdaftar
            </button>
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              {/* Card Header: Logo & Share */}
              <div className="flex justify-between items-start mb-4">
                 {/* Logo */}
                 <div className="flex items-center gap-3">
                    <div className="w-12 h-12 relative flex items-center justify-center">
                        <img src={LogoBas} alt="PT BAS Logo" className="w-full h-full object-contain" />
                    </div>
                 </div>
                 <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                 </button>
              </div>

              {/* Job Info */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
                <p className="text-gray-600 text-sm mb-3 font-medium">{job.company}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin className="w-4 h-4 mr-1.5" />
                  <span>{job.location}</span>
                </div>
              </div>

              <hr className="border-gray-100 my-4" />

              {/* Actions */}
              <div className="flex items-center justify-between">
                <button className="px-8 py-3 bg-gray-50 text-gray-600 rounded-md font-medium hover:bg-gray-100 transition-colors text-sm border border-transparent hover:border-gray-200">
                  Lihat Detail
                </button>
                <button className="px-12 py-3 bg-[#48892F] text-white rounded-md font-medium hover:bg-[#3f7a29] transition-colors text-sm">
                  Lamar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobList;
