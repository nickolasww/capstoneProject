import React from 'react';

const BeritaTerkini = () => {
  // Mock data untuk berita
  const news = [
    {
      id: 1,
      title: 'Proyek Pembangunan Gedung Perkantoran Selesai Lebih Cepat',
      excerpt:
        'Tim kami berhasil menyelesaikan proyek pembangunan gedung perkantoran 20 lantai lebih cepat dari jadwal yang ditentukan...',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
      date: '5 Februari 2026',
      category: 'Konstruksi',
    },
    {
      id: 2,
      title: 'Inovasi Material Ramah Lingkungan dalam Konstruksi',
      excerpt:
        'Kami memperkenalkan penggunaan material ramah lingkungan yang lebih sustainable untuk proyek-proyek masa depan...',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
      date: '3 Februari 2026',
      category: 'Inovasi',
    },
    {
      id: 3,
      title: 'Kerjasama dengan Perusahaan Internasional',
      excerpt:
        'Perusahaan kami menjalin kerjasama strategis dengan perusahaan konstruksi internasional untuk meningkatkan kualitas layanan...',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop',
      date: '1 Februari 2026',
      category: 'Partnership',
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-4xl font-bold text-gray-800">
          Berita Terkini
        </h2>
        <p className="mb-12 text-center text-gray-600">
          Update terbaru seputar proyek dan kegiatan perusahaan kami
        </p>

        {/* News Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                />
                <span className="absolute right-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                  {item.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-2 flex items-center text-sm text-gray-500">
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {item.date}
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-800 line-clamp-2">
                  {item.title}
                </h3>
                <p className="mb-4 text-gray-600 line-clamp-3">{item.excerpt}</p>
                <button className="font-semibold text-blue-600 transition hover:text-blue-700">
                  Baca Selengkapnya →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700">
            Lihat Semua Berita
          </button>
        </div>
      </div>
    </section>
  );
};

export default BeritaTerkini;
