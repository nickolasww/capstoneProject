'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import type { TJobPostingRequest } from '@/api/dashboard/lamaran-kerja/posting-pekerjaan/type';
import { createJobPosting } from '@/api/dashboard/lamaran-kerja/posting-pekerjaan';

export default function CreateJobPostingPage() {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<TJobPostingRequest>({
    title: '',
    location: '',
    slug: '',
    department: '',
    salary: '',
    employment_type: 'full_time',
    description: '',
    requirements: '',
    responsibilities: '',
    publication_status: 'active',
    is_active: true,
    closed_at: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'title') {
      // Auto-generate slug from title
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, title: value, slug }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert closed_at to ISO format if it's a date
      const dataToSubmit = {
        ...formData,
        closed_at: formData.closed_at ? new Date(formData.closed_at).toISOString() : new Date().toISOString(),
      };
      
      await createJobPosting(dataToSubmit);
      api.success({
        title: 'Berhasil',
        description: 'Lowongan berhasil dibuat!',
        placement: 'topRight',
      });
      
      setTimeout(() => {
        navigate('/lamaran-kerja/posting-pekerjaan');
      }, 1000);
    } catch (error) {
      console.error('Error creating job posting:', error);
      api.error({
        title: 'Gagal',
        description: 'Gagal membuat lowongan pekerjaan',
        placement: 'topRight',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {contextHolder}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Admin - Lamaran Kerja - Posting Pekerjaan - <span className="text-red-400">Tambah Lowongan</span>
        </p>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tambah Lowongan Baru</h1>
        <p className="text-gray-600">Buat lowongan pekerjaan baru</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Posisi <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Contoh: Researcher Ngawi"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                placeholder="researcher-ngawi (auto-generated)"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Departemen <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Contoh: Ngawiment"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lokasi <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Contoh: Ngawi, Jawa Barat"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipe Pekerjaan <span className="text-red-600">*</span>
              </label>
              <select
                name="employment_type"
                value={formData.employment_type}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="full_time">Full Time</option>
                <option value="part_time">Part Time</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gaji <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Contoh: Rp 5.000.000 - Rp 7.000.000"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Pekerjaan <span className="text-red-600">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Jelaskan detail pekerjaan..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requirements <span className="text-red-600">*</span>
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="• Persyaratan 1&#10;• Persyaratan 2&#10;• Persyaratan 3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Responsibilities <span className="text-red-600">*</span>
              </label>
              <textarea
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="• Tanggung jawab 1&#10;• Tanggung jawab 2&#10;• Tanggung jawab 3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Penutupan <span className="text-red-600">*</span>
              </label>
              <input
                type="datetime-local"
                name="closed_at"
                value={formData.closed_at}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status Publikasi
              </label>
              <select
                name="publication_status"
                value={formData.publication_status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="active">Aktif</option>
                <option value="closed">Ditutup</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Aktifkan lowongan ini
                </span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate('/lamaran-kerja/posting-pekerjaan')}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Menyimpan...' : 'Publikasikan Lowongan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
