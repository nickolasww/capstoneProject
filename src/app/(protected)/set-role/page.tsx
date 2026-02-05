'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

interface Permission {
  update: boolean;
  create: boolean;
  view: boolean;
  delete: boolean;
}

interface ModulePermissions {
  [key: string]: Permission;
}

interface SavedUserRole {
  id: string;
  email: string;
  role: string;
  permissions: ModulePermissions;
  savedAt: string;
}

const modules = [
  { id: 'karir', name: 'Karir', description: 'Manajemen lowongan dan pelamar kerja' },
  { id: 'sewa-alat', name: 'Sewa Alat Berat', description: 'Manajemen rental alat konstruksi' },
  { id: 'jasa-konstruksi', name: 'Jasa Konstruksi', description: 'Manajemen permintaan jasa konstruksi' },
  { id: 'pembelian', name: 'Pembelian Barang', description: 'Manajemen pembelian dan procurement' },
  { id: 'beasiswa', name: 'Beasiswa', description: 'Manajemen pendaftaran beasiswa' },
  { id: 'stok-produk', name: 'Stok Produk', description: 'Manajemen inventory dan stok' },
  { id: 'tender', name: 'Tender Management', description: 'Manajemen tender proyek' }
];

const initialSavedUsers: SavedUserRole[] = [
  {
    id: '1',
    email: 'admin@ptbas.com',
    role: 'admin',
    permissions: {
      'karir': { update: true, create: true, view: true, delete: false },
      'sewa-alat': { update: true, create: true, view: true, delete: false },
      'jasa-konstruksi': { update: false, create: false, view: true, delete: false },
      'pembelian': { update: false, create: false, view: true, delete: false },
      'beasiswa': { update: false, create: false, view: true, delete: false },
      'stok-produk': { update: false, create: false, view: true, delete: false },
      'tender': { update: false, create: false, view: true, delete: false },
    },
    savedAt: '05/02/2026 10:30'
  },
  {
    id: '2',
    email: 'superadmin@ptbas.com',
    role: 'superadmin',
    permissions: {
      'karir': { update: true, create: true, view: true, delete: true },
      'sewa-alat': { update: true, create: true, view: true, delete: true },
      'jasa-konstruksi': { update: true, create: true, view: true, delete: true },
      'pembelian': { update: true, create: true, view: true, delete: true },
      'beasiswa': { update: true, create: true, view: true, delete: true },
      'stok-produk': { update: true, create: true, view: true, delete: true },
      'tender': { update: true, create: true, view: true, delete: true },
    },
    savedAt: '04/02/2026 14:15'
  }
];

const createInitialPermissions = (): ModulePermissions => {
  const initial: ModulePermissions = {};
  modules.forEach(module => {
    initial[module.id] = {
      update: false,
      create: false,
      view: false,
      delete: false
    };
  });
  return initial;
};

export default function SetRole() {
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [permissions, setPermissions] = useState<ModulePermissions>(createInitialPermissions);
  const [savedUsers, setSavedUsers] = useState<SavedUserRole[]>(initialSavedUsers);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handlePermissionChange = (moduleId: string, permissionType: keyof Permission) => {
    setPermissions(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [permissionType]: !prev[moduleId][permissionType]
      }
    }));
  };

  const handleSave = async () => {
    // Validation
    if (!selectedEmail || !selectedRole) {
      alert('Silakan isi email dan pilih role terlebih dahulu');
      return;
    }

    setIsSaving(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if user already exists
    const existingIndex = savedUsers.findIndex(u => u.email === selectedEmail);

    const newUserRole: SavedUserRole = {
      id: existingIndex >= 0 ? savedUsers[existingIndex].id : Date.now().toString(),
      email: selectedEmail,
      role: selectedRole,
      permissions: { ...permissions },
      savedAt: new Date().toLocaleString('id-ID')
    };

    if (existingIndex >= 0) {
      // Update existing user
      setSavedUsers(prev => prev.map((u, i) => i === existingIndex ? newUserRole : u));
    } else {
      // Add new user
      setSavedUsers(prev => [...prev, newUserRole]);
    }

    setIsSaving(false);
    setShowSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);

    // Reset form
    setSelectedEmail('');
    setSelectedRole('');
    setPermissions(createInitialPermissions());
  };

  const handleEditUser = (user: SavedUserRole) => {
    setSelectedEmail(user.email);
    setSelectedRole(user.role);
    setPermissions(user.permissions);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus user ini?')) {
      setSavedUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      'admin': 'Admin',
      'superadmin': 'Super Admin',
      'moderator': 'Moderator',
      'viewer': 'Viewer'
    };
    return labels[role] || role;
  };

  const countPermissions = (perms: ModulePermissions) => {
    let count = 0;
    Object.values(perms).forEach(p => {
      if (p.update) count++;
      if (p.create) count++;
      if (p.view) count++;
      if (p.delete) count++;
    });
    return count;
  };

  return (
    <div className="p-6 lg:p-8">
      {showSuccess && (
        <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-pulse">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <Check size={16} className="text-green-500" strokeWidth={3} />
          </div>
          <span className="font-medium">Perubahan berhasil disimpan!</span>
        </div>
      )}

      <div className="mb-8">
        <h1 className="font-['Poppins'] text-[32px] font-semibold text-black mb-2">
          Update and Set Role
        </h1>
        <p className="font-['Poppins'] text-base text-gray-600">
          Pilih role yang sesuai per fitur admin
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-['Poppins'] text-sm font-medium text-gray-700 mb-2">
              Client - Email
            </label>
            <input
              type="email"
              value={selectedEmail}
              onChange={(e) => setSelectedEmail(e.target.value)}
              placeholder="Masukkan email client"
              className="w-full h-[48px] px-4 border border-gray-300 rounded-lg font-['Poppins'] text-base text-black placeholder:text-gray-400 focus:outline-none focus:border-[#4d9232] focus:ring-2 focus:ring-[#4d9232]/20 transition-all"
            />
          </div>

          <div>
            <label className="block font-['Poppins'] text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full h-[48px] px-4 border border-gray-300 rounded-lg font-['Poppins'] text-base text-black focus:outline-none focus:border-[#4d9232] focus:ring-2 focus:ring-[#4d9232]/20 transition-all appearance-none bg-white cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 16px center'
              }}
            >
              <option value="">Pilih Role</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
              <option value="moderator">Moderator</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="h-[48px] px-8 bg-[#4d9232] hover:bg-[#3d7527] disabled:bg-gray-400 rounded-lg font-['Poppins'] text-base font-medium text-white transition-colors shadow-sm flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Menyimpan...
              </>
            ) : (
              'Simpan Perubahan'
            )}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="font-['Poppins'] text-xl font-semibold text-black mb-1">
          Permission Management
        </h2>
        <p className="font-['Poppins'] text-sm text-gray-600">
          Atur hak akses untuk setiap modul sistem
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {modules.map((module) => (
          <PermissionCard
            key={module.id}
            module={module}
            permissions={permissions[module.id]}
            onPermissionChange={(permissionType) =>
              handlePermissionChange(module.id, permissionType)
            }
          />
        ))}
      </div>

      <div className="mb-4">
        <h2 className="font-['Poppins'] text-xl font-semibold text-black mb-1">
          User Roles yang Tersimpan
        </h2>
        <p className="font-['Poppins'] text-sm text-gray-600">
          Daftar user dengan role dan permission yang sudah dikonfigurasi
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left font-['Poppins'] text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-4 text-left font-['Poppins'] text-sm font-semibold text-gray-700">Role</th>
              <th className="px-6 py-4 text-left font-['Poppins'] text-sm font-semibold text-gray-700">Permissions</th>
              <th className="px-6 py-4 text-left font-['Poppins'] text-sm font-semibold text-gray-700">Disimpan</th>
              <th className="px-6 py-4 text-left font-['Poppins'] text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {savedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-['Poppins'] text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === 'superadmin' ? 'bg-purple-100 text-purple-700' :
                    user.role === 'admin' ? 'bg-blue-100 text-blue-700' :
                      user.role === 'moderator' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                    }`}>
                    {getRoleLabel(user.role)}
                  </span>
                </td>
                <td className="px-6 py-4 font-['Poppins'] text-sm text-gray-600">
                  {countPermissions(user.permissions)} izin aktif
                </td>
                <td className="px-6 py-4 font-['Poppins'] text-sm text-gray-600">{user.savedAt}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="px-3 py-1 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="px-3 py-1 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {savedUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  Belum ada user role yang tersimpan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface PermissionCardProps {
  module: {
    id: string;
    name: string;
    description: string;
  };
  permissions: Permission;
  onPermissionChange: (permissionType: keyof Permission) => void;
}

function PermissionCard({ module, permissions, onPermissionChange }: PermissionCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="mb-4">
        <h3 className="font-['Poppins'] text-lg font-semibold text-black mb-1">
          {module.name}
        </h3>
        <p className="font-['Poppins'] text-sm text-gray-600">
          {module.description}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <PermissionCheckbox
          label="Update"
          checked={permissions.update}
          onChange={() => onPermissionChange('update')}
          color="blue"
        />
        <PermissionCheckbox
          label="Create"
          checked={permissions.create}
          onChange={() => onPermissionChange('create')}
          color="green"
        />
        <PermissionCheckbox
          label="View"
          checked={permissions.view}
          onChange={() => onPermissionChange('view')}
          color="yellow"
        />
        <PermissionCheckbox
          label="Delete"
          checked={permissions.delete}
          onChange={() => onPermissionChange('delete')}
          color="red"
        />
      </div>
    </div>
  );
}

interface PermissionCheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  color: 'blue' | 'green' | 'yellow' | 'red';
}

function PermissionCheckbox({ label, checked, onChange, color }: PermissionCheckboxProps) {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      checkbox: 'bg-blue-500 border-blue-500',
      text: 'text-blue-700'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      checkbox: 'bg-green-500 border-green-500',
      text: 'text-green-700'
    },
    yellow: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      checkbox: 'bg-amber-500 border-amber-500',
      text: 'text-amber-700'
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      checkbox: 'bg-red-500 border-red-500',
      text: 'text-red-700'
    }
  };

  const colors = colorClasses[color];

  return (
    <div
      className={`${colors.bg} ${colors.border} border rounded-lg p-4 cursor-pointer transition-all hover:shadow-sm`}
      onClick={onChange}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${checked
            ? colors.checkbox
            : 'bg-white border-gray-300'
            }`}
        >
          {checked && (
            <Check size={14} className="text-white" strokeWidth={3} />
          )}
        </div>

        <span className={`font-['Poppins'] text-sm font-medium ${checked ? colors.text : 'text-gray-700'
          }`}>
          {label}
        </span>
      </div>
    </div>
  );
}
