import { useQuery } from "@tanstack/react-query";
import { getContractors } from "@/services/contractor.service";

export function useContractors(
    city: string,
    stateCode: string,
    mainCategoryId: number,
    serviceCategoryId: number
) {
    return useQuery({
        queryKey: ["contractors", city, stateCode, mainCategoryId, serviceCategoryId],
        queryFn: () => getContractors(city, stateCode, mainCategoryId, serviceCategoryId),
        enabled: !!city && !!stateCode && !!mainCategoryId && !!serviceCategoryId,
        staleTime: 2 * 60 * 1000, // contractors may update more frequently
    });
}
