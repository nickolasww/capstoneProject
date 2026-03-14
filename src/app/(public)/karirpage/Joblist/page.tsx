import { useState } from "react";
import { SearchOutlined, ShareAltOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import LogoBas from "@/assets/logo PT BAS.png";
import { useDebounce } from "@/app/_hooks/use-debounce";
import LoadingPage, { Spinner } from "@/app/loading";
import ErrorPage from "@/app/error";
import { useJobPositionsQuery } from "./_hooks/use-job-positions-query";

const JobList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
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
                  onClick={() => navigate('/auth/login')}
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
    </section>
  );
};

export default JobList;
