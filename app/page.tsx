import HeroSection from "@/components/home/hero-section";
import CategorySection from "@/components/home/category-section";
import HowItWorks from "@/components/home/how-it-works";
import { generateWebsiteJsonLd } from "@/lib/seo";

export default function Home() {
  const websiteJsonLd = generateWebsiteJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HeroSection />
      <HowItWorks />
      <CategorySection />
    </>
  );
}
