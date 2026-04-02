import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ zip: string }> }
) {
    const { zip } = await params;

    if (!/^\d{5}$/.test(zip)) {
        return NextResponse.json(
            { error: "Invalid ZIP code format" },
            { status: 400 }
        );
    }

    try {
        const res = await fetch(`https://api.zippopotam.us/us/${zip}`, {
            next: { revalidate: 86400 },
        });

        if (!res.ok) {
            return NextResponse.json(
                { error: "ZIP code not found" },
                { status: 404 }
            );
        }

        const data = await res.json();
        const place = data.places?.[0];

        if (!place) {
            return NextResponse.json(
                { error: "ZIP code not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            city: place["place name"],
            state: place["state"],
            stateCode: place["state abbreviation"],
        });
    } catch {
        return NextResponse.json(
            { error: "Failed to lookup ZIP code" },
            { status: 500 }
        );
    }
}
