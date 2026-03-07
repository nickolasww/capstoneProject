import { api } from "@/libs/axios";
import type { 
  TJobPositionListResponse, 
  TJobPositionDetailResponse,
  TFilterJobPosition
} from "./type";

/**
 * Get list of job positions with cursor-based pagination
 * @param params - Filter parameters including limit and cursor
 * @returns Promise with job positions list
 */
export const getJobPositions = async (
  params: TFilterJobPosition = {}
): Promise<TJobPositionListResponse> => {
  const { limit = 3, cursor, search } = params;
  
  const queryParams: Record<string, string> = {
    limit: limit.toString(),
  };
  
  if (cursor) {
    queryParams.cursor = cursor;
  }
  
  if (search) {
    queryParams.search = search;
  }

  try {
    const response = await api.get(
      '/job-positions',
      { params: queryParams }
    );
    
    // Handle different response structures
    let responseData = response.data;
    
    // If response.data has a data property (wrapped response)
    if (responseData.data && responseData.data.job_positions) {
      responseData = responseData.data;
    }
    
    // Ensure proper structure matching backend response
    const result: TJobPositionListResponse = {
      job_positions: {
        list: responseData.job_positions?.list || [],
        next_cursor: responseData.job_positions?.next_cursor || null,
      },
      message: responseData.message || 'success',
    };
    
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Get detail of a specific job position
 * @param params - Object containing job position id
 * @returns Promise with job position detail
 */
export const getDetailJobPosition = async (
  params: { id: string }
): Promise<TJobPositionDetailResponse> => {
  const response = await api.get<TJobPositionDetailResponse>(
    `/job-positions/${params.id}`
  );
  
  return response.data;
};
