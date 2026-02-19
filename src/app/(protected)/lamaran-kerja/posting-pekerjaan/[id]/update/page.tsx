'use client';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { TJobPosting, TJobType, TJobStatus } from '@/api/lamaran-kerja/posting-pekerjaan/type';
import { getDetailJobPosting, updateJobPosting } from '@/api/lamaran-kerja/posting-pekerjaan';

export default function UpdateJobPostingPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Partial<TJobPosting>>({
        title: '',
        department: '',
        location: '',
        type: 'full-time',
        salary_min: 0,
        salary_max: 0,
        description: '',
        deadline: '',
        status: 'active',
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            if (!id) return;
            
            try {
                const response = await getDetailJobPosting({ id });
                const job = response.data;
                setFormData({
                    title: job.title,
                    department: job.department,
                    location: job.location,
                    type: job.type,
                    salary_min: job.salary_min,
                    salary_max: job.salary_max,
                    description: job.description,
                    deadline: job.deadline,
                    status: job.status,
                });
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching job:', error);
                setNotFound(true);
                setIsLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        if (name === 'salary_min' || name === 'salary_max') {
            setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!id) return;
        setIsSubmitting(true);

        try {
            await updateJobPosting({ id }, formData);
            navigate('/lamaran-kerja/posting-pekerjaan');
        } catch (error) {
            console.error('Error updating job posting:', error);
            alert('Gagal memperbarui lowongan pekerjaan');
        } finally {
            setIsSubmitting(false);
        }
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

    if (notFound) {
        return (
            <div className="p-6 lg:p-8">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    Lowongan tidak ditemukan
                </div>
                <button
                    onClick={() => navigate('/lamaran-kerja/posting-pekerjaan')}
                    className="mt-4 px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    Kembali
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8">
            <div className="mb-6">
                <p className="text-sm text-gray-600">
                    Admin - Lamaran Kerja - Posting Pekerjaan - <span className="text-red-400">Edit Lowongan</span>
                </p>
            </div>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Lowongan</h1>
                <p className="text-gray-600">Perbarui informasi lowongan pekerjaan</p>
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
                                placeholder="Contoh: Mekanik Alat Berat"
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
                                placeholder="Contoh: Operasional"
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
                                placeholder="Contoh: Jakarta"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tipe Pekerjaan <span className="text-red-600">*</span>
                            </label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option value="full-time">Full Time</option>
                                <option value="part-time">Part Time</option>
                                <option value="contract">Contract</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Gaji Minimum <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="number"
                                name="salary_min"
                                value={formData.salary_min}
                                onChange={handleChange}
                                required
                                min="0"
                                step="100000"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="5000000"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Gaji Maximum <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="number"
                                name="salary_max"
                                value={formData.salary_max}
                                onChange={handleChange}
                                required
                                min="0"
                                step="100000"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="7000000"
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

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Deadline <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="date"
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option value="active">Aktif</option>
                                <option value="closed">Ditutup</option>
                            </select>
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
                            {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
