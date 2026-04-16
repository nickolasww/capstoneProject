"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { TJobPosting } from "@/api/dashboard/lamaran-kerja/posting-pekerjaan/type";
import {
  getDetailJobPosting,
  updateJobPosting,
} from "@/api/dashboard/lamaran-kerja/posting-pekerjaan";
import Loading from "@/app/loading";
import dayjs from "dayjs";
import { queryClient } from "@/libs/react-query/react-query-clients";
import { notification } from "antd";

export default function UpdateJobPostingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Partial<TJobPosting>>({
    title: "",
    location: "",
    slug: "",
    department: "",
    salary: "",
    employment_type: "full_time",
    requirements: "",
    responsibilities: "",
    publication_status: "active",
    is_active: true,
    closed_at: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;

      try {
        const response = await getDetailJobPosting({ id });
        const job = response.job_positions;

        setFormData({
          title: job.title || "",
          location: job.location || "",
          slug: job.slug || "",
          department: job.department || "",
          salary: job.salary || "",
          employment_type: job.employment_type || "full_time",
          requirements: job.requirements || "",
          responsibilities: job.responsibilities || "",
          publication_status: job.publication_status || "active",
          is_active: job.is_active ?? true,
          closed_at: job.closed_at || "",
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching job:", error);
        setNotFound(true);
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!id) return;
    setIsSubmitting(true);

    try {
      let datatoSend = { ...formData };

      if (datatoSend.publication_status === "draft") {
        datatoSend.is_active = false;
      }
      if (datatoSend.publication_status === "active") {
        datatoSend.is_active = true;
      }

      if (
        datatoSend.publication_status === "draft" ||
        datatoSend.is_active === false
      ) {
        datatoSend.closed_at = dayjs().toISOString();
      }

      if (!datatoSend.closed_at || datatoSend.closed_at === "") {
        datatoSend.closed_at = "";
      }

      await updateJobPosting({ id }, datatoSend);
      queryClient.invalidateQueries({ queryKey: ["job-postings"] });
      notification.success({
        message: "Berhasil",
        description: "Lowongan berhasil diperbarui",
        placement: "topRight",
      });
      navigate("/lamaran-kerja/posting-pekerjaan");
    } catch (error) {
      notification.error({
        message: 'Gagal',
        description: 'Gagal memperbarui lowongan pekerjaan',
        placement: 'topRight',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (notFound) {
    return (
      <div className="p-6 lg:p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          Lowongan tidak ditemukan
        </div>
        <button
          onClick={() => navigate("/lamaran-kerja/posting-pekerjaan")}
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
          Admin - Lamaran Kerja - Posting Pekerjaan -{" "}
          <span className="text-red-400">Edit Lowongan</span>
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
                name="employment_type"
                value={formData.employment_type}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="full_time">Full Time</option>
                <option value="part_time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gaji
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Rp 5.000.000 - Rp 7.000.000"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Persyaratan
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="• Minimal S1 di bidang terkait&#10;• 3+ tahun pengalaman&#10;• Menguasai..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggung Jawab Pekerjaan
              </label>
              <textarea
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="• Bertanggung jawab atas...&#10;• Mengelola tim...&#10;• Membuat laporan..."
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
                <option value="draft">Ditutup</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate("/lamaran-kerja/posting-pekerjaan")}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
