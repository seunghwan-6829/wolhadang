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
          아직 없다. 홈에서 정통사주를 열어라.
        </p>
      </main>
      <TabBar />
    </>
  );
}
