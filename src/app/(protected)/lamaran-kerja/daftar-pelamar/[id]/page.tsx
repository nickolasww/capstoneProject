'use client';

import { useParams, useNavigate } from 'react-router-dom';
import { Button, Tag, Typography, Card, Row, Col } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined, EditOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

type TabType = 'pendaftar' | 'pembekasan' | 'interview' | 'diterima' | 'ditolak';

interface Application {
  id: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  position: string;
  applyDate: string;
  status: TabType;
  interviewDate?: string;
  interviewTime?: string;
}

const mockApplications: Application[] = [
  {
    id: '1',
    name: 'Eko Prasetyo',
    phone: '085678901234',
    address: 'Jl. Diponegoro No. 56, Yogyakarta',
    email: 'eko.prasetyo@email.com',
    position: 'Mekanik',
    applyDate: '17/09/2025',
    status: 'pendaftar',
  },
  {
    id: '2',
    name: 'Budi Santoso',
    phone: '085612345678',
    address: 'Jl. Sudirman No. 12, Jakarta',
    email: 'budi.santoso@email.com',
    position: 'Driver',
    applyDate: '16/09/2025',
    status: 'pendaftar',
  },
  {
    id: '3',
    name: 'Siti Nurhaliza',
    phone: '085698765432',
    address: 'Jl. Gatot Subroto No. 45, Bandung',
    email: 'siti.nurhaliza@email.com',
    position: 'Admin',
    applyDate: '15/09/2025',
    status: 'pendaftar',
  },
  {
    id: '4',
    name: 'Ahmad Fauzi',
    phone: '085655556666',
    address: 'Jl. Ahmad Yani No. 78, Surabaya',
    email: 'ahmad.fauzi@email.com',
    position: 'Teknisi',
    applyDate: '14/09/2025',
    status: 'pembekasan',
  },
  {
    id: '5',
    name: 'Dewi Lestari',
    phone: '085644443333',
    address: 'Jl. Pemuda No. 23, Semarang',
    email: 'dewi.lestari@email.com',
    position: 'HRD',
    applyDate: '13/09/2025',
    status: 'pembekasan',
  },
  {
    id: '6',
    name: 'Rudi Hartono',
    phone: '085633332222',
    address: 'Jl. Pahlawan No. 56, Malang',
    email: 'rudi.hartono@email.com',
    position: 'Marketing',
    applyDate: '12/09/2025',
    status: 'interview',
    interviewDate: '28/09/2025',
    interviewTime: '14.00 WIB',
  },
  {
    id: '7',
    name: 'Maya Anggraini',
    phone: '085622221111',
    address: 'Jl. Veteran No. 34, Medan',
    email: 'maya.anggraini@email.com',
    position: 'Sales',
    applyDate: '11/09/2025',
    status: 'interview',
    interviewDate: '29/09/2025',
    interviewTime: '15.00 WIB',
  },
  {
    id: '8',
    name: 'Joko Widodo',
    phone: '085611119999',
    address: 'Jl. Merdeka No. 89, Solo',
    email: 'joko.widodo@email.com',
    position: 'Supervisor',
    applyDate: '10/09/2025',
    status: 'interview',
    interviewDate: '30/09/2025',
    interviewTime: '10.00 WIB',
  },
  {
    id: '9',
    name: 'Lisa Andriani',
    phone: '085699998888',
    address: 'Jl. Raya No. 67, Denpasar',
    email: 'lisa.andriani@email.com',
    position: 'Accounting',
    applyDate: '09/09/2025',
    status: 'diterima',
    interviewDate: '23/09/2025',
    interviewTime: '13.00 WIB',
  },
  {
    id: '10',
    name: 'Agus Salim',
    phone: '085688887777',
    address: 'Jl. Proklamasi No. 90, Makassar',
    email: 'agus.salim@email.com',
    position: 'IT Support',
    applyDate: '08/09/2025',
    status: 'diterima',
  },
  {
    id: '11',
    name: 'Rina Wati',
    phone: '085677776666',
    address: 'Jl. Kartini No. 45, Palembang',
    email: 'rina.wati@email.com',
    position: 'Receptionist',
    applyDate: '07/09/2025',
    status: 'ditolak',
  },
  {
    id: '12',
    name: 'Hendra Kusuma',
    phone: '085666665555',
    address: 'Jl. Diponegoro No. 23, Pontianak',
    email: 'hendra.kusuma@email.com',
    position: 'Security',
    applyDate: '06/09/2025',
    status: 'ditolak',
  },
];

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Filter data berdasarkan email yang sama
  const selectedApplication = mockApplications.find(app => app.id === id);
  
  if (!selectedApplication) {
    return (
      <div style={{ padding: '24px 32px' }}>
        <div style={{ backgroundColor: '#fee', border: '1px solid #fcc', color: '#c33', padding: '16px', borderRadius: '8px' }}>
          Data pelamar tidak ditemukan
        </div>
      </div>
    );
  }

  const relatedApplications = mockApplications.filter(
    app => app.email === selectedApplication.email
  );

  const getStatusConfig = (status: TabType) => {
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

  const statusConfig = getStatusConfig(selectedApplication.status);

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
          Lamaran Kerja / Daftar Pelamar / Detail Pelamar: {selectedApplication.name}
        </Text>
      </div>

      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>
          Detail Pelamar: {selectedApplication.name}
        </Title>
        <Button type="primary" icon={<EditOutlined />}>
          Edit
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
                {selectedApplication.email}
              </Text>
            </div>
          </Col>

          <Col xs={24} sm={12}>
            <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '6px', height: '100%' }}>
              <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                Posisi Lamaran
              </Text>
              <Text strong style={{ fontSize: '15px' }}>
                {selectedApplication.position}
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
                {selectedApplication.applyDate}
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
              {selectedApplication.interviewDate ? (
                <>
                  <Text strong style={{ fontSize: '15px', display: 'block' }}>
                    {selectedApplication.interviewDate}
                  </Text>
                  <Text type="secondary" style={{ fontSize: '13px' }}>
                    {selectedApplication.interviewTime}
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
                {selectedApplication.name}
              </Text>
            </div>
          </Col>

          <Col xs={24} sm={12}>
            <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '6px', height: '100%' }}>
              <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                Alamat
              </Text>
              <Text strong style={{ fontSize: '15px' }}>
                {selectedApplication.address}
              </Text>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
