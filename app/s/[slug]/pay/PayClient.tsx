"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { flatLine, formatPrice, type Product } from "@/lib/data/products";
import { PAID_STORAGE_PREFIX } from "@/lib/birth-query";
import { BackBar } from "@/components/Header";
import { FrameMedia } from "@/components/FrameMedia";
import { KIM_STILL } from "@/lib/media";
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
    <div className="lock-screen relative min-h-dvh overflow-hidden bg-[#161412]">
      <FrameMedia src={KIM_STILL.back} fill kenBurns={false} />
      <BackBar href={`/s/${product.slug}/story?${qs}`} light />
      <main className="relative z-10 px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-14">
        <p className="cut-kicker keep-all">복채</p>
        <h1 className="cut-quote keep-all mt-2 text-[24px] leading-snug">
          더 보려면 복채가 필요하다.
        </h1>
        <p className="keep-all mt-2 text-[13px] text-white/60 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
          앞장은 여기까지다. 누르면 잠긴 장이 열린다.
        </p>

        <div className="mt-6 rounded-2xl bg-black/65 px-4 py-4 ring-1 ring-white/10 backdrop-blur-md">
          <p className="font-serif text-[16px] text-[#f3ead8]">{product.name}</p>
          <p className="keep-all mt-1 text-[13px] text-white/55">{flatLine(product.hook)}</p>
          <p className="mt-3 font-serif text-[18px] text-[#f3ead8]">
            {formatPrice(product.price)}
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            disabled={Boolean(busy)}
            onClick={() => mockPay("kakao")}
            className="flex h-12 w-full items-center justify-center rounded-full bg-[#FEE500] text-[15px] font-bold text-[#191600]"
          >
            {busy === "kakao" ? "열고 있다…" : "카카오로 낸다"}
          </button>
          <button
            type="button"
            disabled={Boolean(busy)}
            onClick={() => mockPay("card")}
            className="pill-cream flex h-12 w-full items-center justify-center rounded-full text-[15px]"
          >
            {busy === "card" ? "열고 있다…" : "카드로 낸다"}
          </button>
        </div>

        <Link
          href={`/s/${product.slug}/story?${qs}`}
          className="mt-8 block text-center text-[14px] text-[#f3ead8] underline underline-offset-4"
        >
          앞장으로 돌아가기
        </Link>
      </main>
    </div>
  );
}
