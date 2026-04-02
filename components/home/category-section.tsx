"use client";

import Image from "next/image";
import Link from "next/link";
import {
    Paintbrush,
    Hammer,
    Wrench,
    Plug,
    AirVent,
    Shield,
    Sun,
    Trees,
    Droplets,
    ToyBrick,
    Drill,
    type LucideIcon,
} from "lucide-react";
import Container from "@/components/shared/container";

type PopularCategory = {
    name: string;
    slug: string;
    image?: string;
};

const POPULAR_CATEGORIES: PopularCategory[] = [
    { name: "Asphalt Installation", slug: "asphalt-installation", image: "/asset/ashphalt-installation.jpg" },
    { name: "Roofing Install or Replace", slug: "roofing-install-replace", image: "/asset/roofing-install-replace.jpg" },
    { name: "Plumbing Repair", slug: "plumbing-repair", image: "/asset/plumbing-repair.jpg" },
    { name: "Electrical Repair/Troubleshooting", slug: "electrical-repair-troubleshooting", image: "/asset/electrical-repair-troubleshooting.jpg" },
    { name: "Cooling Service & Repair", slug: "cooling-service-repair", image: "/asset/cooling-service-repair.jpg" },
    { name: "Landscaping Services", slug: "landscaping-services", image: "/asset/landscaping-services.jpg" },
    { name: "Window Installation/Replacement", slug: "window-installation-replacement", image: "/asset/window-installation-replacement.jpg" },
    { name: "Flooring Installation/Replacement", slug: "flooring-installation-replacement", image: "/asset/flooring-installation-replacement.jpg" },
];

const ICON_BG = [
    "bg-[#E6F0FA]",
    "bg-[#EAF6ED]",
    "bg-[#F9EFE6]",
    "bg-[#EEEAFB]",
    "bg-[#E8F5F8]",
    "bg-[#F8EAF0]",
    "bg-[#EDF2FA]",
    "bg-[#ECF6F0]",
];

function getServiceIcon(name: string, slug: string): LucideIcon {
    const text = `${name} ${slug}`.toLowerCase();

    if (text.includes("roof")) return Hammer;
    if (text.includes("paint") || text.includes("drywall")) return Paintbrush;
    if (text.includes("plumb") || text.includes("sprinkler")) return Droplets;
    if (text.includes("electrical") || text.includes("solar")) return Plug;
    if (text.includes("heating") || text.includes("cooling") || text.includes("hvac")) return AirVent;
    if (text.includes("landscap") || text.includes("tree") || text.includes("lawn")) return Trees;
    if (text.includes("concrete") || text.includes("tile") || text.includes("paver")) return ToyBrick;
    if (text.includes("window") || text.includes("door") || text.includes("fence")) return Shield;
    if (text.includes("cabinet") || text.includes("counter") || text.includes("floor")) return Drill;
    if (text.includes("garage") || text.includes("driveway") || text.includes("asphalt")) return Wrench;

    return Sun;
}

export default function CategorySection() {
    return (
        <section className="py-16 sm:py-24">
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Popular Service Categories
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Browse our most popular home service categories to find the right
                        professional for your project.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                    {POPULAR_CATEGORIES.map((category, index) => {
                        const Icon = getServiceIcon(category.name, category.slug);

                        return (
                            <Link
                                key={category.slug}
                                href={`/find-a-pro/va/manassas/${category.slug}`}
                                className="group relative overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-lg"
                            >
                                <div className="relative aspect-4/3 overflow-hidden">
                                    {category.image ? (
                                        <>
                                            <Image
                                                src={category.image}
                                                alt={category.name}
                                                width={400}
                                                height={300}
                                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-[#001B33]/35" />
                                        </>
                                    ) : (
                                        <div className="h-full w-full bg-muted/70" />
                                    )}

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div
                                            className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm ${ICON_BG[index % ICON_BG.length]}`}
                                        >
                                            <Icon className="h-7 w-7 text-[#003E74]" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="text-sm font-semibold sm:text-base">
                                        {category.name}
                                    </h3>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
