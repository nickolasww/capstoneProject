import { useMemo } from "react";
import { useInfinityQuery } from "@/app/_hooks/request/use-infinite-query";
import { getJobPositions } from "@/api/karir";
import type { TJobPositionListResponse } from "@/api/karir/type";

interface UseJobPositionsQueryParams {
  search?: string;
  limit?: number;
}

export const useJobPositionsQuery = ({ search, limit = 3 }: UseJobPositionsQueryParams = {}) => {
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
    staleTime: 0, // Always fetch fresh data
    refetchOnMount: 'always', // Always refetch when component mounts
  });

  // Flatten all pages into single array
const jobs = useMemo(() => {
  const allJobs = data?.pages.flatMap((page) => page.job_positions.list) || [];

  if (!search) return allJobs;

  return allJobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );
}, [data, search]);

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
