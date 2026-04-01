import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import Container from "@/components/shared/container";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import ServiceSelector from "@/components/home/service-selector";
import { deslugify } from "@/lib/helpers";
import { stateCodeToName } from "@/lib/us-states";
import { generatePageMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";

interface LocationPageProps {
    params: Promise<{
        state: string;
        city: string;
    }>;
}

export async function generateMetadata({
    params,
}: LocationPageProps): Promise<Metadata> {
    const { state, city } = await params;
    const cityName = deslugify(city);
    const stateName = stateCodeToName(state);

    return generatePageMetadata({
        title: `Home Services in ${cityName}, ${stateName}`,
        description: `Find trusted home service contractors in ${cityName}, ${stateName}. Browse categories and services to connect with verified professionals in your area.`,
        path: `/${state}/${city}`,
    });
}

export default async function LocationPage({ params }: LocationPageProps) {
    const { state, city } = await params;
    const cityName = deslugify(city);
    const stateName = stateCodeToName(state);

    const breadcrumbJsonLd = generateBreadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: `${cityName}, ${stateName}`, url: `/${state}/${city}` },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            {/* Header */}
            <section className="bg-muted/40 border-b py-10 sm:py-14">
                <Container>
                    <Breadcrumbs
                        items={[
                            { label: `${cityName}, ${stateName}` },
                        ]}
                    />
                    <div className="flex items-center gap-3 mb-2">
                        <MapPin className="h-6 w-6 text-primary" />
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                            Home Services in {cityName}, {stateName}
                        </h1>
                    </div>
                    <p className="text-muted-foreground mt-2 max-w-2xl">
                        Select a category and service below to find trusted contractors in
                        your area.
                    </p>
                </Container>
            </section>

            {/* Selection */}
            <section className="py-10 sm:py-14">
                <Container>
                    <div className="max-w-lg">
                        <ServiceSelector state={state} city={city} />
                    </div>
                </Container>
            </section>
        </>
    );
}
