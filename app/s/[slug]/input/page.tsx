import { notFound } from "next/navigation";
import { BirthForm } from "@/components/BirthForm";
import { BackBar } from "@/components/Header";
import { FrameMedia } from "@/components/FrameMedia";
import { getProduct } from "@/lib/data/products";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product ? `${product.shortName} 입력` : "입력" };
}

export default async function InputPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#161412]">
      <div className="pointer-events-none absolute inset-0">
        <FrameMedia
          src={product.funnel}
          videoSrc={product.videoBg || product.video}
          fill
          blur
        />
      </div>
      <BackBar href={`/s/${product.slug}/intro`} light />
      <main className="relative z-10 px-5 pb-8 pt-14">
        <p className="cut-kicker">{product.character}</p>
        <h1 className="mt-2 font-serif text-[22px] leading-snug text-[#f3ead8] [text-shadow:0_2px_14px_rgba(0,0,0,0.75)]">
          태어난 때를 정확히 말해야 막힌 곳이 보여.
        </h1>
        <p className="mt-2 text-[13px] text-white/55 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
          월주는 음력이 아니라 절기 기준이다.
        </p>
        <div className="mt-6">
          <BirthForm product={product} tone="dark" />
        </div>
      </main>
    </div>
  );
}
