export default function TenderManagementPage() {
  return (
    <div
      className="
        p-4 sm:p-6 lg:p-8  
      "
    >
      <div className="mb-4 sm:mb-6">
        <p
          className="
            text-xs sm:text-sm   
            text-gray-600
          "
        >
          Admin - Tender Management
        </p>
      </div>
      <div className="mb-6 sm:mb-8">
        <h1
          className="
            text-2xl sm:text-3xl
            font-bold text-gray-900 mb-2
          "
        >
          Tender Management
        </h1>
        <p
          className="
            text-sm sm:text-base
            text-gray-600
          "
        >
          Kelola data tender dan proyek
        </p>
      </div>
      <div
        className="
          bg-white rounded-lg shadow-sm
          p-6 sm:p-8   // 🔥 padding adaptif
        "
      >
        <div className="text-center text-gray-500">
          <svg
            className="
              w-12 h-12 sm:w-16 sm:h-16
              mx-auto mb-4 text-gray-300
            "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>

          <p className="text-base sm:text-lg">Halaman Tender Management</p>

          <p className="text-xs sm:text-sm mt-2">
            Konten akan ditambahkan sesuai kebutuhan
          </p>
        </div>
      </div>
    </div>
  );
}
