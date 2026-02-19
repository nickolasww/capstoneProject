'use client';

import { useState, useEffect, useRef } from 'react';
import StatCard from './_components/stat-card';

const ProfilPerusahaan = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    {
      label: 'Didirikan Sejak',
      value: 2003,
      color: 'text-red-600',
    },
    {
      label: 'Total Alat Berat',
      value: 14,
      color: 'text-red-600',
    },
    {
      label: 'Total Truk',
      value: 15,
      color: 'text-red-600',
    },
    {
      label: 'Total Pengadaan',
      value: 451,
      color: 'text-red-600',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative -mt-22 z-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Card */}
        <div className="bg-linear-to-b from-[#60B63F] to-[#2A501C] rounded-2xl overflow-hidden">
          <div className="p-8 md:p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                {stats.map((stat, index) => (
                  <StatCard
                    key={index}
                    label={stat.label}
                    value={stat.value}
                    color={stat.color}
                    isVisible={isVisible}
                    delay={index * 100}
                  />
                ))}
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilPerusahaan;
