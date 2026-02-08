import React from 'react';

const KlienKami = () => {
  // Mock data untuk klien
  const clients = [
    {
      id: 1,
      name: 'Client 1',
      logo: 'https://via.placeholder.com/150x100/4A90E2/FFFFFF?text=Client+1',
    },
    {
      id: 2,
      name: 'Client 2',
      logo: 'https://via.placeholder.com/150x100/50C878/FFFFFF?text=Client+2',
    },
    {
      id: 3,
      name: 'Client 3',
      logo: 'https://via.placeholder.com/150x100/FFD700/FFFFFF?text=Client+3',
    },
    {
      id: 4,
      name: 'Client 4',
      logo: 'https://via.placeholder.com/150x100/FF6347/FFFFFF?text=Client+4',
    },
    {
      id: 5,
      name: 'Client 5',
      logo: 'https://via.placeholder.com/150x100/9370DB/FFFFFF?text=Client+5',
    },
    {
      id: 6,
      name: 'Client 6',
      logo: 'https://via.placeholder.com/150x100/20B2AA/FFFFFF?text=Client+6',
    },
    {
      id: 7,
      name: 'Client 7',
      logo: 'https://via.placeholder.com/150x100/FF69B4/FFFFFF?text=Client+7',
    },
    {
      id: 8,
      name: 'Client 8',
      logo: 'https://via.placeholder.com/150x100/CD853F/FFFFFF?text=Client+8',
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-4xl font-bold text-gray-800">
          Klien Kami
        </h2>
        <p className="mb-12 text-center text-gray-600">
          Dipercaya oleh berbagai perusahaan terkemuka
        </p>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-4">
          {clients.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-center rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-20 w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KlienKami;
