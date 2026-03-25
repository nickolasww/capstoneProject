import { SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { LoginRequiredLamaranModal } from './_components/LoginRequiredLamaranModal';
import { useJobApplicationsHistoryLogic } from './_hooks/use-job-applications-history';
import { useEffect } from 'react';

const JobApplicationsHistoryPage = () => {
        // Scroll ke atas saat pertama kali halaman dirender
        useEffect(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }, []);
    const {
        searchQuery,
        setSearchQuery,
        showLoginModal,
        setShowLoginModal,
        token,
        isLoading,
        isError,
        applications,
    } = useJobApplicationsHistoryLogic();
    const navigate = useNavigate();

    // Jika belum login, hanya tampilkan modal
    if (!token) {
        return (
            <LoginRequiredLamaranModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
        );
    }
    const getStatusLabel = (status?: string) => {
  switch (status) {
    case "submitted":
      return "Terkirim";
    case "short_listed":
      return "Tahap Interview";
    case "hired":
      return "Accepted";
    case "rejected":
      return "Rejected";
    default:
      return "Terkirim";
  }
};

    // Jika sudah login, tampilkan seluruh halaman
    return (
        <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Tombol Back */}
                <button
                    type="button"
                    className="mb-6 flex items-center gap-2 text-gray-600 hover:text-green-700 font-medium text-base"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeftOutlined className="text-lg" />
                    Kembali
                </button>

                {/* Search Bar */}
                <div className="mb-8 w-full">
                    <div className="relative w-full md:max-w-xl">
                        <input
                            type="text"
                            placeholder="Cari Lamaran"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-5 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400 font-medium"
                        />
                        <SearchOutlined className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                </div>

                {/* Card List */}
                {isLoading ? (
                    <div className="text-center py-12 text-gray-500">Memuat data lamaran...</div>
                ) : isError ? (
                    <div className="text-center py-12 text-red-500">Gagal memuat data lamaran.</div>
                ) : applications.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">Tidak ada riwayat lamaran ditemukan.</div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {applications.map((app) => {
                            const slug = app.job_position_slug || app.job_slug || app.job_id || app.job_position_id || app.job_title?.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                            return (
                                <div
                                    key={app.id || app.application_id}
                                    className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm cursor-pointer hover:shadow-md transition"
                                    onClick={() => slug && navigate(`/karirpage/Joblist/${slug}`, { state: { applied: true } })}
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">{app.job_title || app.job_position_title || app.job_position?.title || '-'}</h3>
                                            <div className="text-gray-600 text-sm mb-1">{app.email}</div>
                                            <div className="text-gray-500 text-xs">Status: {getStatusLabel(app.status)}</div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1 min-w-40">
                                            <div className="text-xs text-gray-500"><span className="font-medium">Dikirim:</span> {app.applied_at ? new Date(app.applied_at).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'}</div>
                                            <div className="text-xs text-gray-500"><span className="font-medium">Interview:</span> {app.interview_at ? new Date(app.interview_at).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Login Required Modal */}
            <LoginRequiredLamaranModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
        </section>
    );
};

export default JobApplicationsHistoryPage;