"use client";

import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAddressAutocomplete } from "@/features/location/hooks/use-address-autocomplete";

export default function AddressSearchBar() {
    const router = useRouter();
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const {
        isLoading,
        loadError,
        value,
        suggestions,
        addressComponents,
        handleInputChange,
        handleSelect,
        clearSuggestions,
    } = useAddressAutocomplete();

    // Navigate when address components are extracted
    useEffect(() => {
        if (addressComponents) {
            const { stateSlug, citySlug } = addressComponents;
            if (stateSlug && citySlug) {
                router.push(`/${stateSlug}/${citySlug}`);
            }
        }
    }, [addressComponents, router]);

    // Close suggestions on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target as Node)
            ) {
                clearSuggestions();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [clearSuggestions]);

    return (
        <div className="relative w-full max-w-xl mx-auto" ref={suggestionsRef}>
            <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Enter your address..."
                    value={value}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="h-12 pl-10 pr-10 text-base rounded-xl bg-white shadow-lg border-0 focus-visible:ring-2 focus-visible:ring-primary"
                />
                {isLoading ? (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground animate-spin" />
                ) : (
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                )}
            </div>

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
                <div className="absolute z-50 mt-2 w-full rounded-xl bg-white shadow-xl border overflow-hidden">
                    {suggestions.map((suggestion) => (
                        <button
                            key={suggestion.placeId}
                            type="button"
                            onClick={() =>
                                handleSelect(suggestion.placeId, suggestion.description)
                            }
                            className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm hover:bg-muted transition-colors"
                        >
                            <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="truncate">{suggestion.description}</span>
                        </button>
                    ))}
                </div>
            )}

            {loadError && (
                <p className="mt-2 text-sm text-destructive">{loadError}</p>
            )}
        </div>
    );
}
