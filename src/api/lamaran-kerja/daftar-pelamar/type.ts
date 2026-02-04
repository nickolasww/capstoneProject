import type { TFilterParams } from "@/commons/types/filter";
import type { TResponseData, TResponsePaginate } from "@/commons/types/response";

export type TApplicationStatus = 'pendaftar' | 'pembekasan' | 'interview' | 'diterima' | 'ditolak';

export type TApplication = {
  id: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  position: string;
  applyDate: string;
  status: TApplicationStatus;
  cv_url?: string;
  cover_letter?: string;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
};

export type TApplicationRequest = {
  name: string;
  phone: string;
  address: string;
  email: string;
  position: string;
  status?: TApplicationStatus;
  cv_url?: string;
  cover_letter?: string;
};

export type TJobPosting = {
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
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
};

export type TJobPostingRequest = {
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  deadline: string;
  status?: 'active' | 'closed';
};

export type TFilterApplication = TFilterParams<{ 
  position?: string;
  status?: TApplicationStatus;
}>;

export type TFilterJobPosting = TFilterParams<{ 
  department?: string;
  status?: 'active' | 'closed';
}>;

export type TApplicationListResponse = TResponsePaginate<TApplication>;
export type TApplicationDetailResponse = TResponseData<TApplication>;
export type TJobPostingListResponse = TResponsePaginate<TJobPosting>;
export type TJobPostingDetailResponse = TResponseData<TJobPosting>;
