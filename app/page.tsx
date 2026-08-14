import { CategoryTabs } from "@/components/CategoryTabs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PosterCarousel } from "@/components/PosterCarousel";
import { ReviewTicker } from "@/components/ReviewTicker";
import { TabBar } from "@/components/TabBar";
import {
  HERO_SLUGS,
  HOME_SECTIONS,
  PRODUCTS,
  productsBySlugs,
  type ProductTab,
} from "@/lib/data/products";

type Props = {
  searchParams: Promise<{ tab?: string }>;
};

export default async function HomePage({ searchParams }: Props) {
  const sp = await searchParams;
  const tab = (["saju", "yeonae", "free"].includes(sp.tab ?? "")
    ? sp.tab
    : "all") as "all" | ProductTab;

  const hero = productsBySlugs([...HERO_SLUGS]);
  const sections =
    tab === "all"
      ? HOME_SECTIONS
      : HOME_SECTIONS.filter((s) => s.tab === tab);

  const filteredHero =
    tab === "all" ? hero : PRODUCTS.filter((p) => p.category === tab);

  return (
    <>
      <Header />
      <CategoryTabs active={tab} />
      <main className="flex-1 pb-4">
        <section className="pt-3">
          <PosterCarousel
            products={filteredHero.length ? filteredHero : hero}
            large
            ranked={tab === "all"}
          />
        </section>

        <ReviewTicker />

        {sections.map((sec) => (
          <section key={sec.id} className="pt-6">
            <h2 className="mb-3 px-4 text-[17px] font-semibold tracking-tight text-ink">
              {sec.title}
            </h2>
            <PosterCarousel products={productsBySlugs(sec.slugs)} />
          </section>
        ))}

        <Footer />
      </main>
      <TabBar />
    </>
  );
}
