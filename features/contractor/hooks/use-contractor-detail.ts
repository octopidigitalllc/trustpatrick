import { useQuery } from "@tanstack/react-query";
import {
    getContractorBySlug,
    getContractorById,
} from "@/services/contractor.service";

export function useContractorDetail(slug: string, fallbackId?: number) {
    return useQuery({
        queryKey: ["contractor", slug, fallbackId ?? null],
        queryFn: async () => {
            try {
                return await getContractorBySlug(slug);
            } catch (error) {
                if (fallbackId) {
                    return getContractorById(fallbackId);
                }
                throw error;
            }
        },
        enabled: !!slug,
    });
}
