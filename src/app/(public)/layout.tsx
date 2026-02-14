import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/app/navbar";
import Footer from "@/app/footer";

const PublicLayout = () => {
  const [hasBackground, setHasBackground] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  // Hide navbar and footer on auth pages
  const isAuthPage = pathname.startsWith('/auth');

  // Scroll handler untuk mengubah background navbar
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Cari section dengan id "mitra-kami" atau heading "Mitra Kami"
          let mitraSection = document.getElementById('mitra-kami');
          
          if (!mitraSection) {
            // Fallback: cari berdasarkan heading
            mitraSection = Array.from(document.querySelectorAll('h2')).find(
              (h2) => h2.textContent?.trim() === 'Mitra Kami'
            )?.closest('section') as HTMLElement | null;
          }

          if (mitraSection) {
            const mitraSectionTop = mitraSection.getBoundingClientRect().top;
            const navbarHeight = 88; // Tinggi navbar (h-22 = 88px)
            
            // Jika section "Mitra Kami" sudah mencapai navbar, tampilkan background
            if (mitraSectionTop <= navbarHeight) {
              setHasBackground(true);
            } else {
              setHasBackground(false);
            }
          } else {
            // Jika tidak ada section "Mitra Kami" (misal pindah halaman), reset background
            setHasBackground(false);
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    };

    // Tambahkan event listener dengan passive untuk performa lebih baik
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Panggil sekali untuk cek posisi awal
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]); // Re-run ketika pathname berubah

  return (
    <div className=" bg-gray-50 flex flex-col">
      {/* Navbar */}
      {!isAuthPage && <Navbar hasBackground={hasBackground} />}

      {/* Main Content */}
      <main className="">
        <Outlet />
      </main>

      {/* Footer Section */}
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default PublicLayout;

