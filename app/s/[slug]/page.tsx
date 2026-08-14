import { notFound } from "next/navigation";
import { StickyCta } from "@/components/StickyCta";
import { Header } from "@/components/Header";
import { FrameMedia } from "@/components/FrameMedia";
import { formatPrice, getProduct } from "@/lib/data/products";
import { reviewsForProduct } from "@/lib/data/reviews";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "터줏 김선생" };
  return { title: product.name, description: product.hook };
}

export default async function ProductLandingPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const reviews = reviewsForProduct(slug);
  const free = product.price <= 0;

  return (
    <>
      <Header />
      <main className="pb-32">
        <section className="bg-[#161412]">
          <FrameMedia
            src={product.poster}
            alt={`${product.character} ${product.shortName}`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 px-5 pb-8 text-[#f3ead8]">
              <p className="text-[13px] tracking-wide text-white/70">
                {product.character}
              </p>
              <h1 className="mt-1 font-serif text-[36px] font-bold leading-none">
                {product.shortName}
              </h1>
              <p className="mt-3 font-serif text-[16px] leading-6 text-white/90">
                “{product.hook}”
              </p>
            </div>
          </FrameMedia>
        </section>

        <section className="px-5 pt-8">
          <h2 className="font-serif text-[18px] text-ink">이 풀이에서</h2>
          <ul className="mt-3 space-y-2">
            {product.bullets.map((b) => (
              <li key={b} className="flex gap-2 text-[14px] text-ink">
                <span className="mt-0.5 text-seal">·</span>
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[13px] leading-6 text-sub">{product.description}</p>
        </section>

        <section className="px-5 pt-8">
          <h2 className="font-serif text-[18px] text-ink">다녀간 사람들의 한 줄</h2>
          <div className="mt-3 space-y-2">
            {reviews.map((r) => (
              <blockquote
                key={r.id}
                className="rounded-2xl border border-line bg-paper p-4"
              >
                <p className="text-[14px] text-ink">“{r.text}”</p>
                <p className="mt-2 text-[11px] text-sub">
                  {r.maskedName} · {r.ago}
                </p>
              </blockquote>
            ))}
          </div>
        </section>
      </main>
      <StickyCta
        href={`/s/${product.slug}/intro`}
        label={product.cta}
        sub={free ? "무료" : formatPrice(product.price)}
      />
    </>
  );
}
