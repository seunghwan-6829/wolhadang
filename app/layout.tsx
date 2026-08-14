import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const sans = Noto_Sans_KR({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-sans-kr",
  display: "swap",
});

const serif = Noto_Serif_KR({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "월하당 — 내 사주를 보다",
    template: "%s | 월하당",
  },
  description:
    "정통 만세력으로 읽는 웹툰 사주. 연애, 재물, 인생의 흐름을 캐릭터가 읽어 줍니다.",
  applicationName: "월하당",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full text-[15px] leading-relaxed text-ink">
        <div className="phone-shell flex min-h-dvh flex-col">{children}</div>
      </body>
    </html>
  );
}
