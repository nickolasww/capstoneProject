// import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { yearsData } from "./Data/years";
import imgProject from "@/assets/AboutPages/Hero Pictures BAS about.png";

interface ProjectYear {
    year: string;
    projectCount: number;
    description?: string;
}

const projectYears: ProjectYear[] = Object.values(yearsData).map((yearInfo) => ({
    year: yearInfo.year,
    projectCount: yearInfo.totalProjects,
    description: yearInfo.description
}));

export function PortfolioSection() {
    const navigate = useNavigate();
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleYearClick = (year: string) => {
        navigate(`/projects/${year}`);
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 320;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="py-16 md:py-24 lg:py-32 bg-white px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20 lg:mb-24">
                    <h2 className="font-['Poppins'] font-semibold text-4xl md:text-5xl lg:text-6xl text-[#3a6d26] mb-4 md:mb-6">
                        Portfolio Proyek
                    </h2>
                    <p className="font-['Poppins'] text-lg md:text-xl lg:text-2xl text-[#515151] max-w-3xl mx-auto">
                        Koleksi Portfolio kami dalam beberapa tahun
                    </p>
                </div>

                {/* Horizontal Slider Container */}
                <div className="relative">
                    {/* Left Navigation Button */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 -ml-4 transition-all duration-300 hover:scale-110 hidden md:flex items-center justify-center"
                        aria-label="Scroll left"
                    >
                        {/* <ChevronLeft className="w-6 h-6 text-[#3a6d26]" /> */}
                    </button>

                    {/* Scrollable Container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 md:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 px-2 -mx-2 scrollbar-hide"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            WebkitOverflowScrolling: 'touch'
                        }}
                    >
                        {projectYears.map((project) => (
                            <div key={project.year} className="snap-start flex-shrink-0">
                                <ProjectCard
                                    year={project.year}
                                    projectCount={project.projectCount}
                                    description={project.description}
                                    onClick={() => handleYearClick(project.year)}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Right Navigation Button */}
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 -mr-4 transition-all duration-300 hover:scale-110 hidden md:flex items-center justify-center"
                        aria-label="Scroll right"
                    >
                        {/* <ChevronRight className="w-6 h-6 text-[#3a6d26]" /> */}
                    </button>
                </div>

                {/* Scroll Hint for Mobile */}
                <p className="text-center text-sm text-gray-400 mt-4 md:hidden font-['Poppins']">
                    ← Geser untuk melihat lebih banyak →
                </p>
            </div>
        </section>
    );
}

interface ProjectCardProps {
    year: string;
    projectCount: number;
    description?: string;
    onClick: () => void;
}

function ProjectCard({ year, projectCount, onClick }: ProjectCardProps) {
    return (
        <div
            onClick={onClick}
            className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group w-64 md:w-72 h-64 md:h-72 shadow-md"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={imgProject}
                    alt={`Proyek ${year}`}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity duration-300"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[rgba(58,109,38,0.7)] via-[rgba(34,82,22,0.75)] to-[rgba(10,26,3,0.85)] group-hover:from-[rgba(58,109,38,0.75)] group-hover:via-[rgba(34,82,22,0.8)] group-hover:to-[rgba(10,26,3,0.9)] transition-all duration-300" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center text-white px-4 py-8">
                {/* Calendar Icon */}
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-5 mb-5 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    {/* <Calendar className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12" strokeWidth={2.5} /> */}
                </div>

                {/* Year */}
                <h3 className="font-['Poppins'] font-bold text-5xl md:text-6xl lg:text-[64px] leading-none mb-4 group-hover:scale-105 transition-transform duration-300">
                    {year}
                </h3>

                {/* Divider */}
                <div className="w-16 h-[3px] bg-white/50 rounded-full mb-5 group-hover:w-20 group-hover:bg-white/70 transition-all duration-300" />

                {/* Project Count */}
                <p className="font-['Poppins'] font-medium text-xl md:text-2xl text-center leading-tight">
                    {projectCount} Proyek
                </p>

                {/* Hover Indicator */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-['Poppins'] font-medium text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                        Lihat Detail →
                    </span>
                </div>
            </div>
        </div>
    );
}