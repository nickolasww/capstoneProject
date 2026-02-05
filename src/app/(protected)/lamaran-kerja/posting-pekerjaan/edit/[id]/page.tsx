import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobPostings } from '../../jobPostingsStore';

export default function EditJobPostingPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getJobById, updateJob } = useJobPostings();

    const [formData, setFormData] = useState({
        title: '',
        department: '',
        location: '',
        type: '',
        salary: '',
        description: '',
        requirements: '',
        deadline: '',
        status: 'active' as 'active' | 'closed',
    });

    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (id) {
            const job = getJobById(id);
            if (job) {
                setFormData({
                    title: job.title,
                    department: job.department,
                    location: job.location,
                    type: job.type,
                    salary: job.salary,
                    description: job.description,
                    requirements: job.requirements.join('\n'),
                    deadline: '',
                    status: job.status,
                });
                setIsLoading(false);
            } else {
                setNotFound(true);
                setIsLoading(false);
            }
        }
    }, [id, getJobById]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!id) return;

        const requirementsArray = formData.requirements
            .split('\n')
            .map(req => req.trim())
            .filter(req => req.length > 0);

        let formattedDeadline = undefined;
        if (formData.deadline) {
            const deadlineDate = new Date(formData.deadline);
            formattedDeadline = deadlineDate.toLocaleDateString('id-ID');
        }

        updateJob(id, {
            title: formData.title,
            department: formData.department,
            location: formData.location,
            type: formData.type,
            salary: formData.salary,
            description: formData.description,
            requirements: requirementsArray,
            ...(formattedDeadline && { deadline: formattedDeadline }),
            status: formData.status,
        });

        navigate('/lamaran-kerja/posting-pekerjaan');
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
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Rp 5.000.000 - Rp 7.000.000"
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
                                Persyaratan <span className="text-red-600">*</span>
                            </label>
                            <textarea
                                name="requirements"
                                value={formData.requirements}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Masukkan setiap persyaratan per baris"
                            />
                            <p className="text-sm text-gray-500 mt-1">Pisahkan setiap persyaratan dengan enter/baris baru</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Deadline Baru <span className="text-gray-400">(kosongkan jika tidak berubah)</span>
                            </label>
                            <input
                                type="date"
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleChange}
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
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
