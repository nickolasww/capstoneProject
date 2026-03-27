import suplier from "@/assets/homepage/suplier.webp"
import konstruksi from "@/assets/homepage/konstruksi.webp"
import pengadaan from "@/assets/homepage/pengadaan.webp"

const PelayananKami = () => {
  // Mock data untuk pelayanan
  const services = [
    {
      id: 1,
      title: 'Supplier Jual Beli',
      description:
        'Menyediakan kebutuhan alat berat untuk proyek konstruksi dan industri berkat produk berkualitas. dan telah dipercaya banyak perusahaan',
      image: suplier,
    },
    {
      id: 2,
      title: 'Jasa Konstruksi',
      description:
        'Inovatif, tepat waktu, dan berkualitas, menciptakan solusi bangunan unggul untuk keberlanjutan proyek Anda.',
      image: konstruksi,
    },
    {
      id: 3,
      title: 'Pengadaan Barang',
      description:
        'Menyediakan kebutuhan alat berat untuk proyek konstruksi dan industri berkat produk berkualitas dan telah dipercaya banyak perusahaan',
      image: pengadaan,
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-4xl font-bold text-gray-800">
          Pelayanan Kami
        </h2>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-lg transition hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-66 shrink-0 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-center text-2xl font-bold text-[#4D9232]">
                  {service.title}
                </h3>
                <p className="mb-4 grow text-center text-[#4D9232] text-sm">
                  {service.description}
                </p>
                <div className="flex justify-center">
                  <button className="rounded-2xl border border-[#4D9232] px-6 py-3 font-semibold text-[#4D9232] transition hover:bg-[#4D9232] hover:text-white">
                    Telusuri
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PelayananKami;
