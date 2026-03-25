export default function DashboardPage() {

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Dashboard
        </p>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          dashboard
        </h1>
        <p className="text-gray-600">Kelola semua data</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="text-center text-gray-500">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <p className="text-lg">Halaman Dashboard</p>
          <p className="text-sm mt-2">
            Konten akan ditambahkan sesuai kebutuhan
          </p>
        </div>
      </div>
    </div>
  );
}
