export interface ApiSuccessResponse<T> {
    response?: "success";
    total_count?: number;
    [key: string]: T | string | number | undefined;
}

export interface ApiErrorResponse {
    response: "failure";
    responsemessage: string | Record<string, string>[];
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
