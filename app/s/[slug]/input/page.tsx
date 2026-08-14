import Image from "next/image";
import { notFound } from "next/navigation";
import { BirthForm } from "@/components/BirthForm";
import { BackBar } from "@/components/Header";
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
    <div className="relative min-h-dvh overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={product.funnel}
          alt=""
          fill
          priority
          sizes="430px"
          className="scale-110 object-cover blur-xl"
          style={{ objectPosition: product.objectPos ?? "center 20%" }}
        />
        <div className="absolute inset-0 bg-white/55" />
      </div>
      <BackBar href={`/s/${product.slug}/intro`} />
      <main className="relative z-10 px-5 pb-8 pt-14">
        <p className="text-[12px] text-sub">{product.character}</p>
        <h1 className="mt-1 font-serif text-[22px] text-ink">
          좋아, 네 얘기를 들을게
        </h1>
        <p className="mt-1 text-[13px] text-sub">
          월주는 음력이 아니라 절기 기준으로 계산해요.
        </p>
        <div className="mt-6">
          <BirthForm product={product} />
        </div>
      </main>
    </div>
  );
}
