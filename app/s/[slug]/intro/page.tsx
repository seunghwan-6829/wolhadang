import { notFound } from "next/navigation";
import { Suspense } from "react";
import { IntroClient } from "@/components/IntroClient";
import { getProduct } from "@/lib/data/products";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product ? `${product.shortName}` : "소개" };
}

export default async function IntroPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return (
    <Suspense fallback={<div className="min-h-dvh bg-black" />}>
      <IntroClient product={product} />
    </Suspense>
  );
}
