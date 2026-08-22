import { notFound } from "next/navigation";
import { LandingWebtoon } from "@/components/LandingWebtoon";
import { getProduct } from "@/lib/data/products";
import { reviewsForProduct } from "@/lib/data/reviews";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "묵헌" };
  return { title: product.name, description: product.hook };
}

export default async function ProductLandingPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const reviews = reviewsForProduct(slug);

  return <LandingWebtoon product={product} reviews={reviews} />;
}
