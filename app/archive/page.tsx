import { Header } from "@/components/Header";
import { TabBar } from "@/components/TabBar";

export const metadata = { title: "보관함" };

export default function ArchivePage() {
  return (
    <>
      <Header />
      <main className="flex-1 px-5 pt-10">
        <h1 className="font-serif text-2xl text-ink">보관함</h1>
        <p className="mt-2 text-[14px] text-sub">
          읽은 풀이가 여기에 쌓일 예정이다. 지금은 데모라 비어 있다.
        </p>
      </main>
      <TabBar />
    </>
  );
}
