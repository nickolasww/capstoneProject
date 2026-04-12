import HeroSection from "./herosection/HeroSection";
import VisionMission from "./visimisi/page";
import { PortfolioSection } from "./portofolio/PortfolioSection";
import SEO from "@/app/_components/seo/seo";

export default function AboutPage() {
  return (
    <>
      <SEO
        title="Tentang Kami - PT Bukit Aurumn Sejahtera"
        description="Mengenal lebih dekat PT Bukit Aurumn Sejahtera, perusahaan kontraktor dan supplier berpengalaman sejak 2003."
        canonical="https://www.bukitaurumnsejahtera.co.id/aboutpage"
      />
      <HeroSection />
      <VisionMission />
      <PortfolioSection />
    </>
  );
}
