import type { TResponseData } from "@/commons/types/response";
import type { 
  TApplication, 
  TApplicationDetailResponse, 
  TApplicationListResponse, 
  TApplicationRequest, 
  TFilterApplication
} from "./type";

const listApplications: TApplication[] = [
  {
    id: '1',
    name: 'Eko Prasetyo',
    phone: '085678901234',
    address: 'Jl. Diponegoro No. 56, Yogyakarta',
    email: 'eko.prasetyo@email.com',
    position: 'Mekanik',
    apply_date: '17/09/2025',
    status: 'pendaftar',
    cv_url: '/uploads/cv/eko-prasetyo.pdf',
    created_at: '2025-09-17T00:00:00.000Z',
    updated_at: '2025-09-17T00:00:00.000Z',
    deleted_at: null,
  },
  {
    id: '2',
    name: 'Budi Santoso',
    phone: '085612345678',
    address: 'Jl. Sudirman No. 12, Jakarta',
    email: 'budi.santoso@email.com',
    position: 'Driver',
    apply_date: '16/09/2025',
    status: 'pendaftar',
    created_at: '2025-09-16T00:00:00.000Z',
    updated_at: '2025-09-16T00:00:00.000Z',
    deleted_at: null,
  },
  {
    id: '3',
    name: 'Siti Nurhaliza',
    phone: '085698765432',
    address: 'Jl. Gatot Subroto No. 45, Bandung',
    email: 'siti.nurhaliza@email.com',
    position: 'Admin',
    apply_date: '15/09/2025',
    status: 'pendaftar',
    created_at: '2025-09-15T00:00:00.000Z',
    updated_at: '2025-09-15T00:00:00.000Z',
    deleted_at: null,
  },
  {
    id: '4',
    name: 'Ahmad Fauzi',
    phone: '085655556666',
    address: 'Jl. Ahmad Yani No. 78, Surabaya',
    email: 'ahmad.fauzi@email.com',
    position: 'Teknisi',
    apply_date: '14/09/2025',
    status: 'pembekasan',
    created_at: '2025-09-14T00:00:00.000Z',
    updated_at: '2025-09-14T00:00:00.000Z',
    deleted_at: null,
  },
  {
    id: '5',
    name: 'Dewi Lestari',
    phone: '085644443333',
    address: 'Jl. Pemuda No. 23, Semarang',
    email: 'dewi.lestari@email.com',
    position: 'HRD',
    apply_date: '13/09/2025',
    status: 'pembekasan',
    created_at: '2025-09-13T00:00:00.000Z',
    updated_at: '2025-09-13T00:00:00.000Z',
    deleted_at: null,
  },
  {
    id: '6',
    name: 'Rudi Hartono',
    phone: '085633332222',
    address: 'Jl. Pahlawan No. 56, Malang',
    email: 'rudi.hartono@email.com',
    position: 'Marketing',
    apply_date: '12/09/2025',
    status: 'interview',
    interview_date: '28/09/2025',
    interview_time: '14.00 WIB',
    created_at: '2025-09-12T00:00:00.000Z',
    updated_at: '2025-09-12T00:00:00.000Z',
    deleted_at: null,
  },
  {
    id: '7',
    name: 'Maya Anggraini',
    phone: '085622221111',
    address: 'Jl. Veteran No. 34, Medan',
    email: 'maya.anggraini@email.com',
    position: 'Sales',
    apply_date: '11/09/2025',
    status: 'interview',
    interview_date: '29/09/2025',
    interview_time: '15.00 WIB',
    created_at: '2025-09-11T00:00:00.000Z',
    updated_at: '2025-09-11T00:00:00.000Z',
    deleted_at: null,
  },
  {
    id: '8',
    name: 'Joko Widodo',
    phone: '085611119999',
    address: 'Jl. Merdeka No. 89, Solo',
    email: 'joko.widodo@email.com',
    position: 'Supervisor',
    apply_date: '10/09/2025',
    status: 'interview',
    interview_date: '30/09/2025',
    interview_time: '10.00 WIB',
    created_at: '2025-09-10T00:00:00.000Z',
    updated_at: '2025-09-10T00:00:00.000Z',
    deleted_at: null,
  },
  {
    id: '9',
    name: 'Lisa Andriani',
    phone: '085699998888',
    address: 'Jl. Raya No. 67, Denpasar',
    email: 'lisa.andriani@email.com',
    position: 'Accounting',
    apply_date: '09/09/2025',
    status: 'diterima',
    interview_date: '23/09/2025',
    interview_time: '13.00 WIB',
    created_at: '2025-09-09T00:00:00.000Z',
    updated_at: '2025-09-09T00:00:00.000Z',
    deleted_at: null,
  },
  {
    id: '10',
    name: 'Agus Salim',
    phone: '085688887777',
    address: 'Jl. Proklamasi No. 90, Makassar',
    email: 'agus.salim@email.com',
    position: 'IT Support',
    apply_date: '08/09/2025',
    status: 'diterima',
    created_at: '2025-09-08T00:00:00.000Z',
    updated_at: '2025-09-08T00:00:00.000Z',
    deleted_at: null,
  },
  {
    id: '11',
    name: 'Rina Wati',
    phone: '085677776666',
    address: 'Jl. Kartini No. 45, Palembang',
    email: 'rina.wati@email.com',
    position: 'Receptionist',
    apply_date: '07/09/2025',
    status: 'ditolak',
    created_at: '2025-09-07T00:00:00.000Z',
    updated_at: '2025-09-07T00:00:00.000Z',
    deleted_at: null,
  },
  {
    id: '12',
    name: 'Hendra Kusuma',
    phone: '085666665555',
    address: 'Jl. Diponegoro No. 23, Pontianak',
    email: 'hendra.kusuma@email.com',
    position: 'Security',
    apply_date: '06/09/2025',
    status: 'ditolak',
    created_at: '2025-09-06T00:00:00.000Z',
    updated_at: '2025-09-06T00:00:00.000Z',
    deleted_at: null,
  },
];

export const getApplications = (params: TFilterApplication): Promise<TApplicationListResponse> => {
  console.log(params);
  let filteredData = [...listApplications];
  
  if (params.position) {
    filteredData = filteredData.filter(app => 
      app.position.toLowerCase().includes(params.position!.toLowerCase())
    );
  }
  
  if (params.status) {
    filteredData = filteredData.filter(app => app.status === params.status);
  }
  
  if (params.name) {
    filteredData = filteredData.filter(app => 
      app.name.toLowerCase().includes(params.name!.toLowerCase())
    );
  }

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
  console.log(params);
  return Promise.resolve({
    status_code: 200,
    data: listApplications.find((app) => app.id === params.id)!,
    version: "1.0.0",
  });
};

export const deleteApplication = (params: { id: string }): Promise<TResponseData<null>> => {
  console.log(params);
  return Promise.resolve({
    status_code: 200,
    data: null,
    version: "1.0.0",
  });
};

export const createApplication = (req: TApplicationRequest): Promise<TResponseData<null>> => {
  console.log(req);
  return Promise.resolve({
    status_code: 200,
    data: null,
    version: "1.0.0",
  });
};

export const updateApplication = (
  params: { id: string },
  req: Partial<TApplicationRequest>,
): Promise<TResponseData<null>> => {
  console.log(req, params);
  return Promise.resolve({
    status_code: 200,
    data: null,
    version: "1.0.0",
  });
};

