import { Header } from "@/components/Header";
import { TabBar } from "@/components/TabBar";

export const metadata = { title: "검색" };

export default function SearchPage() {
  return (
    <>
      <Header />
      <main className="flex-1 px-5 pt-10">
        <h1 className="font-serif text-2xl text-ink">검색</h1>
        <p className="mt-2 text-[14px] text-sub">
          아직 준비 중이에요. 홈에서 포스터를 눌러 풀이를 골라 주세요.
        </p>
        <div className="mt-6 h-12 rounded-full bg-wash px-4 text-[14px] leading-[48px] text-neutral-400">
          상품·캐릭터 검색
        </div>
      </main>
      <TabBar />
    </>
  );
}
