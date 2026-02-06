'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Tabs, Input, Button, Typography, Tag } from 'antd';
import { FilterOutlined, SearchOutlined, DownloadOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type { TApplication, TApplicationStatus } from '@/api/lamaran-kerja/daftar-pelamar/type';
import { getApplications, updateApplication } from '@/api/lamaran-kerja/daftar-pelamar';
import EditProgressModal from './_components/form/edit-modal';

const { Search } = Input;
const { Text } = Typography;

export default function LamaranKerjaPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TApplicationStatus>('pendaftar');
  const [searchName, setSearchName] = useState('');
  const [searchPosition, setSearchPosition] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<TApplication | null>(null);
  const [applications, setApplications] = useState<TApplication[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch applications when tab changes
  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const response = await getApplications({ status: activeTab });
        setApplications(response.data.items);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [activeTab]);

  const filteredApplications = applications.filter(
    (app) =>
      app.name.toLowerCase().includes(searchName.toLowerCase()) &&
      app.position.toLowerCase().includes(searchPosition.toLowerCase())
  );

  const handleEditClick = (record: TApplication) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const handleModalSubmit = async (values: {
    status: TApplicationStatus;
    interview_date?: string;
    interview_time?: string;
  }) => {
    if (selectedRecord) {
      try {
        await updateApplication({ id: selectedRecord.id }, {
          ...selectedRecord,
          status: values.status,
          interview_date: values.interview_date,
          interview_time: values.interview_time,
        });
        
        // Refresh the list
        const response = await getApplications({ status: activeTab });
        setApplications(response.data.items);
        setIsModalOpen(false);
        setSelectedRecord(null);
      } catch (error) {
        console.error('Error updating application:', error);
      }
    }
  };

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

  const columns: ColumnsType<TApplication> = [
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      showSorterTooltip: { title: 'Klik untuk mengurutkan' },
      render: (email: string, record: TApplication) => (
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
      dataIndex: 'apply_date',
      key: 'apply_date',
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
      render: (status: TApplicationStatus) => {
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
        if (record.interview_date && record.interview_time) {
          return (
            <div>
              <div style={{ fontWeight: 500 }}>{record.interview_date}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>{record.interview_time}</div>
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

  const handleTableChange: TableProps<TApplication>['onChange'] = (pagination) => {
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
        onChange={(key) => setActiveTab(key as TApplicationStatus)}
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
      <Table<TApplication>
        columns={columns}
        dataSource={filteredApplications}
        rowKey="id"
        loading={loading}
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
