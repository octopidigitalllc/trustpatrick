"use client";

import Image from "next/image";
import { useCategories } from "@/features/category/hooks/use-categories";
import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/shared/container";

export default function CategorySection() {
    const { data, isLoading, isError } = useCategories();

    return (
        <section className="py-16 sm:py-24">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Popular Service Categories
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Browse our most popular home service categories to find the right
                        professional for your project.
                    </p>
                </div>

                {isLoading && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="space-y-3">
                                <Skeleton className="h-40 w-full rounded-xl" />
                                <Skeleton className="h-4 w-2/3 mx-auto" />
                            </div>
                        ))}
                    </div>
                )}

                {isError && (
                    <div className="text-center text-muted-foreground py-12">
                        Unable to load categories. Please try again later.
                    </div>
                )}

                {data?.maincategories && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {data.maincategories.map((category) => (
                            <div
                                key={category.id}
                                className="group relative overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-lg"
                            >
                                <div className="aspect-[4/3] overflow-hidden">
                                    {category.image ? (
                                        <Image
                                            src={category.image}
                                            alt={category.name}
                                            width={400}
                                            height={300}
                                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-muted flex items-center justify-center">
                                            <span className="text-4xl">🏠</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="font-semibold text-sm sm:text-base">
                                        {category.name}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </section>
    );
}
