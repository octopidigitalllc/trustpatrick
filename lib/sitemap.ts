import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants";
import { slugify } from "@/lib/helpers";

export interface SitemapIndexEntry {
    id: string;
    loc: string;
    lastModified: Date;
}

interface MainCategory {
    id: number;
    name: string;
    slug: string;
}

interface Service {
    id: number;
    title: string | undefined;
    name: string | undefined;
    slug: string;
    main_category_id: number;
}

interface LocationItem {
    zip: string;
    city: string;
    state: string;
}

interface ContractorItem {
    id: number;
    slug: string;
}

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");
const LOCATION_BASE_PATH = process.env.SITEMAP_LOCATIONS_PATH || "/sitemap/locations";
const CONTRACTOR_BASE_PATH = process.env.SITEMAP_CONTRACTORS_PATH || "/sitemap/contractors";
const MAX_URLS_PER_SITEMAP = 49000;

function toAbsoluteUrl(pathOrUrl: string): string {
    if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
        return pathOrUrl;
    }

    if (!API_BASE_URL) {
        throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured.");
    }

    return `${API_BASE_URL}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

async function fetchJson<T>(url: string): Promise<T | null> {
    try {
        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) {
            return null;
        }

        return (await response.json()) as T;
    } catch {
        return null;
    }
}

function parseCategories(payload: unknown): MainCategory[] {
    if (!payload || typeof payload !== "object") return [];
    const data = payload as { maincategories?: unknown[] };
    if (!Array.isArray(data.maincategories)) return [];

    return data.maincategories
        .map((item) => {
            if (!item || typeof item !== "object") return null;
            const row = item as { id?: number; name?: string; slug?: string };
            if (typeof row.id !== "number" || !row.name) return null;
            return {
                id: row.id,
                name: row.name,
                slug: row.slug || slugify(row.name),
            };
        })
        .filter((item): item is MainCategory => Boolean(item));
}

function parseServices(payload: unknown): Service[] {
    if (!payload || typeof payload !== "object") return [];
    const data = payload as { services?: unknown[] };
    if (!Array.isArray(data.services)) return [];

    return data.services
        .map((item) => {
            if (!item || typeof item !== "object") return null;
            const row = item as {
                id?: number;
                title?: string;
                name?: string;
                slug?: string;
                main_category_id?: number;
            };

            if (typeof row.id !== "number" || typeof row.main_category_id !== "number") {
                return null;
            }

            const serviceName = row.title || row.name;
            if (!serviceName) return null;

            return {
                id: row.id,
                title: row.title,
                name: row.name,
                slug: row.slug || slugify(serviceName),
                main_category_id: row.main_category_id,
            };
        })
        .filter((item): item is Service => Boolean(item));
}

function parseLocations(payload: unknown): LocationItem[] {
    if (!payload || typeof payload !== "object") return [];
    const data = payload as {
        locations?: unknown[];
        service_areas?: unknown[];
        zipcodes?: unknown[];
        data?: unknown[];
    };

    const list =
        (Array.isArray(data.locations) && data.locations) ||
        (Array.isArray(data.service_areas) && data.service_areas) ||
        (Array.isArray(data.zipcodes) && data.zipcodes) ||
        (Array.isArray(data.data) && data.data) ||
        [];

    return list
        .map((item) => {
            if (!item || typeof item !== "object") return null;
            const row = item as {
                zip?: string | number;
                zipcode?: string | number;
                zip_code?: string | number;
                city?: string;
                city_name?: string;
                state?: string;
                state_code?: string;
                state_short?: string;
            };

            const zip = String(row.zip ?? row.zipcode ?? row.zip_code ?? "").trim();
            const city = String(row.city ?? row.city_name ?? "").trim();
            const state = String(row.state ?? row.state_code ?? row.state_short ?? "").trim();

            if (!zip || !city || !state) return null;
            return { zip, city, state };
        })
        .filter((item): item is LocationItem => Boolean(item));
}

function parseContractors(payload: unknown): ContractorItem[] {
    if (!payload || typeof payload !== "object") return [];
    const data = payload as {
        contractors?: unknown[];
        company_details?: unknown[];
        data?: unknown[];
    };

    const list =
        (Array.isArray(data.contractors) && data.contractors) ||
        (Array.isArray(data.company_details) && data.company_details) ||
        (Array.isArray(data.data) && data.data) ||
        [];

    return list
        .map((item) => {
            if (!item || typeof item !== "object") return null;
            const row = item as { id?: number; slug?: string };
            if (!row.slug || typeof row.id !== "number") return null;
            return { id: row.id, slug: row.slug };
        })
        .filter((item): item is ContractorItem => Boolean(item));
}

function parseTotalCount(payload: unknown): number {
    if (!payload || typeof payload !== "object") return 0;
    const data = payload as { total_count?: number };
    return typeof data.total_count === "number" ? data.total_count : 0;
}

async function fetchLocationsPage(offset: number, limit: number): Promise<LocationItem[]> {
    const payload = await fetchJson<unknown>(
        toAbsoluteUrl(`${LOCATION_BASE_PATH}?limit=${limit}&offset=${offset}`)
    );
    return parseLocations(payload);
}

async function fetchLocationCount(): Promise<number> {
    const payload = await fetchJson<unknown>(toAbsoluteUrl(`${LOCATION_BASE_PATH}?limit=0&offset=0`));
    const locations = parseLocations(payload);
    if (locations.length > 0) {
        return locations.length;
    }

    return parseTotalCount(payload);
}

async function fetchAllContractors(): Promise<{ contractors: ContractorItem[]; totalCount: number }> {
    const payload = await fetchJson<unknown>(toAbsoluteUrl(CONTRACTOR_BASE_PATH));
    return {
        contractors: parseContractors(payload),
        totalCount: parseTotalCount(payload),
    };
}

async function fetchCategoriesAndServices(): Promise<{
    categories: MainCategory[];
    services: Service[];
}> {
    const [categoriesPayload, servicesPayload] = await Promise.all([
        fetchJson<unknown>(toAbsoluteUrl("/maincategories")),
        fetchJson<unknown>(toAbsoluteUrl("/services")),
    ]);

    return {
        categories: parseCategories(categoriesPayload),
        services: parseServices(servicesPayload),
    };
}

function buildLocationUrl(location: LocationItem): string {
    return `${SITE_URL}/${slugify(location.state)}/${slugify(location.city)}`;
}

function getCategoryLocationsPerSitemap(serviceCount: number): number {
    if (serviceCount <= 0) return 0;
    return Math.max(1, Math.floor(MAX_URLS_PER_SITEMAP / serviceCount));
}

export async function getSitemapIndexEntries(): Promise<SitemapIndexEntry[]> {
    const now = new Date();
    const [{ categories, services }, totalLocations, { totalCount: contractorCount }] =
        await Promise.all([fetchCategoriesAndServices(), fetchLocationCount(), fetchAllContractors()]);

    const entries: SitemapIndexEntry[] = [
        {
            id: "static",
            loc: `${SITE_URL}/sitemaps/static.xml`,
            lastModified: now,
        },
    ];

    const locationPageCount = Math.max(1, Math.ceil(totalLocations / MAX_URLS_PER_SITEMAP));
    for (let page = 0; page < locationPageCount; page++) {
        entries.push({
            id: `locations-${page}`,
            loc: `${SITE_URL}/sitemaps/locations-${page}.xml`,
            lastModified: now,
        });
    }

    const contractorPageCount = Math.max(1, Math.ceil(contractorCount / MAX_URLS_PER_SITEMAP));
    for (let page = 0; page < contractorPageCount; page++) {
        entries.push({
            id: `contractors-${page}`,
            loc: `${SITE_URL}/sitemaps/contractors-${page}.xml`,
            lastModified: now,
        });
    }

    for (const category of categories) {
        const serviceCount = services.filter((service) => service.main_category_id === category.id).length;
        if (serviceCount === 0) continue;

        const locationsPerPage = getCategoryLocationsPerSitemap(serviceCount);
        const pageCount = Math.max(1, Math.ceil(totalLocations / locationsPerPage));

        for (let page = 0; page < pageCount; page++) {
            entries.push({
                id: `category-${category.id}-${page}`,
                loc: `${SITE_URL}/sitemaps/category-${category.id}-${page}.xml`,
                lastModified: now,
            });
        }
    }

    return entries;
}

export async function getSitemapEntriesById(id: string): Promise<MetadataRoute.Sitemap> {
    const now = new Date();
    const normalizedId = id.replace(/\.xml$/, "");

    if (normalizedId === "static") {
        return [
            {
                url: SITE_URL,
                lastModified: now,
                changeFrequency: "daily",
                priority: 1,
            },
            {
                url: `${SITE_URL}/about`,
                lastModified: now,
                changeFrequency: "monthly",
                priority: 0.5,
            },
        ];
    }

    const locationMatch = /^locations-(\d+)$/.exec(normalizedId);
    if (locationMatch) {
        const page = Number.parseInt(locationMatch[1], 10);
        const locations = await fetchLocationsPage(page * MAX_URLS_PER_SITEMAP, MAX_URLS_PER_SITEMAP);

        // Deduplicate by city+state since zip is no longer in the URL
        const seen = new Set<string>();
        const unique: MetadataRoute.Sitemap = [];
        for (const location of locations) {
            const url = buildLocationUrl(location);
            if (!seen.has(url)) {
                seen.add(url);
                unique.push({
                    url,
                    lastModified: now,
                    changeFrequency: "weekly",
                    priority: 0.8,
                });
            }
        }
        return unique;
    }

    const contractorMatch = /^contractors-(\d+)$/.exec(normalizedId);
    if (contractorMatch) {
        const page = Number.parseInt(contractorMatch[1], 10);
        const { contractors } = await fetchAllContractors();
        const chunk = contractors.slice(
            page * MAX_URLS_PER_SITEMAP,
            (page + 1) * MAX_URLS_PER_SITEMAP
        );

        return chunk.map((contractor) => ({
            url: `${SITE_URL}/contractor/${contractor.slug}`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.6,
        }));
    }

    const categoryMatch = /^category-(\d+)-(\d+)$/.exec(normalizedId);
    if (categoryMatch) {
        const categoryId = Number.parseInt(categoryMatch[1], 10);
        const page = Number.parseInt(categoryMatch[2], 10);
        const { categories, services } = await fetchCategoriesAndServices();
        const category = categories.find((item) => item.id === categoryId);

        if (!category) return [];

        const categoryServices = services.filter((service) => service.main_category_id === category.id);
        if (categoryServices.length === 0) return [];

        const locationsPerPage = getCategoryLocationsPerSitemap(categoryServices.length);
        const locations = await fetchLocationsPage(page * locationsPerPage, locationsPerPage);

        // Deduplicate by city+state+service since zip is no longer in the URL
        const seen = new Set<string>();
        const unique: MetadataRoute.Sitemap = [];
        for (const location of locations) {
            const locationBase = buildLocationUrl(location);
            for (const service of categoryServices) {
                const url = `${locationBase}/${service.slug}`;
                if (!seen.has(url)) {
                    seen.add(url);
                    unique.push({
                        url,
                        lastModified: now,
                        changeFrequency: "weekly" as const,
                        priority: 0.7,
                    });
                }
            }
        }
        return unique;
    }

    return [];
}

function escapeXml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

export function renderSitemapIndexXml(entries: SitemapIndexEntry[]): string {
    const items = entries
        .map(
            (entry) => `  <sitemap><loc>${escapeXml(entry.loc)}</loc><lastmod>${entry.lastModified.toISOString()}</lastmod></sitemap>`
        )
        .join("\n");

    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        items,
        '</sitemapindex>',
    ].join("\n");
}

export function renderUrlSetXml(entries: MetadataRoute.Sitemap): string {
    const items = entries
        .map((entry) => {
            const lastModified = entry.lastModified
                ? new Date(entry.lastModified).toISOString()
                : undefined;

            return [
                "  <url>",
                `    <loc>${escapeXml(entry.url)}</loc>`,
                lastModified ? `    <lastmod>${lastModified}</lastmod>` : undefined,
                entry.changeFrequency
                    ? `    <changefreq>${entry.changeFrequency}</changefreq>`
                    : undefined,
                typeof entry.priority === "number"
                    ? `    <priority>${entry.priority}</priority>`
                    : undefined,
                "  </url>",
            ]
                .filter(Boolean)
                .join("\n");
        })
        .join("\n");

    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        items,
        '</urlset>',
    ].join("\n");
}