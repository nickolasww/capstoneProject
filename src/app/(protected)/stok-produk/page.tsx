export default function StokProdukPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Admin - Stok Produk
        </p>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Stok Produk</h1>
        <p className="text-gray-600">Kelola data stok produk</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="text-center text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <p className="text-lg">Halaman Stok Produk</p>
          <p className="text-sm mt-2">Konten akan ditambahkan sesuai kebutuhan</p>
        </div>
      </div>
    </div>
  );
}
