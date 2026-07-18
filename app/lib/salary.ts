// 연봉 실수령액 계산 로직
// ⚠️ 소득세는 국세청 '근로소득 간이세액표'가 아닌 연간 과세표준 기준 추정치입니다.
//    실제 매월 원천징수액 및 연말정산 결과와 다를 수 있습니다.
// 요율 기준: 2025년 (요율은 매년 바뀌므로 RATES 상수만 갱신하면 됩니다)

export const RATES = {
  // 국민연금 (근로자 부담분 4.5%)
  nationalPension: {
    rate: 0.045,
    // 기준소득월액 상·하한 (2025.7~2026.6 적용값)
    maxBase: 6_370_000,
    minBase: 400_000,
  },
  // 건강보험 (근로자 부담분 3.545%)
  healthInsurance: {
    rate: 0.03545,
  },
  // 장기요양보험 (건강보험료 × 12.95%)
  longTermCare: {
    rate: 0.1295,
  },
  // 고용보험 (실업급여분, 근로자 0.9%)
  employmentInsurance: {
    rate: 0.009,
  },
  // 지방소득세 (소득세의 10%)
  localIncomeTaxRate: 0.1,
  // 1인당 인적공제
  personalDeduction: 1_500_000,
} as const;

export interface SalaryInput {
  /** 연봉 (원) */
  annualSalary: number;
  /** 월 비과세액 (식대 등, 원). 기본 20만원 */
  monthlyNonTax: number;
  /** 부양가족 수 (본인 포함) */
  dependents: number;
}

export interface SalaryResult {
  monthlyGross: number; // 세전 월급
  monthlyTaxableBase: number; // 과세 대상 월급 (비과세 제외)
  deductions: {
    nationalPension: number;
    healthInsurance: number;
    longTermCare: number;
    employmentInsurance: number;
    incomeTax: number;
    localIncomeTax: number;
  };
  totalDeduction: number; // 월 공제 합계
  monthlyNet: number; // 월 실수령액
  annualNet: number; // 연 실수령액
}

/** 근로소득공제 (연간) */
function earnedIncomeDeduction(grossAnnual: number): number {
  if (grossAnnual <= 5_000_000) return grossAnnual * 0.7;
  if (grossAnnual <= 15_000_000) return 3_500_000 + (grossAnnual - 5_000_000) * 0.4;
  if (grossAnnual <= 45_000_000) return 7_500_000 + (grossAnnual - 15_000_000) * 0.15;
  if (grossAnnual <= 100_000_000) return 12_000_000 + (grossAnnual - 45_000_000) * 0.05;
  return 14_750_000 + (grossAnnual - 100_000_000) * 0.02;
}

/** 종합소득 산출세액 (누진세율, 2023년 이후 과세표준 구간) */
function calcIncomeTaxByBase(base: number): number {
  if (base <= 0) return 0;
  if (base <= 14_000_000) return base * 0.06;
  if (base <= 50_000_000) return 840_000 + (base - 14_000_000) * 0.15;
  if (base <= 88_000_000) return 6_240_000 + (base - 50_000_000) * 0.24;
  if (base <= 150_000_000) return 15_360_000 + (base - 88_000_000) * 0.35;
  if (base <= 300_000_000) return 37_060_000 + (base - 150_000_000) * 0.38;
  if (base <= 500_000_000) return 94_060_000 + (base - 300_000_000) * 0.4;
  if (base <= 1_000_000_000) return 174_060_000 + (base - 500_000_000) * 0.42;
  return 384_060_000 + (base - 1_000_000_000) * 0.45;
}

/** 근로소득 세액공제 (한도 반영) */
function earnedIncomeTaxCredit(calculatedTax: number, grossAnnual: number): number {
  let credit =
    calculatedTax <= 1_300_000
      ? calculatedTax * 0.55
      : 715_000 + (calculatedTax - 1_300_000) * 0.3;

  // 총급여액별 공제 한도
  let limit: number;
  if (grossAnnual <= 33_000_000) limit = 740_000;
  else if (grossAnnual <= 70_000_000)
    limit = Math.max(660_000, 740_000 - (grossAnnual - 33_000_000) * 0.008);
  else if (grossAnnual <= 120_000_000)
    limit = Math.max(500_000, 660_000 - (grossAnnual - 70_000_000) * 0.5);
  else limit = Math.max(200_000, 500_000 - (grossAnnual - 120_000_000) * 0.5);

  return Math.min(credit, limit);
}

export function calculateSalary(input: SalaryInput): SalaryResult {
  const annualSalary = Math.max(0, input.annualSalary);
  const monthlyNonTax = Math.max(0, input.monthlyNonTax);
  const dependents = Math.max(1, Math.floor(input.dependents));

  const monthlyGross = annualSalary / 12;
  const monthlyTaxableBase = Math.max(0, monthlyGross - monthlyNonTax);

  // --- 4대보험 (월) ---
  const pensionBase = Math.min(
    Math.max(monthlyTaxableBase, RATES.nationalPension.minBase),
    RATES.nationalPension.maxBase,
  );
  const nationalPension = Math.floor((pensionBase * RATES.nationalPension.rate) / 10) * 10;
  const healthInsurance =
    Math.floor((monthlyTaxableBase * RATES.healthInsurance.rate) / 10) * 10;
  const longTermCare = Math.floor((healthInsurance * RATES.longTermCare.rate) / 10) * 10;
  const employmentInsurance =
    Math.floor((monthlyTaxableBase * RATES.employmentInsurance.rate) / 10) * 10;

  // --- 소득세 (연간 과세표준 기준 추정) ---
  const grossTaxableAnnual = monthlyTaxableBase * 12; // 과세 대상 연급여
  const earnedIncome = grossTaxableAnnual - earnedIncomeDeduction(grossTaxableAnnual);
  const personalDeduction = RATES.personalDeduction * dependents;
  const insuranceDeductionAnnual = (nationalPension + healthInsurance + longTermCare) * 12;
  const taxBase = Math.max(
    0,
    earnedIncome - personalDeduction - insuranceDeductionAnnual,
  );
  const calculatedTax = calcIncomeTaxByBase(taxBase);
  const taxCredit = earnedIncomeTaxCredit(calculatedTax, grossTaxableAnnual);
  const decidedTaxAnnual = Math.max(0, calculatedTax - taxCredit);

  const incomeTax = Math.floor(decidedTaxAnnual / 12 / 10) * 10;
  const localIncomeTax = Math.floor((incomeTax * RATES.localIncomeTaxRate) / 10) * 10;

  const totalDeduction =
    nationalPension +
    healthInsurance +
    longTermCare +
    employmentInsurance +
    incomeTax +
    localIncomeTax;

  const monthlyNet = monthlyGross - totalDeduction;

  return {
    monthlyGross,
    monthlyTaxableBase,
    deductions: {
      nationalPension,
      healthInsurance,
      longTermCare,
      employmentInsurance,
      incomeTax,
      localIncomeTax,
    },
    totalDeduction,
    monthlyNet,
    annualNet: monthlyNet * 12,
  };
}

export function formatWon(n: number): string {
  return Math.round(n).toLocaleString("ko-KR") + "원";
}
