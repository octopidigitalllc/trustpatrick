import apiClient from "@/lib/axios";
import type { ContractorsResponse, ContractorDetailResponse } from "@/types";

export async function getContractors(
    city: string,
    stateCode: string,
    mainCategoryId: number,
    serviceCategoryId: number
): Promise<ContractorsResponse> {
    const { data } = await apiClient.get<ContractorsResponse>("/contractors", {
        params: {
            city,
            state_code: stateCode,
            main_category_id: mainCategoryId,
            service_category_id: serviceCategoryId,
        },
    });
    return data;
}

export async function getContractorById(
    id: number
): Promise<ContractorDetailResponse> {
    const { data } = await apiClient.get<ContractorDetailResponse>(
        `/contractors/${id}`
    );
    return data;
}
