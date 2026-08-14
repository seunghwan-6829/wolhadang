"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/lib/data/products";
import { formatPrice } from "@/lib/data/products";
import { BIRTH_STORAGE_KEY, PAID_STORAGE_PREFIX, queryToBirth } from "@/lib/birth-query";
import { buildReading } from "@/lib/saju";
import { buildStoryCuts, type StoryCut } from "@/lib/saju/story";
import type { BirthInput, Element, FullReading } from "@/lib/saju/types";
import { Analyzing } from "./Analyzing";
import { MyeongshikCard } from "./MyeongshikCard";
import { BackBar } from "./Header";

const EL_CLASS: Record<Element, string> = {
  목: "el-wood",
  화: "el-fire",
  토: "el-earth",
  금: "el-metal",
  수: "el-water",
};

function readBirth(sp: URLSearchParams): BirthInput | null {
  const fromQuery = queryToBirth(sp);
  if (fromQuery) return fromQuery;
  try {
    const raw = sessionStorage.getItem(BIRTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as BirthInput;
  } catch {
    return null;
  }
}

export function StoryReader({
  product,
  forcePaid = false,
  initialReading = null,
  skipAnim = false,
}: {
  product: Product;
  forcePaid?: boolean;
  initialReading?: FullReading | null;
  skipAnim?: boolean;
}) {
  const sp = useSearchParams();
  const [phase, setPhase] = useState<"load" | "show" | "missing">(
    skipAnim && initialReading ? "show" : "load",
  );
  const [reading, setReading] = useState<FullReading | null>(initialReading);
  const qs = sp.toString();

  const paid = useMemo(() => {
    if (forcePaid || product.price === 0) return true;
    if (sp.get("paid") === "1") return true;
    try {
      return sessionStorage.getItem(PAID_STORAGE_PREFIX + product.slug) === "1";
    } catch {
      return false;
    }
  }, [forcePaid, product.price, product.slug, sp]);

  useEffect(() => {
    if (reading) {
      if (phase === "show") return;
      const t = window.setTimeout(() => setPhase("show"), skipAnim ? 0 : 1500);
      return () => window.clearTimeout(t);
    }
    const input = readBirth(sp);
    if (!input) {
      setPhase("missing");
      return;
    }
    try {
      setReading(buildReading(input, product, { paid }));
    } catch (e) {
      console.error(e);
      setPhase("missing");
      return;
    }
    const t = window.setTimeout(() => setPhase("show"), skipAnim ? 0 : 1500);
    return () => window.clearTimeout(t);
  }, [product, paid, sp, reading, skipAnim, phase]);

  useEffect(() => {
    if (phase !== "show") return;
    const id = sp.get("cut");
    if (!id) return;
    const t = window.setTimeout(() => {
      document.getElementById(`cut-${id}`)?.scrollIntoView({ behavior: "auto" });
    }, 80);
    return () => window.clearTimeout(t);
  }, [phase, sp]);

  if (phase === "missing") {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <p className="font-serif text-xl">생년월일이 없어요</p>
        <p className="mt-2 text-sm text-sub">다시 입력해 주세요.</p>
        <Link
          href={`/s/${product.slug}/input`}
          className="cta-dark mt-6 inline-flex h-12 items-center rounded-full px-6"
        >
          사주 입력하기
        </Link>
      </div>
    );
  }

  if (phase === "load" || !reading) {
    return (
      <Analyzing
        name={sp.get("n") || product.character}
        character={product.character}
      />
    );
  }

  const cuts = buildStoryCuts(reading, product, paid);
  const focus = sp.get("cut");
  const viewCuts = focus ? cuts.filter((c) => c.id === focus) : cuts;
  const payHref = `/s/${product.slug}/pay?${qs}`;
  const showPay = !paid && product.price > 0;

  return (
    <div className="relative bg-black">
      <StoryCuts
        cuts={viewCuts}
        product={product}
        reading={reading}
        payHref={payHref}
      />
      {focus ? null : <NextCut cuts={viewCuts} />}
      {showPay && !focus ? (
        <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 bg-gradient-to-t from-black via-black/80 to-transparent px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-8">
          <Link
            href={payHref}
            className="cta-dark flex h-12 items-center justify-center rounded-full text-[15px]"
          >
            전체 스토리 보기 {formatPrice(product.price)}
          </Link>
        </div>
      ) : null}
    </div>
  );
}

function NextCut({ cuts }: { cuts: StoryCut[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const els = cuts.map((c) => document.getElementById(`cut-${c.id}`));
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!vis) return;
        const idx = cuts.findIndex((c) => `cut-${c.id}` === vis.target.id);
        if (idx >= 0) setI(idx);
      },
      { threshold: 0.45 },
    );
    els.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [cuts]);

  if (i >= cuts.length - 1) return null;
  return (
    <button
      type="button"
      onClick={() => {
        const next = cuts[i + 1];
        document
          .getElementById(`cut-${next.id}`)
          ?.scrollIntoView({ behavior: "smooth" });
      }}
      className="fixed bottom-24 left-1/2 z-30 -translate-x-1/2 rounded-full bg-white/92 px-4 py-2 text-[13px] font-semibold text-ink shadow-lg"
    >
      다음 컷
    </button>
  );
}

function StoryCuts({
  cuts,
  product,
  reading,
  payHref,
}: {
  cuts: StoryCut[];
  product: Product;
  reading: FullReading;
  payHref: string;
}) {
  return (
    <>
      {cuts.map((cut) => (
        <section
          key={cut.id}
          id={`cut-${cut.id}`}
          className={`relative overflow-hidden ${cut.tall ? "min-h-[100dvh]" : "min-h-[70dvh]"}`}
        >
          <CutInner cut={cut} product={product} reading={reading} payHref={payHref} />
        </section>
      ))}
    </>
  );
}

function CutInner({
  cut,
  product,
  reading,
  payHref,
}: {
  cut: StoryCut;
  product: Product;
  reading: FullReading;
  payHref: string;
}) {
  const locked = Boolean(cut.lock);

  if (cut.type === "cover") {
    return (
      <>
        {cut.image ? (
          <Image
            src={cut.image}
            alt=""
            fill
            priority
            sizes="430px"
            className="object-cover"
            style={{ objectPosition: product.objectPos ?? "center 18%" }}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/20" />
        <BackBar href={`/s/${product.slug}/input`} light />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-16 text-white">
          <p className="text-[13px] tracking-wide text-white/80">{cut.name}</p>
          <h1 className="mt-1 font-serif text-[26px] font-semibold leading-snug">
            {cut.productTitle}
          </h1>
        </div>
      </>
    );
  }

  if (cut.type === "splash") {
    const el = cut.element ?? "금";
    return (
      <div className={`${EL_CLASS[el]} flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center`}
        style={{ background: "var(--el-wash)" }}
      >
        <p className="text-[12px] tracking-[0.25em] text-sub">日柱</p>
        <p
          className="mt-4 font-serif text-[88px] font-bold leading-none tracking-tight"
          style={{ color: "var(--el)" }}
        >
          {cut.hanja}
        </p>
        <p className="mt-3 font-serif text-[20px] text-ink">{cut.hanjaKo}</p>
        <p className="mt-1 text-[13px] text-sub">{cut.sub}</p>
        <p className="mt-8 max-w-[280px] font-serif text-[17px] leading-7 text-ink">
          {cut.text}
        </p>
      </div>
    );
  }

  if (cut.type === "oheng") {
    const count = reading.saju.elementCount;
    const max = Math.max(...Object.values(count), 1);
    return (
      <div className="flex min-h-[100dvh] flex-col justify-end bg-[#0f0f0f] px-5 pb-16 pt-10">
        <p className="text-[12px] tracking-wide text-white/50">오행</p>
        <div className="mt-4 space-y-3">
          {(Object.entries(count) as [Element, number][]).map(([el, n]) => (
            <div key={el} className="flex items-center gap-3">
              <span className="w-6 text-[13px] text-white/80">{el}</span>
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.max(8, (n / max) * 100)}%`,
                    background: {
                      목: "#3d8b62",
                      화: "#c45c3e",
                      토: "#b07a45",
                      금: "#d4af37",
                      수: "#3d7ea6",
                    }[el],
                  }}
                />
              </div>
              <span className="w-4 text-right text-[12px] text-white/60">{n}</span>
            </div>
          ))}
        </div>
        <Bubble speaker={cut.speaker} text={cut.text} />
      </div>
    );
  }

  if (cut.type === "myeongshik") {
    return (
      <div className="min-h-[70dvh] bg-white px-4 pb-28 pt-10">
        <p className="font-serif text-[18px] text-ink">{cut.text}</p>
        <div className="mt-5">
          <MyeongshikCard saju={reading.saju} />
        </div>
        <Link
          href="/"
          className="mt-8 flex h-12 items-center justify-center rounded-full ring-1 ring-black/15 text-[15px]"
        >
          다른 풀이 둘러보기
        </Link>
      </div>
    );
  }

  // dialogue
  return (
    <>
      {cut.image ? (
        <Image
          src={cut.image}
          alt=""
          fill
          sizes="430px"
          className={`object-cover ${locked ? "locked-blur scale-105" : ""}`}
          style={{ objectPosition: product.objectPos ?? "center 18%" }}
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-900" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
      <div className={`absolute inset-x-0 bottom-0 px-5 pb-16 ${locked ? "locked-blur" : ""}`}>
        <Bubble speaker={cut.speaker} text={cut.text} />
      </div>
      {locked ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 px-6 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white/15 text-xl text-white">
            ⌀
          </span>
          <p className="mt-3 font-serif text-[18px] text-white">여기서부터는 잠긴 컷이에요</p>
          <Link
            href={payHref}
            className="cta-dark mt-5 inline-flex h-11 items-center rounded-full px-5 text-[14px]"
          >
            전체 스토리 보기 {formatPrice(product.price)}
          </Link>
        </div>
      ) : null}
    </>
  );
}

function Bubble({ speaker, text }: { speaker?: string; text: string }) {
  return (
    <div className="rounded-2xl bg-white/95 px-4 py-3 text-ink shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
      {speaker ? (
        <p className="text-[11px] font-medium text-sub">{speaker}</p>
      ) : null}
      <p className="mt-1 whitespace-pre-line font-serif text-[16px] leading-7">{text}</p>
    </div>
  );
}
