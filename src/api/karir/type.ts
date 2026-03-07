import type { TResponseData } from "@/commons/types/response";

export type TEmploymentType = 'full_time' | 'part_time' | 'contract' | 'internship';

export type TJobPosition = {
  id: string;
  title: string;
  location: string;
  employment_type: TEmploymentType;
  posted_at: string;
  closed_at: string;
};

export type TFilterJobPosition = {
  limit?: number;
  cursor?: string;
  search?: string;
};

// Cursor-based pagination response matching backend structure
export type TJobPositionsData = {
  list: TJobPosition[];
  next_cursor: string | null;
};

export type TJobPositionsResponse = {
  job_positions: TJobPositionsData;
  message: string;
};

export type TJobPositionListResponse = TJobPositionsResponse;
export type TJobPositionDetailResponse = TResponseData<TJobPosition>;
