import HeroSection from './herosection/page';
import ProfilPerusahaan from './profil-perusahaan/page';
import KlienKami from './mitra/page';
import PelayananKami from './pelayanan/page';
import BeritaTerkini from './berita-terkini/page';
import SEO from '@/app/_components/seo/seo';
// import KritikDanSaran from './kritik-saran/page';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Beranda | Supplier Alat Berat & Konstruksi Terpercaya"
        description="Melayani pengadaan alat berat dan jasa konstruksi sejak 2003 dengan kualitas terbaik."
      />
      <HeroSection />
      <ProfilPerusahaan />
      <KlienKami />
      <PelayananKami />
      <BeritaTerkini />
      {/* <KritikDanSaran /> */}
    </div>
  );
};

export default HomePage;
