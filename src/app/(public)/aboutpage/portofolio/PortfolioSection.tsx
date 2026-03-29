import { CalendarOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { yearsData } from "../Data/years";
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
    // const navigate = useNavigate();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleYearClick = (_year: string) => {
        setModalOpen(true);
        // navigate(`/projects/${year}`);
    };

    return (
        <section className="py-16 md:py-24 lg:py-32 bg-white px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20 lg:mb-24">
                    <h2 className="font-semibold text-4xl md:text-5xl lg:text-6xl text-[#3a6d26] mb-4 md:mb-6">
                        Portfolio Proyek
                    </h2>
                    <p className="text-lg md:text-xl lg:text-2xl text-[#515151] max-w-3xl mx-auto">
                        Koleksi Portfolio kami dalam beberapa tahun
                    </p>
                </div>

                {/* Horizontal Slider Container */}
                <div className="relative">
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
                            <div key={project.year} className="snap-start shrink-0">
                                <ProjectCard
                                    year={project.year}
                                    projectCount={project.projectCount}
                                    description={project.description}
                                    onClick={() => handleYearClick(project.year)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center relative">
                        <h3 className=" font-bold text-3xl mb-4 text-[#3a6d26]">Maaf</h3>
                        <p className=" text-lg text-[#515151] mb-6">
                            Portofolio sedang dalam proses pengumpulan sehingga belum bisa ditampilkan.
                        </p>
                        <button
                            className="px-6 py-2 bg-[#3a6d26] text-white rounded-full font-semibold hover:bg-[#2e5520] transition"
                            onClick={() => setModalOpen(false)}
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}
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
            className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl group w-85 md:w-105 h-85 md:h-105 shadow-lg"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={imgProject}
                    alt={`Proyek ${year}`}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity duration-300"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-[rgba(58,109,38,0.7)] via-[rgba(34,82,22,0.75)] to-[rgba(10,26,3,0.85)] group-hover:from-[rgba(58,109,38,0.75)] group-hover:via-[rgba(34,82,22,0.8)] group-hover:to-[rgba(10,26,3,0.9)] transition-all duration-300" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center text-white px-4 py-8">
                {/* Calendar Icon (antd) */}
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mb-5 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 shadow-lg flex items-center justify-center">
                    <CalendarOutlined style={{ fontSize: 30, color: 'white' }} />
                </div>

                {/* Year */}
                <h3 className="font-bold text-5xl md:text-6xl lg:text-[64px] leading-none mb-4 group-hover:scale-105 transition-transform duration-300">
                    {year}
                </h3>

                {/* Divider */}
                <div className="w-16 h-0.75 bg-white/50 rounded-full mb-5 group-hover:w-20 group-hover:bg-white/70 transition-all duration-300" />

                {/* Project Count */}
                <p className=" font-medium text-xl md:text-2xl text-center leading-tight">
                    {projectCount} Proyek
                </p>

                {/* Hover Indicator dihapus sesuai permintaan */}
            </div>
        </div>
    );
}