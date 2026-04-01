"use client";

import { AlertCircle } from "lucide-react";
import ContractorList from "@/components/contractor/contractor-list";
import { useContractors } from "@/features/contractor/hooks/use-contractors";

interface ContractorListWrapperProps {
    city: string;
    stateCode: string;
    mainCategoryId: number;
    serviceCategoryId: number;
}

export default function ContractorListWrapper({
    city,
    stateCode,
    mainCategoryId,
    serviceCategoryId,
}: ContractorListWrapperProps) {
    const { data, isLoading, isError, error } = useContractors(
        city,
        stateCode,
        mainCategoryId,
        serviceCategoryId
    );

    if (isError) {
        return (
            <div className="text-center py-16">
                <AlertCircle className="h-12 w-12 text-destructive/60 mx-auto mb-4" />
                <h3 className="text-lg font-semibold">Error Loading Contractors</h3>
                <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                    {error?.message || "Something went wrong. Please try again."}
                </p>
            </div>
        );
    }

    return (
        <ContractorList
            contractors={data?.company_details || []}
            isLoading={isLoading}
        />
    );
}
