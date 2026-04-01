import { getSitemapEntriesById, renderUrlSetXml } from "@/lib/sitemap";

export const dynamic = "force-dynamic";

export async function GET(
    _request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const entries = await getSitemapEntriesById(id);

    if (entries.length === 0) {
        return new Response("Not Found", {
            status: 404,
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
            },
        });
    }

    const xml = renderUrlSetXml(entries);

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
    });
}