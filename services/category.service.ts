import apiClient from "@/lib/axios";
import type { CategoriesResponse } from "@/types";

export async function getMainCategories(
    searchkey?: string
): Promise<CategoriesResponse> {
    const { data } = await apiClient.get<CategoriesResponse>("/maincategories", {
        params: searchkey ? { searchkey } : undefined,
    });
    return data;
}
