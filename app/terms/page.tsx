import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "이용약관",
  description: `${site.name}의 이용약관입니다.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="py-10 px-4">
      <article className="mx-auto w-full max-w-xl rounded-2xl bg-white p-6 text-sm leading-relaxed text-slate-700 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">이용약관</h1>
        <p className="mt-2 text-slate-500">시행일: 2025년 1월 1일</p>

        <h2 className="mt-6 text-base font-semibold text-slate-900">제1조 (목적)</h2>
        <p className="mt-2">
          본 약관은 {site.name}(이하 &ldquo;본 사이트&rdquo;)이 제공하는 연봉 실수령액 계산
          서비스의 이용 조건과 절차, 이용자와 사이트의 권리·의무를 규정함을 목적으로 합니다.
        </p>

        <h2 className="mt-6 text-base font-semibold text-slate-900">제2조 (서비스의 성격)</h2>
        <p className="mt-2">
          본 사이트가 제공하는 모든 계산 결과는 <b>참고용 추정치</b>이며, 법적·회계적 효력을
          갖지 않습니다. 실제 급여, 원천징수액, 연말정산 결과는 개인의 상황 및 관련 법령에 따라
          달라질 수 있습니다.
        </p>

        <h2 className="mt-6 text-base font-semibold text-slate-900">제3조 (책임의 제한)</h2>
        <p className="mt-2">
          이용자가 본 사이트의 계산 결과를 신뢰하여 내린 판단 및 그로 인해 발생한 손해에 대하여
          본 사이트는 책임을 지지 않습니다. 정확한 세무·급여 정보는 국세청, 4대보험 기관 또는
          전문가를 통해 확인하시기 바랍니다.
        </p>

        <h2 className="mt-6 text-base font-semibold text-slate-900">제4조 (지식재산권)</h2>
        <p className="mt-2">
          본 사이트에 게시된 콘텐츠에 대한 권리는 본 사이트에 있으며, 무단 복제·배포를 금합니다.
        </p>

        <h2 className="mt-6 text-base font-semibold text-slate-900">제5조 (약관의 변경)</h2>
        <p className="mt-2">
          본 약관은 관련 법령 및 서비스 정책에 따라 변경될 수 있으며, 변경 시 본 페이지를 통해
          공지합니다.
        </p>

        <p className="mt-8 text-sm">
          <Link href="/" className="font-medium text-blue-600 hover:underline">
            ← 계산기로 돌아가기
          </Link>
        </p>
      </article>
    </main>
  );
}
