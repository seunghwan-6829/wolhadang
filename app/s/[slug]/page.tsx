import { notFound } from "next/navigation";
import { LandingHero } from "@/components/LandingHero";
import { flatLine, getProduct } from "@/lib/data/products";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "묵헌" };
  return { title: product.name, description: flatLine(product.hook) };
}

export default async function ProductLandingPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <LandingHero
      product={product}
      title={product.hook}
      ctaHref={`/s/${product.slug}/intro`}
      ctaLabel={product.cta}
    />
  );
}
