import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, type JSX } from "react";
import { useSession } from "@/app/_components/providers/session";
import imgLogo from "@/assets/logo PT BAS.png";
import {
  HomeOutlined,
  ToolOutlined,
  BuildOutlined,
  ShoppingCartOutlined,
  BankOutlined,
  ReadOutlined,
  InboxOutlined,
  FileTextOutlined,
  TeamOutlined,
  UserOutlined,
  SolutionOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

interface SubMenuItem {
  path: string;
  label: string;
  icon: JSX.Element;
}

interface MenuItem {
  path?: string;
  label: string;
  icon: JSX.Element;
  submenu?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  { path: "/dashboard", label: "Dashboard", icon: <HomeOutlined /> },
  {
    path: "/sewa-alat-berat",
    label: "Sewa Alat Berat",
    icon: <ToolOutlined />,
  },
  {
    path: "/permintaan-jasa-konstruksi",
    label: "Jasa Konstruksi",
    icon: <BuildOutlined />,
  },
  {
    path: "/pembelian-barang",
    label: "Pembelian Barang",
    icon: <ShoppingCartOutlined />,
  },
  {
    label: "Lamaran Kerja",
    icon: <BankOutlined />,
    submenu: [
      {
        path: "/lamaran-kerja/daftar-pelamar",
        label: "Daftar Pelamar",
        icon: <UserOutlined />,
      },
      {
        path: "/lamaran-kerja/posting-pekerjaan",
        label: "Posting Pekerjaan",
        icon: <SolutionOutlined />,
      },
    ],
  },
  {
    path: "/pendaftaran-beasiswa",
    label: "Pendaftaran Beasiswa",
    icon: <ReadOutlined />,
  },
  { path: "/stok-produk", label: "Stok Produk", icon: <InboxOutlined /> },
  {
    path: "/tender-management",
    label: "Tender Management",
    icon: <FileTextOutlined />,
  },
  { path: "/set-role", label: "Set Role", icon: <TeamOutlined /> },
];

export default function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useSession();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <aside
      className={`
        bg-white border-r border-gray-200 flex flex-col fixed top-0 left-0 h-screen z-40
        w-16 lg:w-64   // 🔥 MOBILE kecil, DESKTOP normal
      `}
    >
      {/* ========================= */}
      {/* 🔥 LOGO */}
      {/* ========================= */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-center lg:justify-start">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0">
            <img
              src={imgLogo}
              alt="PT BAS Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* ❌ Hidden di mobile */}
          <div className="hidden lg:block">
            <h2 className="font-bold text-sm text-gray-900">PT BUKIT AURUMN</h2>
            <p className="text-xs text-gray-600">SEJAHTERA</p>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* 🔥 MENU */}
      {/* ========================= */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2 lg:px-3">
          {menuItems.map((item) => {
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const isActive = item.path
              ? location.pathname === item.path
              : false;

            const isSubmenuActive =
              hasSubmenu &&
              item.submenu?.some((sub) => location.pathname === sub.path);

            const isDropdownOpen = openDropdown === item.label;

            return (
              <li key={item.label}>
                {hasSubmenu ? (
                  <>
                    {/* 🔹 Parent */}
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={`
                        w-full flex items-center justify-center lg:justify-start
                        gap-3 px-3 py-2.5 rounded-lg
                        ${
                          isSubmenuActive
                            ? "bg-green-50 text-green-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }
                      `}
                    >
                      {item.icon}

                      {/* ❌ Hidden di mobile */}
                      <span className="hidden lg:block text-sm flex-1 text-left relative">
                        {item.label}
                      </span>
                    </button>

                    {/* 🔹 Submenu (desktop only biar ga aneh di mobile) */}
                    {isDropdownOpen && (
                      <ul
                        className={`absolute left-16 -translate-y-7 lg:translate-y-0 bg-white shadow-lg rounded-md p-2 z-50 space-y-1 min-w-45
                          lg:static lg:ml-6 lg:bg-transparent lg:shadow-none lg:p-0`}
                      >
                        {item.submenu?.map((sub) => (
                          <li key={sub.path}>
                            <Link
                              to={sub.path}
                              className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path!}
                    className={`
                      flex items-center justify-center lg:justify-start
                      gap-3 px-3 py-2.5 rounded-lg
                      ${
                        isActive
                          ? "bg-green-50 text-green-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }
                    `}
                  >
                    {item.icon}

                    {/* ❌ Hidden di mobile */}
                    <span className="hidden lg:block text-sm">
                      {item.label}
                    </span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ========================= */}
      {/* 🔥 LOGOUT */}
      {/* ========================= */}
      <div className="border-t border-gray-200 ">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 rounded-lg px-3 py-4"
        >
          <LogoutOutlined />

          {/* ❌ Hidden di mobile */}
          <span className="hidden lg:block">Logout</span>
        </button>
      </div>
    </aside>
  );
}
