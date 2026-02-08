import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&h=1080&fit=crop"
          alt="Hero Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl">
          PROYEK KAMI ADALAH REALITA
        </h1>
        <p className="mb-8 max-w-3xl text-lg md:text-xl">
          Kami menghadirkan solusi konstruksi dan jasa terbaik untuk mewujudkan 
          proyek impian Anda menjadi kenyataan dengan standar kualitas tertinggi
        </p>
        <button className="rounded-full bg-blue-600 px-8 py-3 text-lg font-semibold transition hover:bg-blue-700">
          Pelajari Lebih Lanjut
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="animate-bounce text-white">
          <svg
            className="h-8 w-8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
