import HeroSection from './herosection/page';
import KlienKami from './klien/pge';
import PelayananKami from './pelayanan/page';
import BeritaTerkini from './berita-terkini/page';
import KritikDanSaran from './kritik-saran/page';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <KlienKami />
      <PelayananKami />
      <BeritaTerkini />
      <KritikDanSaran />
    </div>
  );
};

export default HomePage;
