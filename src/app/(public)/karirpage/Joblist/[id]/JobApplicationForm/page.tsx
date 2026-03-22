import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { getAccessToken } from "@/libs/localstorage";
import { JobApplicationForm } from "../../_components/form";
import { LoginRequiredModal } from "../../_components/LoginRequiredModal";
import { ArrowLeftOutlined } from "@ant-design/icons";

const JobApplicationFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [jobTitle] = useState(() => {
    if (location.state && location.state.jobTitle) {
      return location.state.jobTitle;
    }
    return "pekerjaan";
  });

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  // Breadcrumbs array (Karir > Daftar Pekerjaan > Judul/Detail)
  const breadcrumbs = useMemo(() => [
    { label: 'Karir', path: '/karirpage' },
    { label: 'Daftar Pekerjaan', path: '/karirpage/Joblist' },
    { label: jobTitle || 'Detail', path: `/karirpage/Joblist/${id}` },
  ], [jobTitle, id]);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setShowLoginModal(true);
    }
  }, []);

  const handleCloseModal = () => {
    setShowLoginModal(false);
    navigate(-1);
  };

  if (showLoginModal) {
    return (
      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={handleCloseModal}
        jobTitle={jobTitle}
      />
    );
  }

  return (
    <section className="min-h-screen bg-white py-32 px-4">
      {/* Title & Back Button */}
      <div className="flex items-center gap-2 mb-2">
        <button
          type="button"
          aria-label="Kembali"
          onClick={() => navigate(-1)}
          className="mr-2 text-black hover:text-green-700 text-xl flex items-center justify-center"
        >
          <ArrowLeftOutlined />
        </button>
        <h1 className="text-3xl font-bold m-0 p-0">{jobTitle}</h1>
      </div>
         {/* Breadcrumbs ala detail page */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-[#7B8875] mb-6">
        {breadcrumbs.map((crumb, idx) => (
          <span key={crumb.path} className="flex items-center">
            {idx > 0 && <span className="mr-1">/</span>}
            {idx < breadcrumbs.length - 1 ? (
              <Link to={crumb.path} className="hover:text-[#48892F] ">{crumb.label}</Link>
            ) : (
              <span className="font-semibold text-[#48892F]">{crumb.label}</span>
            )}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <JobApplicationForm
          jobPositionId={id || ""}
          onSubmitSuccess={() => navigate("/karirpage/Joblist")}
          onAuthRequired={() => setShowLoginModal(true)}
        />
      </div>
    </section>
  );
};

export default JobApplicationFormPage;
