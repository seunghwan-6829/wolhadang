import Link from "next/link";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="font-serif text-2xl text-ink">없는 페이지다</p>
        <p className="mt-2 text-sm text-sub">이 주소로는 사주가 안 열린다.</p>
        <Link href="/" className="cta-dark mt-6 inline-flex h-12 items-center rounded-full px-6">
          터줏 김선생으로
        </Link>
      </main>
    </>
  );
}
