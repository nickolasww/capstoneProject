import React from "react";

const HeroSection = () => {
  return (
    <section className="relative h-[94vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 ">
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
          Solusi Alat Berat & Konstruksi Terpercaya.
        </h1>
        <p className="mb-8 max-w-3xl text-lg md:text-xl">
          PT Bukit Aurumn Sejahtera menghadirkan layanan pengadaan barang dan
          jasa terbaik dengan kontribusi maksimal untuk pertumbuhan industri
          Anda.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
