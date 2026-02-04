import { useParams } from 'react-router-dom';
import { useApplicationDetail } from '../_hooks/use-application-query';
import { APPLICATION_STATUS_LABELS, APPLICATION_STATUS_COLORS } from '../_utils/helpers';

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useApplicationDetail(id!);

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
          Data pelamar tidak ditemukan
        </div>
      </div>
    );
  }

  const application = data.data;

  return (
    <div className="p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Admin - Lamaran Kerja - Daftar Pelamar - <span className="text-red-400">Detail</span>
        </p>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Detail Pelamar</h1>
        <p className="text-gray-600">Informasi lengkap pelamar</p>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-bold">
              {application.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{application.name}</h2>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${APPLICATION_STATUS_COLORS[application.status]}`}>
                {APPLICATION_STATUS_LABELS[application.status]}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
              <p className="text-base text-gray-900">{application.email}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">No. Telepon</h3>
              <p className="text-base text-gray-900">{application.phone}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Posisi yang Dilamar</h3>
              <p className="text-base text-gray-900">{application.position}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Tanggal Melamar</h3>
              <p className="text-base text-gray-900">{application.applyDate}</p>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Alamat</h3>
              <p className="text-base text-gray-900">{application.address}</p>
            </div>

            {application.cv_url && (
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-gray-500 mb-2">CV</h3>
                <a
                  href={application.cv_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download CV
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex gap-3">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Kembali
          </button>
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Ubah Status
          </button>
        </div>
      </div>
    </div>
  );
}
