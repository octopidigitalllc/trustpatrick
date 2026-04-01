import { useQuery } from "@tanstack/react-query";
import { getContractorById } from "@/services/contractor.service";

export function useContractorDetail(id: number) {
    return useQuery({
        queryKey: ["contractor", id],
        queryFn: () => getContractorById(id),
        enabled: !!id,
    });
}
