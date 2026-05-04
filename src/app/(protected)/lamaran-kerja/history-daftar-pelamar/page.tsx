import { useState, useMemo, useDeferredValue, useEffect } from "react";
import {
  DeleteOutlined,
  FilterOutlined,
  SearchOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { TJobApplicationHistory } from "@/api/dashboard/lamaran-kerja/history-daftar-pelamar/type";
import { getJobApplicationsHistory } from "@/api/dashboard/lamaran-kerja/history-daftar-pelamar/index";
import {
  Table,
  Input,
  Button,
  Typography,
  Select,
  Grid,
  message,
  Modal,
} from "antd";
import { useQuery } from "@/app/_hooks/request/use-query";
import { useDebounce } from "@/app/_hooks/use-debounce";
import { viewJobApplicationCV, deleteJobApplicationHistory } from "@/api/dashboard/lamaran-kerja/history-daftar-pelamar/index";

const { Text } = Typography;

type JobApplicationHistoryParams = {
  limit?: number;
  job_title?: string;
  search?: string;
};

export default function HistoryDaftarPelamar() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchEmail, setSearchEmail] = useState("");
  const debouncedSearchEmail = useDebounce(searchEmail, 700);
  const [searchPosition, setSearchPosition] = useState("");
  const debouncedSearchPosition = useDebounce(searchPosition, 700);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);

  const pageSize = 10;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobileOrTablet = !screens.lg;

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: [
      "job-applications-history",
      debouncedSearchEmail,
      debouncedSearchPosition,
    ],
    queryFn: () => {
      const params: JobApplicationHistoryParams = { limit: 100 };
      if (debouncedSearchEmail) params.search = debouncedSearchEmail;
      if (debouncedSearchPosition) params.job_title = debouncedSearchPosition;
      return getJobApplicationsHistory(params);
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 3,
  });

  const applications = data?.job_applications?.list ?? [];

  const handleViewCV = async (file_id: string) => {
    try {
      const url = await viewJobApplicationCV(file_id);
      window.open(url, "_blank");
    } catch (error) {
      message.error("Gagal mengambil link CV:");
    }
  };

  const handleDelete = (id: string) => {
    setSelectedDeleteId(id);
    setDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedDeleteId) return;
    try {
      await deleteJobApplicationHistory(selectedDeleteId);
      message.success("Data berhasil dihapus");
      refetch(); 
    } catch {
      message.error("Gagal menghapus data");
    } finally {
      setDeleteModal(false);
      setSelectedDeleteId(null);
    }
  };

  // Dipanggil saat user klik "Tidak" / tutup modal
  const handleDeleteCancel = () => {
    setDeleteModal(false);
    setSelectedDeleteId(null);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchEmail, debouncedSearchPosition]);

  const positionOptions = useMemo(() => {
    const unique = [
      ...new Set(applications.map((app) => app.job_title).filter(Boolean)),
    ];
    return unique.map((title) => ({ label: title, value: title }));
  }, [applications]);

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      if (debouncedSearchEmail) {
        const matchEmail = (app.email?.toLowerCase() ?? "").includes(
          debouncedSearchEmail.toLowerCase(),
        );
        if (!matchEmail) return false;
      }
      if (debouncedSearchPosition) {
        const matchPosition =
          (app.job_title?.toLowerCase() ?? "") ===
          debouncedSearchPosition.toLowerCase();
        if (!matchPosition) return false;
      }
      return true;
    });
  }, [applications, debouncedSearchEmail, debouncedSearchPosition]);

  const deferredFilteredApplications = useDeferredValue(filteredApplications);

  const columns: ColumnsType<TJobApplicationHistory> = useMemo(
    () => [
      {
        title: "NAMA",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "NO. TELP",
        dataIndex: "phone_number",
        key: "phone_number",
      },
      {
        title: "ALAMAT",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "EMAIL",
        dataIndex: "email",
        key: "email",
        sorter: (a, b) => a.email.localeCompare(b.email),
        showSorterTooltip: { title: "Klik untuk mengurutkan" },
      },
      {
        title: "POSISI LAMARAN",
        dataIndex: "job_title",
        key: "job_title",
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
        dataIndex: "file_id",
        key: "file_id",
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
        title: "ACTION",
        key: "action",
        render: (_, record) => (
          <Button
            type="default"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            style={{
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          />
        ),
      },
    ],
    [],
  );

  const handleTableChange: TableProps<TJobApplicationHistory>["onChange"] = (
    pagination,
  ) => {
    setCurrentPage(pagination.current || 1);
  };

  if (isMobileOrTablet) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="bg-white p-6 rounded-xl shadow-md text-center max-w-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Gunakan Laptop
          </h2>
          <p className="text-gray-500 text-sm">
            Halaman ini hanya dapat diakses melalui perangkat laptop atau
            desktop dengan layar yang lebar untuk pengalaman yang lebih baik.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="mb-14 text-center">
        <h1 className="text-4xl text-gray-900 mb-2">Histori Pelamar</h1>
        <h2 className="text-md text-gray-600 mb-2">
          Lihat histori pelamar yang telah mendaftar di perusahaan
        </h2>
      </div>

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
              Cari Email Pelamar
            </Text>
            <Input
              placeholder="Ketik email pelamar..."
              allowClear
              prefix={<SearchOutlined />}
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
            />
          </div>
          <div>
            <Text
              style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
            >
              Posisi Lamaran
            </Text>
            <Select
              placeholder="Pilih posisi lamaran"
              allowClear
              style={{ width: "100%" }}
              value={searchPosition || undefined}
              onChange={(value) => setSearchPosition(value ?? "")}
              options={positionOptions}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </div>
        </div>
      </div>

      <Table<TJobApplicationHistory>
        columns={columns}
        dataSource={deferredFilteredApplications}
        rowKey="id"
        loading={isLoading || isFetching}
        onChange={handleTableChange}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: deferredFilteredApplications.length,
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

      <Modal
        open={deleteModal}
        onCancel={handleDeleteCancel}
        footer={
          <div className="flex justify-center gap-2">
            <Button onClick={handleDeleteCancel}>Batal</Button>
            <Button danger type="primary" onClick={handleDeleteConfirm}>
              Ya, Hapus
            </Button>
          </div>
        }
      >
        <div className="flex flex-col items-center text-center">
          <p>Apakah Anda yakin ingin menghapus data pelamar?</p>
          <p style={{ color: "#6b7280", fontSize: "13px" }}>
            Tindakan ini tidak dapat dibatalkan.
          </p>
        </div>
      </Modal>
    </div>
  );
}
