import type { TResponseData } from "@/commons/types/response";
import type { 
  TApplication, 
  TApplicationDetailResponse, 
  TApplicationListResponse, 
  TApplicationRequest, 
  TFilterApplication,
  TJobPosting,
  TJobPostingDetailResponse,
  TJobPostingListResponse,
  TJobPostingRequest,
  TFilterJobPosting
} from "./type";

const listApplications: TApplication[] = [
  {
    id: '1',
    name: 'Eko Prasetyo',
    phone: '085678901234',
    address: 'Jl. Diponegoro No. 56, Yogyakarta',
    email: 'eko.prasetyo@email.com',
    position: 'Mekanik',
    applyDate: '17/09/2025',
    status: 'pendaftar',
    cv_url: '/uploads/cv/eko-prasetyo.pdf',
    created_at: '2025-09-17T00:00:00.000Z',
    updated_at: '2025-09-17T00:00:00.000Z',
    deleted_at: null,
  },
  {
    id: '2',
    name: 'Siti Nurhaliza',
    phone: '081234567890',
    address: 'Jl. Sudirman No. 12, Jakarta',
    email: 'siti.nur@email.com',
    position: 'Civil Engineer',
    applyDate: '18/09/2025',
    status: 'interview',
    cv_url: '/uploads/cv/siti-nur.pdf',
    created_at: '2025-09-18T00:00:00.000Z',
    updated_at: '2025-09-18T00:00:00.000Z',
    deleted_at: null,
  },
  {
    id: '3',
    name: 'Ahmad Fauzi',
    phone: '082345678901',
    address: 'Jl. Gatot Subroto No. 45, Bandung',
    email: 'ahmad.fauzi@email.com',
    position: 'Admin Proyek',
    applyDate: '19/09/2025',
    status: 'pembekasan',
    cv_url: '/uploads/cv/ahmad-fauzi.pdf',
    created_at: '2025-09-19T00:00:00.000Z',
    updated_at: '2025-09-19T00:00:00.000Z',
    deleted_at: null,
  },
];

const listJobPostings: TJobPosting[] = [
  {
    id: '1',
    title: 'Mekanik Alat Berat',
    department: 'Operasional',
    location: 'Yogyakarta',
    type: 'Full Time',
    salary: 'Rp 5.000.000 - Rp 7.000.000',
    description: 'Bertanggung jawab untuk maintenance dan repair alat berat',
    requirements: ['Pengalaman minimal 2 tahun', 'Sertifikat K3', 'Bisa bekerja shift'],
    postedDate: '15/01/2026',
    deadline: '15/02/2026',
    status: 'active',
    applicants: 12,
    created_at: '2026-01-15T00:00:00.000Z',
    updated_at: '2026-01-15T00:00:00.000Z',
    deleted_at: null,
  },
  {
    id: '2',
    title: 'Civil Engineer',
    department: 'Engineering',
    location: 'Jakarta',
    type: 'Full Time',
    salary: 'Rp 8.000.000 - Rp 12.000.000',
    description: 'Merencanakan dan mengawasi proyek konstruksi',
    requirements: ['S1 Teknik Sipil', 'Pengalaman 3 tahun', 'Menguasai AutoCAD'],
    postedDate: '10/01/2026',
    deadline: '10/02/2026',
    status: 'active',
    applicants: 24,
    created_at: '2026-01-10T00:00:00.000Z',
    updated_at: '2026-01-10T00:00:00.000Z',
    deleted_at: null,
  },
];

// Application APIs
export const getApplications = (params: TFilterApplication): Promise<TApplicationListResponse> => {
  console.log(params);
  const filteredData = params.position 
    ? listApplications.filter(app => app.position.toLowerCase().includes(params.position!.toLowerCase()))
    : listApplications;

  return Promise.resolve({
    status_code: 200,
    data: {
      items: filteredData,
      meta: {
        total_page: 1,
        total: filteredData.length,
        page: 1,
        per_page: 10,
      },
    },
    version: "1.0.0",
  });
};

export const getDetailApplication = (params: { id: string }): Promise<TApplicationDetailResponse> => {
  const application = listApplications.find(app => app.id === params.id);
  
  if (!application) {
    return Promise.reject({
      status_code: 404,
      message: "Application not found",
      version: "1.0.0",
    });
  }

  return Promise.resolve({
    status_code: 200,
    data: application,
    version: "1.0.0",
  });
};

export const createApplication = (data: TApplicationRequest): Promise<TApplicationDetailResponse> => {
  const newApplication: TApplication = {
    id: String(listApplications.length + 1),
    ...data,
    applyDate: new Date().toLocaleDateString('id-ID'),
    status: data.status || 'pendaftar',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
  };

  listApplications.push(newApplication);

  return Promise.resolve({
    status_code: 201,
    data: newApplication,
    version: "1.0.0",
  });
};

export const updateApplication = (
  id: string,
  data: Partial<TApplicationRequest>
): Promise<TApplicationDetailResponse> => {
  const index = listApplications.findIndex(app => app.id === id);
  
  if (index === -1) {
    return Promise.reject({
      status_code: 404,
      message: "Application not found",
      version: "1.0.0",
    });
  }

  listApplications[index] = {
    ...listApplications[index],
    ...data,
    updated_at: new Date().toISOString(),
  };

  return Promise.resolve({
    status_code: 200,
    data: listApplications[index],
    version: "1.0.0",
  });
};

export const deleteApplication = (id: string): Promise<TResponseData<null>> => {
  const index = listApplications.findIndex(app => app.id === id);
  
  if (index === -1) {
    return Promise.reject({
      status_code: 404,
      message: "Application not found",
      version: "1.0.0",
    });
  }

  listApplications.splice(index, 1);

  return Promise.resolve({
    status_code: 200,
    data: null,
    version: "1.0.0",
  });
};

// Job Posting APIs
export const getJobPostings = (params: TFilterJobPosting): Promise<TJobPostingListResponse> => {
  console.log(params);
  const filteredData = params.department 
    ? listJobPostings.filter(job => job.department.toLowerCase().includes(params.department!.toLowerCase()))
    : listJobPostings;

  return Promise.resolve({
    status_code: 200,
    data: {
      items: filteredData,
      meta: {
        total_page: 1,
        total: filteredData.length,
        page: 1,
        per_page: 10,
      },
    },
    version: "1.0.0",
  });
};

export const getDetailJobPosting = (params: { id: string }): Promise<TJobPostingDetailResponse> => {
  const jobPosting = listJobPostings.find(job => job.id === params.id);
  
  if (!jobPosting) {
    return Promise.reject({
      status_code: 404,
      message: "Job posting not found",
      version: "1.0.0",
    });
  }

  return Promise.resolve({
    status_code: 200,
    data: jobPosting,
    version: "1.0.0",
  });
};

export const createJobPosting = (data: TJobPostingRequest): Promise<TJobPostingDetailResponse> => {
  const newJobPosting: TJobPosting = {
    id: String(listJobPostings.length + 1),
    ...data,
    postedDate: new Date().toLocaleDateString('id-ID'),
    status: data.status || 'active',
    applicants: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
  };

  listJobPostings.push(newJobPosting);

  return Promise.resolve({
    status_code: 201,
    data: newJobPosting,
    version: "1.0.0",
  });
};

export const updateJobPosting = (
  id: string,
  data: Partial<TJobPostingRequest>
): Promise<TJobPostingDetailResponse> => {
  const index = listJobPostings.findIndex(job => job.id === id);
  
  if (index === -1) {
    return Promise.reject({
      status_code: 404,
      message: "Job posting not found",
      version: "1.0.0",
    });
  }

  listJobPostings[index] = {
    ...listJobPostings[index],
    ...data,
    updated_at: new Date().toISOString(),
  };

  return Promise.resolve({
    status_code: 200,
    data: listJobPostings[index],
    version: "1.0.0",
  });
};

export const deleteJobPosting = (id: string): Promise<TResponseData<null>> => {
  const index = listJobPostings.findIndex(job => job.id === id);
  
  if (index === -1) {
    return Promise.reject({
      status_code: 404,
      message: "Job posting not found",
      version: "1.0.0",
    });
  }

  listJobPostings.splice(index, 1);

  return Promise.resolve({
    status_code: 200,
    data: null,
    version: "1.0.0",
  });
};
