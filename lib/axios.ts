import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout: 15000,
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error)) {
            const message =
                error.response?.data?.responsemessage ||
                error.message ||
                "An unexpected error occurred";
            return Promise.reject(new Error(typeof message === "string" ? message : JSON.stringify(message)));
        }
        return Promise.reject(error);
    }
);

export default apiClient;
