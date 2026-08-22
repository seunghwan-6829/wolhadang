import { LandingHero } from "@/components/LandingHero";
import { FLAGSHIP_SLUG, HERO_LINE, getProduct } from "@/lib/data/products";

export default function HomePage() {
  const flagship = getProduct(FLAGSHIP_SLUG)!;

  return (
    <LandingHero
      product={flagship}
      title={HERO_LINE}
      ctaHref={`/s/${flagship.slug}/intro`}
      ctaLabel="내 사주팔자 바로 확인하기"
    />
  );
}
