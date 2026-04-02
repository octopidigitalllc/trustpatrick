import Image from "next/image";
import Link from "next/link";
import { Star, ChevronRight } from "lucide-react";
import Container from "@/components/shared/container";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import CategoryZipSearch from "@/components/category/category-zip-search";
import CategoryContractorSection from "@/components/category/category-contractor-section";
import type { CategoryLandingData } from "@/constants/category-landing-data";
import { slugify } from "@/lib/helpers";

const GUIDE_IMAGES = [
    "/asset/asphalt-01.jpg",
    "/asset/asphalt-02.jpg",
    "/asset/asphalt-03.jpg",
    "/asset/asphalt-04.jpg",
    "/asset/asphalt-05.jpg",
    "/asset/asphalt-06.jpg",
];

interface ServiceItem {
    id: number;
    title: string;
    slug: string;
}

interface CategoryItem {
    id: number;
    name: string;
    slug: string;
}

interface CategoryLandingContentProps {
    categoryName: string;
    categorySlug: string;
    cityName: string;
    stateName: string;
    state: string;
    city: string;
    mainCategoryId: number;
    services: ServiceItem[];
    allCategories: CategoryItem[];
    landingData: CategoryLandingData;
    breadcrumbJsonLd: object;
    serviceJsonLd: object;
}

/* ── Dummy review data ────────────────────────────────────────────── */
const DUMMY_REVIEWS = [
    {
        name: "Tom B.",
        initial: "T",
        color: "bg-orange-500",
        rating: 5,
        text: "Excellent work. Very professional team, arrived on time and completed the job perfectly. Highly recommend to anyone!",
    },
    {
        name: "Mrs. L.",
        initial: "M",
        color: "bg-blue-500",
        rating: 5,
        text: "Top-notch service from start to finish. The crew was knowledgeable and respectful of our property. Would hire again.",
    },
    {
        name: "Alexis C.",
        initial: "A",
        color: "bg-purple-500",
        rating: 5,
        text: "Super efficient! Got our project done quickly without cutting corners. Great communication throughout the process.",
    },
    {
        name: "Jared M.",
        initial: "J",
        color: "bg-teal-500",
        rating: 4,
        text: "Good quality work at a fair price. Would use again for future projects. Very satisfied with the overall result.",
    },
    {
        name: "Glenda G.",
        initial: "G",
        color: "bg-pink-500",
        rating: 5,
        text: "Outstanding experience. They went above and beyond our expectations. Attention to detail was truly impressive.",
    },
    {
        name: "Robert K.",
        initial: "R",
        color: "bg-indigo-500",
        rating: 5,
        text: "Professional, punctual, and reasonably priced. They cleaned up after the job was done. Will definitely hire again.",
    },
];

/* ── Popular cities per US state ──────────────────────────────────── */
const POPULAR_CITIES: Record<string, string[]> = {
    AL: ["Birmingham", "Montgomery", "Huntsville", "Mobile", "Tuscaloosa"],
    AK: ["Anchorage", "Fairbanks", "Juneau", "Sitka", "Wasilla"],
    AZ: ["Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale", "Gilbert"],
    AR: ["Little Rock", "Fort Smith", "Fayetteville", "Springdale"],
    CA: ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento"],
    CO: ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Lakewood"],
    CT: ["Bridgeport", "New Haven", "Stamford", "Hartford", "Waterbury"],
    DE: ["Wilmington", "Dover", "Newark", "Middletown"],
    FL: ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale"],
    GA: ["Atlanta", "Augusta", "Savannah", "Columbus", "Macon"],
    HI: ["Honolulu", "Pearl City", "Hilo", "Kailua"],
    ID: ["Boise", "Meridian", "Nampa", "Idaho Falls"],
    IL: ["Chicago", "Aurora", "Naperville", "Joliet", "Rockford"],
    IN: ["Indianapolis", "Fort Wayne", "Evansville", "South Bend"],
    IA: ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City"],
    KS: ["Wichita", "Overland Park", "Kansas City", "Olathe"],
    KY: ["Louisville", "Lexington", "Bowling Green", "Owensboro"],
    LA: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette"],
    ME: ["Portland", "Lewiston", "Bangor", "South Portland"],
    MD: ["Baltimore", "Columbia", "Germantown", "Silver Spring"],
    MA: ["Boston", "Worcester", "Springfield", "Cambridge"],
    MI: ["Detroit", "Grand Rapids", "Warren", "Ann Arbor"],
    MN: ["Minneapolis", "Saint Paul", "Rochester", "Duluth"],
    MS: ["Jackson", "Gulfport", "Southaven", "Hattiesburg"],
    MO: ["Kansas City", "St. Louis", "Springfield", "Columbia"],
    MT: ["Billings", "Missoula", "Great Falls", "Bozeman"],
    NE: ["Omaha", "Lincoln", "Bellevue", "Grand Island"],
    NV: ["Las Vegas", "Henderson", "Reno", "North Las Vegas"],
    NH: ["Manchester", "Nashua", "Concord", "Dover"],
    NJ: ["Newark", "Jersey City", "Paterson", "Elizabeth"],
    NM: ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe"],
    NY: ["New York", "Buffalo", "Rochester", "Yonkers", "Syracuse"],
    NC: ["Charlotte", "Raleigh", "Greensboro", "Durham"],
    ND: ["Fargo", "Bismarck", "Grand Forks", "Minot"],
    OH: ["Columbus", "Cleveland", "Cincinnati", "Toledo"],
    OK: ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow"],
    OR: ["Portland", "Salem", "Eugene", "Gresham"],
    PA: ["Philadelphia", "Pittsburgh", "Allentown", "Erie"],
    RI: ["Providence", "Cranston", "Warwick", "Pawtucket"],
    SC: ["Charleston", "Columbia", "Greenville", "Mount Pleasant"],
    SD: ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings"],
    TN: ["Nashville", "Memphis", "Knoxville", "Chattanooga"],
    TX: ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "Arlington", "Plano"],
    UT: ["Salt Lake City", "West Valley City", "Provo", "Orem"],
    VT: ["Burlington", "South Burlington", "Rutland", "Essex"],
    VA: ["Manassas", "Virginia Beach", "Norfolk", "Richmond", "Arlington", "Alexandria"],
    WA: ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue"],
    WV: ["Charleston", "Huntington", "Morgantown", "Parkersburg"],
    WI: ["Milwaukee", "Madison", "Green Bay", "Kenosha"],
    WY: ["Cheyenne", "Casper", "Laramie", "Gillette"],
    DC: ["Washington"],
};

/* ── Helpers ──────────────────────────────────────────────────────── */

function Stars({ count }: { count: number }) {
    return (
        <span className="inline-flex">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`h-4 w-4 ${i < count
                        ? "fill-amber-400 text-amber-400"
                        : "fill-gray-300 text-gray-300"
                        }`}
                />
            ))}
        </span>
    );
}

function getGuideArticles(cat: string, city: string, sn: string) {
    return [
        {
            title: `How Much Does ${cat} Cost?`,
            desc: `See the average ${cat.toLowerCase()} costs in ${city} with pricing factors, money-saving tips, and budgeting advice.`,
        },
        {
            title: `How to Find the Best ${cat} Pro`,
            desc: `Everything you need to know about hiring a ${cat.toLowerCase()} contractor in ${city}, ${sn}.`,
        },
        {
            title: `${cat} Safety Tips Every Homeowner Should Know`,
            desc: `Keep your family safe during ${cat.toLowerCase()} projects with these expert safety guidelines.`,
        },
        {
            title: `Top ${cat} Trends in ${new Date().getFullYear()}`,
            desc: `Discover the latest ${cat.toLowerCase()} trends and innovations popular with ${city} homeowners.`,
        },
        {
            title: `DIY vs. Professional ${cat}`,
            desc: `When to tackle ${cat.toLowerCase()} yourself and when to call in the pros in ${city}.`,
        },
        {
            title: `Your Complete ${cat} Checklist`,
            desc: `Use this step-by-step checklist to prepare for your ${cat.toLowerCase()} project in ${city}.`,
        },
    ];
}

/* ── Component ────────────────────────────────────────────────────── */

export default function CategoryLandingContent({
    categoryName,
    categorySlug,
    cityName,
    stateName,
    state,
    city,
    mainCategoryId,
    services,
    allCategories,
    landingData,
    breadcrumbJsonLd,
    serviceJsonLd,
}: CategoryLandingContentProps) {
    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: landingData.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
    };

    const stateUpper = state.toUpperCase();
    const firstServiceId = services[0]?.id ?? 0;
    const guides = getGuideArticles(categoryName, cityName, stateName);

    const nearbyCities = (POPULAR_CITIES[stateUpper] || [])
        .filter((c) => c.toLowerCase() !== cityName.toLowerCase())
        .slice(0, 8);

    const otherCategories = allCategories
        .filter((c) => c.id !== mainCategoryId)
        .slice(0, 12);

    const relatedSearches = [
        `${categoryName} near me`,
        `${categoryName} cost`,
        `${categoryName} contractors ${cityName}`,
        `Best ${categoryName.toLowerCase()} ${cityName}`,
        `${categoryName} installation`,
        `${categoryName} repair`,
        `${categoryName} estimate`,
        `Affordable ${categoryName.toLowerCase()} ${cityName}`,
    ];

    return (
        <>
            {/* JSON-LD structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbJsonLd),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(serviceJsonLd),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqJsonLd),
                }}
            />

            {/* ── 1. Breadcrumbs ──────────────────────────────────── */}
            <section className="bg-muted/40 border-b py-3">
                <Container>
                    <Breadcrumbs
                        items={[
                            {
                                label: categoryName,
                                href: `/find-a-pro/${state}/${city}/${categorySlug}`,
                            },
                            { label: stateName },
                            { label: cityName },
                        ]}
                    />
                </Container>
            </section>

            {/* ── 2. Hero with inline ZIP search ──────────────────── */}
            <section className="relative overflow-hidden bg-[#001B33]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('/asset/ashphalt-installation.jpg')`,
                    }}
                />
                <div className="absolute inset-0 bg-[#001B33]/62" />

                <div className="relative py-16 sm:py-24 lg:py-32">
                    <Container>
                        <div className="text-center max-w-3xl mx-auto">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                                Get matched with top{" "}
                                {categoryName.toLowerCase()} pros in {cityName},{" "}
                                {stateName}
                            </h1>
                            <div className="mt-8">
                                <CategoryZipSearch
                                    categoryName={categoryName}
                                    state={state}
                                    city={city}
                                    categorySlug={categorySlug}
                                    variant="inline"
                                />
                            </div>
                        </div>
                    </Container>
                </div>
            </section>

            {/* ── 3. Sub-services navigation ──────────────────────── */}
            {services.length > 0 && (
                <section className="border-b bg-background py-6">
                    <Container>
                        <p className="text-sm font-medium mb-3">
                            Need a pro for your{" "}
                            {categoryName.toLowerCase()} project in{" "}
                            {cityName}, {stateName}?
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {services.map((service) => (
                                <Link
                                    key={service.id}
                                    href={`/${state}/${city}/${service.slug}`}
                                    className="inline-flex items-center gap-1 rounded-full border px-4 py-2 text-sm hover:bg-muted/60 transition-colors"
                                >
                                    {service.title}
                                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                                </Link>
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            {/* ── 4. Verified Reviews carousel ────────────────────── */}
            <section className="bg-[#001B33] py-10 sm:py-14">
                <Container>
                    <div className="text-center mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-white">
                            Verified Reviews for {categoryName} pros in{" "}
                            {cityName}, {stateName}
                        </h2>
                        <div className="flex items-center justify-center gap-2 mt-3">
                            <Stars count={5} />
                            <span className="text-white font-bold text-lg">
                                4.6
                            </span>
                            <span className="text-white/65 text-sm">
                                ({DUMMY_REVIEWS.length} ratings)
                            </span>
                        </div>
                    </div>

                    {/* Horizontally-scrolling review cards */}
                    <div className="overflow-x-auto -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <div
                            className="flex gap-4"
                            style={{ minWidth: "max-content" }}
                        >
                            {DUMMY_REVIEWS.map((review, idx) => (
                                <div
                                    key={idx}
                                    className="w-72 shrink-0 bg-white rounded-xl p-5 shadow-sm"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div
                                            className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-white text-sm ${review.color}`}
                                        >
                                            {review.initial}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm text-gray-900">
                                                {review.name}
                                            </p>
                                            <Stars count={review.rating} />
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 line-clamp-3">
                                        {review.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* ── 5. Contractor list ──────────────────────────────── */}
            <section className="py-10 sm:py-14">
                <Container>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6">
                        Find {categoryName} pros in {cityName}
                    </h2>

                    {firstServiceId ? (
                        <CategoryContractorSection
                            categoryName={categoryName}
                            cityName={cityName}
                            stateCode={stateUpper}
                            mainCategoryId={mainCategoryId}
                            defaultServiceId={firstServiceId}
                            services={services}
                        />
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>
                                No services configured for this category yet.
                                Check back soon!
                            </p>
                        </div>
                    )}
                </Container>
            </section>

            {/* ── 6. Other categories in this city ────────────────── */}
            {otherCategories.length > 0 && (
                <section className="py-10 sm:py-14 border-t">
                    <Container>
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6">
                            Find Pros for other jobs in {cityName}
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2">
                            {otherCategories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/find-a-pro/${state}/${city}/${cat.slug}`}
                                    className="py-1 text-sm text-[#003E74] hover:underline"
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            {/* ── 7. Related searches pills ───────────────────────── */}
            <section className="py-8 border-t">
                <Container>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-4">
                        Related searches for your{" "}
                        {categoryName.toLowerCase()} project
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {relatedSearches.map((term) => (
                            <span
                                key={term}
                                className="inline-block rounded-full border bg-muted/40 px-4 py-1.5 text-sm text-muted-foreground"
                            >
                                {term}
                            </span>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ── 8. FAQ section (2-column grid) ──────────────────── */}
            {landingData.faqs.length > 0 && (
                <section className="py-10 sm:py-14 bg-muted/30">
                    <Container>
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-8">
                            {categoryName} questions, answered by experts
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 max-w-5xl">
                            {landingData.faqs.map((faq) => (
                                <details
                                    key={faq.question}
                                    className="group border-b py-4"
                                >
                                    <summary className="flex cursor-pointer items-center justify-between gap-3 font-medium text-sm [&::-webkit-details-marker]:hidden list-none">
                                        <span className="flex-1">
                                            {faq.question}
                                        </span>
                                        <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90 shrink-0" />
                                    </summary>
                                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed pr-8">
                                        {faq.answer}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            {/* ── 9. Homeowner's guide articles ───────────────────── */}
            <section className="py-10 sm:py-14 border-t">
                <Container>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                        The {cityName}, {stateName} homeowners&apos; guide to{" "}
                        {categoryName.toLowerCase()}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-8">
                        Read our expert guides to make informed decisions about
                        your {categoryName.toLowerCase()} project.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {guides.map((guide, index) => (
                            <div
                                key={guide.title}
                                className="group rounded-xl border bg-card overflow-hidden hover:shadow-md transition-all"
                            >
                                <div className="relative h-40 overflow-hidden bg-muted">
                                    <Image
                                        src={GUIDE_IMAGES[index % GUIDE_IMAGES.length]}
                                        alt={guide.title}
                                        fill
                                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="line-clamp-2 text-sm font-semibold transition-colors group-hover:text-[#003E74]">
                                        {guide.title}
                                    </h3>
                                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                                        {guide.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ── 10. Other cities in this state ──────────────────── */}
            {nearbyCities.length > 0 && (
                <section className="py-10 sm:py-14 border-t">
                    <Container>
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6">
                            Find {categoryName} Pros in other cities in{" "}
                            {stateName}
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2">
                            {nearbyCities.map((neighborCity) => (
                                <Link
                                    key={neighborCity}
                                    href={`/find-a-pro/${state}/${slugify(neighborCity)}/${categorySlug}`}
                                    className="py-1 text-sm text-[#003E74] hover:underline"
                                >
                                    {categoryName} in {neighborCity}
                                </Link>
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            {/* ── 11. Bottom CTA ──────────────────────────────────── */}
            <section className="py-10 sm:py-14 bg-muted/30 border-t">
                <Container>
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-xl sm:text-2xl font-bold">
                            Find {categoryName.toLowerCase()} pros in {cityName}
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            If you&apos;re a {categoryName.toLowerCase()}{" "}
                            professional in {cityName}, you can help homeowners
                            in your area on TrustPatrick. Let us connect you to
                            homeowners looking for quality service.
                        </p>
                    </div>
                </Container>
            </section>
        </>
    );
}
