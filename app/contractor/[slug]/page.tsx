import type { Metadata } from "next";
import Container from "@/components/shared/container";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import ContractorDetail from "@/components/contractor/contractor-detail";
import { deslugify } from "@/lib/helpers";
import { generatePageMetadata } from "@/lib/seo";

interface ContractorPageProps {
    params: Promise<{
        slug: string;
    }>;
    searchParams: Promise<{
        id?: string;
    }>;
}

export async function generateMetadata({
    params,
}: ContractorPageProps): Promise<Metadata> {
    const { slug } = await params;
    const name = deslugify(slug);

    return generatePageMetadata({
        title: name,
        description: `View details for ${name} — a verified home service contractor on TrustPatrick. Contact information, services, and more.`,
        path: `/contractor/${slug}`,
    });
}

export default async function ContractorPage({
    params,
    searchParams,
}: ContractorPageProps) {
    const { slug } = await params;
    const { id } = await searchParams;
    const name = deslugify(slug);
    const contractorId = id ? parseInt(id, 10) : 0;

    return (
        <section className="py-10 sm:py-14">
            <Container>
                <Breadcrumbs
                    items={[
                        { label: "Contractors", href: "/" },
                        { label: name },
                    ]}
                />

                {contractorId ? (
                    <ContractorDetail id={contractorId} />
                ) : (
                    <div className="text-center py-16 text-muted-foreground">
                        <p>Invalid contractor. Please go back and select a contractor from the listing.</p>
                    </div>
                )}
            </Container>
        </section>
    );
}
