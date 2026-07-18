import { type SalaryResult, formatWon } from "../lib/salary";

export function SalaryBreakdown({ result }: { result: SalaryResult }) {
  const rows: { label: string; value: number; hint?: string }[] = [
    { label: "국민연금", value: result.deductions.nationalPension, hint: "4.5%" },
    { label: "건강보험", value: result.deductions.healthInsurance, hint: "3.545%" },
    { label: "장기요양", value: result.deductions.longTermCare, hint: "건보료의 12.95%" },
    { label: "고용보험", value: result.deductions.employmentInsurance, hint: "0.9%" },
    { label: "소득세", value: result.deductions.incomeTax, hint: "추정" },
    { label: "지방소득세", value: result.deductions.localIncomeTax, hint: "소득세의 10%" },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 px-5 py-5 text-white shadow-lg shadow-indigo-200">
        <div className="text-sm text-indigo-100">월 예상 실수령액</div>
        <div className="mt-1 text-3xl font-bold tracking-tight">
          {formatWon(result.monthlyNet)}
        </div>
        <div className="mt-1 text-sm text-indigo-100">
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
          <span className="text-rose-600">- {formatWon(result.totalDeduction)}</span>
        </li>
      </ul>
    </div>
  );
}
