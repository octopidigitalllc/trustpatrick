import { NextRequest, NextResponse } from "next/server";

function getGoogleMapsApiKey() {
    return (
        process.env.GOOGLE_MAPS_API_KEY ||
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
        process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    );
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const input = searchParams.get("input");
        const types = searchParams.get("types") || "address";
        const components = searchParams.get("components") || "country:us";

        if (!input) {
            return NextResponse.json(
                { error: "Input parameter is required" },
                { status: 400 }
            );
        }

        const apiKey = getGoogleMapsApiKey();

        if (!apiKey) {
            return NextResponse.json(
                { error: "Google Maps API key is not configured on the server" },
                { status: 500 }
            );
        }

        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
                input
            )}&types=${encodeURIComponent(types)}&components=${encodeURIComponent(
                components
            )}&key=${apiKey}`,
            { cache: "no-store" }
        );

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                {
                    error:
                        data?.error_message ||
                        "Failed to fetch suggestions from Google Places API",
                },
                { status: response.status }
            );
        }

        if (data.error_message) {
            return NextResponse.json(
                { error: data.error_message, status: data.status },
                { status: 400 }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in Places autocomplete route:", error);

        return NextResponse.json(
            { error: "Failed to fetch autocomplete suggestions" },
            { status: 500 }
        );
    }
}