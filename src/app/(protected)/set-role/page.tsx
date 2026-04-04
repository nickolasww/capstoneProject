import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Table, Input, Button, Typography, Tag } from "antd";
import {
  SearchOutlined,
  EditOutlined,
} from "@ant-design/icons";
import type { ColumnsType, TableProps } from "antd/es/table";
import type {
  TJobApplication,
} from "@/api/dashboard/lamaran-kerja/daftar-pelamar/type";
import { Grid } from "antd";

const { Search } = Input;
const { Text } = Typography;

export default function setRole() {
  // const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const isMobileOrTablet = !screens.lg;

  const columns: ColumnsType<TJobApplication> = [
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      width: "40%",
      sorter: (a, b) => a.email.localeCompare(b.email),
      showSorterTooltip: { title: "Klik untuk mengurutkan" },
    },
    {
      title: "TANGGAL DAFTAR",
      dataIndex: "submitted_at",
      key: "submitted_at",
      width: "20%",
      render: (date: string) =>
        new Date(date).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      width: "20%",
      render: () => {
        return (
          <Tag
            style={{
              padding: "4px 12px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            text
          </Tag>
        );
      },
    },
    {
      title: "ACTION",
      key: "action",
      width: "20%",
      render: () => (
        <Button
          type="default"
          icon={<EditOutlined />}
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

  const handleTableChange: TableProps<TJobApplication>["onChange"] = (
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
      {/* Header Section */}
      <div className="mb-14 text-center">
        <h1 className="text-4xl  text-gray-900 mb-2">Set Role</h1>
      </div>

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
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}
        >
          <div>
            <Text
              style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
            >
              Cari Email
            </Text>
            <Search
              placeholder="Ketik email..."
              allowClear
              prefix={<SearchOutlined />}
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <Table<TJobApplication>
        columns={columns}
        rowKey="id"
        onChange={handleTableChange}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
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
