export interface Service {
    id: number;
    title: string;
    slug: string;
    main_category_id: number;
    top_level_category_id: number;
    service_category_type_id: number;
    sc_code: string;
}

export interface ServicesResponse {
    services: Service[];
    total_count: number;
}
