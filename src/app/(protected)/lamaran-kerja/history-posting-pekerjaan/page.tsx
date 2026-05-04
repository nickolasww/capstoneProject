import { useState, useMemo, useDeferredValue} from "react";
import {
  FilterOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import type { ColumnsType, TableProps } from "antd/es/table";
import type {TPostingPekerjaanHistory} from "@/api/dashboard/lamaran-kerja/histori-posting-pekerjaan/type";
import { getPostingHistory, restoreJobPosting } from "@/api/dashboard/lamaran-kerja/histori-posting-pekerjaan";
import {
  Table,
  Button,
  Typography,
  Select,
  Grid,
  message,
} from "antd";
import { useQuery } from "@/app/_hooks/request/use-query";
import { useDebounce } from "@/app/_hooks/use-debounce";

const { Text } = Typography;

type JobPostingHistoryParams = {
  limit?: number;
  job_title?: string;
  search?: string;
};

export default function HistoryPostingPekerjaan() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPosition, setSearchPosition] = useState("");
  const debouncedSearchPosition = useDebounce(searchPosition, 700);

  const pageSize = 10;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobileOrTablet = !screens.lg;

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: [
      "job-positions-history",
      debouncedSearchPosition,
    ],
    queryFn: () => {
      const params: JobPostingHistoryParams = { limit: 100 };
      if (debouncedSearchPosition) params.job_title = debouncedSearchPosition;
      return getPostingHistory(params);
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 3,
  });

  const applications = data?.job_positions?.list ?? [];


  const handleRestore = async (job_id: string) => {
    try {
      await restoreJobPosting(job_id);
      message.success("Lowongan berhasil dipulihkan");
      refetch();
    } catch (error) {
      console.error("Error restoring job posting:", error);
      message.error("Gagal memulihkan lowongan. Silakan coba lagi.");
    }
  };

  const positionOptions = useMemo(() => {
    const unique = [
      ...new Set(applications.map((app) => app.title).filter(Boolean)),
    ];
    return unique.map((title) => ({ label: title, value: title }));
  }, [applications]);

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      if (debouncedSearchPosition) {
        const matchPosition =
          (app.title?.toLowerCase() ?? "") ===
          debouncedSearchPosition.toLowerCase();
        if (!matchPosition) return false;
      }
      return true;
    });
  }, [applications, debouncedSearchPosition]);

  const deferredFilteredApplications = useDeferredValue(filteredApplications);

  const columns: ColumnsType<TPostingPekerjaanHistory> = useMemo(
    () => [
      {
        title: "ID POSISI",
        dataIndex: "id",
        key: "id",
        render: (id: string) => id?.split("-")[0] ?? "-",
      },
      {
        title: "NAMA PEKERJAAN",
        dataIndex: "title",
        key: "title",
      },
      {
        title:"LOKASI", 
        dataIndex: "location",
        key: "location",
      },
      {
        title: "TIPE PEKERJAAN",
        dataIndex: "employment_type",
        key: "employment_type",
      },
      {
        title: "DEPARTEMEN",
        dataIndex: "department",
        key: "department",
      },
      {
        title: "GAJI",
        dataIndex: "salary",
        key: "salary",
      },
      {
        title:" DITUTUP PADA",
        dataIndex: "closed_at",
        key: "closed_at",
        render: (date: string) =>
        new Date(date).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }),
      },
      {
        title: "ACTION",
        key: "action",
        render: (_, record) => (
          <Button
            type="default"
            icon={<UndoOutlined />}
            onClick={() => handleRestore(record.id)}
            style={{
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#E17100",
              borderColor: "#E17100",
              backgroundColor: "#FEE685"
            }}
          >
            Restore
          </Button>
        ),
      },
    ],
    [],
  );

  const handleTableChange: TableProps<TPostingPekerjaanHistory>["onChange"] = (
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
          style={{ display: "grid", gap: 16 }}
        >
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

      <Table<TPostingPekerjaanHistory>
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
    </div>
  );
}
