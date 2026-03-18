import { useState } from "react";
import { SearchOutlined, ShareAltOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import LogoBas from "@/assets/logo PT BAS.png";
import { useDebounce } from "@/app/_hooks/use-debounce";
import LoadingPage, { Spinner } from "@/app/loading";
import ErrorPage from "@/app/error";
import { useJobPositionsQuery } from "./_hooks/use-job-positions-query";
import { JobApplicationModal } from "./_components/JobApplicationModal";
import { LoginRequiredModal } from "./_components/LoginRequiredModal";
import { getAccessToken } from "@/libs/localstorage";

const JobList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJobId, setSelectedJobId] = useState<string | number | null>(null);
  const [selectedJobTitle, setSelectedJobTitle] = useState<string>("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const debouncedSearch = useDebounce(searchQuery);
  
  // Fetch job positions with infinite query
  const {
    jobs,
    totalJobs,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useJobPositionsQuery({ 
    search: debouncedSearch, 
    limit: 8
  });

  // Show loading page on initial load
  if (isLoading) {
    return <LoadingPage />;
  }

  // Show error page on error
  if (isError) {
    return <ErrorPage />;
  }

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
            <SearchOutlined className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Header Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 w-full gap-4">
          <h2 className="text-lg font-bold text-[#48892F]">
            ({totalJobs}) pekerjaan tersedia
          </h2>
          <div className="w-full sm:w-auto flex justify-end">
             <button className="text-gray-900 font-semibold border-b-2 border-gray-800 pb-1 text-base cursor-pointer hover:text-[#48892F] hover:border-[#48892F] transition-colors">
              Lamaran Terdaftar
            </button>
          </div>
        </div>

        {/* Empty State */}
        {jobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada pekerjaan tersedia</p>
            {debouncedSearch && (
              <p className="text-gray-400 text-sm mt-2">Coba kata kunci pencarian lain</p>
            )}
          </div>
        )}

        {/* Job Cards Grid */}
        {jobs.length > 0 && (
          <>
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
                    <ShareAltOutlined className="w-5 h-5" />
                 </button>
              </div>

              {/* Job Info */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-gray-600 text-sm font-medium capitalize">
                    {job.employment_type.replace('_', ' ')}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600 text-sm">
                    {new Date(job.posted_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <EnvironmentOutlined className="w-4 h-4 mr-1.5" />
                  <span>{job.location}</span>
                </div>
              </div>

              <hr className="border-gray-100 my-4" />

              {/* Actions */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    const slug = typeof job.slug === 'string' ? job.slug.trim() : '';
                    const fallbackSlug = typeof job.title === 'string'
                      ? job.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
                      : '';
                    const nextSlug = slug || fallbackSlug;

                    if (!nextSlug) {
                      return;
                    }

                    navigate(`/karirpage/Joblist/${nextSlug}`);
                  }}
                  className="px-8 py-3 bg-gray-50 text-gray-600 rounded-md font-medium hover:bg-gray-100 transition-colors text-sm border border-transparent hover:border-gray-200"
                >
                  Lihat Detail
                </button>
                <button
                  onClick={() => {
                    const token = getAccessToken();
                    if (!token) {
                      setSelectedJobTitle(job.title);
                      setShowLoginModal(true);
                      return;
                    }
                    setSelectedJobId(job.id);
                    setSelectedJobTitle(job.title);
                  }}
                  className="px-12 py-3 bg-[#48892F] text-white rounded-md font-medium hover:bg-[#3f7a29] transition-colors text-sm"
                >
                  Lamar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasNextPage && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="px-8 py-3 bg-[#48892F] text-white rounded-md font-medium hover:bg-[#3f7a29] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isFetchingNextPage ? (
                <>
                  <Spinner size="small" color="#ffffff" />
                  <span>Memuat...</span>
                </>
              ) : (
                "Muat Lebih Banyak"
              )}
            </button>
          </div>
        )}
      </>
    )}
      </div>

      {/* Login Required Modal */}
      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        jobTitle={selectedJobTitle}
      />

      {/* Application Modal */}
      {selectedJobId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 max-h-screen overflow-y-auto py-8">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedJobId(null);
                setSelectedJobTitle("");
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
            >
              <span className="text-2xl">×</span>
            </button>

            {/* Header */}
            <div className="px-8 pt-8 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                Lamar Posisi: <span className="text-[#48892F]">{selectedJobTitle}</span>
              </h2>
              <p className="text-gray-600 text-sm mt-1">Lengkapi form di bawah untuk melamar posisi ini</p>
            </div>

            {/* Form */}
            <div className="px-8 py-6 max-h-[calc(100vh-300px)] overflow-y-auto">
              <JobApplicationModal
                jobPositionId={selectedJobId}
                jobTitle={selectedJobTitle}
                onSubmitSuccess={() => {
                  setSelectedJobId(null);
                  setSelectedJobTitle("");
                  // You can show a success message here
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default JobList;
