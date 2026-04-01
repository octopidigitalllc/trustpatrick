export interface MainCategory {
    id: number;
    name: string;
    slug: string;
    image: string;
}

export interface CategoriesResponse {
    maincategories: MainCategory[];
    total_count: number;
}
