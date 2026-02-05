import { createContext, useContext, useState, type ReactNode } from 'react';

export interface JobPosting {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    requirements: string[];
    postedDate: string;
    deadline: string;
    status: 'active' | 'closed';
    applicants: number;
}

const initialJobPostings: JobPosting[] = [
    {
        id: '1',
        title: 'Mekanik Alat Berat',
        department: 'Operasional',
        location: 'Yogyakarta',
        type: 'Full Time',
        salary: 'Rp 5.000.000 - Rp 7.000.000',
        description: 'Bertanggung jawab untuk perawatan dan perbaikan alat berat perusahaan.',
        requirements: ['Pengalaman minimal 2 tahun', 'Memiliki sertifikat K3', 'Bisa bekerja shift'],
        postedDate: '15/01/2026',
        deadline: '15/02/2026',
        status: 'active',
        applicants: 12,
    },
    {
        id: '2',
        title: 'Civil Engineer',
        department: 'Engineering',
        location: 'Jakarta',
        type: 'Full Time',
        salary: 'Rp 8.000.000 - Rp 12.000.000',
        description: 'Merancang dan mengawasi proyek konstruksi sipil.',
        requirements: ['S1 Teknik Sipil', 'Pengalaman minimal 3 tahun', 'Mahir AutoCAD'],
        postedDate: '10/01/2026',
        deadline: '10/02/2026',
        status: 'active',
        applicants: 24,
    },
    {
        id: '3',
        title: 'Admin Proyek',
        department: 'Administrasi',
        location: 'Semarang',
        type: 'Contract',
        salary: 'Rp 4.500.000 - Rp 6.000.000',
        description: 'Mengelola administrasi dan dokumentasi proyek.',
        requirements: ['D3/S1 Administrasi', 'Mahir Microsoft Office', 'Teliti dan rapi'],
        postedDate: '05/01/2026',
        deadline: '05/02/2026',
        status: 'active',
        applicants: 8,
    },
];

interface JobPostingsContextType {
    jobPostings: JobPosting[];
    addJob: (job: Omit<JobPosting, 'id' | 'applicants' | 'postedDate'>) => void;
    updateJob: (id: string, job: Partial<JobPosting>) => void;
    deleteJob: (id: string) => void;
    getJobById: (id: string) => JobPosting | undefined;
}

const JobPostingsContext = createContext<JobPostingsContextType | undefined>(undefined);

export function JobPostingsProvider({ children }: { children: ReactNode }) {
    const [jobPostings, setJobPostings] = useState<JobPosting[]>(initialJobPostings);

    const addJob = (job: Omit<JobPosting, 'id' | 'applicants' | 'postedDate'>) => {
        const newJob: JobPosting = {
            ...job,
            id: Date.now().toString(),
            applicants: 0,
            postedDate: new Date().toLocaleDateString('id-ID'),
        };
        setJobPostings((prev) => [...prev, newJob]);
    };

    const updateJob = (id: string, updatedFields: Partial<JobPosting>) => {
        setJobPostings((prev) =>
            prev.map((job) => (job.id === id ? { ...job, ...updatedFields } : job))
        );
    };

    const deleteJob = (id: string) => {
        setJobPostings((prev) => prev.filter((job) => job.id !== id));
    };

    const getJobById = (id: string) => {
        return jobPostings.find((job) => job.id === id);
    };

    return (
        <JobPostingsContext.Provider value={{ jobPostings, addJob, updateJob, deleteJob, getJobById }}>
            {children}
        </JobPostingsContext.Provider>
    );
}

export function useJobPostings() {
    const context = useContext(JobPostingsContext);
    if (!context) {
        throw new Error('useJobPostings must be used within a JobPostingsProvider');
    }
    return context;
}
