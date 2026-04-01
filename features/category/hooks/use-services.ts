import { useQuery } from "@tanstack/react-query";
import { getServices } from "@/services/service.service";

export function useServices(mainCategoryId?: number) {
    return useQuery({
        queryKey: ["services", mainCategoryId],
        queryFn: () => getServices(mainCategoryId),
        enabled: !!mainCategoryId,
        staleTime: 10 * 60 * 1000,
    });
}
