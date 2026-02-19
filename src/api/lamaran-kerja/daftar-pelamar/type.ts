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
  apply_date: string;
  status: TApplicationStatus;
  interview_date?: string;
  interview_time?: string;
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
  interview_date?: string;
  interview_time?: string;
  cv_url?: string;
  cover_letter?: string;
};

export type TFilterApplication = TFilterParams<{ 
  position?: string;
  status?: TApplicationStatus;
  name?: string;
}>;

export type TApplicationListResponse = TResponsePaginate<TApplication>;
export type TApplicationDetailResponse = TResponseData<TApplication>;
