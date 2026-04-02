"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Loader2 } from "lucide-react";

interface CategoryZipSearchProps {
    categoryName: string;
    state: string;
    city: string;
    categorySlug?: string;
    defaultZip?: string;
    variant?: "stacked" | "inline";
}

export default function CategoryZipSearch({
    categoryName,
    state,
    city,
    categorySlug,
    defaultZip = "",
    variant = "stacked",
}: CategoryZipSearchProps) {
    const router = useRouter();
    const [zipCode, setZipCode] = useState(defaultZip);
    const [zipError, setZipError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setZipError("");

        if (!zipCode.trim()) {
            setZipError("Please enter a ZIP code");
            return;
        }

        if (!/^\d{5}$/.test(zipCode.trim())) {
            setZipError("Please enter a valid 5-digit ZIP code");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch(`/api/zip-lookup/${zipCode.trim()}`);

            if (!res.ok) {
                setZipError("Invalid ZIP code. Please check and try again");
                setIsSubmitting(false);
                return;
            }

            sessionStorage.setItem("tp_zip", zipCode.trim());

            // Use the looked-up city/state from the ZIP
            const lookupData = await res.json();
            const resolvedState = lookupData.stateCode?.toLowerCase() || state;
            const resolvedCity = lookupData.city?.toLowerCase().replace(/\s+/g, "-") || city;

            if (categorySlug) {
                // Redirect to the same category page for the new location
                router.push(`/find-a-pro/${resolvedState}/${resolvedCity}/${categorySlug}`);
            } else {
                router.push(`/${resolvedState}/${resolvedCity}`);
            }
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

    const zipInput = (
        <div className="relative flex-1">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            <input
                type="text"
                placeholder="ZIP Code"
                value={zipCode}
                onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 5);
                    setZipCode(val);
                    setZipError("");
                }}
                onKeyDown={handleKeyDown}
                className="w-full h-14 pl-12 pr-4 rounded-xl bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base shadow-lg"
                inputMode="numeric"
            />
        </div>
    );

    if (variant === "inline") {
        return (
            <div className="w-full max-w-xl mx-auto">
                <p className="text-slate-200 mb-4 text-sm sm:text-base">
                    Enter your zip to find your perfect match for your project
                    in a few clicks
                </p>
                <div className="flex gap-3">
                    {zipInput}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="h-14 rounded-xl bg-[#003E74] px-6 text-base font-semibold text-white shadow-lg transition-colors hover:bg-[#002d55] disabled:opacity-50 sm:px-8 flex items-center gap-2 cursor-pointer shrink-0"
                    >
                        {isSubmitting ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            "Start Matching"
                        )}
                    </button>
                </div>
                {zipError && (
                    <p className="mt-2 text-sm text-rose-200 text-left pl-1">
                        {zipError}
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <p className="text-slate-200 mb-4 text-sm sm:text-base">
                Enter your zip and get matched with top{" "}
                {categoryName.toLowerCase()} pros
            </p>

            {zipInput}

            {zipError && (
                <p className="mt-2 text-sm text-rose-200 text-left pl-1">
                    {zipError}
                </p>
            )}

            <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#003E74] text-base font-semibold text-white shadow-lg transition-colors hover:bg-[#002d55] disabled:opacity-50 cursor-pointer"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Searching...
                    </>
                ) : (
                    "Start Matching"
                )}
            </button>
        </div>
    );
}
