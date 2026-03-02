import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Tabs, Input, Button, Typography, Tag } from 'antd';
import { FilterOutlined, SearchOutlined, DownloadOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type { TJobApplication, TApplicationStatus } from '@/api/dashboard/lamaran-kerja/daftar-pelamar/type';
import { getJobApplications, updateJobApplication } from '@/api/dashboard/lamaran-kerja/daftar-pelamar/index';
import EditProgressModal from './_components/form/edit-modal';

const { Search } = Input;
const { Text } = Typography;

export default function LamaranKerjaPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TApplicationStatus | 'all'>('all');
  const [searchName, setSearchName] = useState('');
  const [searchPosition, setSearchPosition] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<TJobApplication | null>(null);
  const [applications, setApplications] = useState<TJobApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Fetch applications when tab changes or page changes
  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const params: any = { limit: pageSize };
        
        if (activeTab !== 'all') {
          params.status = activeTab;
        }
        
        if (searchPosition) {
          params.job_title = searchPosition;
        }
        
        console.log('Fetching with params:', params);
        const response = await getJobApplications(params);
        console.log('Response received:', response);
        
        if (response && response.job_applications) {
          setApplications(response.job_applications.items || []);
          setNextCursor(response.job_applications.next_cursor);
          setHasMore(!!response.job_applications.next_cursor);
        } else {
          console.error('Invalid response structure:', response);
          setApplications([]);
          setNextCursor(null);
          setHasMore(false);
        }
        setCurrentPage(1);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setApplications([]);
        setNextCursor(null);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [activeTab, searchPosition]);

  // Load more data for pagination
  const loadMore = async () => {
    if (!nextCursor || loading) return;
    
    setLoading(true);
    try {
      const params: any = { limit: pageSize, cursor: nextCursor };
      
      if (activeTab !== 'all') {
        params.status = activeTab;
      }
      
      if (searchPosition) {
        params.job_title = searchPosition;
      }
      
      const response = await getJobApplications(params);
      setApplications([...(applications || []), ...(response.job_applications.items || [])]);
      setNextCursor(response.job_applications.next_cursor);
      setHasMore(!!response.job_applications.next_cursor);
    } catch (error) {
      console.error('Error loading more applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (record: TJobApplication) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const handleModalSubmit = async (values: {
    status: TApplicationStatus;
    interview_at?: string;
  }) => {
    if (selectedRecord) {
      try {
        // Update the status and interview_at if provided
        const updateData: any = {
          status: values.status,
        };
        
        if (values.interview_at) {
          updateData.interview_at = values.interview_at;
        }
        
        await updateJobApplication({ id: selectedRecord.id }, updateData);
        
        // Refresh the list
        const params: any = { limit: pageSize };
        if (activeTab !== 'all') {
          params.status = activeTab;
        }
        const response = await getJobApplications(params);
        setApplications(response.job_applications.items || []);
        setNextCursor(response.job_applications.next_cursor);
        setHasMore(!!response.job_applications.next_cursor);
        setIsModalOpen(false);
        setSelectedRecord(null);
      } catch (error) {
        console.error('Error updating application:', error);
      }
    }
  };

  const getStatusConfig = (status: TApplicationStatus) => {
    switch (status) {
      case 'submitted':
        return { color: '#3b82f6', text: 'Submitted' };
      case 'short_listed':
        return { color: '#8b5cf6', text: 'Short Listed' };
      case 'hired':
        return { color: '#22c55e', text: 'Hired' };
      case 'rejected':
        return { color: '#ef4444', text: 'Rejected' };
      default:
        return { color: '#9ca3af', text: 'Submitted' };
    }
  };

  const columns: ColumnsType<TJobApplication> = [
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      showSorterTooltip: { title: 'Klik untuk mengurutkan' },
      render: (email: string, record: TJobApplication) => (
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
      dataIndex: 'job_title',
      key: 'job_title',
    },
    {
      title: 'NO. TELP',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'TANGGAL DAFTAR',
      dataIndex: 'submitted_at',
      key: 'submitted_at',
      render: (date: string) => new Date(date).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
    },
    {
      title: 'PDF CV',
      key: 'pdf',
      render: (_, record) => (
        <Button 
          type="link" 
          icon={<DownloadOutlined />}
          href={record.cv_path}
          target="_blank"
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
    ...(activeTab === 'short_listed' || activeTab === 'hired' || activeTab === 'rejected'
      ? [{
          title: 'JADWAL INTERVIEW',
          key: 'interviewSchedule',
          render: (_: any, record: TJobApplication) => {
            if (record.interview_at) {
              const interviewDate = new Date(record.interview_at);
              return (
                <div>
                  <div style={{ fontWeight: 500 }}>
                    {interviewDate.toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    {interviewDate.toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })} WIB
                  </div>
                </div>
              );
            }
            return <Text type="secondary">—</Text>;
          },
        }]
      : []),
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

  // Client-side filtering for name/email search
  const filteredApplications = applications.filter((app) => {
    if (!searchName) return true;
    const searchLower = searchName.toLowerCase();
    return (
      app.email.toLowerCase().includes(searchLower) ||
      app.job_title.toLowerCase().includes(searchLower)
    );
  });

  const handleTableChange: TableProps<TJobApplication>['onChange'] = (pagination) => {
    const newPage = pagination.current || 1;
    
    // If moving to next page and we need more data
    const totalItems = filteredApplications?.length ?? 0;
    if (newPage > currentPage && newPage * pageSize > totalItems && hasMore) {
      loadMore();
    }
    
    setCurrentPage(newPage);
  };

  const tabItems = [
    {
      key: 'all',
      label: 'Semua Pelamar',
    },
    {
      key: 'submitted',
      label: 'Tahap Pembekasan',
    },
    {
      key: 'short_listed',
      label: 'Tahap Interview',
    },
    {
      key: 'hired',
      label: 'Accepted',
    },
    {
      key: 'rejected',
      label: 'Rejected',
    },
  ];

  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-14 text-center">
        <h1 className="text-4xl  text-gray-900 mb-2">Manajemen Karir</h1>
        <p className="text-gray-600">Kelola data pelamar kerja dan proses rekrutmen</p>
      </div>

      {/* Tabs */}
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as TApplicationStatus | 'all')}
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
      <Table<TJobApplication>
        columns={columns}
        dataSource={filteredApplications || []}
        rowKey="id"
        loading={loading}
        onChange={handleTableChange}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredApplications?.length ?? 0,
          showSizeChanger: false,
          showTotal: (total, range) => `Menampilkan ${range[0]}-${range[1]} dari ${total} data${hasMore ? '+' : ''}`,
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
