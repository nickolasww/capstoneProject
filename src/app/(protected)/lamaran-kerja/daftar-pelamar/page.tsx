import { useState } from 'react';

type TabType = 'pendaftar' | 'pembekasan' | 'interview' | 'diterima' | 'ditolak';

interface Application {
  id: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  position: string;
  applyDate: string;
  status: TabType;
}

const mockApplications: Application[] = [
  {
    id: '1',
    name: 'Eko Prasetyo',
    phone: '085678901234',
    address: 'Jl. Diponegoro No. 56, Yogyakarta',
    email: 'eko.prasetyo@email.com',
    position: 'Mekanik',
    applyDate: '17/09/2025',
    status: 'pendaftar',
  },
  {
    id: '2',
    name: 'Eko Prasetyo',
    phone: '085678901234',
    address: 'Jl. Diponegoro No. 56, Yogyakarta',
    email: 'eko.prasetyo@email.com',
    position: 'Mekanik',
    applyDate: '17/09/2025',
    status: 'pendaftar',
  },
  {
    id: '3',
    name: 'Eko Prasetyo',
    phone: '085678901234',
    address: 'Jl. Diponegoro No. 56, Yogyakarta',
    email: 'eko.prasetyo@email.com',
    position: 'Mekanik',
    applyDate: '17/09/2025',
    status: 'pendaftar',
  },
  {
    id: '4',
    name: 'Eko Prasetyo',
    phone: '085678901234',
    address: 'Jl. Diponegoro No. 56, Yogyakarta',
    email: 'eko.prasetyo@email.com',
    position: 'Mekanik',
    applyDate: '17/09/2025',
    status: 'pendaftar',
  },
  {
    id: '5',
    name: 'Eko Prasetyo',
    phone: '085678901234',
    address: 'Jl. Diponegoro No. 56, Yogyakarta',
    email: 'eko.prasetyo@email.com',
    position: 'Mekanik',
    applyDate: '17/09/2025',
    status: 'pendaftar',
  },
];

export default function LamaranKerjaPage() {
  const [activeTab, setActiveTab] = useState<TabType>('pendaftar');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState<'name' | 'position'>('name');

  const tabs: { key: TabType; label: string; color: string }[] = [
    { key: 'pendaftar', label: 'Semua Pendaftar', color: 'border-green-600 text-green-600' },
    { key: 'pembekasan', label: 'Tahap Pembekasan', color: 'border-gray-600 text-gray-600' },
    { key: 'interview', label: 'Tahap Interview', color: 'border-gray-600 text-gray-600' },
    { key: 'diterima', label: 'Tahap Diterima', color: 'border-gray-600 text-gray-600' },
    { key: 'ditolak', label: 'Belum Diperiksa', color: 'border-gray-600 text-gray-600' },
  ];

  const filteredApplications = mockApplications.filter(
    (app) =>
      app.status === activeTab &&
      (searchBy === 'name'
        ? app.name.toLowerCase().includes(searchTerm.toLowerCase())
        : app.position.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 lg:p-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Admin - Lamaran Kerja - <span className="text-red-400">Isles cv dan pemberkasan</span>
        </p>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Karir</h1>
        <p className="text-gray-600">Kelola data pelamar kerja dan proses rekrutmen</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? tab.color
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="font-medium text-gray-900">Filter & Pencarian</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cari Nama atau Posisi
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ketik nama atau posisi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <svg className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Posisi Lamaran
            </label>
            <input
              type="text"
              placeholder="Posisi lamaran"
              value={searchBy === 'position' ? searchTerm : ''}
              onChange={(e) => {
                setSearchBy('position');
                setSearchTerm(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    Nama
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  No Telp
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Alamat
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Posisi Lamaran
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Tanggal Daftar
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  PDF
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredApplications.map((app, index) => (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium">
                        {app.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{app.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {app.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {app.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {app.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {app.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {app.applyDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="flex items-center gap-1 text-green-600 hover:text-green-700">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Lihat CV
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Menampilkan <span className="font-medium">5 dari 5</span> data
            </p>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                Previous
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-green-600 rounded-lg hover:bg-green-700">
                1
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
