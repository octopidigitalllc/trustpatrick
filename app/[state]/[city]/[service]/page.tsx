import type { Metadata } from "next";
import Container from "@/components/shared/container";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import ContractorListWrapper from "@/components/contractor/contractor-list-wrapper";
import { deslugify } from "@/lib/helpers";
import { stateCodeToName } from "@/lib/us-states";
import {
    generatePageMetadata,
    generateBreadcrumbJsonLd,
    generateServiceJsonLd,
} from "@/lib/seo";

interface ContractorListingPageProps {
    params: Promise<{
        state: string;
        city: string;
        service: string;
    }>;
}

interface ApiService {
    id: number;
    title: string;
    slug: string;
    main_category_id: number;
}

interface ApiCategory {
    id: number;
    name: string;
    slug: string;
}

async function resolveServiceBySlug(serviceSlug: string) {
    const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");
    if (!apiBase) return null;

    try {
        const [servicesRes, categoriesRes] = await Promise.all([
            fetch(`${apiBase}/services`, { cache: "no-store" }),
            fetch(`${apiBase}/maincategories`, { cache: "no-store" }),
        ]);

        if (!servicesRes.ok || !categoriesRes.ok) return null;

        const servicesData = await servicesRes.json();
        const categoriesData = await categoriesRes.json();

        const services: ApiService[] = servicesData?.services ?? [];
        const categories: ApiCategory[] = categoriesData?.maincategories ?? [];

        const service = services.find((s: ApiService) => s.slug === serviceSlug);
        if (!service) return null;

        const category = categories.find((c: ApiCategory) => c.id === service.main_category_id);

        return {
            serviceId: service.id,
            serviceName: service.title,
            mainCategoryId: service.main_category_id,
            categoryName: category?.name ?? "",
            categorySlug: category?.slug ?? "",
        };
    } catch {
        return null;
    }
}

export async function generateMetadata({
    params,
}: ContractorListingPageProps): Promise<Metadata> {
    const { state, city, service } = await params;
    const cityName = deslugify(city);
    const stateName = stateCodeToName(state);
    const serviceName = deslugify(service);

    return generatePageMetadata({
        title: `${serviceName} Contractors in ${cityName}, ${stateName}`,
        description: `Find top-rated ${serviceName} contractors in ${cityName}, ${stateName}. Browse verified professionals, compare services, and get connected today.`,
        path: `/${state}/${city}/${service}`,
    });
}

export default async function ContractorListingPage({
    params,
}: ContractorListingPageProps) {
    const { state, city, service } = await params;
    const cityName = deslugify(city);
    const stateName = stateCodeToName(state);
    const serviceName = deslugify(service);

    const resolved = await resolveServiceBySlug(service);

    const categoryName = resolved?.categoryName || "";
    const mainCategoryId = resolved?.mainCategoryId ?? 0;
    const serviceCategoryId = resolved?.serviceId ?? 0;

    const breadcrumbJsonLd = generateBreadcrumbJsonLd([
        { name: "Home", url: "/" },
        {
            name: `${cityName}, ${stateName}`,
            url: `/${state}/${city}`,
        },
        {
            name: serviceName,
            url: `/${state}/${city}/${service}`,
        },
    ]);

    const serviceJsonLd = generateServiceJsonLd({
        serviceName,
        categoryName,
        city: cityName,
        state: stateName,
    });

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
            />

            {/* Header */}
            <section className="bg-muted/40 border-b py-10 sm:py-14">
                <Container>
                    <Breadcrumbs
                        items={[
                            {
                                label: `${cityName}, ${stateName}`,
                                href: `/${state}/${city}`,
                            },
                            { label: serviceName },
                        ]}
                    />
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        {serviceName} Contractors in {cityName}, {stateName}
                    </h1>
                    <p className="text-muted-foreground mt-2 max-w-2xl">
                        Browse verified {serviceName.toLowerCase()} contractors available in your area.
                    </p>
                </Container>
            </section>

            {/* Contractor List */}
            <section className="py-10 sm:py-14">
                <Container>
                    {mainCategoryId && serviceCategoryId ? (
                        <ContractorListWrapper
                            city={cityName}
                            stateCode={state.toUpperCase()}
                            mainCategoryId={mainCategoryId}
                            serviceCategoryId={serviceCategoryId}
                        />
                    ) : (
                        <div className="text-center py-16 text-muted-foreground">
                            <p>Service not found. Please go back and select a valid service.</p>
                        </div>
                    )}
                </Container>
            </section>
        </>
    );
}
