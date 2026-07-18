import { calculateSalary, type SalaryResult } from "./salary";

// 연봉별 표에 쓰는 기본 가정
export const DEFAULT_NONTAX = 200_000; // 월 비과세 20만원
export const DEFAULT_DEPENDENTS = 1; // 본인 1인

// 표 범위: 연봉 2,000만 ~ 1억, 100만원 단위
export const TABLE_MIN = 20_000_000;
export const TABLE_MAX = 100_000_000;
export const TABLE_STEP = 1_000_000;

export function salaryList(): number[] {
  const list: number[] = [];
  for (let s = TABLE_MIN; s <= TABLE_MAX; s += TABLE_STEP) list.push(s);
  return list;
}

export function isValidSalary(annual: number): boolean {
  return (
    Number.isInteger(annual) &&
    annual >= TABLE_MIN &&
    annual <= TABLE_MAX &&
    annual % TABLE_STEP === 0
  );
}

export function calcDefault(annual: number): SalaryResult {
  return calculateSalary({
    annualSalary: annual,
    monthlyNonTax: DEFAULT_NONTAX,
    dependents: DEFAULT_DEPENDENTS,
  });
}

/** 20,000,000 → "2,000만원" */
export function manwon(annual: number): string {
  return (annual / 10_000).toLocaleString("ko-KR") + "만원";
}
