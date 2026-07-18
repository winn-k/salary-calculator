import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "./lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | 2025년 4대보험·세금 계산`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "연봉 실수령액",
    "실수령액 계산기",
    "연봉 계산기",
    "월급 실수령액",
    "4대보험 계산",
    "세후 월급",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | 2025년 4대보험·세금 계산`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex w-full max-w-xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-bold text-slate-900">
              💰 연봉 계산기
            </Link>
            <nav className="flex gap-4 text-sm text-slate-500">
              <Link href="/" className="hover:text-slate-900">
                계산기
              </Link>
              <Link href="/guide" className="hover:text-slate-900">
                사용법·FAQ
              </Link>
            </nav>
          </div>
        </header>

        <div className="flex-1">{children}</div>

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto w-full max-w-xl px-4 py-6 text-sm text-slate-500">
            <nav className="flex flex-wrap gap-x-4 gap-y-2">
              <Link href="/" className="hover:text-slate-900">
                홈
              </Link>
              <Link href="/guide" className="hover:text-slate-900">
                사용법·FAQ
              </Link>
              <Link href="/privacy" className="hover:text-slate-900">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="hover:text-slate-900">
                이용약관
              </Link>
            </nav>
            <p className="mt-4 text-xs leading-relaxed text-slate-400">
              본 사이트의 계산 결과는 2025년 요율 기준 추정치이며 참고용입니다. 실제
              원천징수·연말정산 결과와 다를 수 있습니다.
              <br />
              문의: {site.contactEmail}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
