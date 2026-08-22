import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProduct } from "@/lib/data/products";
import { PayClient } from "./PayClient";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product ? `${product.shortName} 결제` : "결제" };
}

export default async function PayPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return (
    <Suspense fallback={<p className="p-8 text-center text-white/50">불러오는 중…</p>}>
      <PayClient product={product} />
    </Suspense>
  );
}
