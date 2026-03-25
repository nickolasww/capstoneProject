import { useState, useMemo, useDeferredValue, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Tabs, Input, Button, Typography, Tag } from "antd";
import {
  FilterOutlined,
  SearchOutlined,
  DownloadOutlined,
  EditOutlined,
} from "@ant-design/icons";
import type { ColumnsType, TableProps } from "antd/es/table";
import type {
  TJobApplication,
  TApplicationStatus,
} from "@/api/dashboard/lamaran-kerja/daftar-pelamar/type";
import {
  getJobApplications,
  setInterviewSchedule,
  updateJobApplication,
} from "@/api/dashboard/lamaran-kerja/daftar-pelamar/index";
import EditProgressModal from "./_components/form/edit-modal";
import { useDebounce } from "@/app/_hooks/use-debounce";
import { useQuery } from "@/app/_hooks/request/use-query";
// import { useMutation } from '@/app/_hooks/request/use-mutation';
import { viewJobApplicationCV } from "@/api/dashboard/lamaran-kerja/daftar-pelamar/index";
import { message } from "antd";
import { api } from "@/libs/axios/api";

const { Search } = Input;
const { Text } = Typography;

type JobApplicationParams = {
  limit?: number;
  status?: TApplicationStatus;
  job_title?: string;
};

type UpdateJobApplicationData = {
  status: TApplicationStatus;
  interview_at?: string;
};

export default function LamaranKerjaPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TApplicationStatus | "all">("all");
  const [searchName, setSearchName] = useState("");
  const [searchPosition, setSearchPosition] = useState("");
  const debouncedSearchName = useDebounce(searchName);
  const debouncedSearchPosition = useDebounce(searchPosition);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<TJobApplication | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Fetch job applications using React Query with caching
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["job-applications", activeTab, debouncedSearchPosition],
    queryFn: () => {
      const params: JobApplicationParams = { limit: 100 }; // Fetch more for better UX

      if (activeTab !== "all") {
        params.status = activeTab;
      }

      if (debouncedSearchPosition) {
        params.job_title = debouncedSearchPosition;
      }

      return getJobApplications(params);
    },
    staleTime: 1 * 60 * 1000, // Data considered fresh for 1 minute
    gcTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: true, // Refetch when user returns to tab
    refetchOnMount: false, // Only refetch if data is stale, not on every mount
    retry: 3,
  });

  // Update mutation
  // const updateMutation = useMutation({
  //   mutationFn: ({ id, updateData }: { id: string; updateData: UpdateJobApplicationData }) =>
  //     updateJobApplication({ id }, updateData),
  //   onSuccess: () => {
  //     // Refetch the list after successful update
  //     refetch();
  //     setIsModalOpen(false);
  //     setSelectedRecord(null);
  //   },
  //   onError: (error) => {
  //     console.error('Error updating application:', error);
  //   },
  // });

  // Extract data with safe defaults
  const applications = data?.job_applications?.list ?? [];

  // Reset to page 1 when filters change
  const handleTabChange = (key: string) => {
    setActiveTab(key as TApplicationStatus | "all");
    setCurrentPage(1);
  };

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchPosition]);

  const handleEditClick = (record: TJobApplication) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const handleModalSubmit = async (values: UpdateJobApplicationData) => {
    if (selectedRecord) {
      if (values.status === "short_listed" && values.interview_at) {
        await setInterviewSchedule({
          application_id: selectedRecord.id,
          interview_at: values.interview_at,
          application_status: "short_listed",
        });
      } else {
        await updateJobApplication(
          { id: selectedRecord.id },
          { status: values.status },
        );
      }
      refetch();
      setIsModalOpen(false);
      setSelectedRecord(null);
    }
  };

  const handleViewCV = async (file_id: string) => {
    try {
      const url = await viewJobApplicationCV(file_id);
      window.open(url, "_blank");
    } catch (error) {
      message.error("Gagal mengambil link CV:");
    }
  };

const handleShareEmail = async (type: string) => {
  try {
    const res = await api.get(`/job-applications/admin/email?type=${type}`, {
    });
    if (res.status !== 200) throw new Error("Gagal membagikan email");
    message.success("Email berhasil dibagikan!");
  } catch (err) {
    message.error("Gagal membagikan email");
  }
};

  const getStatusConfig = (status: TApplicationStatus) => {
    switch (status) {
      case "submitted":
        return { color: "#3b82f6", text: "Submitted" };
      case "short_listed":
        return { color: "#8b5cf6", text: "Tahap Interview" };
      case "hired":
        return { color: "#22c55e", text: "Hired" };
      case "rejected":
        return { color: "#ef4444", text: "Rejected" };
      default:
        return { color: "#3b82f6", text: "Submitted" };
    }
  };

  const columns: ColumnsType<TJobApplication> = [
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      showSorterTooltip: { title: "Klik untuk mengurutkan" },
      render: (email: string, record: TJobApplication) => (
        <a
          onClick={() => navigate(`/lamaran-kerja/daftar-pelamar/${record.id}`)}
          style={{
            color: "#1890ff",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          {email}
        </a>
      ),
    },
    {
      title: "POSISI LAMARAN",
      dataIndex: "job_title",
      key: "job_title",
    },
    {
      title: "NO. TELP",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "TANGGAL DAFTAR",
      dataIndex: "submitted_at",
      key: "submitted_at",
      render: (date: string) =>
        new Date(date).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    {
      title: "PDF CV",
      key: "pdf",
      render: (_, record) => (
        <Button
          type="link"
          icon={<DownloadOutlined />}
          onClick={() => handleViewCV(record.file_id)}
          style={{ color: "#16a34a", padding: 0 }}
        >
          Lihat CV
        </Button>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status: TApplicationStatus) => {
        const config = getStatusConfig(status);
        return (
          <Tag
            color={config.color}
            style={{
              padding: "4px 12px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            {config.text}
          </Tag>
        );
      },
    },
    ...(activeTab === "short_listed" ||
    activeTab === "hired" ||
    activeTab === "rejected"
      ? [
          {
            title: "JADWAL INTERVIEW",
            key: "interviewSchedule",
            render: (_: unknown, record: TJobApplication) => {
              if (record.interview_at) {
                const interviewDate = new Date(record.interview_at);
                return (
                  <div>
                    <div style={{ fontWeight: 500 }}>
                      {interviewDate.toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>
                      {interviewDate.toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      WIB
                    </div>
                  </div>
                );
              }
              return <Text type="secondary">—</Text>;
            },
          },
        ]
      : []),
    {
      title: "ACTION",
      key: "action",
      render: (_, record) => (
        <Button
          type="default"
          icon={<EditOutlined />}
          onClick={() => handleEditClick(record)}
          style={{
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          Edit Progres
        </Button>
      ),
    },
  ];

  // Memoize filtered applications to prevent recalculation on every render
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      if (!debouncedSearchName) return true;
      const searchLower = debouncedSearchName.toLowerCase();
      return (
        app.email.toLowerCase().includes(searchLower) ||
        app.job_title.toLowerCase().includes(searchLower)
      );
    });
  }, [applications, debouncedSearchName]);

  // Defer table rendering to prevent UI blocking while user is typing
  const deferredFilteredApplications = useDeferredValue(filteredApplications);

  const handleTableChange: TableProps<TJobApplication>["onChange"] = (
    pagination,
  ) => {
    setCurrentPage(pagination.current || 1);
  };

  const tabItems = [
    {
      key: "all",
      label: "Semua Pelamar",
    },
    {
      key: "submitted",
      label: "Tahap Pembekasan",
    },
    {
      key: "short_listed",
      label: "Tahap Interview",
    },
    {
      key: "hired",
      label: "Accepted",
    },
    {
      key: "rejected",
      label: "Rejected",
    },
  ];

  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-14 text-center">
        <h1 className="text-4xl  text-gray-900 mb-2">Manajemen Karir</h1>
        <p className="text-gray-600">
          Kelola data pelamar kerja dan proses rekrutmen
        </p>
      </div>

      {/* Tabs */}
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        items={tabItems}
        centered
        style={{ marginBottom: 24 }}
      />

      {/* Filter Section */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: 24,
          borderRadius: 8,
          marginBottom: 24,
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 16,
          }}
        >
          <FilterOutlined style={{ color: "#9ca3af" }} />
          <Text strong>Filter & Pencarian</Text>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          <div>
            <Text
              style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
            >
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
            <Text
              style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
            >
              Posisi Lamaran
            </Text>
            <Input
              placeholder="Posisi lamaran"
              allowClear
              value={searchPosition}
              onChange={(e) => setSearchPosition(e.target.value)}
            />
          </div>
            {["hired", "short_listed", "rejected"].includes(activeTab) && (
              <Button
                type="primary"
                onClick={() => handleShareEmail(activeTab)}
                style={{
                  background: "#22c55e",
                  borderColor: "#22c55e",
                }}
              >
                Bagikan Email
              </Button>
            )}
        </div>
      </div>

      {/* Table */}
      <Table<TJobApplication>
        columns={columns}
        dataSource={deferredFilteredApplications || []}
        rowKey="id"
        loading={isLoading || isFetching}
        onChange={handleTableChange}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: deferredFilteredApplications?.length ?? 0,
          showSizeChanger: false,
          showTotal: (total, range) =>
            `Menampilkan ${range[0]}-${range[1]} dari ${total} data`,
          style: { marginRight: "16px" },
        }}
        bordered
        style={{
          backgroundColor: "#fff",
          borderRadius: 8,
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
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
