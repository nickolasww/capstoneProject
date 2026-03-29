import imgProject from "@/assets/AboutPages/Hero Pictures BAS about.png";
import { useEffect, useState, useMemo, useDeferredValue } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { Search, ArrowLeft } from "lucide-react";
import { yearsData } from "./Data/years";
import { projectsData } from "./Data/projects";
import { useDebounce } from "@/app/_hooks/use-debounce";

interface Project {
    id: number;
    title: string;
    location: string;
    client: string;
    value: string;
    duration: string;
    description: string;
    status: 'completed' | 'ongoing';
    image?: string;
}

export function ProjectYear() {
    const { year } = useParams<{ year: string }>();
    const navigate = useNavigate();
    const [projectsList, setProjectsList] = useState<Project[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery);

    const currentYearInfo = year ? yearsData[year as keyof typeof yearsData] : null;

    const handleGoBack = () => {
        navigate('/aboutpage');
    };

    useEffect(() => {
        if (year && projectsData[year as keyof typeof projectsData]) {
            const yearProjects = projectsData[year as keyof typeof projectsData] as Project[];
            const projectsWithImages = yearProjects.map((project) => ({
                ...project,
                image: imgProject
            }));
            setProjectsList(projectsWithImages);
        }
    }, [year, navigate]);

    // Memoize filtered projects to prevent recalculation on every render
    const filteredProjects = useMemo(() => {
        return projectsList.filter((project: Project) => {
            if (!debouncedSearchQuery) return true;

            const query = debouncedSearchQuery.toLowerCase();
            return (
                project.title.toLowerCase().includes(query) ||
                project.location.toLowerCase().includes(query) ||
                project.client.toLowerCase().includes(query) ||
                project.description.toLowerCase().includes(query)
            );
        });
    }, [projectsList, debouncedSearchQuery]);

    // Defer project cards rendering to prevent UI blocking while user is typing
    const deferredFilteredProjects = useDeferredValue(filteredProjects);

    return (
        <div className="min-h-screen bg-white">
            <div className="pt-24 pb-32 px-8 md:px-12 lg:px-16">
                <div className="max-w-360 mx-auto">
                    {/* Back Button & Page Header */}
                    <div className="mb-8 mt-4">
                        <button
                            onClick={handleGoBack}
                            className="group flex items-center gap-3 px-4 py-2 -ml-4 rounded-lg transition-all duration-300 hover:bg-[#3a6d26]/10"
                        >
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#3a6d26] text-white group-hover:bg-[#2e581e] transition-colors duration-300 shadow-md">
                                {/* <ArrowLeft className="w-5 h-5" strokeWidth={2.5} /> */}
                            </div>
                            <span className="font-medium text-lg text-[#3a6d26] group-hover:text-[#2e581e] transition-colors duration-300">
                                Kembali ke Portfolio
                            </span>
                        </button>
                    </div>

                    {/* Year Title */}
                    <div className="mb-8">
                        <h1 className=" font-bold text-4xl md:text-5xl text-[#3a6d26]">
                            Proyek Tahun {year}
                        </h1>
                        {currentYearInfo && (
                            <p className=" text-lg text-[#515151] mt-2">
                                {currentYearInfo.description} • {currentYearInfo.totalProjects} Proyek
                            </p>
                        )}
                    </div>

                    {/* Search Bar */}
                    <div className="mb-12">
                        <div className="max-w-152">
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#adadad]">
                                    {/* <Search className="w-7 h-7" strokeWidth={1.5} /> */}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-14 pl-14 pr-4 rounded-lg border border-[#3a6d26] text-2xl text-[#adadad] placeholder:text-[#adadad] focus:outline-none focus:border-[#3a6d26] focus:ring-1 focus:ring-[#3a6d26]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {deferredFilteredProjects.length === 0 ? (
                            <div className="col-span-full text-center py-20">
                                <p className=" text-xl text-gray-600">
                                    {searchQuery ? 'Tidak ada proyek yang ditemukan' : 'Tidak ada proyek untuk tahun ini'}
                                </p>
                            </div>
                        ) : (
                            deferredFilteredProjects.map((project: Project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface ProjectCardProps {
    project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="bg-[#f7f7f7] rounded-[13px] border border-[#2e581e] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] p-4 h-90 flex flex-col transition-all duration-300 hover:shadow-[0px_6px_15px_0px_rgba(0,0,0,0.3)] hover:scale-[1.01]">
            {/* Image Container */}
            <div className="relative h-44.5 w-full rounded-2xl overflow-hidden border-2 border-[#4d9232] mb-4 shrink-0">
                <img
                    src={project.image || imgProject}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 flex-1">
                {/* Title */}
                <h1 className="font-medium text-2xl leading-[33.6px] text-black line-clamp-1">
                    {project.title}
                </h1>

                {/* Details */}
                <div className="flex flex-col gap-1 text-base leading-6">
                    {/* Location */}
                    <div className="flex gap-2 items-center">
                        <span className="font-medium text-black">Lokasi:</span>
                        <span className="font-normal text-black">{project.location}</span>
                    </div>

                    {/* Client */}
                    <div className="flex gap-2 items-center">
                        <span className="font-medium text-black">Klien:</span>
                        <span className="font-normal text-black line-clamp-1">{project.client}</span>
                    </div>

                    {/* Value */}
                    <div className="flex gap-2 items-center">
                        <span className="font-medium text-black">Nilai Proyek:</span>
                        <span className="font-normal text-black">{project.value}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
