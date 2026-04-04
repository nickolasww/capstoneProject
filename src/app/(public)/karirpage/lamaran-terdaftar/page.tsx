import {
  ArrowLeftOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { LoginRequiredLamaranModal } from "./_components/LoginRequiredLamaranModal";
import { useJobApplicationsHistoryLogic } from "./_hooks/use-job-applications-history";
import { useEffect, useState } from "react";
import PosisiLamaranModal from "./_components/PosisiLamaranModal";
import { TJobApplicationHistory } from "@/api/karir/type";

const JobApplicationsHistoryPage = () => {
  // Scroll ke atas saat pertama kali halaman dirender
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);
  const {
    showLoginModal,
    setShowLoginModal,
    token,
    isLoading,
    isError,
    applications,
  } = useJobApplicationsHistoryLogic();
  const navigate = useNavigate();
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<TJobApplicationHistory | null>(null);

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

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "hired":
        return (
          <CheckCircleFilled style={{ color: "#16a34a", fontSize: "18px" }} />
        );
      case "rejected":
        return (
          <CloseCircleFilled style={{ color: "#ef4444", fontSize: "18px" }} />
        );
      default:
        return null;
    }
  };

  // Jika sudah login, tampilkan seluruh halaman
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="mx-auto">
        {/* Tombol Back */}
        <button
          type="button"
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-green-700 font-medium text-base"
          onClick={() => navigate("/karirpage")}
        >
          <ArrowLeftOutlined className="text-lg" />
        </button>

        {/* Card List */}
        {isLoading ? (
          <div className="text-center py-12 text-gray-500">
            Memuat data lamaran...
          </div>
        ) : isError ? (
          <div className="text-center py-12 text-red-500">
            Gagal memuat data lamaran.
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Tidak ada riwayat lamaran ditemukan.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 bg-[#EFF8EC] p-6">
            <p className="underline underline-offset-10 text-sm">
              Lamaran yang sudah terkirim
            </p>
            {applications.map((app) => {
              return (
                <div
                  key={app.id || app.application_id}
                  className="bg-[#D9D9D9] rounded-xl p-6"
                >
                  <div className="flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1 w-full">
                        {app.job_title ||
                          app.job_position_title ||
                          app.job_position?.title ||
                          "-"}
                      </h3>
                    </div>

                    <div className="bg-white w-full items-center flex justify-between px-2 py-2 mt-3">
                      <div className="text-sm font-semibold">
                        <span className=" pr-1">
                          {getStatusIcon(app.status)}
                        </span>
                        <span>{getStatusLabel(app.status)}</span>
                      </div>

                      <p className="text-green-600 text-sm font-semibold"
                      onClick={() => {
                        setSelectedApp(app);
                        setShowProgressModal(true);
                      }}
                      >
                        Lihat Kemajuan Lamaran
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <PosisiLamaranModal
        isOpen={showProgressModal}
        onClose={() => {
          setShowProgressModal(false);
          setSelectedApp(null);
        }}
        application={selectedApp || undefined}
      />

      {/* Login Required Modal */}
      <LoginRequiredLamaranModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </section>
  );
};

export default JobApplicationsHistoryPage;
