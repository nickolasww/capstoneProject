import React from 'react';

const PelayananKami = () => {
  // Mock data untuk pelayanan
  const services = [
    {
      id: 1,
      title: 'Supplier Jual Beli',
      description:
        'Menyediakan berbagai kebutuhan material konstruksi berkualitas tinggi',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      title: 'Jasa Konstruksi',
      description:
        'Layanan konstruksi profesional untuk berbagai jenis proyek pembangunan',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      title: 'Pengadaan Barang',
      description:
        'Solusi pengadaan barang yang efisien dan terpercaya untuk kebutuhan Anda',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop', 
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
              <div className="relative h-48 shrink-0 overflow-hidden">
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
                <p className="mb-4 grow text-center text-[#4D9232]">
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
