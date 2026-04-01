import { SITE_NAME, SITE_URL } from "@/constants";
import type { Metadata } from "next";

interface GenerateMetadataParams {
    title: string;
    description: string;
    path?: string;
    noIndex?: boolean;
}

export function generatePageMetadata({
    title,
    description,
    path = "",
    noIndex = false,
}: GenerateMetadataParams): Metadata {
    const url = `${SITE_URL}${path}`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: `${title} | ${SITE_NAME}`,
            description,
            url,
            siteName: SITE_NAME,
            type: "website",
            locale: "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | ${SITE_NAME}`,
            description,
        },
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}

export function generateLocalBusinessJsonLd(contractor: {
    name: string;
    telephone?: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    zip_code?: string | null;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: contractor.name,
        ...(contractor.telephone && { telephone: contractor.telephone }),
        address: {
            "@type": "PostalAddress",
            ...(contractor.address && { streetAddress: contractor.address }),
            ...(contractor.city && { addressLocality: contractor.city }),
            ...(contractor.state && { addressRegion: contractor.state }),
            ...(contractor.zip_code && { postalCode: contractor.zip_code }),
            addressCountry: "US",
        },
    };
}

export function generateBreadcrumbJsonLd(
    items: { name: string; url: string }[]
) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${SITE_URL}${item.url}`,
        })),
    };
}

export function generateServiceJsonLd(params: {
    serviceName: string;
    categoryName: string;
    city: string;
    state: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `${params.serviceName} in ${params.city}, ${params.state}`,
        serviceType: params.serviceName,
        category: params.categoryName,
        areaServed: {
            "@type": "Place",
            address: {
                "@type": "PostalAddress",
                addressLocality: params.city,
                addressRegion: params.state,
                addressCountry: "US",
            },
        },
    };
}

export function generateWebsiteJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${SITE_URL}/{state}/{city}`,
            },
            "query-input": "required name=search_term_string",
        },
    };
}
