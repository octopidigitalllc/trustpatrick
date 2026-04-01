"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { slugify } from "@/lib/helpers";

interface AddressComponents {
    state: string;
    stateSlug: string;
    city: string;
    citySlug: string;
    zip: string;
}

interface Suggestion {
    placeId: string;
    description: string;
}

export function useAddressAutocomplete() {
    const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [addressComponents, setAddressComponents] =
        useState<AddressComponents | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    const fetchSuggestions = useCallback(
        async (input: string) => {
            if (!input.trim()) {
                setSuggestions([]);
                setLoadError(null);
                return;
            }

            setIsLoading(true);

            try {
                const response = await fetch(
                    `/api/places/autocomplete?input=${encodeURIComponent(
                        input
                    )}&types=address&components=country:us`
                );
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data?.error || "Failed to fetch address suggestions"
                    );
                }

                if (data.status === "OK" && Array.isArray(data.predictions)) {
                    setSuggestions(
                        data.predictions.map(
                            (prediction: {
                                place_id: string;
                                description: string;
                            }) => ({
                                placeId: prediction.place_id,
                                description: prediction.description,
                            })
                        )
                    );
                    setLoadError(null);
                    return;
                }

                setSuggestions([]);
                setLoadError(data?.error || "No address suggestions found");
            } catch (error) {
                setSuggestions([]);
                setLoadError(
                    error instanceof Error
                        ? error.message
                        : "Failed to fetch address suggestions"
                );
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const handleInputChange = useCallback(
        (input: string) => {
            setValue(input);
            setLoadError(null);

            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }

            if (input.trim().length < 3) {
                setSuggestions([]);
                return;
            }

            debounceTimerRef.current = setTimeout(() => {
                fetchSuggestions(input);
            }, 300);
        },
        [fetchSuggestions]
    );

    const handleSelect = useCallback(
        async (placeId: string, description: string) => {
            setValue(description);
            setSuggestions([]);

            try {
                setIsLoading(true);

                const response = await fetch(
                    `/api/places/details?place_id=${encodeURIComponent(
                        placeId
                    )}&fields=address_components`
                );
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data?.error || "Failed to fetch place details");
                }

                if (!data?.result?.address_components) {
                    throw new Error("Selected address is missing required details");
                }

                let state = "";
                let city = "";
                let zip = "";

                for (const component of data.result.address_components as Array<{
                    long_name: string;
                    short_name: string;
                    types: string[];
                }>) {
                    if (component.types.includes("administrative_area_level_1")) {
                        state = component.short_name; // "TX", "CA", etc.
                    }
                    if (component.types.includes("locality")) {
                        city = component.long_name;
                    }
                    if (!city && component.types.includes("sublocality_level_1")) {
                        city = component.long_name;
                    }
                    if (component.types.includes("postal_code")) {
                        zip = component.short_name;
                    }
                }

                // Store zip in sessionStorage for contractor API calls
                if (zip) {
                    try { sessionStorage.setItem("tp_zip", zip); } catch { }
                }

                setAddressComponents({
                    state,
                    stateSlug: state.toLowerCase(), // "tx", "ca", etc.
                    city,
                    citySlug: slugify(city),
                    zip,
                });
                setLoadError(null);
            } catch (error) {
                setAddressComponents(null);
                setLoadError(
                    error instanceof Error
                        ? error.message
                        : "Failed to fetch place details"
                );
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const clearSuggestions = useCallback(() => {
        setSuggestions([]);
    }, []);

    const reset = useCallback(() => {
        setValue("");
        setSuggestions([]);
        setAddressComponents(null);
        setLoadError(null);
    }, []);

    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

    return {
        isLoaded: true,
        isLoading,
        loadError,
        value,
        suggestions,
        addressComponents,
        handleInputChange,
        handleSelect,
        clearSuggestions,
        reset,
    };
}
