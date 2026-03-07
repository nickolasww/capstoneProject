'use client';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { TJobPosting } from '@/api/dashboard/lamaran-kerja/posting-pekerjaan/type';
import { getDetailJobPosting, updateJobPosting } from '@/api/dashboard/lamaran-kerja/posting-pekerjaan';

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
        setJob(response.data);
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
      await updateJobPosting({ id }, { status: 'closed' });
      // Refresh data
      const response = await getDetailJobPosting({ id });
      setJob(response.data);
    } catch (error) {
      console.error('Error closing job:', error);
      alert('Gagal menutup lowongan');
    }
  };

  const formatSalary = (min: number, max: number) => {
    const formatNumber = (num: number) => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(num);
    };
    return `${formatNumber(min)} - ${formatNumber(max)}`;
  };

  const getJobTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'full-time': 'Full Time',
      'part-time': 'Part Time',
      'contract': 'Contract',
    };
    return labels[type] || type;
  };

  if (isLoading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
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
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Informasi</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Tipe Pekerjaan</h3>
                <p className="text-base text-gray-900">{getJobTypeLabel(job.type)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Gaji</h3>
                <p className="text-base text-gray-900">{formatSalary(job.salary_min, job.salary_max)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Lokasi</h3>
                <p className="text-base text-gray-900">{job.location}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Tanggal Posting</h3>
                <p className="text-base text-gray-900">{job.posted_date}</p>
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
              onClick={() => navigate('/lamaran-kerja/posting-pekerjaan')}
              className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Kembali
            </button>
            <button 
              onClick={() => navigate(`/lamaran-kerja/posting-pekerjaan/edit/${job.id}`)}
              className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Edit Lowongan
            </button>
            {job.status === 'active' && (
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
