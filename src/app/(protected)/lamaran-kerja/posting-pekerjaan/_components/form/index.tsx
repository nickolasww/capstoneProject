'use client';

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Select, Button, notification, DatePicker, Switch } from 'antd';
import { Spinner } from '@/app/loading';
import { createJobPosting } from '@/api/dashboard/lamaran-kerja/posting-pekerjaan';
import { JobPostingFormSchema } from './schema';
import { createZodSync } from '@/utils/zod-sync';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

const STORAGE_KEY = 'job_posting_draft';

const rule = createZodSync(JobPostingFormSchema);

interface CreateJobPostingFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateJobPostingForm({ onSuccess, onCancel }: CreateJobPostingFormProps) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // useRef untuk menyimpan timer autosave
  const autosaveTimerRef = useRef<number | null>(null);
  const isInitialLoadRef = useRef(true);

  // Load draft dari localStorage saat component mount
  useEffect(() => {
    if (isInitialLoadRef.current) {
      const savedDraft = localStorage.getItem(STORAGE_KEY);
      if (savedDraft) {
        try {
          const draft = JSON.parse(savedDraft);
          // Convert closed_at string kembali ke dayjs object untuk DatePicker
          if (draft.closed_at) {
            draft.closed_at = dayjs(draft.closed_at);
          }
          form.setFieldsValue(draft);
          
          api.info({
            message: 'Draft Ditemukan',
            description: 'Data form sebelumnya telah dipulihkan',
            placement: 'topRight',
          });
        } catch (error) {
          console.error('Error loading draft:', error);
        }
      }
      isInitialLoadRef.current = false;
    }
  }, [form, api]);

  // Auto-save draft ke localStorage setiap ada perubahan
  const handleFormChange = () => {
    // Clear timer sebelumnya
    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current);
    }

    // Set timer baru untuk autosave (debounce 1 detik)
    autosaveTimerRef.current = setTimeout(() => {
      const values = form.getFieldsValue();
      // Convert dayjs object ke string untuk localStorage
      const valuesToSave = {
        ...values,
        closed_at: values.closed_at && dayjs.isDayjs(values.closed_at) 
          ? values.closed_at.toISOString() 
          : values.closed_at || '',
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(valuesToSave));
    }, 1000);
  };

  // Auto-generate slug dari title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    form.setFieldsValue({ slug });
  };

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);

    try {
      // Validasi dengan Zod (closed_at bisa berupa Dayjs object atau string)
      const validatedData = JobPostingFormSchema.parse(values);

      // Konversi closed_at ke ISO string untuk API
      let closedAtISO: string | null = null;
    if (validatedData.closed_at) {
      if (dayjs.isDayjs(validatedData.closed_at)) {
        closedAtISO = validatedData.closed_at.toISOString();
      } else if (typeof validatedData.closed_at === 'string' && validatedData.closed_at.trim() !== '') {
        closedAtISO = new Date(validatedData.closed_at).toISOString();
      }
    }

      // Prepare data untuk API
      const dataToSubmit = {
        title: validatedData.title,
        slug: validatedData.slug,
        department: validatedData.department,
        location: validatedData.location,
        employment_type: validatedData.employment_type,
        salary: validatedData.salary,
        description: validatedData.description,
        requirements: validatedData.requirements,
        responsibilities: validatedData.responsibilities,
        closed_at: validatedData.closed_at ? closedAtISO : null,
        is_active: validatedData.is_active,
        publication_status: (validatedData.is_active ? 'active' : 'draft') as 'active' | 'draft',
      };

      // Perbaikan: pastikan closed_at tidak string kosong
      if (!dataToSubmit.closed_at || dataToSubmit.closed_at === '') {
        dataToSubmit.closed_at = null;
      }

      await createJobPosting(dataToSubmit);

      api.success({
        message: 'Berhasil',
        description: 'Lowongan pekerjaan berhasil dibuat!',
        placement: 'topRight',
      });

      // Clear draft dari localStorage setelah berhasil submit
      localStorage.removeItem(STORAGE_KEY);

      // Redirect setelah 1 detik
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else {
          navigate('/lamaran-kerja/posting-pekerjaan');
        }
      }, 1000);
    } catch (error: any) {
      console.error('Error creating job posting:', error);
      
      let errorMessage = 'Gagal membuat lowongan pekerjaan';
      if (error.errors) {
        // Zod validation errors
        errorMessage = error.errors[0]?.message || errorMessage;
      }

      api.error({
        message: 'Gagal',
        description: errorMessage,
        placement: 'topRight',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Tanya user apakah ingin menyimpan draft
    if (form.isFieldsTouched()) {
      const confirmLeave = window.confirm(
        'Anda memiliki perubahan yang belum disimpan. Draft akan disimpan otomatis. Lanjutkan?'
      );
      if (!confirmLeave) return;
    }

    if (onCancel) {
      onCancel();
    } else {
      navigate('/lamaran-kerja/posting-pekerjaan');
    }
  };

  // Cleanup timer saat component unmount
  useEffect(() => {
    return () => {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      {contextHolder}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Form Lowongan Pekerjaan</h2>
          <p className="text-sm text-gray-500 mt-1">Semua field bertanda * wajib diisi</p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onValuesChange={handleFormChange}
          initialValues={{
            employment_type: 'full_time',
            publication_status: 'active',
            is_active: true,
          }}
          autoComplete="off"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Judul Posisi"
              name="title"
              rules={[rule]}
              className="md:col-span-2"
              required
            >
              <Input
                placeholder="Contoh: Senior Software Engineer"
                onChange={handleTitleChange}
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Slug"
              name="slug"
              rules={[rule]}
              className="md:col-span-2"
              extra="Auto-generated dari judul (hanya baca)"
              required
            >
              <Input
                placeholder="senior-software-engineer"
                readOnly
                disabled
                size="large"
              />
            </Form.Item>


            <Form.Item
              label="Departemen"
              name="department"
              rules={[rule]}
              required
            >
              <Input
                placeholder="Contoh: Engineering"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Lokasi"
              name="location"
              rules={[rule]}
              required
            >
              <Input
                placeholder="Contoh: Jakarta, Indonesia"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Tipe Pekerjaan"
              name="employment_type"
              rules={[rule]}
              required
            >
              <Select size="large">
                <Option value="full_time">Full Time</Option>
                <Option value="contract">Contract</Option>
                <Option value="internship">Internship</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Gaji"
              name="salary"
              rules={[rule]}
              required
            >
              <Input
                placeholder="Contoh: Rp 10.000.000 - Rp 15.000.000"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Deskripsi Pekerjaan"
              name="description"
              rules={[rule]}
              className="md:col-span-2"
              required
            >
              <TextArea
                rows={5}
                placeholder="Jelaskan detail pekerjaan..."
                showCount
                maxLength={5000}
              />
            </Form.Item>

            <Form.Item
              label="Requirements"
              name="requirements"
              rules={[rule]}
              className="md:col-span-2"
              required
            >
              <TextArea
                rows={5}
                placeholder="• Persyaratan 1&#10;• Persyaratan 2&#10;• Persyaratan 3"
                showCount
                maxLength={5000}
              />
            </Form.Item>

            <Form.Item
              label="Responsibilities"
              name="responsibilities"
              rules={[rule]}
              className="md:col-span-2"
              required
            >
              <TextArea
                rows={5}
                placeholder="• Tanggung jawab 1&#10;• Tanggung jawab 2&#10;• Tanggung jawab 3"
                showCount
                maxLength={5000}
              />
            </Form.Item>

            <Form.Item
              label="Tanggal Penutupan"
              name="closed_at"
              rules={[rule]}
              required
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm"
                size="large"
                className="w-full"
                placeholder="Pilih tanggal dan waktu"
              />
            </Form.Item>

            <Form.Item
              label="Aktifkan Lowongan"
              name="is_active"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </div>

          <div className="flex gap-3 pt-6 border-t mt-6">
            <Button
              size="large"
              onClick={handleCancel}
            >
              Batal
            </Button>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
              icon={isSubmitting ? <Spinner size="small" color="#ffffff" /> : null}
            >
              {isSubmitting ? 'Menyimpan...' : 'Publikasikan Lowongan'}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export { JobPostingFormSchema, type TJobPostingFormData } from './schema';
