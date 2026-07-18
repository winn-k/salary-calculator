"use client";

import { useMemo, useState } from "react";
import { calculateSalary, formatWon } from "./lib/salary";

export default function Home() {
  const [salaryText, setSalaryText] = useState("40,000,000");
  const [nonTax, setNonTax] = useState("200,000");
  const [dependents, setDependents] = useState("1");

  const parse = (s: string) => Number(s.replace(/[^0-9]/g, "")) || 0;
  const withComma = (s: string) => {
    const n = s.replace(/[^0-9]/g, "");
    return n ? Number(n).toLocaleString("ko-KR") : "";
  };

  const result = useMemo(
    () =>
      calculateSalary({
        annualSalary: parse(salaryText),
        monthlyNonTax: parse(nonTax),
        dependents: parse(dependents) || 1,
      }),
    [salaryText, nonTax, dependents],
  );

  const rows: { label: string; value: number; hint?: string }[] = [
    { label: "국민연금", value: result.deductions.nationalPension, hint: "4.5%" },
    { label: "건강보험", value: result.deductions.healthInsurance, hint: "3.545%" },
    { label: "장기요양", value: result.deductions.longTermCare, hint: "건보료의 12.95%" },
    { label: "고용보험", value: result.deductions.employmentInsurance, hint: "0.9%" },
    { label: "소득세", value: result.deductions.incomeTax, hint: "추정" },
    { label: "지방소득세", value: result.deductions.localIncomeTax, hint: "소득세의 10%" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 text-slate-900">
      <div className="mx-auto w-full max-w-xl">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">연봉 실수령액 계산기</h1>
          <p className="mt-2 text-sm text-slate-500">
            연봉을 입력하면 4대보험·세금을 뺀 월 실수령액을 계산해 드립니다.
          </p>
        </header>

        {/* 입력 카드 */}
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">연봉 (세전)</span>
            <div className="mt-1 flex items-center rounded-xl border border-slate-300 px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
              <input
                inputMode="numeric"
                value={salaryText}
                onChange={(e) => setSalaryText(withComma(e.target.value))}
                className="w-full bg-transparent py-3 text-right text-lg font-semibold outline-none"
                placeholder="40,000,000"
              />
              <span className="ml-2 shrink-0 text-slate-500">원</span>
            </div>
          </label>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">월 비과세액</span>
              <div className="mt-1 flex items-center rounded-xl border border-slate-300 px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                <input
                  inputMode="numeric"
                  value={nonTax}
                  onChange={(e) => setNonTax(withComma(e.target.value))}
                  className="w-full bg-transparent py-2.5 text-right outline-none"
                  placeholder="200,000"
                />
                <span className="ml-2 shrink-0 text-slate-500">원</span>
              </div>
              <span className="mt-1 block text-xs text-slate-400">식대 등 (기본 20만원)</span>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">부양가족 수</span>
              <div className="mt-1 flex items-center rounded-xl border border-slate-300 px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                <input
                  inputMode="numeric"
                  value={dependents}
                  onChange={(e) => setDependents(e.target.value.replace(/[^0-9]/g, ""))}
                  className="w-full bg-transparent py-2.5 text-right outline-none"
                  placeholder="1"
                />
                <span className="ml-2 shrink-0 text-slate-500">명</span>
              </div>
              <span className="mt-1 block text-xs text-slate-400">본인 포함</span>
            </label>
          </div>
        </section>

        {/* 결과 카드 */}
        <section className="mt-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="rounded-xl bg-blue-600 px-5 py-4 text-white">
            <div className="text-sm opacity-90">월 예상 실수령액</div>
            <div className="mt-1 text-3xl font-bold">{formatWon(result.monthlyNet)}</div>
            <div className="mt-1 text-sm opacity-90">
              연 {formatWon(result.annualNet)} · 세전 월 {formatWon(result.monthlyGross)}
            </div>
          </div>

          <ul className="mt-5 divide-y divide-slate-100">
            {rows.map((r) => (
              <li key={r.label} className="flex items-center justify-between py-2.5 text-sm">
                <span className="text-slate-600">
                  {r.label}
                  {r.hint && <span className="ml-1.5 text-xs text-slate-400">({r.hint})</span>}
                </span>
                <span className="font-medium text-slate-800">- {formatWon(r.value)}</span>
              </li>
            ))}
            <li className="flex items-center justify-between pt-3 text-sm font-semibold">
              <span className="text-slate-700">공제 합계</span>
              <span className="text-red-600">- {formatWon(result.totalDeduction)}</span>
            </li>
          </ul>
        </section>

        <p className="mt-4 px-1 text-xs leading-relaxed text-slate-400">
          ※ 2025년 요율 기준 추정치입니다. 소득세는 국세청 근로소득 간이세액표가 아닌 연간
          과세표준 기준으로 계산하여 실제 매월 원천징수액·연말정산 결과와 차이가 있을 수
          있습니다. 참고용으로만 활용해 주세요.
        </p>
      </div>
    </main>
  );
}
