import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/shared/container";

export default function Loading() {
    return (
        <div>
            {/* Hero skeleton */}
            <div className="bg-slate-900 py-24 sm:py-32 lg:py-40">
                <Container>
                    <div className="flex flex-col items-center text-center space-y-6">
                        <Skeleton className="h-12 w-96 max-w-full bg-slate-700" />
                        <Skeleton className="h-6 w-[500px] max-w-full bg-slate-700" />
                        <Skeleton className="h-12 w-[500px] max-w-full bg-slate-700 rounded-xl" />
                    </div>
                </Container>
            </div>

            {/* Content skeleton */}
            <Container>
                <div className="py-16 space-y-8">
                    <Skeleton className="h-8 w-64 mx-auto" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="space-y-4 text-center">
                                <Skeleton className="h-24 w-24 rounded-full mx-auto" />
                                <Skeleton className="h-5 w-32 mx-auto" />
                                <Skeleton className="h-4 w-48 mx-auto" />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
}
