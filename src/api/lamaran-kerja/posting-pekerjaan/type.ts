import type { TResponseData, TResponsePaginate } from '@/commons/types/response';

export type TJobStatus = 'active' | 'closed';
export type TJobType = 'full-time' | 'contract' | 'part-time';

export interface TJobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: TJobType;
  salary_min: number;
  salary_max: number;
  description: string;
  posted_date: string;
  deadline: string;
  status: TJobStatus;
  applicants: number;
}

export interface TJobPostingRequest {
  title: string;
  department: string;
  location: string;
  type: TJobType;
  salary_min: number;
  salary_max: number;
  description: string;
  deadline: string;
  status: TJobStatus;
}

export interface TFilterJobPosting {
  status?: TJobStatus;
  search?: string;
}

export type TJobPostingListResponse = TResponsePaginate<TJobPosting>;
export type TJobPostingDetailResponse = TResponseData<TJobPosting>;
