export type TEmploymentType = 'full_time' | 'part_time' | 'contract' | 'internship';

export type TJobPosition = {
  id: number | string;
  title: string;
  slug?: string;
  location: string;
  department?: string;
  salary?: string;
  employment_type: TEmploymentType;
  description?: string;
  requirements?: string;
  responsibilities?: string;
  posted_at: string;
  closed_at?: string;
  applicant_count?: number;
  created_at?: string;
  updated_at?: string;
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

export type TJobPositionDetailData = {
  job_positions: TJobPosition;
  message: string;
};

export type TJobPositionListResponse = TJobPositionsResponse;
export type TJobPositionDetailResponse = TJobPositionDetailData;
