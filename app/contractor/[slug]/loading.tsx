import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/shared/container";

export default function ContractorDetailLoading() {
    return (
        <section className="py-10 sm:py-14">
            <Container>
                <Skeleton className="h-4 w-48 mb-6" />
                <Skeleton className="h-8 w-32 mb-6" />
                <div className="rounded-xl border p-8 space-y-6">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-16 w-16 rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-5 w-24" />
                        </div>
                    </div>
                    <Skeleton className="h-px w-full" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-5 w-36" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-5 w-48" />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
