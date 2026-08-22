import Link from "next/link";
import { FrameMedia } from "@/components/FrameMedia";
import { Header } from "@/components/Header";
import { FLAGSHIP_SLUG, HERO_LINE, getProduct } from "@/lib/data/products";

export default function HomePage() {
  const flagship = getProduct(FLAGSHIP_SLUG)!;

  return (
    <div className="relative h-dvh overflow-hidden bg-[#161412]">
      <FrameMedia
        src={flagship.poster}
        videoSrc={flagship.video}
        alt="터줏 김선생"
        fill
      >
        <Header overlay />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-[max(28px,env(safe-area-inset-bottom))]">
          <p className="cut-kicker">터줏 김선생</p>
          <h1 className="cut-quote mt-2 text-[24px] leading-snug sm:text-[26px]">
            {HERO_LINE}
          </h1>
          <Link
            href={`/s/${flagship.slug}`}
            className="cta-dark mt-5 flex h-12 items-center justify-center rounded-full text-[15px]"
          >
            {flagship.cta}
          </Link>
          <p className="mt-4 mb-2 flex items-center justify-center gap-4 text-[13px] text-white/55">
            <Link href="/s/today" className="underline-offset-4 hover:text-[#f3ead8]">
              오늘의 한 줄
            </Link>
            <span aria-hidden>·</span>
            <Link href="/s/jaemul" className="underline-offset-4 hover:text-[#f3ead8]">
              재물
            </Link>
          </p>
        </div>
      </FrameMedia>
    </div>
  );
}
