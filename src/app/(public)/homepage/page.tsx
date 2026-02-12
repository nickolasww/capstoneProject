import HeroSection from './herosection/page';
import ProfilPerusahaan from './profil-perusahaan/page';
import KlienKami from './mitra/page';
import PelayananKami from './pelayanan/page';
import BeritaTerkini from './berita-terkini/page';
// import KritikDanSaran from './kritik-saran/page';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
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
