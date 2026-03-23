const BeritaTerkini = () => {
  // Tidak ada data berita
  const news: any[] = [];

  return (
    <section className=" py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-4xl font-bold text-gray-800">
          Berita Terkini
        </h2>
        <p className="mb-12 text-center text-gray-600">
          Update terbaru seputar proyek dan kegiatan perusahaan kami
        </p>

        {/* News Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {news.length === 0 && (
            <div className="col-span-3 text-center text-gray-500 text-lg py-16">
              Belum ada berita
            </div>
          )}
        </div>

        {/* View All Button tidak ditampilkan jika tidak ada berita */}
        {news.length > 0 && (
          <div className="mt-12 text-center">
            <button className="rounded-full bg-[#4D9232] px-8 py-3 font-semibold text-white transition hover:bg-green-800">
              Lihat Semua Berita
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BeritaTerkini;
