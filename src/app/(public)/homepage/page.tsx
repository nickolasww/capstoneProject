import HeroSection from './herosection/page';
import ProfilPerusahaan from './profil-perusahaan/page';
import KlienKami from './mitra/page';
import PelayananKami from './pelayanan/page';
import SEO from '@/app/_components/seo/seo';
import { Helmet } from 'react-helmet-async';
import KritikDanSaran from '@/app/(public)/homepage/kritik-saran/page';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="PT Bukit Aurumn Sejahtera - BAS | Kediri"
        description="Melayani pengadaan alat berat dan jasa konstruksi sejak 2003 dengan kualitas terbaik."
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "PT Bukit Aurumn Sejahtera",
            "alternateName": ["BAS", "BAS Kediri", "PT BAS"],
            "url": "https://www.bukitaurumnsejahtera.co.id",
            "description": "Perusahaan kontraktor & supplier berpengalaman di Kediri, Jawa Timur. Melayani konstruksi, pengadaan barang & jasa, dan sewa alat berat untuk proyek nasional.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Kediri",
              "addressRegion": "Jawa Timur",
              "addressCountry": "ID"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "availableLanguage": "Indonesian"
            },
            "sameAs": []
          })}
        </script>
      </Helmet>
      
      <HeroSection />
      <ProfilPerusahaan />
      <KlienKami />
      <PelayananKami />
      <KritikDanSaran />
    </div>
  );
};

export default HomePage;
