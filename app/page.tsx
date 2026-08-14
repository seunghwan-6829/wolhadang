import Link from "next/link";
import { Footer } from "@/components/Footer";
import { FrameMedia } from "@/components/FrameMedia";
import { Header } from "@/components/Header";
import { PosterCard } from "@/components/PosterCard";
import { ReviewTicker } from "@/components/ReviewTicker";
import { TabBar } from "@/components/TabBar";
import {
  FLAGSHIP_SLUG,
  HERO_LINE,
  PRODUCTS,
  getProduct,
} from "@/lib/data/products";

export default function HomePage() {
  const flagship = getProduct(FLAGSHIP_SLUG)!;
  const others = PRODUCTS.filter((p) => p.slug !== FLAGSHIP_SLUG);

  return (
    <>
      <Header />
      <main className="flex-1 pb-4">
        <section className="bg-[#161412]">
          <FrameMedia
            src={flagship.poster}
            videoSrc={flagship.video}
            alt="터줏 김선생"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20" />
            <div className="absolute inset-x-0 bottom-0 px-5 pb-8">
              <p className="text-[12px] tracking-[0.18em] text-white/55">
                터줏 김선생
              </p>
              <h1 className="mt-2 font-serif text-[26px] font-semibold leading-snug text-[#f3ead8]">
                {HERO_LINE}
              </h1>
              <Link
                href={`/s/${flagship.slug}`}
                className="cta-dark mt-5 flex h-12 items-center justify-center rounded-full text-[15px]"
              >
                {flagship.cta}
              </Link>
            </div>
          </FrameMedia>
        </section>

        <ReviewTicker />

        <section className="pt-4">
          <h2 className="mb-3 px-4 font-serif text-[17px] text-ink">다른 풀이</h2>
          <div className="snap-row px-4 pb-1">
            {others.map((p) => (
              <PosterCard key={p.slug} product={p} />
            ))}
          </div>
        </section>

        <Footer />
      </main>
      <TabBar />
    </>
  );
}
