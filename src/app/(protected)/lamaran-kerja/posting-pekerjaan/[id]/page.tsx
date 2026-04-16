'use client';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { TJobPosting } from '@/api/dashboard/lamaran-kerja/posting-pekerjaan/type';
import { getDetailJobPosting, updateJobPosting } from '@/api/dashboard/lamaran-kerja/posting-pekerjaan';
import Loading from '@/app/loading';

export default function JobPostingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<TJobPosting | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;

      try {
        const response = await getDetailJobPosting({ id });
        setJob(response.job_positions);
      } catch (err) {
        console.error('Error fetching job detail:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleCloseJob = async () => {
    if (!job || !id) return;
    
    const confirmed = window.confirm('Apakah Anda yakin ingin menutup lowongan ini?');
    if (!confirmed) return;

    try {
      await updateJobPosting({ id }, { is_active: false, publication_status: 'draft' });
      // Refresh data
      const response = await getDetailJobPosting({ id });
      setJob(response.job_positions);
    } catch (error) {
      console.error('Error closing job:', error);
      alert('Gagal menutup lowongan');
    }
  };

  const getEmploymentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'full_time': 'Full Time',
      'contract': 'Contract',
      'internship': 'Internship',
    };
    return labels[type] || type;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error || !job) {
    return (
      <div className="p-6 lg:p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          Lowongan tidak ditemukan
        </div>
      </div>
    );
  }

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
  className={`px-4 py-2 rounded-lg text-sm font-medium ${
    job.publication_status === 'active' && job.is_active
      ? 'bg-green-100 text-green-700'
      : 'bg-gray-100 text-gray-700'
  }`}
>
  {job.publication_status === 'active' && job.is_active ? 'Aktif' : 'Ditutup'}
</span>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">

          {job.requirements && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Persyaratan</h2>
              <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>
            </div>
          )}

          {job.responsibilities && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Tanggung Jawab</h2>
              <p className="text-gray-700 whitespace-pre-line">{job.responsibilities}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Informasi</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Tipe Pekerjaan</h3>
                <p className="text-base text-gray-900">{getEmploymentTypeLabel(job.employment_type)}</p>
              </div>
              {job.salary && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Gaji</h3>
                  <p className="text-base text-gray-900">{job.salary}</p>
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Lokasi</h3>
                <p className="text-base text-gray-900">{job.location}</p>
              </div>
              {job.closed_at && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Tanggal Ditutup</h3>
                  <p className="text-base text-red-600">{formatDate(job.closed_at)}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Statistik</h2>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600">{job.applicant_count || 0}</p>
              <p className="text-sm text-gray-600 mt-1">Total Pelamar</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/lamaran-kerja/posting-pekerjaan')}
              className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Kembali
            </button>
            <button 
              onClick={() => navigate(`/lamaran-kerja/posting-pekerjaan/${job.id}/update`)}
              className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Edit Lowongan
            </button>
            {job.is_active && job.publication_status === 'active' && (
              <button 
                onClick={handleCloseJob}
                className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Tutup Lowongan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
