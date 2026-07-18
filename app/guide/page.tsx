import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "사용법·자주 묻는 질문(FAQ)",
  description:
    "연봉 실수령액 계산기 사용 방법과 4대보험·소득세 계산에 대해 자주 묻는 질문을 정리했습니다.",
  alternates: { canonical: "/guide" },
};

const faqs = [
  {
    q: "실수령액은 어떻게 계산되나요?",
    a: "연봉(세전)에서 월 비과세액을 뺀 과세 대상 월급을 기준으로 국민연금(4.5%), 건강보험(3.545%), 장기요양보험(건보료의 12.95%), 고용보험(0.9%)을 계산하고, 여기에 소득세·지방소득세를 뺀 금액이 월 실수령액입니다.",
  },
  {
    q: "비과세액은 무엇인가요?",
    a: "식대처럼 세금이 부과되지 않는 급여 항목입니다. 2024년부터 식대 비과세 한도는 월 20만원이며, 기본값으로 20만원이 입력되어 있습니다. 회사마다 다를 수 있으니 실제 급여명세서를 참고해 조정하세요.",
  },
  {
    q: "부양가족 수는 어떻게 입력하나요?",
    a: "본인을 포함한 인원 수를 입력합니다. 예를 들어 배우자와 자녀 1명을 부양한다면 3명입니다. 부양가족이 많을수록 소득세가 줄어 실수령액이 늘어납니다.",
  },
  {
    q: "계산 결과가 실제 급여명세서와 다른 이유는?",
    a: "이 계산기의 소득세는 국세청 '근로소득 간이세액표'가 아닌 연간 과세표준 기준 추정치입니다. 실제 매월 원천징수액은 간이세액표에 따라 조금 다를 수 있고, 각종 공제(주택청약, 의료비 등)와 연말정산 결과에 따라서도 달라집니다. 참고용으로 활용해 주세요.",
  },
  {
    q: "요율은 언제 기준인가요?",
    a: "2025년 4대보험 요율을 기준으로 합니다. 요율은 매년 바뀔 수 있으며, 변경 시 반영하여 업데이트합니다.",
  },
];

export default function GuidePage() {
  return (
    <main className="py-10 px-4">
      <div className="mx-auto w-full max-w-xl">
        <h1 className="text-2xl font-bold">사용법 · 자주 묻는 질문</h1>

        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <span className="h-5 w-1.5 rounded-full bg-indigo-500" />
            사용 방법
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-600">
            <li>
              <b>연봉(세전)</b>을 입력합니다. 계약서상 연봉을 그대로 넣으면 됩니다.
            </li>
            <li>
              <b>월 비과세액</b>을 확인합니다. 식대 등 비과세 항목으로, 기본값은 20만원입니다.
            </li>
            <li>
              <b>부양가족 수</b>를 본인 포함으로 입력합니다.
            </li>
            <li>입력하는 즉시 월 실수령액과 공제 내역이 자동으로 계산됩니다.</li>
          </ol>
        </section>

        <section className="mt-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <span className="h-5 w-1.5 rounded-full bg-indigo-500" />
            자주 묻는 질문
          </h2>
          <div className="mt-3 divide-y divide-slate-100">
            {faqs.map((f) => (
              <div key={f.q} className="py-4">
                <h3 className="text-sm font-semibold text-slate-800">
                  <span className="text-indigo-600">Q.</span> {f.q}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  <span className="font-semibold text-slate-400">A.</span> {f.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-6 text-sm">
          <Link href="/" className="font-medium text-indigo-600 hover:underline">
            ← 계산기로 돌아가기
          </Link>
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </main>
  );
}
