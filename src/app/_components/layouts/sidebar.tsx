import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, type JSX } from 'react';
import imgLogo from '@/assets/LoginPage/logo PT BAS.png';
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
} from '@ant-design/icons';

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
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: <HomeOutlined className="text-lg" />,
  },
  {
    path: '/sewa-alat-berat',
    label: 'Sewa Alat Berat',
    icon: <ToolOutlined className="text-lg" />,
  },
  {
    path: '/permintaan-jasa-konstruksi',
    label: 'Permintaan Jasa Konstruksi',
    icon: <BuildOutlined className="text-lg" />,
  },
  {
    path: '/pembelian-barang',
    label: 'Pembelian Barang',
    icon: <ShoppingCartOutlined className="text-lg" />,
  },
  {
    label: 'Lamaran Kerja',
    icon: <BankOutlined className="text-lg" />,
    submenu: [
      { path: '/lamaran-kerja/daftar-pelamar', label: 'Daftar Pelamar', icon: <UserOutlined /> },
      { path: '/lamaran-kerja/posting-pekerjaan', label: 'Posting Pekerjaan', icon: <SolutionOutlined /> },
    ],
  },
  {
    path: '/pendaftaran-beasiswa',
    label: 'Pendaftaran Beasiswa',
    icon: <ReadOutlined className="text-lg" />,
  },
  {
    path: '/stok-produk',
    label: 'Stok Produk',
    icon: <InboxOutlined className="text-lg" />,
  },
  {
    path: '/tender-management',
    label: 'Tender Management',
    icon: <FileTextOutlined className="text-lg" />,
  },
  {
    path: '/set-role',
    label: 'Set Role',
    icon: <TeamOutlined className="text-lg" />,
  },
];

export default function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <aside
      className="bg-white border-r border-gray-200 w-64 flex flex-col"
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0">
            <img
              src={imgLogo}
              alt="PT BAS Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-sm leading-tight text-gray-900 truncate">
              PT BUKIT AURUMN
            </h2>
            <p className="text-xs text-gray-600 truncate">SEJAHTERA</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            const isActive = item.path ? location.pathname === item.path : false;
            const isSubmenuActive = hasSubmenu && item.submenu?.some(sub => location.pathname === sub.path);
            const isDropdownOpen = openDropdown === item.label;

            return (
              <li key={item.label}>
                {hasSubmenu ? (
                  <>
                    {/* Parent with submenu */}
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isSubmenuActive
                          ? 'bg-green-50 text-green-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="shrink-0">{item.icon}</span>
                      <span className="text-sm flex-1 truncate text-left">{item.label}</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Submenu */}
                    {isDropdownOpen && (
                      <ul className="mt-1 ml-8 space-y-1">
                        {item.submenu?.map((subItem) => {
                          const isSubActive = location.pathname === subItem.path;
                          return (
                            <li key={subItem.path}>
                              <Link
                                to={subItem.path}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                                  isSubActive
                                    ? 'bg-green-50 text-green-700 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                              >
                                <span className="shrink-0">{subItem.icon}</span>
                                {subItem.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </>
                ) : (
                  /* Regular menu item */
                  <Link
                    to={item.path!}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-green-50 text-green-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    <span className="text-sm flex-1 truncate">{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className=" border-t border-gray-200">
        <button
          onClick={() => navigate('/auth/login')}
          className="w-full flex items-center justify-center gap-2 px-3 py-4 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogoutOutlined className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
