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
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <FrameMedia src={product.funnel} fill blur />
        <div className="absolute inset-0 bg-[#f6f0e4]/70" />
      </div>
      <BackBar href={`/s/${product.slug}/intro`} />
      <main className="relative z-10 px-5 pb-8 pt-14">
        <p className="text-[12px] text-sub">{product.character}</p>
        <h1 className="mt-1 font-serif text-[22px] text-ink">
          태어난 때를 정확히 말해야 막힌 곳이 보여.
        </h1>
        <p className="mt-1 text-[13px] text-sub">
          월주는 음력이 아니라 절기 기준이다.
        </p>
        <div className="mt-6">
          <BirthForm product={product} />
        </div>
      </main>
    </div>
  );
}
