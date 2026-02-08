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
      icon: '📦',
    },
    {
      id: 2,
      title: 'Jasa Konstruksi',
      description:
        'Layanan konstruksi profesional untuk berbagai jenis proyek pembangunan',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop',
      icon: '🏗️',
    },
    {
      id: 3,
      title: 'Pengadaan Barang',
      description:
        'Solusi pengadaan barang yang efisien dan terpercaya untuk kebutuhan Anda',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop',
      icon: '🚚',
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-4xl font-bold text-gray-800">
          Pelayanan Kami
        </h2>
        <p className="mb-12 text-center text-gray-600">
          Kami menyediakan berbagai layanan terbaik untuk kebutuhan Anda
        </p>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="group overflow-hidden rounded-xl bg-white shadow-lg transition hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-4xl">
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="mb-2 text-2xl font-bold text-gray-800">
                  {service.title}
                </h3>
                <p className="mb-4 text-gray-600">{service.description}</p>
                <button className="font-semibold text-blue-600 transition hover:text-blue-700">
                  Selengkapnya →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PelayananKami;
