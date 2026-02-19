import type {
  TJobPosting,
  TJobPostingRequest,
  TFilterJobPosting,
  TJobPostingListResponse,
  TJobPostingDetailResponse,
} from './type';

// Mock data
const listJobPostings: TJobPosting[] = [
  {
    id: '1',
    title: 'Operator Alat Berat',
    department: 'Operasional',
    location: 'Jakarta',
    type: 'full-time',
    salary_min: 5000000,
    salary_max: 7000000,
    description: 'Kami mencari operator alat berat yang berpengalaman untuk proyek konstruksi.',
    posted_date: '1/1/2026',
    deadline: '5/2/2026',
    status: 'active',
    applicants: 15,
  },
  {
    id: '2',
    title: 'Civil Engineer',
    department: 'Engineering',
    location: 'Jakarta',
    type: 'full-time',
    salary_min: 8000000,
    salary_max: 12000000,
    description: 'Mencari civil engineer dengan pengalaman minimal 3 tahun.',
    posted_date: '10/1/2026',
    deadline: '10/2/2026',
    status: 'active',
    applicants: 12,
  },
];

export const getJobPostings = (params: TFilterJobPosting): Promise<TJobPostingListResponse> => {
  console.log(params);
  let filtered = [...listJobPostings];

  if (params.status) {
    filtered = filtered.filter((job) => job.status === params.status);
  }

  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filtered = filtered.filter(
      (job) =>
        job.title.toLowerCase().includes(searchLower) ||
        job.department.toLowerCase().includes(searchLower)
    );
  }

  return Promise.resolve({
    status_code: 200,
    data: {
      items: filtered,
      meta: {
        total_page: Math.ceil(filtered.length / 10),
        total: filtered.length,
        page: 1,
        per_page: 10,
      },
    },
    version: '1.0.0',
  });
};

export const getDetailJobPosting = (params: { id: string }): Promise<TJobPostingDetailResponse> => {
  console.log(params);
  return Promise.resolve({
    status_code: 200,
    data: listJobPostings.find((job) => job.id === params.id)!,
    version: '1.0.0',
  });
};

export const createJobPosting = (
  data: TJobPostingRequest
): Promise<TJobPostingDetailResponse> => {
  const newJob: TJobPosting = {
    id: String(listJobPostings.length + 1),
    ...data,
    posted_date: new Date().toLocaleDateString('id-ID'),
    applicants: 0,
  };
  listJobPostings.push(newJob);
  
  return Promise.resolve({
    status_code: 200,
    data: newJob,
    version: '1.0.0',
  });
};

export const updateJobPosting = (
  params: { id: string },
  data: Partial<TJobPosting>
): Promise<TJobPostingDetailResponse> => {
  console.log(params);
  const index = listJobPostings.findIndex((job) => job.id === params.id);
  if (index !== -1) {
    listJobPostings[index] = { ...listJobPostings[index], ...data };
    return Promise.resolve({
      status_code: 200,
      data: listJobPostings[index],
      version: '1.0.0',
    });
  }
  
  return Promise.reject(new Error('Job posting not found'));
};

export const deleteJobPosting = (params: { id: string }): Promise<{ success: boolean }> => {
  console.log(params);
  const index = listJobPostings.findIndex((job) => job.id === params.id);
  if (index !== -1) {
    listJobPostings.splice(index, 1);
    return Promise.resolve({ success: true });
  }
  
  return Promise.reject(new Error('Job posting not found'));
};
