import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Analyzing } from "@/components/Analyzing";
import { StoryReader } from "@/components/StoryReader";
import { getProduct } from "@/lib/data/products";
import { readingFromSearchParams } from "@/lib/load-reading";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product ? `${product.shortName} 스토리` : "스토리" };
}

export default async function StoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const product = getProduct(slug);
  if (!product) notFound();
  const paid = sp.paid === "1" || product.price === 0;
  const initialReading = readingFromSearchParams(sp, product, paid);
  const skipAnim = sp.skipanim === "1";

  return (
    <Suspense fallback={<Analyzing name={product.character} character={product.character} />}>
      <StoryReader
        product={product}
        forcePaid={paid}
        initialReading={initialReading}
        skipAnim={skipAnim}
      />
    </Suspense>
  );
}
