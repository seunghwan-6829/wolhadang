"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/lib/data/products";
import { formatPrice } from "@/lib/data/products";
import { BIRTH_STORAGE_KEY, PAID_STORAGE_PREFIX, queryToBirth } from "@/lib/birth-query";
import { buildReading } from "@/lib/saju";
import { buildStoryCuts, type StoryCut } from "@/lib/saju/story";
import type { BirthInput, Element, FullReading } from "@/lib/saju/types";
import { Analyzing } from "./Analyzing";
import { FrameMedia } from "./FrameMedia";
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
      <div className="relative flex h-dvh flex-col items-center justify-center overflow-hidden bg-[#161412] px-6 text-center">
        <FrameMedia src={product.story} videoSrc={product.video} fill />
        <div className="relative z-10">
          <p className="cut-quote">태어난 때가 없다</p>
          <p className="mt-2 text-sm text-white/60">때를 정확히 말해야 막힌 곳이 보인다.</p>
          <Link
            href={`/s/${product.slug}/input`}
            className="pill-cream mt-6 inline-flex h-12 items-center rounded-full px-6"
          >
            때를 말하라
          </Link>
        </div>
      </div>
    );
  }

  if (phase === "load" || !reading) {
    return (
      <Analyzing
        name={sp.get("n") || product.character}
        character={product.character}
        still={product.story}
        videoSrc={product.video}
      />
    );
  }

  const cuts = buildStoryCuts(reading, product, paid);
  const focus = sp.get("cut");
  const viewCuts = focus ? cuts.filter((c) => c.id === focus) : cuts;
  const payHref = `/s/${product.slug}/pay?${qs}`;
  const showPay = !paid && product.price > 0;

  return (
    <div className="relative h-dvh overflow-hidden bg-[#161412]">
      <div id="story-snap" className="snap-y-mandatory">
        <StoryCuts
          cuts={viewCuts}
          product={product}
          reading={reading}
          payHref={payHref}
        />
      </div>
      {focus ? null : <NextCut cuts={viewCuts} raised={showPay} />}
      {showPay && !focus ? (
        <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 bg-gradient-to-t from-black via-black/85 to-transparent px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-8">
          <Link
            href={payHref}
            className="cta-dark flex h-12 items-center justify-center rounded-full text-[15px] [text-shadow:none]"
          >
            뒷장을 연다 {formatPrice(product.price)}
          </Link>
        </div>
      ) : null}
    </div>
  );
}

function NextCut({ cuts, raised }: { cuts: StoryCut[]; raised: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const root = document.getElementById("story-snap");
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
      { root, threshold: 0.45 },
    );
    els.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [cuts]);

  if (i >= cuts.length - 1) return null;
  if (cuts[i]?.lock) return null;
  return (
    <button
      type="button"
      onClick={() => {
        const next = cuts[i + 1];
        document
          .getElementById(`cut-${next.id}`)
          ?.scrollIntoView({ behavior: "smooth" });
      }}
      className={`fixed left-1/2 z-30 -translate-x-1/2 rounded-full bg-[#f3ead8]/92 px-4 py-2 text-[13px] font-semibold text-ink shadow-lg ${
        raised ? "bottom-[88px]" : "bottom-8"
      }`}
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
        <section key={cut.id} id={`cut-${cut.id}`} className="snap-cut">
          <CutInner cut={cut} product={product} reading={reading} payHref={payHref} />
        </section>
      ))}
    </>
  );
}

function mediaOf(cut: StoryCut, product: Product) {
  return {
    src: cut.image ?? product.story ?? product.funnel,
    videoSrc: cut.video ?? product.video ?? product.videoBg,
  };
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
  const { src, videoSrc } = mediaOf(cut, product);

  if (cut.type === "cover") {
    return (
      <FrameMedia src={src} videoSrc={videoSrc} alt={product.character} fill>
        <BackBar href={`/s/${product.slug}/input`} light />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-[calc(108px+env(safe-area-inset-bottom))]">
          <p className="cut-kicker">{cut.name}</p>
          <h1 className="cut-quote mt-1 text-[26px] leading-snug">{cut.productTitle}</h1>
        </div>
      </FrameMedia>
    );
  }

  if (cut.type === "splash") {
    const el = cut.element ?? "금";
    return (
      <div className={`${EL_CLASS[el]} relative h-full w-full`}>
        <FrameMedia src={src} videoSrc={videoSrc} alt={product.character} fill>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <p className="cut-kicker tracking-[0.28em]">日柱</p>
            <p
              className="mt-4 font-serif text-[84px] font-bold leading-none tracking-tight [text-shadow:0_4px_28px_rgba(0,0,0,0.85)]"
              style={{ color: "var(--el)" }}
            >
              {cut.hanja}
            </p>
            <p className="cut-quote mt-3 text-[20px]">{cut.hanjaKo}</p>
            <p className="mt-1 text-[13px] text-white/60 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
              {cut.sub}
            </p>
            <p className="cut-quote mt-8 max-w-[300px] text-[18px] font-semibold leading-7">
              {cut.text}
            </p>
          </div>
        </FrameMedia>
      </div>
    );
  }

  if (cut.type === "oheng") {
    const count = reading.saju.elementCount;
    const max = Math.max(...Object.values(count), 1);
    return (
      <FrameMedia src={src} videoSrc={videoSrc} alt={product.character} fill>
        <div className="absolute inset-x-0 top-0 px-5 pt-14">
          <p className="cut-kicker">오행</p>
          <div className="mt-4 space-y-3">
            {(Object.entries(count) as [Element, number][]).map(([el, n]) => (
              <div key={el} className="flex items-center gap-3">
                <span className="w-6 text-[13px] text-[#f3ead8] [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
                  {el}
                </span>
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/15">
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
        </div>
        <div className="absolute inset-x-0 bottom-0 px-5 pb-[calc(108px+env(safe-area-inset-bottom))]">
          <Bubble speaker={cut.speaker} text={cut.text} />
        </div>
      </FrameMedia>
    );
  }

  if (cut.type === "myeongshik") {
    return (
      <FrameMedia src={src} videoSrc={videoSrc} alt={product.character} fill>
        <div className="absolute inset-x-0 top-0 px-4 pt-14">
          <p className="cut-quote text-[20px]">{cut.text}</p>
          <div className="mt-5">
            <MyeongshikCard saju={reading.saju} />
          </div>
          <Link
            href="/"
            className="mt-8 flex h-12 items-center justify-center rounded-full bg-[#f3ead8] text-[15px] font-semibold text-ink"
          >
            처음으로
          </Link>
        </div>
      </FrameMedia>
    );
  }

  return (
    <FrameMedia src={src} videoSrc={videoSrc} alt={product.character} fill>
      <div
        className={`absolute inset-x-0 bottom-0 px-5 pb-[calc(108px+env(safe-area-inset-bottom))] ${
          locked ? "locked-blur" : ""
        }`}
      >
        <Bubble speaker={cut.speaker} text={cut.text} />
      </div>
      {locked ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 px-6 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white/15 text-xl text-[#f3ead8]">⌀</span>
          <p className="cut-quote mt-3 text-[20px]">여기서부터는 잠겼다</p>
          <Link
            href={payHref}
            className="cta-dark mt-5 inline-flex h-11 items-center rounded-full px-5 text-[14px]"
          >
            뒷장을 연다 {formatPrice(product.price)}
          </Link>
        </div>
      ) : null}
    </FrameMedia>
  );
}

function Bubble({ speaker, text }: { speaker?: string; text: string }) {
  return (
    <div className="rounded-2xl bg-[#f6f0e4]/95 px-4 py-3 text-ink shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
      {speaker ? (
        <p className="text-[11px] font-medium text-sub">{speaker}</p>
      ) : null}
      <p className="mt-1 whitespace-pre-line font-serif text-[16px] leading-7">{text}</p>
    </div>
  );
}
