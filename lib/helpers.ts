export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

export function deslugify(slug: string): string {
    return slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export function formatPhone(phone: string | null): string {
    if (!phone) return "N/A";
    return phone;
}

export function formatAddress(contractor: {
    address?: string | null;
    city?: string | null;
    state?: string | null;
    zip_code?: string | null;
}): string {
    const parts = [
        contractor.address,
        contractor.city,
        contractor.state,
        contractor.zip_code,
    ].filter(Boolean);
    return parts.join(", ") || "Address not available";
}
