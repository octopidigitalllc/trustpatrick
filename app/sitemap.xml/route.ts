import {
    getSitemapIndexEntries,
    renderSitemapIndexXml,
} from "@/lib/sitemap";

export const dynamic = "force-dynamic";

export async function GET() {
    const entries = await getSitemapIndexEntries();
    const xml = renderSitemapIndexXml(entries);

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
    });
}