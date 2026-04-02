"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, X, Loader2, CircleAlert } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "@/services/service.service";
import { getMainCategories } from "@/services/category.service";
import type { Service } from "@/types";

const MAX_SUGGESTIONS = 5;
const MIN_SEARCH_LENGTH = 3;
const SEARCH_DEBOUNCE_MS = 250;

export default function ServiceZipSearchBar() {
    const router = useRouter();
    const [serviceQuery, setServiceQuery] = useState("");
    const [debouncedServiceQuery, setDebouncedServiceQuery] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [serviceError, setServiceError] = useState("");
    const [zipError, setZipError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Fetch all services (no category filter)
    const { data: servicesData } = useQuery({
        queryKey: ["all-services"],
        queryFn: () => getServices(),
        staleTime: 10 * 60 * 1000,
    });

    // Fetch categories for name context in suggestions
    const { data: categoriesData } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getMainCategories(),
        staleTime: 10 * 60 * 1000,
    });

    const services = servicesData?.services ?? [];
    const categories = categoriesData?.maincategories ?? [];

    useEffect(() => {
        const normalizedQuery = serviceQuery.trim();

        if (normalizedQuery.length < MIN_SEARCH_LENGTH) {
            setDebouncedServiceQuery("");
            setShowDropdown(false);
            return;
        }

        const timer = window.setTimeout(() => {
            setDebouncedServiceQuery(normalizedQuery);
            setShowDropdown(true);
        }, SEARCH_DEBOUNCE_MS);

        return () => window.clearTimeout(timer);
    }, [serviceQuery]);

    // Filter services based on debounced query
    const filteredServices =
        debouncedServiceQuery.length >= MIN_SEARCH_LENGTH
            ? services.filter((s) =>
                s.title
                    .toLowerCase()
                    .includes(debouncedServiceQuery.toLowerCase())
            )
            : [];

    const visibleServices = filteredServices.slice(0, MAX_SUGGESTIONS);
    const hasMore = filteredServices.length > MAX_SUGGESTIONS;

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getCategoryName = (categoryId: number) =>
        categories.find((c) => c.id === categoryId)?.name ?? "";

    const highlightMatch = (text: string, query: string) => {
        if (!query) return text;
        const idx = text.toLowerCase().indexOf(query.toLowerCase());
        if (idx === -1) return text;
        return (
            <>
                {text.slice(0, idx)}
                <strong className="font-bold">
                    {text.slice(idx, idx + query.length)}
                </strong>
                {text.slice(idx + query.length)}
            </>
        );
    };

    const handleSelectService = (service: Service) => {
        setSelectedService(service);
        setServiceQuery(service.title);
        setDebouncedServiceQuery(service.title);
        setShowDropdown(false);
        setServiceError("");
    };

    const handleSubmit = async () => {
        setServiceError("");
        setZipError("");
        let hasError = false;

        if (!selectedService) {
            setServiceError("Please select a service from the list");
            hasError = true;
        }

        if (!zipCode.trim()) {
            setZipError("Please enter a ZIP code");
            hasError = true;
        } else if (!/^\d{5}$/.test(zipCode.trim())) {
            setZipError("Please enter a valid 5-digit ZIP code");
            hasError = true;
        }

        if (hasError) return;

        setIsSubmitting(true);

        try {
            const res = await fetch(`/api/zip-lookup/${zipCode.trim()}`);

            if (!res.ok) {
                setZipError("Invalid ZIP code. Please check and try again");
                setIsSubmitting(false);
                return;
            }

            const { city, stateCode } = await res.json();

            const stateSlug = stateCode.toLowerCase();
            const citySlug = city
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "");

            // Store zip in sessionStorage (same pattern as address search)
            sessionStorage.setItem("tp_zip", zipCode.trim());

            router.push(`/${stateSlug}/${citySlug}/${selectedService!.slug}`);
        } catch {
            setZipError("Failed to validate ZIP code. Please try again");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    };

    const errorMessages = [serviceError, zipError].filter(Boolean);

    return (
        <div className="relative z-30 w-full max-w-2xl mx-auto" ref={containerRef}>
            <div className="relative flex items-center bg-white rounded-full shadow-lg">
                {/* Service Input */}
                <div className="relative flex-1 min-w-0">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for a service..."
                        value={serviceQuery}
                        onChange={(e) => {
                            setServiceQuery(e.target.value);
                            setSelectedService(null);
                            setServiceError("");
                        }}
                        onFocus={() => {
                            if (debouncedServiceQuery.length >= MIN_SEARCH_LENGTH) {
                                setShowDropdown(true);
                            }
                        }}
                        onKeyDown={handleKeyDown}
                        className="w-full h-12 pl-12 pr-8 rounded-l-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm sm:text-base"
                    />
                    {serviceQuery && (
                        <button
                            type="button"
                            onClick={() => {
                                setServiceQuery("");
                                setSelectedService(null);
                                setShowDropdown(false);
                                inputRef.current?.focus();
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full"
                        >
                            <X className="h-4 w-4 text-muted-foreground" />
                        </button>
                    )}

                    {/* Suggestions Dropdown */}
                    {showDropdown && visibleServices.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border overflow-hidden z-80">
                            {visibleServices.map((service) => (
                                <button
                                    key={service.id}
                                    type="button"
                                    onClick={() => handleSelectService(service)}
                                    className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-muted transition-colors"
                                >
                                    <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                                    <div className="min-w-0">
                                        <div className="text-sm text-foreground truncate">
                                            {highlightMatch(
                                                service.title,
                                                debouncedServiceQuery
                                            )}
                                        </div>
                                        {getCategoryName(
                                            service.main_category_id
                                        ) && (
                                                <div className="text-xs text-muted-foreground truncate">
                                                    {getCategoryName(
                                                        service.main_category_id
                                                    )}
                                                </div>
                                            )}
                                    </div>
                                </button>
                            ))}
                            {hasMore && (
                                <button
                                    type="button"
                                    onClick={() => setShowDropdown(false)}
                                    className="w-full px-4 py-2.5 text-sm text-primary font-medium hover:bg-muted transition-colors text-left"
                                >
                                    View all ({filteredServices.length} results)
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="h-8 w-px bg-border shrink-0" />

                {/* ZIP Code Input */}
                <div className="relative shrink-0">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Zip code"
                        value={zipCode}
                        onChange={(e) => {
                            const val = e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 5);
                            setZipCode(val);
                            setZipError("");
                        }}
                        onKeyDown={handleKeyDown}
                        className="w-28 sm:w-32 h-12 pl-10 pr-2 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm sm:text-base"
                        inputMode="numeric"
                    />
                </div>

                {/* Search Button */}
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="h-10 w-10 mr-1 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 shrink-0 cursor-pointer"
                >
                    {isSubmitting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <Search className="h-5 w-5" />
                    )}
                </button>
            </div>

            {/* Error Messages */}
            {errorMessages.length > 0 && (
                <div className="mt-3 rounded-2xl border border-rose-300/30 bg-rose-400/10 px-4 py-3 text-left text-rose-100 shadow-sm backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                        <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-rose-200" />
                        <div className="space-y-1">
                            {errorMessages.map((message) => (
                                <p key={message} className="text-sm leading-5">
                                    {message}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
