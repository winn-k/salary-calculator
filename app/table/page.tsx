import type { Metadata } from "next";
import Link from "next/link";
import { formatWon } from "../lib/salary";
import {
  calcDefault,
  DEFAULT_DEPENDENTS,
  DEFAULT_NONTAX,
  manwon,
  salaryList,
} from "../lib/salaryTable";

export const metadata: Metadata = {
  title: "연봉별 실수령액 표 (2,000만원~1억)",
  description:
    "연봉 2,000만원부터 1억까지 100만원 단위 월 실수령액을 한눈에 정리한 표입니다. 각 연봉을 누르면 4대보험·세금 상세 내역을 볼 수 있습니다.",
  alternates: { canonical: "/table" },
};

export default function TablePage() {
  const list = salaryList();

  return (
    <main className="py-10 px-4">
      <div className="mx-auto w-full max-w-xl">
        <h1 className="text-2xl font-bold">연봉별 실수령액 표</h1>
        <p className="mt-2 text-sm text-slate-500">
          연봉 2,000만원~1억, 100만원 단위 · 월 비과세 {formatWon(DEFAULT_NONTAX)},
          부양가족 {DEFAULT_DEPENDENTS}인 기준 · 2025년 요율
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                <th className="px-4 py-3 text-left font-medium">연봉</th>
                <th className="px-4 py-3 text-right font-medium">월 실수령액</th>
                <th className="px-4 py-3 text-right font-medium">연 실수령액</th>
              </tr>
            </thead>
            <tbody>
              {list.map((annual) => {
                const r = calcDefault(annual);
                return (
                  <tr
                    key={annual}
                    className="border-b border-slate-50 last:border-0 hover:bg-indigo-50/50"
                  >
                    <td className="px-4 py-2.5">
                      <Link
                        href={`/salary/${annual}`}
                        className="font-medium text-indigo-600 hover:underline"
                      >
                        {manwon(annual)}
                      </Link>
                    </td>
                    <td className="px-4 py-2.5 text-right font-medium text-slate-800">
                      {formatWon(r.monthlyNet)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-slate-500">
                      {formatWon(r.annualNet)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          ※ 위 금액은 월 비과세 20만원·부양가족 1인을 가정한 추정치입니다. 비과세액과 부양가족
          수에 따라 달라지며, 정확한 계산은{" "}
          <Link href="/" className="text-indigo-600 hover:underline">
            계산기
          </Link>
          에서 직접 입력해 확인하세요.
        </p>
      </div>
    </main>
  );
}
