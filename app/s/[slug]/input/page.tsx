import { Suspense } from "react";
import { notFound } from "next/navigation";
import { BirthForm } from "@/components/BirthForm";
import { FrameMedia } from "@/components/FrameMedia";
import { getProduct } from "@/lib/data/products";
import { KIM_STILL } from "@/lib/media";
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
    <div className="lock-screen relative h-dvh overflow-hidden bg-[#161412]">
      <FrameMedia src={KIM_STILL.gate} fill blur kenBurns={false} />
      <main className="relative z-10 flex h-dvh flex-col overflow-hidden px-4 pb-[max(88px,calc(72px+env(safe-area-inset-bottom)))] pt-14">
        <div className="min-h-0 flex-1 overflow-y-auto rounded-2xl bg-black/65 px-4 py-5 backdrop-blur">
          <p className="cut-kicker keep-all">{product.character}</p>
          <h1 className="keep-all mt-2 font-serif text-[22px] leading-snug text-[#f3ead8] [text-shadow:0_2px_14px_rgba(0,0,0,0.75)]">
            {"태어난 때를 정확히 말해야\n막힌 곳이 보여."}
          </h1>
          <p className="keep-all mt-2 text-[13px] text-white/55 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
            월주는 음력이 아니라 절기 기준이다.
          </p>
          <p className="keep-all mt-1 text-[13px] text-white/55 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
            양력으로 넣어도 된다. 절기로 다시 맞춘다.
          </p>
          <div className="mt-5">
            <Suspense fallback={null}>
              <BirthForm product={product} tone="dark" />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
