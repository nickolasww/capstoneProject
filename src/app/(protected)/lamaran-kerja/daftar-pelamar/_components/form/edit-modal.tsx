import React from 'react';
import { Modal, Form, Input, Radio, DatePicker, TimePicker, Button, Space, Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { z } from 'zod';
import dayjs from 'dayjs';
import { editProgressSchema, type Application, type TabType } from './schema';

const { Text } = Typography;

interface EditProgressModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: {
    status: TabType;
    interviewDate?: string;
    interviewTime?: string;
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
        
        onSubmit({
          status: values.status,
          interviewDate: values.status === 'interview' && values.interviewDate 
            ? values.interviewDate.format('DD/MM/YYYY') 
            : undefined,
          interviewTime: values.status === 'interview' && values.interviewTime 
            ? values.interviewTime.format('HH.mm') + ' WIB'
            : undefined,
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
      form.setFieldsValue({
        name: record.name,
        position: record.position,
        status: record.status,
        interviewDate: record.interviewDate ? dayjs(record.interviewDate, 'DD/MM/YYYY') : null,
        interviewTime: record.interviewTime ? dayjs(record.interviewTime, 'HH.mm') : null,
      });
    }
  }, [open, record, form]);

  return (
    <Modal
      title="Edit Progres"
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
          label="Nama Pelamar"
          name="name"
        >
          <Input disabled style={{ color: '#000' }} />
        </Form.Item>

        <Form.Item
          label="Posisi Lamaran"
          name="position"
        >
          <Input disabled style={{ color: '#000' }} />
        </Form.Item>

        {/* Tahap Progress Section with Border */}
        <div style={{ marginBottom: 16 }}>
          <Text strong style={{ display: 'block', marginBottom: 12 }}>
            Tahap Progress
          </Text>
          
          <Form.Item
            name="status"
            rules={[{ required: true, message: 'Pilih tahap progress' }]}
            style={{ marginBottom: 0 }}
          >
            <Radio.Group style={{ width: '100%' }}>
              <Space direction="vertical" style={{ width: '100%', gap: 12 }}>
                <div style={{ 
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  transition: 'all 0.3s',
                }}>
                  <Radio value="pembekasan" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    Tahap Pemberkasan
                  </Radio>
                </div>

                <div style={{ 
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  transition: 'all 0.3s',
                }}>
                  <Radio value="interview" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    Tahap Interview
                  </Radio>
                </div>
                
                {/* Jadwal Interview - appears when interview is selected */}
                <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.status !== currentValues.status}>
                  {({ getFieldValue }) =>
                    getFieldValue('status') === 'interview' ? (
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
                          name="interviewDate"
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
                          name="interviewTime"
                          rules={[{ required: true, message: 'Pilih waktu interview' }]}
                          style={{ marginBottom: 0 }}
                        >
                          <TimePicker 
                            style={{ width: '100%' }} 
                            format="HH.mm"
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
                  <Radio value="diterima" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    Tahap Diterima
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
