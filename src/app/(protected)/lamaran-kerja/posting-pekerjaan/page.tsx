import { useState } from 'react';

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  postedDate: string;
  deadline: string;
  status: 'active' | 'closed';
  applicants: number;
}

const mockJobPostings: JobPosting[] = [
  {
    id: '1',
    title: 'Mekanik Alat Berat',
    department: 'Operasional',
    location: 'Yogyakarta',
    type: 'Full Time',
    salary: 'Rp 5.000.000 - Rp 7.000.000',
    postedDate: '15/01/2026',
    deadline: '15/02/2026',
    status: 'active',
    applicants: 12,
  },
  {
    id: '2',
    title: 'Civil Engineer',
    department: 'Engineering',
    location: 'Jakarta',
    type: 'Full Time',
    salary: 'Rp 8.000.000 - Rp 12.000.000',
    postedDate: '10/01/2026',
    deadline: '10/02/2026',
    status: 'active',
    applicants: 24,
  },
  {
    id: '3',
    title: 'Admin Proyek',
    department: 'Administrasi',
    location: 'Semarang',
    type: 'Contract',
    salary: 'Rp 4.500.000 - Rp 6.000.000',
    postedDate: '05/01/2026',
    deadline: '05/02/2026',
    status: 'active',
    applicants: 8,
  },
];

export default function PostingPekerjaanPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredPostings = mockJobPostings.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Admin - Lamaran Kerja - <span className="text-red-400">Posting Pekerjaan</span>
        </p>
      </div>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Posting Pekerjaan</h1>
          <p className="text-gray-600">Kelola lowongan pekerjaan yang tersedia</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Lowongan
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari posisi atau departemen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <svg
            className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Job Postings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPostings.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.department}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  job.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {job.status === 'active' ? 'Aktif' : 'Ditutup'}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {job.type}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {job.salary}
              </div>
            </div>

            {/* Stats */}
            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Pelamar:</span>
                <span className="font-semibold text-gray-900">{job.applicants} orang</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-600">Deadline:</span>
                <span className="font-semibold text-red-600">{job.deadline}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                Edit
              </button>
              <button className="flex-1 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium">
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPostings.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12">
          <div className="text-center text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-lg font-medium">Tidak ada lowongan ditemukan</p>
            <p className="text-sm mt-2">Coba gunakan kata kunci lain</p>
          </div>
        </div>
      )}
    </div>
  );
}
