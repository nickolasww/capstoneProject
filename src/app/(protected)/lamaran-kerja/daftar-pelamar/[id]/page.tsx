'use client';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Tag, Typography, Card, Row, Col } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined, EditOutlined } from '@ant-design/icons';
import type { TApplication, TApplicationStatus } from '@/api/lamaran-kerja/daftar-pelamar/type';
import { getDetailApplication, updateApplication } from '@/api/lamaran-kerja/daftar-pelamar';
import EditProgressModal from '../_components/form/edit-modal';

const { Text, Title } = Typography;

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [application, setApplication] = useState<TApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchApplicationDetail = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const response = await getDetailApplication({ id });
        setApplication(response.data);
      } catch (error) {
        console.error('Error fetching application detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationDetail();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '24px 32px', textAlign: 'center' }}>
        <Text>Loading...</Text>
      </div>
    );
  }

  if (!application) {
    return (
      <div style={{ padding: '24px 32px' }}>
        <div style={{ backgroundColor: '#fee', border: '1px solid #fcc', color: '#c33', padding: '16px', borderRadius: '8px' }}>
          Data pelamar tidak ditemukan
        </div>
      </div>
    );
  }

  const getStatusConfig = (status: TApplicationStatus) => {
    switch (status) {
      case 'pembekasan':
        return { color: '#3b82f6', text: 'Tahap Pemberkasan' };
      case 'interview':
        return { color: '#eab308', text: 'Tahap Interview' };
      case 'diterima':
        return { color: '#22c55e', text: 'Diterima' };
      case 'ditolak':
        return { color: '#ef4444', text: 'Ditolak' };
      default:
        return { color: '#9ca3af', text: 'Pendaftar' };
    }
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = async (values: {
    status: TApplicationStatus;
    interview_date?: string;
    interview_time?: string;
  }) => {
    if (application) {
      try {
        await updateApplication({ id: application.id }, {
          ...application,
          status: values.status,
          interview_date: values.interview_date,
          interview_time: values.interview_time,
        });
        
        // Refresh the detail data
        const response = await getDetailApplication({ id: application.id });
        setApplication(response.data);
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error updating application:', error);
      }
    }
  };

  const statusConfig = getStatusConfig(application.status);

  return (
    <div style={{ padding: '24px 32px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header with Back Button */}
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        style={{ marginBottom: 24 }}
      >
        Kembali
      </Button>

      {/* Breadcrumb */}
      <div style={{ marginBottom: 16 }}>
        <Text type="secondary">
          Lamaran Kerja / Daftar Pelamar / Detail Pelamar: {application.name}
        </Text>
      </div>

      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>
          Detail Pelamar: {application.name}
        </Title>
        <Button 
          type="default" 
          icon={<EditOutlined />}
          onClick={handleEditClick}
          style={{ 
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          Edit Progres
        </Button>
      </div>

      {/* Issue Information Card */}
      <Card
        title={<Text strong style={{ fontSize: '16px' }}>Informasi Pelamar</Text>}
        style={{ borderRadius: '8px', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}
      >
        <Row gutter={[16, 16]}>
          {/* Row 1: Email & Posisi Lamaran */}
          <Col xs={24} sm={12}>
            <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '6px', height: '100%' }}>
              <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                Email
              </Text>
              <Text strong style={{ fontSize: '15px' }}>
                {application.email}
              </Text>
            </div>
          </Col>

          <Col xs={24} sm={12}>
            <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '6px', height: '100%' }}>
              <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                Posisi Lamaran
              </Text>
              <Text strong style={{ fontSize: '15px' }}>
                {application.position}
              </Text>
            </div>
          </Col>

          {/* Row 2: Tanggal Daftar & PDF CV */}
          <Col xs={24} sm={12}>
            <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '6px', height: '100%' }}>
              <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                Tanggal Daftar
              </Text>
              <Text strong style={{ fontSize: '15px' }}>
                {application.apply_date}
              </Text>
            </div>
          </Col>

          <Col xs={24} sm={12}>
            <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '6px', height: '100%' }}>
              <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                PDF CV
              </Text>
              <Button 
                type="link" 
                icon={<DownloadOutlined />}
                style={{ color: '#16a34a', padding: 0, fontSize: '15px' }}
              >
                Lihat CV
              </Button>
            </div>
          </Col>

          {/* Row 3: Status & Jadwal Interview */}
          <Col xs={24} sm={12}>
            <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '6px', height: '100%' }}>
              <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                Status
              </Text>
              <Tag
                color={statusConfig.color}
                style={{
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 500,
                  border: 0,
                }}
              >
                {statusConfig.text}
              </Tag>
            </div>
          </Col>

          <Col xs={24} sm={12}>
            <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '6px', height: '100%' }}>
              <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                Jadwal Interview
              </Text>
              {application.interview_date ? (
                <>
                  <Text strong style={{ fontSize: '15px', display: 'block' }}>
                    {application.interview_date}
                  </Text>
                  <Text type="secondary" style={{ fontSize: '13px' }}>
                    {application.interview_time}
                  </Text>
                </>
              ) : (
                <Text type="secondary">—</Text>
              )}
            </div>
          </Col>

          {/* Row 4: Nama & Alamat */}
          <Col xs={24} sm={12}>
            <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '6px', height: '100%' }}>
              <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                Nama
              </Text>
              <Text strong style={{ fontSize: '15px' }}>
                {application.name}
              </Text>
            </div>
          </Col>

          <Col xs={24} sm={12}>
            <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '6px', height: '100%' }}>
              <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                Alamat
              </Text>
              <Text strong style={{ fontSize: '15px' }}>
                {application.address}
              </Text>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Modal Edit Progres */}
      <EditProgressModal
        open={isModalOpen}
        onCancel={handleModalCancel}
        onSubmit={handleModalSubmit}
        record={application}
      />
    </div>
  );
}
