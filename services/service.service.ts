import apiClient from "@/lib/axios";
import type { ServicesResponse } from "@/types";

export async function getServices(
    mainCategoryId?: number
): Promise<ServicesResponse> {
    const { data } = await apiClient.get<ServicesResponse>("/services", {
        params: mainCategoryId ? { main_category_id: mainCategoryId } : undefined,
    });
    return data;
}
