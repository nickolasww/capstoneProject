import { useState, useEffect } from "react";
import { getJobApplicationsHistory } from '@/api/karir';
import { useDebounce } from '@/app/_hooks/use-debounce';
import { getAccessToken } from '@/libs/localstorage';
import { useQuery } from '@tanstack/react-query';
import type { TJobApplicationHistory } from '@/api/karir/type';

export function useJobApplicationsHistoryLogic() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showLoginModal, setShowLoginModal] = useState(false);
    const debouncedSearch = useDebounce(searchQuery);

    // Cek login
    const token = getAccessToken();
    useEffect(() => {
        if (!token) {
            setShowLoginModal(true);
        }
    }, [token]);

    // Fetch job application history
    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['job-applications-history', debouncedSearch],
        queryFn: () => getJobApplicationsHistory({ search: debouncedSearch, limit: 8 }),
        enabled: !!token,
        staleTime: 0,
        refetchOnMount: 'always',
    });

    const applications: TJobApplicationHistory[] = data?.job_applications?.items || [];

    return {
        searchQuery,
        setSearchQuery,
        showLoginModal,
        setShowLoginModal,
        debouncedSearch,
        token,
        isLoading,
        isError,
        applications,
    };
}
