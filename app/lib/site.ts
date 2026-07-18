// 사이트 공통 설정 (도메인이 바뀌면 url만 수정)
export const site = {
  name: "연봉 실수령액 계산기",
  url: "https://salary-calculator-flax-seven.vercel.app",
  description:
    "연봉을 입력하면 국민연금·건강보험·고용보험·소득세를 뺀 월 실수령액을 바로 계산해 드립니다. 2025년 요율 기준.",
  // 문의 이메일 (애드센스·이용자 문의용). 실제 사용하는 주소로 바꾸세요.
  contactEmail: "kyuwon.k.08@gmail.com",

  // 사이트 소유 확인 코드 (값을 받으면 여기에 붙여넣기만 하면 됩니다)
  verification: {
    // 구글 서치콘솔 > HTML 태그 방식의 content="..." 값
    google: "BPURTC_2216BDkf1V7Yy53EQ38fNVtUGmc6f1-MpXPc",
    // 네이버 서치어드바이저 > HTML 태그 방식의 content="..." 값
    naver: "",
  },

  // 구글 애드센스 게시자 ID (승인 후 발급되는 ca-pub-XXXXXXXX 형식)
  adsensePublisherId: "",
} as const;
