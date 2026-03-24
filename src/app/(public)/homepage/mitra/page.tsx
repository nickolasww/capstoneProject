import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import mitra1 from "@/assets//homepage/mitra1.svg";
import mitra2 from "@/assets//homepage/mitra2.svg";
import mitra3 from "@/assets//homepage/mitra3.svg";
import mitra4 from "@/assets//homepage/mitra4.svg";

import kabbadung from "@/assets/homepage/mitra/KAB BADUNG.png";
import kabbatang from "@/assets/homepage/mitra/KAB BATANG.png";
import kabblitar from "@/assets/homepage/mitra/KAB BLITAR.png";
import kabkediri from "@/assets/homepage/mitra/KAB KEDIRI.png";
import kabmeranti from "@/assets/homepage/mitra/KAB KEPULAUAN MERANTI.png";
import kabkotabaru from "@/assets/homepage/mitra/KAB KOTABARU.png";
import kabkudus from "@/assets/homepage/mitra/KAB KUDUS.png";
import kabmalang from "@/assets/homepage/mitra/KAB MALANG.png";
import kabmojokerto from "@/assets/homepage/mitra/KAB MOJOKERTO.png";
import kabpurbalingga from "@/assets/homepage/mitra/KAB PURBALINGGA.png";
import kabrembang from "@/assets/homepage/mitra/KAB REMBANG.png";
import kabtabanan from "@/assets/homepage/mitra/KAB TABANAN.png";
import kotabanjar from "@/assets/homepage/mitra/KOTA BANJAR.png";
import kotablitar from "@/assets/homepage/mitra/KOTA BLITAR.png";
import kotabontang from "@/assets/homepage/mitra/KOTA BONTANG.png";
import kotapadang from "@/assets/homepage/mitra/KOTA PADANG.png";
import kotapekalongan from "@/assets/homepage/mitra/kota pekalongan.png"
import kotatangerang from "@/assets/homepage/mitra/KOTA TANGERANG.png";
import kotategal from "@/assets/homepage/mitra/KOTA TEGAL.png";
import kotajogja from "@/assets/homepage/mitra/KOTA YOGJAKARTA.png";

const KlienKami = () => {
  // Mock data untuk klien
  const clients = [
    {
      id: 1,
      name: "Kabupaten Badung",
      logo: kabbadung,
    },
    {
      id: 2,
      name: "Kabupaten Batang",
      logo: kabbatang,
    },
    {
      id: 3,
      name: "Kabupaten Blitar",
      logo: kabblitar,
    },
    {
      id: 4,
      name: "Kabupaten Kediri",
      logo: kabkediri,
    },
    {
      id: 5,
      name: "Kabupaten Kepulauan Meranti",
      logo: kabmeranti,
    },
    {
      id: 6,
      name: "Kabupaten Kotabaru",
      logo: kabkotabaru,
    },
    {
      id: 7,
      name: "Kabupaten Kudus",
      logo: kabkudus,
    },
    {
      id: 8,
      name: "Kabupaten Malang",
      logo: kabmalang,
    },
    {
      id: 9,
      name: "Kabupaten Mojokerto",
      logo: kabmojokerto,
    },
    {
      id: 10,
      name: "Kabupaten Purbalingga",
      logo: kabpurbalingga,
    },
    {
      id: 11,
      name: "Kabupaten Rembang",
      logo: kabrembang,
    },
    {
      id: 12,
      name: "Kabupaten Tabanan",
      logo: kabtabanan,
    },
     {
      id: 13,
      name: "Kota Banjar",
      logo: kotabanjar,
    },
    {
      id: 14,
      name: "Kota Blitar",
      logo: kotablitar,
    },
    {
      id: 15,
      name: "Kota Bontang",
      logo: kotabontang,
    },
    {
      id: 16,
      name: "Kota Padang",
      logo: kotapadang,
    },
    {
      id: 17,
      name: "Kota Pekalongan",
      logo: kotapekalongan,
    },
    {
      id: 18,
      name: "Kota Tangerang",
      logo: kotatangerang,
    },
    {
      id: 19,
      name: "Kota Tegal",
      logo: kotategal,
    },
    {
      id: 20,
      name: "Kota Yogyakarta",
      logo: kotajogja,
    },
  ];

  // Embla Carousel setup with autoplay
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: false,
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 1500, stopOnInteraction: false, playOnInit: true })],
  );

  return (
    <section id="mitra-kami" className="pt-24 md:pb-12 xl:pb-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-20 text-center text-4xl font-bold text-gray-800">
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
                  className="flex-[0_0_50%] sm:flex-[0_0_25%] md:flex-[0_0_20%] lg:flex-[0_0_15%] px-4"
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
