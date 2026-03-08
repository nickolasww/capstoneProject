'use client';

import { useState, useEffect, useMemo, useDeferredValue } from 'react';
import { useNavigate } from 'react-router-dom';
import { InboxOutlined , EyeOutlined, UserAddOutlined, SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EnvironmentOutlined, DollarOutlined, CalendarOutlined, TeamOutlined } from '@ant-design/icons';
import type { TJobPosting, TJobPostingsData } from '@/api/dashboard/lamaran-kerja/posting-pekerjaan/type';
import { getJobPostings, deleteJobPosting } from '@/api/dashboard/lamaran-kerja/posting-pekerjaan';
import { useDebounce } from '@/app/_hooks/use-debounce';

export default function PostingPekerjaanPage() {
  const navigate = useNavigate();
  const [jobPostings, setJobPostings] = useState<TJobPosting[]>([]);
  const [metadata, setMetadata] = useState<Omit<TJobPostingsData, 'list'>>({
    total_applicant: 0,
    total_active: 0,
    total_vacancy: 0,
    next_cursor: null,
  });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm);
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; job: TJobPosting | null }>({
    show: false,
    job: null,
  });

  // Fetch job postings on mount
  useEffect(() => {
    const fetchJobPostings = async () => {
      setLoading(true);
      try {
        const response = await getJobPostings({ status: 'active', limit: 3 });
        setJobPostings(response.job_positions.list);
        setMetadata({
          total_applicant: response.job_positions.total_applicant,
          total_active: response.job_positions.total_active,
          total_vacancy: response.job_positions.total_vacancy,
          next_cursor: response.job_positions.next_cursor,
        });
      } catch (error) {
        console.error('Error fetching job postings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobPostings();
  }, []);

  // Memoize filtered postings to prevent recalculation on every render
  const filteredPostings = useMemo(() => {
    return jobPostings.filter((job) =>
      job.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [jobPostings, debouncedSearchTerm]);

  // Defer cards rendering to prevent UI blocking while user is typing
  const deferredFilteredPostings = useDeferredValue(filteredPostings);

  const handleDeleteClick = (job: TJobPosting) => {
    setDeleteModal({ show: true, job });
  };

  const handleConfirmDelete = async () => {
    if (deleteModal.job) {
      try {
        await deleteJobPosting({ id: deleteModal.job.id });
        // Refresh the list
        const response = await getJobPostings({ status: 'active', limit: 3 });
        setJobPostings(response.job_positions.list);
        setMetadata({
          total_applicant: response.job_positions.total_applicant,
          total_active: response.job_positions.total_active,
          total_vacancy: response.job_positions.total_vacancy,
          next_cursor: response.job_positions.next_cursor,
        });
      } catch (error) {
        console.error('Error deleting job posting:', error);
      }
    }
    setDeleteModal({ show: false, job: null });
  };

  const handleCancelDelete = () => {
    setDeleteModal({ show: false, job: null });
  };

  const getEmploymentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'full_time': 'Full Time',
      'part_time': 'Part Time',
      'contract': 'Contract',
      'internship': 'Internship',
    };
    return labels[type] || type;
  };

  const getEmploymentTypeBadgeColor = (type: string) => {
    const colors: Record<string, string> = {
      'full_time': 'bg-blue-100 text-blue-700',
      'part_time': 'bg-purple-100 text-purple-700',
      'contract': 'bg-orange-100 text-orange-700',
      'internship': 'bg-pink-100 text-pink-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Memuat data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-14 text-center">
        <h1 className="text-4xl text-gray-900 mb-2">Posting Pekerjaan</h1>
        <p className="text-gray-600">Kelola lowongan pekerjaan yang akan ditampilkan</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Lowongan</p>
              <p className="text-3xl font-bold text-gray-900">{metadata.total_vacancy}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <InboxOutlined style={{ fontSize: '24px', color: '#2563eb' }} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Lowongan Aktif</p>
              <p className="text-3xl font-bold text-gray-900">{metadata.total_active}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <EyeOutlined style={{ fontSize: '24px', color: '#16a34a' }} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Pelamar</p>
              <p className="text-3xl font-bold text-gray-900">{metadata.total_applicant}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <UserAddOutlined style={{ fontSize: '24px', color: '#ea580c' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Create Button */}
      <div className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Cari Pekerjaan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <SearchOutlined className="absolute left-3 top-3.5 text-gray-400" style={{ fontSize: '20px' }} />
          </div>
          <button
            onClick={() => navigate('/lamaran-kerja/posting-pekerjaan/create')}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-medium whitespace-nowrap"
          >
            <PlusOutlined style={{ fontSize: '20px' }} />
            Buat Lowongan Kerja Baru
          </button>
        </div>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 gap-4">
        {deferredFilteredPostings.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              {/* Left Section - Job Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      job.publication_status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {job.publication_status === 'active' ? 'Aktif' : 'Ditutup'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEmploymentTypeBadgeColor(job.employment_type)}`}>
                    {getEmploymentTypeLabel(job.employment_type)}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <InboxOutlined style={{ fontSize: '16px' }} />
                    <span>{job.department}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <EnvironmentOutlined style={{ fontSize: '16px' }} />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarOutlined style={{ fontSize: '16px' }} />
                    <span>{job.salary}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-3 line-clamp-2">{job.description}</p>

                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarOutlined className="text-gray-500" style={{ fontSize: '16px' }} />
                      <span className="text-gray-600">Ditutup: <span className="font-medium text-gray-900">{formatDate(job.closed_at)}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TeamOutlined className="text-gray-500" style={{ fontSize: '16px' }} />
                      <span className="text-gray-600"><span className="font-medium text-gray-900">{job.applicant_count}</span> pelamar</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/lamaran-kerja/posting-pekerjaan/${job.id}`)}
                  className="flex items-center justify-center w-10 h-10 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
                  title="Lihat Detail"
                >
                  <EyeOutlined style={{ fontSize: '20px' }} />
                </button>
                <button
                  onClick={() => navigate(`/lamaran-kerja/posting-pekerjaan/${job.id}/update`)}
                  className="flex items-center justify-center w-10 h-10 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
                  title="Edit"
                >
                  <EditOutlined style={{ fontSize: '20px' }} />
                </button>
                <button
                  onClick={() => handleDeleteClick(job)}
                  className="flex items-center justify-center w-10 h-10 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
                  title="Hapus"
                >
                  <DeleteOutlined style={{ fontSize: '20px' }} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPostings.length === 0 && !loading && (
        <div className="bg-white rounded-lg shadow-sm p-12">
          <div className="text-center text-gray-500">
            <SearchOutlined className="mx-auto mb-4 text-gray-300" style={{ fontSize: '64px' }} />
            <p className="text-lg font-medium">Tidak ada lowongan ditemukan</p>
            <p className="text-sm mt-2">Coba gunakan kata kunci lain atau buat lowongan baru</p>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DeleteOutlined className="text-red-600" style={{ fontSize: '32px' }} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Hapus Lowongan?</h3>
              <p className="text-gray-600 mb-6">
                Apakah Anda yakin ingin menghapus lowongan "{deleteModal.job?.title}"? Tindakan ini tidak dapat dibatalkan.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleCancelDelete}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
