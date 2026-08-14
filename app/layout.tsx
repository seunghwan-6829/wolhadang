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
    default: "터줏 김선생 — 막힌 한 군데",
    template: "%s | 터줏 김선생",
  },
  description: "인생이 안 풀린 게 아니라, 한 군데가 막혀 있던 겁니다.",
  applicationName: "터줏 김선생",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f6f0e4",
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
