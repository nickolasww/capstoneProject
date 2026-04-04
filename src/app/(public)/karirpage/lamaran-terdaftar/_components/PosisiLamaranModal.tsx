import {
  CheckCircleFilled,
  CloseCircleFilled,
  ClockCircleFilled,
  CloseOutlined,
} from "@ant-design/icons";
import logo from "@/assets/logo PT BAS.png"

const STEPS = [
  { key: "pengumuman", label: "Pengumuman" },
  { key: "wawancara", label: "Wawancara" },
  { key: "pemeriksaan_berkas", label: "Pemeriksaan berkas" },
];

const getActiveStepIndex = (status?: string) => {
  switch (status) {
    case "submitted":
      return 2; // pemeriksaan berkas
    case "short_listed":
      return 1; // wawancara
    case "hired":
    case "rejected":
      return 0; // pengumuman
    default:
      return 2;
  }
};

const isFinalRejected = (status?: string) => status === "rejected";
const isFinalHired = (status?: string) => status === "hired";

const formatInterviewDate = (dateStr?: string | null) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year}; ${hours}:${minutes} WIB`;
};

const StepIcon = ({
  stepIndex,
  activeStep,
  status,
}: {
  stepIndex: number;
  activeStep: number;
  status?: string;
}) => {
  const isActive = stepIndex === activeStep;
  const isPast = stepIndex > activeStep; // index lebih besar = lebih awal = sudah dilewati
  const isFuture = stepIndex < activeStep; // index lebih kecil = lebih akhir = belum dicapai

  if (isFuture) {
    return (
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          backgroundColor: "#9ca3af",
        }}
      />
    );
  }

  // Sudah dilewati → centang hijau
  if (isPast) {
    return <CheckCircleFilled style={{ color: "#16a34a", fontSize: "22px" }} />;
  }

  // Sedang aktif
  if (isActive) {
    // Hasil final rejected
    if (isFinalRejected(status)) {
      return <CloseCircleFilled style={{ color: "#ef4444", fontSize: "22px" }} />;
    }
    // Hasil final hired
    if (isFinalHired(status)) {
      return <CheckCircleFilled style={{ color: "#16a34a", fontSize: "22px" }} />;
    }
    // Sedang menunggu (submitted / short_listed)
    return (
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          backgroundColor: "#16a34a",
          border: "3px solid white",
          boxShadow: "0 0 0 2px #16a34a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ClockCircleFilled style={{ color: "white", fontSize: "13px" }} />
      </div>
    );
  }

  return null;
};

const PosisiLamaranModal = ({
  isOpen,
  onClose,
  application,
}: {
  isOpen: boolean;
  onClose: () => void;
  application?: {
    application_id?: string;
    job_title?: string;
    status?: string;
    applied_at?: string;
    updated_at?: string;
    interview_at?: string | null;
  };
  companyLogo?: string;
}) => {
  if (!isOpen) return null;

  const activeStep = getActiveStepIndex(application?.status);
  const interviewDate = formatInterviewDate(application?.interview_at);

  const reversedSteps = [...STEPS].reverse();

  const getStepSubtitle = (stepKey: string, stepIndex: number) => {
    if (stepKey === "pemeriksaan_berkas" && stepIndex === activeStep) {
      return "Berkas sedang diperiksa";
    }
    // Wawancara → tampilkan tanggal jika ada
    if (stepKey === "wawancara" && interviewDate) {
      return interviewDate;
    }
    // Pengumuman aktif (hired/rejected) → info
    if (stepKey === "pengumuman" && stepIndex === activeStep) {
      if (isFinalHired(application?.status)) return "Selamat! Anda diterima";
      if (isFinalRejected(application?.status)) return "Mohon maaf, lamaran tidak dilanjutkan";
    }
    return null;
  };

  const getStepTextColor = (stepIndex: number) => {
    const isActive = stepIndex === activeStep;
    const isPast = stepIndex > activeStep;
    const isFuture = stepIndex < activeStep;

    if (isFuture) return "#9ca3af"; 
    if (isPast) return "#16a34a";
    if (isActive) {
      if (isFinalRejected(application?.status)) return "#ef4444";
      return "#16a34a";
    }
    return "#9ca3af";
  };

  return (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4"
    style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    onClick={onClose}
  >
    {/* Modal Box */}
    <div
      className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-lg md:max-w-xl relative overflow-y-auto max-h-[90vh] p-5 sm:p-8 md:p-10"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <button
          className="bg-blue-500 text-white font-semibold rounded-lg px-3 py-1 text-xs sm:px-4 sm:py-3 sm:text-sm"
        >
          Kemajuan Lamaran
        </button>
        <button
          onClick={onClose}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-700 text-white text-sm sm:text-base shrink-0"
        >
          <CloseOutlined />
        </button>
      </div>

      {/* Company + Job Title */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <img
            src={logo}
            alt="logo"
            className="w-10 h-10 sm:w-14 sm:h-14 object-contain shrink-0"
          />
        <h2 className="text-base sm:text-xl md:text-2xl font-bold m-0 leading-snug wrap-break-words">
          {application?.job_title || "Posisi Lamaran Kerja"}
        </h2>
      </div>

      {/* Timeline */}
      <div className="bg-green-50 rounded-xl p-4 sm:p-6">
        {reversedSteps.map((step, visualIndex) => {
          const originalIndex = STEPS.findIndex((s) => s.key === step.key);
          const subtitle = getStepSubtitle(step.key, originalIndex);
          const textColor = getStepTextColor(originalIndex);
          const isLast = visualIndex === reversedSteps.length - 1;

          return (
            <div key={step.key} className="flex gap-3 sm:gap-4">
              {/* Icon + garis vertikal */}
              <div className="flex flex-col items-center">
                <div className="mt-0.5">
                  <StepIcon
                    stepIndex={originalIndex}
                    activeStep={activeStep}
                    status={application?.status}
                  />
                </div>
                {!isLast && (
                  <div
                    className="w-0.5 flex-1 my-1"
                    style={{
                      minHeight: "28px",
                      backgroundColor:
                        originalIndex - 1 >= activeStep ? "#16a34a" : "#d1d5db",
                    }}
                  />
                )}
              </div>

              <div className={`${isLast ? "pb-0" : "pb-4 sm:pb-5"}`}>
                <p
                  className="m-0 text-sm sm:text-base leading-snug"
                  style={{
                    fontWeight: originalIndex >= activeStep ? 700 : 400,
                    color: textColor,
                  }}
                >
                  {step.label}
                </p>
                {subtitle && (
                  <p className="mt-1 text-xs sm:text-sm text-gray-500 leading-snug">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
};

export default PosisiLamaranModal;