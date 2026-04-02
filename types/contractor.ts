export interface Contractor {
    id: number;
    name: string;
    slug: string;
    telephone: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    zip_code: string | null;
    zip_codes?: string | null;
    membership_level_id: number | null;
}

export interface ContractorsResponse {
    company_details: Contractor[];
    total_count: number;
}

export interface ContractorDetailResponse {
    response: string;
    company_details: Contractor | null;
}
