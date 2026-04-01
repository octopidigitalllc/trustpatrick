import { Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ContractorCard from "@/components/contractor/contractor-card";
import type { Contractor } from "@/types";

interface ContractorListProps {
    contractors: Contractor[];
    isLoading: boolean;
}

export default function ContractorList({
    contractors,
    isLoading,
}: ContractorListProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-xl border p-6 space-y-4">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-5 w-48" />
                                <Skeleton className="h-4 w-36" />
                                <Skeleton className="h-4 w-56" />
                            </div>
                            <Skeleton className="h-12 w-12 rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (contractors.length === 0) {
        return (
            <div className="text-center py-16">
                <Users className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                <h3 className="text-lg font-semibold">No Contractors Found</h3>
                <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                    We couldn&apos;t find any contractors matching your criteria in this
                    area. Try adjusting your search.
                </p>
            </div>
        );
    }

    return (
        <div>
            <p className="text-sm text-muted-foreground mb-6">
                {contractors.length} contractor{contractors.length !== 1 ? "s" : ""}{" "}
                found
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contractors.map((contractor) => (
                    <ContractorCard key={contractor.id} contractor={contractor} />
                ))}
            </div>
        </div>
    );
}
