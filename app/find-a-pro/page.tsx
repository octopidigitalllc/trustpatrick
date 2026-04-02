import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/shared/container";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import { generatePageMetadata } from "@/lib/seo";

interface ApiCategory {
    id: number;
    name: string;
    slug: string;
}

export const metadata: Metadata = generatePageMetadata({
    title: "Find a Pro – Browse All Categories",
    description:
        "Browse all home service categories on TrustPatrick. Find verified professionals for roofing, plumbing, electrical, HVAC, and more.",
    path: "/find-a-pro",
});

async function fetchCategories(): Promise<ApiCategory[]> {
    const apiBase = (
        process.env.NEXT_PUBLIC_API_BASE_URL || ""
    ).replace(/\/$/, "");
    if (!apiBase) return [];

    try {
        const res = await fetch(`${apiBase}/maincategories`, {
            next: { revalidate: 3600 },
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data?.maincategories ?? [];
    } catch {
        return [];
    }
}

/**
 * Default city / state for the browse links.
 * These are placeholders — the user will enter their own ZIP on the landing page.
 */
const DEFAULT_STATE = "va";
const DEFAULT_CITY = "manassas";

export default async function FindAProPage() {
    const categories = await fetchCategories();

    return (
        <>
            <section className="bg-muted/40 border-b py-10 sm:py-14">
                <Container>
                    <Breadcrumbs
                        items={[
                            { label: "Find a Pro" },
                        ]}
                    />
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        Find a Pro
                    </h1>
                    <p className="text-muted-foreground mt-2 max-w-2xl">
                        Browse home service categories and connect with verified
                        professionals in your area.
                    </p>
                </Container>
            </section>

            <section className="py-10 sm:py-14">
                <Container>
                    {categories.length === 0 ? (
                        <p className="text-muted-foreground text-center py-12">
                            Unable to load categories. Please try again later.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {categories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/find-a-pro/${DEFAULT_STATE}/${DEFAULT_CITY}/${cat.slug}`}
                                    className="rounded-xl border bg-card p-5 hover:shadow-md hover:border-primary/40 transition-all group"
                                >
                                    <h2 className="font-semibold text-sm group-hover:text-primary transition-colors">
                                        {cat.name}
                                    </h2>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Browse verified pros →
                                    </p>
                                </Link>
                            ))}
                        </div>
                    )}
                </Container>
            </section>
        </>
    );
}
