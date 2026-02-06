'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Tabs, Input, Button, Typography, Tag } from 'antd';
import { FilterOutlined, SearchOutlined, DownloadOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType, TableProps } from 'antd/es/table';
import EditProgressModal from './_components/form/edit-modal';

const { Search } = Input;
const { Text } = Typography;

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
  // Tahap Pembekasan
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
  // Tahap Interview
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
  // Tahap Diterima
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
  // Belum Diperiksa
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

export default function LamaranKerjaPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('pendaftar');
  const [searchName, setSearchName] = useState('');
  const [searchPosition, setSearchPosition] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Application | null>(null);
  const [applications, setApplications] = useState<Application[]>(mockApplications);

  const filteredApplications = applications.filter(
    (app) =>
      app.status === activeTab &&
      app.name.toLowerCase().includes(searchName.toLowerCase()) &&
      app.position.toLowerCase().includes(searchPosition.toLowerCase())
  );

  const handleEditClick = (record: Application) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const handleModalSubmit = (values: {
    status: TabType;
    interviewDate?: string;
    interviewTime?: string;
  }) => {
    if (selectedRecord) {
      const updatedApplications = applications.map((app) => {
        if (app.id === selectedRecord.id) {
          return {
            ...app,
            status: values.status,
            interviewDate: values.interviewDate,
            interviewTime: values.interviewTime,
          };
        }
        return app;
      });
      setApplications(updatedApplications);
      setIsModalOpen(false);
      setSelectedRecord(null);
    }
  };

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

  const columns: ColumnsType<Application> = [
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      showSorterTooltip: { title: 'Klik untuk mengurutkan' },
      render: (email: string, record: Application) => (
        <a
          onClick={() => navigate(`/lamaran-kerja/daftar-pelamar/${record.id}`)}
          style={{
            color: '#1890ff',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          {email}
        </a>
      ),
    },
    {
      title: 'POSISI LAMARAN',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'TANGGAL DAFTAR',
      dataIndex: 'applyDate',
      key: 'applyDate',
    },
    {
      title: 'PDF CV',
      key: 'pdf',
      render: () => (
        <Button 
          type="link" 
          icon={<DownloadOutlined />}
          style={{ color: '#16a34a', padding: 0 }}
        >
          Lihat CV
        </Button>
      ),
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status: TabType) => {
        const config = getStatusConfig(status);
        return (
          <Tag 
            color={config.color}
            style={{ 
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 500,
            }}
          >
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: 'JADWAL INTERVIEW',
      key: 'interviewSchedule',
      render: (_, record) => {
        if (record.interviewDate && record.interviewTime) {
          return (
            <div>
              <div style={{ fontWeight: 500 }}>{record.interviewDate}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>{record.interviewTime}</div>
            </div>
          );
        }
        return <Text type="secondary">—</Text>;
      },
    },
    {
      title: 'ACTION',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="default"
          icon={<EditOutlined />}
          onClick={() => handleEditClick(record)}
          style={{ 
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          Edit Progres
        </Button>
      ),
    },
  ];

  const handleTableChange: TableProps<Application>['onChange'] = (pagination) => {
    setCurrentPage(pagination.current || 1);
    setPageSize(pagination.pageSize || 10);
  };

  const tabItems = [
    {
      key: 'pendaftar',
      label: 'Semua Pelamar',
    },
    {
      key: 'pembekasan',
      label: 'Tahap Pembekasan',
    },
    {
      key: 'interview',
      label: 'Tahap Interview',
    },
    {
      key: 'diterima',
      label: 'Tahap Diterima',
    },
    {
      key: 'ditolak',
      label: 'Belum Diperiksa',
    },
  ];

  return (
    <div style={{ padding: '24px 32px' }}>
      {/* Header */}
      <div style={{ marginBottom: 32, textAlign: 'center', flexDirection: 'column', display: 'flex' }}>
        <Text  style={{ margin: 0, fontSize: '3rem' }}>
          Manajemen Karir
        </Text>
        <Text type="secondary" style={{ fontSize: '1rem' }}>
          Kelola data pelamar kerja dan proses rekrutmen
        </Text>
      </div>

      {/* Tabs */}
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as TabType)}
        items={tabItems}
        centered
        style={{ marginBottom: 24 }}
      />

      {/* Filter Section */}
      <div
        style={{
          backgroundColor: '#fff',
          padding: 24,
          borderRadius: 8,
          marginBottom: 24,
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <FilterOutlined style={{ color: '#9ca3af' }} />
          <Text strong>Filter & Pencarian</Text>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <Text style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              Cari Nama atau Posisi
            </Text>
            <Search
              placeholder="Ketik nama atau posisi..."
              allowClear
              prefix={<SearchOutlined />}
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>

          <div>
            <Text style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              Posisi Lamaran
            </Text>
            <Input
              placeholder="Posisi lamaran"
              allowClear
              value={searchPosition}
              onChange={(e) => setSearchPosition(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <Table<Application>
        columns={columns}
        dataSource={filteredApplications}
        rowKey="id"
        onChange={handleTableChange}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredApplications.length,
          showSizeChanger: true,
          showTotal: (total, range) => `Menampilkan ${range[0]} dari ${total} data`,
          pageSizeOptions: ['10', '20', '50', '100'],
          style: { marginRight: '16px' },
        }}
        bordered
        style={{
          backgroundColor: '#fff',
          borderRadius: 8,
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        }}
      />

      {/* Modal Edit Progres */}
      <EditProgressModal
        open={isModalOpen}
        onCancel={handleModalCancel}
        onSubmit={handleModalSubmit}
        record={selectedRecord}
      />
    </div>
  );
}
