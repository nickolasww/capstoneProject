'use client';

import { CreateJobPostingForm } from '../_components/form';

export default function CreateJobPostingPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Admin - Lamaran Kerja - Posting Pekerjaan - <span className="text-red-400">Tambah Lowongan</span>
        </p>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tambah Lowongan Baru</h1>
        <p className="text-gray-600">Buat lowongan pekerjaan baru</p>
      </div>

      <CreateJobPostingForm />
    </div>
  );
}
