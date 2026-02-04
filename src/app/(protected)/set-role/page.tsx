export default function SetRolePage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Admin - Set Role
        </p>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Set Role</h1>
        <p className="text-gray-600">Kelola role dan permission user</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="text-center text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <p className="text-lg">Halaman Set Role</p>
          <p className="text-sm mt-2">Konten akan ditambahkan sesuai kebutuhan</p>
        </div>
      </div>
    </div>
  );
}
