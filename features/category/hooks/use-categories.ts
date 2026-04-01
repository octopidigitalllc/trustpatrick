import { useQuery } from "@tanstack/react-query";
import { getMainCategories } from "@/services/category.service";

export function useCategories(searchkey?: string) {
    return useQuery({
        queryKey: ["categories", searchkey],
        queryFn: () => getMainCategories(searchkey),
        staleTime: 10 * 60 * 1000, // categories rarely change
    });
}
