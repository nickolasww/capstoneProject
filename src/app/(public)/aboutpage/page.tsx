import HeroSection from "./herosection/HeroSection";
import VisionMission from "./visimisi/page";
import { PortfolioSection } from "./portofolio/PortfolioSection";


export default function AboutPage() {
    return (
        <>
            <HeroSection />
            <VisionMission />
            <PortfolioSection />
        </>
    );
}
