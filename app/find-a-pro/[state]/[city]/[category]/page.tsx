import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryLandingContent from "@/components/category/category-landing-content";
import { getCategoryLandingData } from "@/constants/category-landing-data";
import { deslugify } from "@/lib/helpers";
import { stateCodeToName } from "@/lib/us-states";
import {
    generatePageMetadata,
    generateBreadcrumbJsonLd,
    generateServiceJsonLd,
} from "@/lib/seo";

interface CategoryLandingPageProps {
    params: Promise<{
        state: string;
        city: string;
        category: string;
    }>;
}

interface ApiCategory {
    id: number;
    name: string;
    slug: string;
}

interface ApiService {
    id: number;
    title: string;
    slug: string;
    main_category_id: number;
}

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(
    /\/$/,
    ""
);

/**
 * Fetch all main categories from the API (1h cache).
 * Returns the full list plus the resolved match for the given slug.
 */
async function fetchCategoriesAndResolve(categorySlug: string) {
    if (!API_BASE) return null;

    try {
        const res = await fetch(`${API_BASE}/maincategories`, {
            next: { revalidate: 3600 },
        });
        if (!res.ok) return null;

        const data = await res.json();
        const categories: ApiCategory[] = data?.maincategories ?? [];
        const match = categories.find(
            (c: ApiCategory) => c.slug === categorySlug
        );
        if (!match) return null;

        return { match, allCategories: categories };
    } catch {
        return null;
    }
}

/**
 * Fetch services that belong to a main category (1h cache).
 */
async function fetchServicesForCategory(
    categoryId: number
): Promise<ApiService[]> {
    if (!API_BASE) return [];

    try {
        const res = await fetch(
            `${API_BASE}/services?main_category_id=${categoryId}`,
            { next: { revalidate: 3600 } }
        );
        if (!res.ok) return [];
        const data = await res.json();
        return data?.services ?? [];
    } catch {
        return [];
    }
}

export async function generateMetadata({
    params,
}: CategoryLandingPageProps): Promise<Metadata> {
    const { state, city, category } = await params;
    const cityName = deslugify(city);
    const stateName = stateCodeToName(state);
    const categoryName = deslugify(category);

    return generatePageMetadata({
        title: `${categoryName} Pros in ${cityName}, ${stateName}`,
        description: `Find top-rated ${categoryName.toLowerCase()} professionals in ${cityName}, ${stateName}. Compare verified pros, read reviews, and get matched today on TrustPatrick.`,
        path: `/find-a-pro/${state}/${city}/${category}`,
    });
}

export default async function CategoryLandingPage({
    params,
}: CategoryLandingPageProps) {
    const { state, city, category } = await params;
    const cityName = deslugify(city);
    const stateName = stateCodeToName(state);

    // Fetch categories + validate slug
    const result = await fetchCategoriesAndResolve(category);
    if (!result) {
        notFound();
    }

    const { match: resolvedCategory, allCategories } = result;

    // Fetch services for this category
    const services = await fetchServicesForCategory(resolvedCategory.id);

    const categoryName = resolvedCategory.name;
    const landingData = getCategoryLandingData(resolvedCategory.slug);

    const breadcrumbJsonLd = generateBreadcrumbJsonLd([
        { name: "Home", url: "/" },
        {
            name: `${categoryName} Pros`,
            url: `/find-a-pro/${state}/${city}/${category}`,
        },
        {
            name: `${categoryName} in ${stateName}`,
            url: `/find-a-pro/${state}/${city}/${category}`,
        },
        {
            name: `${categoryName} in ${cityName}`,
            url: `/find-a-pro/${state}/${city}/${category}`,
        },
    ]);

    const serviceJsonLd = generateServiceJsonLd({
        serviceName: categoryName,
        categoryName,
        city: cityName,
        state: stateName,
    });

    return (
        <CategoryLandingContent
            categoryName={categoryName}
            categorySlug={resolvedCategory.slug}
            cityName={cityName}
            stateName={stateName}
            state={state}
            city={city}
            mainCategoryId={resolvedCategory.id}
            services={services.map((s) => ({
                id: s.id,
                title: s.title,
                slug: s.slug,
            }))}
            allCategories={allCategories.map((c) => ({
                id: c.id,
                name: c.name,
                slug: c.slug,
            }))}
            landingData={landingData}
            breadcrumbJsonLd={breadcrumbJsonLd}
            serviceJsonLd={serviceJsonLd}
        />
    );
}
