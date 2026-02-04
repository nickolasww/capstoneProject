export default function CreateJobPostingPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Admin - Lamaran Kerja - Posting Pekerjaan - <span className="text-red-400">Tambah Lowongan</span>
        </p>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tambah Lowongan Baru</h1>
        <p className="text-gray-600">Buat lowongan pekerjaan baru</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Posisi <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Contoh: Mekanik Alat Berat"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Departemen <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Contoh: Operasional"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lokasi <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Contoh: Jakarta"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipe Pekerjaan <span className="text-red-600">*</span>
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option value="">Pilih tipe</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gaji <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Rp 5.000.000 - Rp 7.000.000"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Pekerjaan <span className="text-red-600">*</span>
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Jelaskan detail pekerjaan..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Persyaratan <span className="text-red-600">*</span>
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Masukkan setiap persyaratan per baris&#10;Contoh:&#10;- Pengalaman minimal 2 tahun&#10;- Memiliki sertifikat K3&#10;- Bisa bekerja shift"
              />
              <p className="text-sm text-gray-500 mt-1">Pisahkan setiap persyaratan dengan enter/baris baru</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deadline <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option value="active">Aktif</option>
                <option value="closed">Ditutup</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Publikasikan Lowongan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
