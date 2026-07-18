import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatWon } from "../../lib/salary";
import { SalaryBreakdown } from "../../components/SalaryBreakdown";
import {
  calcDefault,
  DEFAULT_DEPENDENTS,
  DEFAULT_NONTAX,
  isValidSalary,
  manwon,
  salaryList,
  TABLE_MAX,
  TABLE_MIN,
  TABLE_STEP,
} from "../../lib/salaryTable";

type Params = { annual: string };

export function generateStaticParams(): Params[] {
  return salaryList().map((annual) => ({ annual: String(annual) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { annual } = await params;
  const value = Number(annual);
  if (!isValidSalary(value)) return { title: "연봉 실수령액" };

  const r = calcDefault(value);
  const label = manwon(value);
  return {
    title: `연봉 ${label} 실수령액 (월 ${formatWon(r.monthlyNet)})`,
    description: `연봉 ${label}의 월 실수령액은 약 ${formatWon(
      r.monthlyNet,
    )}입니다. 국민연금·건강보험·고용보험·소득세 등 공제 내역을 상세히 확인하세요. 2025년 요율 기준.`,
    alternates: { canonical: `/salary/${value}` },
  };
}

export default async function SalaryDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { annual } = await params;
  const value = Number(annual);
  if (!isValidSalary(value)) notFound();

  const r = calcDefault(value);
  const label = manwon(value);
  const prev = value - TABLE_STEP >= TABLE_MIN ? value - TABLE_STEP : null;
  const next = value + TABLE_STEP <= TABLE_MAX ? value + TABLE_STEP : null;

  return (
    <main className="py-10 px-4">
      <div className="mx-auto w-full max-w-xl">
        <nav className="text-xs text-slate-400">
          <Link href="/" className="hover:text-indigo-600">
            홈
          </Link>{" "}
          ·{" "}
          <Link href="/table" className="hover:text-indigo-600">
            연봉별 표
          </Link>{" "}
          · <span className="text-slate-500">연봉 {label}</span>
        </nav>

        <h1 className="mt-3 text-2xl font-bold">연봉 {label} 실수령액</h1>
        <p className="mt-2 text-sm text-slate-500">
          월 비과세 {formatWon(DEFAULT_NONTAX)}, 부양가족 {DEFAULT_DEPENDENTS}인 기준 ·
          2025년 요율
        </p>

        <div className="mt-6">
          <SalaryBreakdown result={r} />
        </div>

        <p className="mt-4 rounded-xl bg-indigo-50 px-4 py-3 text-sm leading-relaxed text-slate-600">
          연봉 <b>{label}</b>({formatWon(value)})을 받으면 세전 월급은{" "}
          {formatWon(r.monthlyGross)}이며, 4대보험과 세금으로 매달 약{" "}
          {formatWon(r.totalDeduction)}이 공제되어 실제 월 실수령액은{" "}
          <b className="text-indigo-700">{formatWon(r.monthlyNet)}</b>입니다. 비과세액이나
          부양가족 수가 다르면 금액이 달라지며,{" "}
          <Link href="/" className="font-medium text-indigo-600 hover:underline">
            계산기
          </Link>
          에서 내 조건으로 직접 계산할 수 있습니다.
        </p>

        {/* 이전/다음 연봉 이동 */}
        <div className="mt-6 flex items-center justify-between gap-3 text-sm">
          {prev ? (
            <Link
              href={`/salary/${prev}`}
              className="rounded-lg px-3 py-2 text-indigo-600 ring-1 ring-slate-200 hover:bg-indigo-50"
            >
              ← 연봉 {manwon(prev)}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/salary/${next}`}
              className="rounded-lg px-3 py-2 text-indigo-600 ring-1 ring-slate-200 hover:bg-indigo-50"
            >
              연봉 {manwon(next)} →
            </Link>
          ) : (
            <span />
          )}
        </div>

        <p className="mt-6 text-sm">
          <Link href="/table" className="font-medium text-indigo-600 hover:underline">
            ← 연봉별 실수령액 표 전체 보기
          </Link>
        </p>

        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          ※ 소득세는 국세청 근로소득 간이세액표가 아닌 연간 과세표준 기준 추정치로, 실제 매월
          원천징수액·연말정산 결과와 차이가 있을 수 있습니다.
        </p>
      </div>
    </main>
  );
}
