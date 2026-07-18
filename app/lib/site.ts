// 사이트 공통 설정 (도메인이 바뀌면 url만 수정)
export const site = {
  name: "연봉 실수령액 계산기",
  url: "https://salary-calculator-flax-seven.vercel.app",
  description:
    "연봉을 입력하면 국민연금·건강보험·고용보험·소득세를 뺀 월 실수령액을 바로 계산해 드립니다. 2025년 요율 기준.",
  // 문의 이메일 (애드센스·이용자 문의용). 실제 사용하는 주소로 바꾸세요.
  contactEmail: "kyuwon.k.08@gmail.com",
} as const;
