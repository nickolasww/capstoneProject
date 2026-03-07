import { useMemo } from "react";
import { useInfinityQuery } from "@/app/_hooks/request/use-infinite-query";
import { getJobPositions } from "@/api/karir";
import type { TJobPositionListResponse } from "@/api/karir/type";

interface UseJobPositionsQueryParams {
  search?: string;
  limit?: number;
  enabled?: boolean;
}

export const useJobPositionsQuery = ({ search, limit = 3, enabled = true }: UseJobPositionsQueryParams = {}) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinityQuery<TJobPositionListResponse>({
    queryKey: ['job-positions', search],
    queryFn: ({ pageParam }) => 
      getJobPositions({ 
        limit, 
        cursor: pageParam as string | undefined,
        search: search || undefined 
      }),
    getNextPageParam: (lastPage) => lastPage.job_positions.next_cursor,
    initialPageParam: undefined,
    enabled, // Only run query if enabled
    staleTime: 0, // Always fetch fresh data
    refetchOnMount: 'always', // Always refetch when component mounts
  });

  // Flatten all pages into single array
  const jobs = useMemo(() => {
    return data?.pages.flatMap((page) => page.job_positions.list) || [];
  }, [data]);

  return {
    jobs,
    totalJobs: jobs.length,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
