import React from 'react';
import { Modal, Form, Radio, Button, Space, Typography, Input, DatePicker, TimePicker } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { z } from 'zod';
import dayjs from 'dayjs';
import { editProgressSchema, type Application, type TApplicationStatus } from './schema';

const { Text } = Typography;

interface EditProgressModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: {
    status: TApplicationStatus;
    interview_at?: string;
  }) => void;
  record: Application | null;
}

export default function EditProgressModal({
  open,
  onCancel,
  onSubmit,
  record,
}: EditProgressModalProps) {
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      try {
        // Validate with Zod
        editProgressSchema.parse(values);
        
        let interview_at: string | undefined;
        if (values.status === 'short_listed' && values.interview_date && values.interview_time) {
          // Combine date and time into ISO string
          const date = values.interview_date.format('YYYY-MM-DD');
          const time = values.interview_time.format('HH:mm:ss');
          interview_at = `${date}T${time}+07:00`; // Assuming WIB timezone
        }
        
        onSubmit({
          status: values.status,
          interview_at,
        });
        
        form.resetFields();
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error('Validation error:', error.issues);
        }
      }
    }).catch((errorInfo) => {
      console.error('Form validation failed:', errorInfo);
    });
  };

  // Set initial values when modal opens
  React.useEffect(() => {
    if (open && record) {
      const formValues: any = {
        email: record.email,
        job_title: record.job_title,
        status: record.status,
      };
      
      // Parse interview_at if exists
      if (record.interview_at) {
        const interviewDate = dayjs(record.interview_at);
        formValues.interview_date = interviewDate;
        formValues.interview_time = interviewDate;
      }
      
      form.setFieldsValue(formValues);
    }
  }, [open, record, form]);

  return (
    <Modal
      title="Edit Progress"
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Batal
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          onClick={handleSubmit} 
          style={{ backgroundColor: '#22c55e', borderColor: '#22c55e' }}
        >
          Simpan Perubahan
        </Button>,
      ]}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        style={{ marginTop: 24 }}
      >
        <Form.Item
          label="Email Pelamar"
          name="email"
        >
          <Input disabled style={{ color: '#000' }} />
        </Form.Item>

        <Form.Item
          label="Posisi Lamaran"
          name="job_title"
        >
          <Input disabled style={{ color: '#000' }} />
        </Form.Item>

        {/* Status Section */}
        <div style={{ marginBottom: 16 }}>
          <Text strong style={{ display: 'block', marginBottom: 12 }}>
            Tahap Progess
          </Text>
          
          <Form.Item
            name="status"
            rules={[{ required: true, message: 'Pilih tahap progress' }]}
            style={{ marginBottom: 0 }}
          >
            <Radio.Group style={{ width: '100%' }}>
              <Space orientation="vertical" style={{ width: '100%', gap: 12 }}>
                <div style={{ 
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  transition: 'all 0.3s',
                }}>
                  <Radio value="submitted" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    Tahap Pemberkasan
                  </Radio>
                </div>

                {/* Removed 'reviewed' status option and fixed JSX structure */}

                <div style={{ 
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  transition: 'all 0.3s',
                }}>
                  <Radio value="short_listed" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    Tahap Interview
                  </Radio>
                </div>
                
                {/* Interview Schedule - appears when short_listed is selected */}
                <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.status !== currentValues.status}>
                  {({ getFieldValue }) =>
                    getFieldValue('status') === 'short_listed' ? (
                      <div 
                        style={{ 
                          backgroundColor: '#eff6ff', 
                          padding: '16px', 
                          borderRadius: '8px', 
                          marginLeft: 0,
                          marginTop: 0,
                          border: '1px solid #bfdbfe',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                          <CalendarOutlined style={{ color: '#3b82f6', fontSize: '16px' }} />
                          <Text strong style={{ color: '#3b82f6' }}>Jadwal Interview</Text>
                        </div>
                        
                        <Form.Item
                          label={
                            <span>
                              Tanggal Interview <span style={{ color: 'red' }}>*</span>
                            </span>
                          }
                          name="interview_date"
                          rules={[{ required: true, message: 'Pilih tanggal interview' }]}
                        >
                          <DatePicker 
                            style={{ width: '100%' }} 
                            format="DD/MM/YYYY"
                            placeholder="Pilih tanggal"
                          />
                        </Form.Item>

                        <Form.Item
                          label={
                            <span>
                              Waktu Interview <span style={{ color: 'red' }}>*</span>
                            </span>
                          }
                          name="interview_time"
                          rules={[{ required: true, message: 'Pilih waktu interview' }]}
                          style={{ marginBottom: 0 }}
                        >
                          <TimePicker 
                            style={{ width: '100%' }} 
                            format="HH:mm"
                            placeholder="Pilih waktu"
                          />
                        </Form.Item>
                      </div>
                    ) : null
                  }
                </Form.Item>

                <div style={{ 
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  transition: 'all 0.3s',
                }}>
                  <Radio value="hired" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    Tahap Diterima
                  </Radio>
                </div>
                
                <div style={{ 
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  transition: 'all 0.3s',
                }}>
                  <Radio value="rejected" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    Tahap Ditolak
                  </Radio>
                </div>
              </Space>
            </Radio.Group>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}
