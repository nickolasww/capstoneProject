import { useParams } from 'react-router-dom';
import { useJobPostingDetail } from '../../daftar-pelamar/_hooks/use-job-posting-query';

export default function JobPostingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useJobPostingDetail(id!);

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="p-6 lg:p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          Lowongan tidak ditemukan
        </div>
      </div>
    );
  }

  const job = data.data;

  return (
    <div className="p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Admin - Lamaran Kerja - Posting Pekerjaan - <span className="text-red-400">Detail</span>
        </p>
      </div>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
          <p className="text-gray-600">{job.department} • {job.location}</p>
        </div>
        <span
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            job.status === 'active'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {job.status === 'active' ? 'Aktif' : 'Ditutup'}
        </span>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Deskripsi Pekerjaan</h2>
            <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Persyaratan</h2>
            <ul className="list-disc list-inside space-y-2">
              {job.requirements.map((req: any, index: any) => (
                <li key={index} className="text-gray-700">{req}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Informasi</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Tipe Pekerjaan</h3>
                <p className="text-base text-gray-900">{job.type}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Gaji</h3>
                <p className="text-base text-gray-900">{job.salary}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Lokasi</h3>
                <p className="text-base text-gray-900">{job.location}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Tanggal Posting</h3>
                <p className="text-base text-gray-900">{job.postedDate}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Deadline</h3>
                <p className="text-base text-red-600 font-semibold">{job.deadline}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Statistik</h2>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600">{job.applicants}</p>
              <p className="text-sm text-gray-600 mt-1">Total Pelamar</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => window.history.back()}
              className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Kembali
            </button>
            <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              Edit Lowongan
            </button>
            <button className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
              Tutup Lowongan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
