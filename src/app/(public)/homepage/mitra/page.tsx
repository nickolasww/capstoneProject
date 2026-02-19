'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

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

  // Embla Carousel setup with autoplay
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      dragFree: false,
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 1000, stopOnInteraction: false, playOnInit: true })]
  );

  return (
    <section id="mitra-kami" className="pt-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-32 text-center text-4xl font-bold text-gray-800">
          Mitra Kami
        </h2>
        
        {/* Embla Carousel Container */}
        <div className="relative">
          {/* Embla Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="flex-[0_0_16rem] min-w-0 px-4"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="w-full h-32 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KlienKami;
