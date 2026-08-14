"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { formatPrice, type Product } from "@/lib/data/products";
import { PAID_STORAGE_PREFIX } from "@/lib/birth-query";
import { BackBar } from "@/components/Header";
import { useState } from "react";

export function PayClient({ product }: { product: Product }) {
  const sp = useSearchParams();
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const qs = sp.toString();

  function mockPay(method: string) {
    setBusy(method);
    try {
      sessionStorage.setItem(PAID_STORAGE_PREFIX + product.slug, "1");
    } catch {
      /* ignore */
    }
    window.setTimeout(() => {
      router.push(`/s/${product.slug}/story?${qs}&paid=1&skipanim=1`);
    }, 800);
  }

  return (
    <div className="relative min-h-dvh bg-white">
      <BackBar href={`/s/${product.slug}/story?${qs}`} />
      <main className="px-5 pb-16 pt-14">
        <p className="text-[11px] tracking-widest text-sub">MOCK CHECKOUT</p>
        <h1 className="mt-1 font-serif text-2xl text-ink">결제 (데모)</h1>
        <p className="mt-2 text-[13px] text-sub">
          실제 결제는 연결되지 않았어요. 버튼을 누르면 전체 스토리가 열려요.
        </p>

        <div className="mt-6 flex gap-3 rounded-2xl border border-line p-3">
          <span className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-neutral-200">
            <Image
              src={product.poster}
              alt=""
              fill
              sizes="64px"
              className="object-cover"
              style={{ objectPosition: product.objectPos ?? "center 20%" }}
            />
          </span>
          <div className="min-w-0">
            <p className="font-serif text-[16px] text-ink">{product.name}</p>
            <p className="mt-1 text-[13px] text-sub">{product.hook}</p>
            <p className="mt-2 text-[15px] font-bold">{formatPrice(product.price)}</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            disabled={Boolean(busy)}
            onClick={() => mockPay("kakao")}
            className="flex h-12 w-full items-center justify-center rounded-full bg-[#FEE500] text-[15px] font-bold text-[#191600]"
          >
            {busy === "kakao" ? "연결 중…" : "카카오페이 (데모)"}
          </button>
          <button
            type="button"
            disabled={Boolean(busy)}
            onClick={() => mockPay("card")}
            className="cta-dark flex h-12 w-full items-center justify-center rounded-full text-[15px]"
          >
            {busy === "card" ? "승인 중…" : "신용/체크카드 (데모)"}
          </button>
        </div>

        <Link
          href={`/s/${product.slug}/story?${qs}`}
          className="mt-8 block text-center text-[13px] text-sub underline"
        >
          무료 컷으로 돌아가기
        </Link>
      </main>
    </div>
  );
}
