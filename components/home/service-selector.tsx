"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/features/category/hooks/use-categories";
import { useServices } from "@/features/category/hooks/use-services";
import type { MainCategory, Service } from "@/types";

interface ServiceSelectorProps {
    state: string;
    city: string;
}

export default function ServiceSelector({
    state,
    city,
}: ServiceSelectorProps) {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] =
        useState<MainCategory | null>(null);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const { data: categoriesData, isLoading: categoriesLoading } =
        useCategories();
    const { data: servicesData, isLoading: servicesLoading } = useServices(
        selectedCategory?.id
    );

    const handleCategoryChange = (value: string | null) => {
        if (!value) return;
        const category = categoriesData?.maincategories.find(
            (c) => c.id.toString() === value
        );
        setSelectedCategory(category || null);
        setSelectedService(null);
    };

    const handleServiceChange = (value: string | null) => {
        if (!value) return;
        const service = servicesData?.services.find(
            (s) => s.id.toString() === value
        );
        setSelectedService(service || null);
    };

    const handleSearch = () => {
        if (!selectedCategory || !selectedService) return;
        router.push(`/${state}/${city}/${selectedService.slug}`);
    };

    return (
        <div className="space-y-6">
            {/* Category Selection */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                    Select a Category
                </label>
                {categoriesLoading ? (
                    <Skeleton className="h-10 w-full" />
                ) : (
                    <Select value={selectedCategory?.id.toString() || ""} onValueChange={handleCategoryChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose a service category...">
                                {selectedCategory?.name}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {categoriesData?.maincategories.map((category) => (
                                <SelectItem
                                    key={category.id}
                                    value={category.id.toString()}
                                >
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </div>

            {/* Service Selection */}
            {selectedCategory && (
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                        Select a Service
                    </label>
                    {servicesLoading ? (
                        <Skeleton className="h-10 w-full" />
                    ) : servicesData?.services && servicesData.services.length > 0 ? (
                        <Select value={selectedService?.id.toString() || ""} onValueChange={handleServiceChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choose a specific service...">
                                    {selectedService?.title}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {servicesData.services.map((service) => (
                                    <SelectItem
                                        key={service.id}
                                        value={service.id.toString()}
                                    >
                                        {service.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ) : (
                        <p className="text-sm text-muted-foreground py-2">
                            No services found for this category.
                        </p>
                    )}
                </div>
            )}

            {/* Search Button */}
            {selectedCategory && selectedService && (
                <Button
                    onClick={handleSearch}
                    size="lg"
                    className="w-full sm:w-auto"
                >
                    {false ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Search className="mr-2 h-4 w-4" />
                    )}
                    Search Contractors
                    <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            )}
        </div>
    );
}
