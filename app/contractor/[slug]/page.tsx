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
}: ContractorPageProps) {
    const { slug } = await params;
    const name = deslugify(slug);

    return (
        <section className="py-10 sm:py-14">
            <Container>
                <Breadcrumbs
                    items={[
                        { label: "Contractors", href: "/" },
                        { label: name },
                    ]}
                />

                <ContractorDetail slug={slug} />
            </Container>
        </section>
    );
}
