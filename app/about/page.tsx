import type { Metadata } from "next";
import Container from "@/components/shared/container";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "About Us",
    description:
        "Learn about TrustPatrick and how we connect homeowners with trusted home service professionals.",
    path: "/about",
});

export default function AboutPage() {
    return (
        <>
            <section className="border-b bg-muted/30 py-14 sm:py-20">
                <Container>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        About TrustPatrick
                    </h1>
                    <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
                        TrustPatrick helps homeowners discover and connect with
                        reliable, verified professionals for home improvement,
                        repair, and maintenance projects.
                    </p>
                </Container>
            </section>

            <section className="py-14 sm:py-20">
                <Container>
                    <div className="grid gap-10 md:grid-cols-3">
                        <div className="rounded-xl border bg-card p-6">
                            <h2 className="text-lg font-semibold">Our Mission</h2>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                Make it easier for homeowners to find quality
                                service pros with confidence and transparency.
                            </p>
                        </div>
                        <div className="rounded-xl border bg-card p-6">
                            <h2 className="text-lg font-semibold">What We Do</h2>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                We organize service categories, local matching,
                                and contractor visibility so homeowners can make
                                better decisions faster.
                            </p>
                        </div>
                        <div className="rounded-xl border bg-card p-6">
                            <h2 className="text-lg font-semibold">Why TrustPatrick</h2>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                Built around trust, local relevance, and a
                                homeowner-first experience from search to
                                project completion.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}
