import hero from "@/assets/homepage/hero.webp";
import { Button } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";

const KonstuksiHeroSection = () => {
  return (
    <section className="relative h-[94vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 ">
        <img
          src={hero}
          alt="Hero Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="mb-6 text-5xl font-semibold md:text-6xl lg:text-8xl max-w-200">
          Jasa Konstuksi Profesional
        </h1>
        <h2 className="mb-8 max-w-4xl text-lg md:text-xl">
          Solusi lengkap untuk kebutuhan konstruksi Anda dengan standar kualitas
          terbaik
        </h2>
        <Button
          type="primary"
          size="large"
          style={{
            backgroundColor: "#16a34a",
            borderColor: "#16a34a",
            padding: "0 30px",
            height: "56px",
            fontSize: "18px",
          }}
        >
          <WhatsAppOutlined />Konsultasi Gratis Via WhatsApp
        </Button>
      </div>
    </section>
  );
};

export default KonstuksiHeroSection;
