export const SITE_NAME = "TrustPatrick";
export const SITE_DESCRIPTION =
    "Find trusted, verified home service professionals near you. Search by address to connect with top-rated contractors in your area.";
export const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || "https://trustpatrick.com";

export const MEMBERSHIP_LEVELS: Record<number, string> = {
    1: "Basic",
    2: "Professional",
    3: "Premium",
};

export const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Find a Pro", href: "/#search" },
    { label: "About", href: "/about" },
] as const;
