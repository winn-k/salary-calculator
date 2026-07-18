import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: `${site.name}의 개인정보처리방침입니다.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="py-10 px-4">
      <article className="mx-auto w-full max-w-xl rounded-2xl bg-white p-6 text-sm leading-relaxed text-slate-700 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">개인정보처리방침</h1>
        <p className="mt-2 text-slate-500">시행일: 2025년 1월 1일</p>

        <p className="mt-5">
          {site.name}(이하 &ldquo;본 사이트&rdquo;)은 이용자의 개인정보를 소중히 여기며, 관련
          법령을 준수합니다. 본 사이트가 개인정보를 어떻게 취급하는지 아래와 같이 안내합니다.
        </p>

        <h2 className="mt-6 text-base font-semibold text-slate-900">
          1. 수집하는 개인정보 항목
        </h2>
        <p className="mt-2">
          본 사이트의 연봉 계산 기능은 이용자가 입력한 연봉·비과세액·부양가족 수 등의 값을{" "}
          <b>이용자의 브라우저 내에서만 처리</b>하며, 해당 값을 서버로 전송하거나 저장하지
          않습니다. 따라서 본 사이트는 이름, 연락처, 주민등록번호 등 개인을 식별할 수 있는
          정보를 직접 수집하지 않습니다.
        </p>

        <h2 className="mt-6 text-base font-semibold text-slate-900">
          2. 쿠키 및 자동 수집 정보
        </h2>
        <p className="mt-2">
          본 사이트는 서비스 개선 및 광고 게재를 위해 쿠키(cookie)와 유사 기술을 사용할 수
          있습니다. 이 과정에서 접속 기록, 브라우저 종류, 방문 페이지 등 비식별 정보가 자동으로
          수집될 수 있습니다. 이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.
        </p>

        <h2 className="mt-6 text-base font-semibold text-slate-900">
          3. 광고 및 제3자 서비스
        </h2>
        <p className="mt-2">
          본 사이트는 Google AdSense 등 제3자 광고 서비스를 이용할 수 있습니다. Google을
          포함한 제3자 공급업체는 쿠키를 사용하여 이용자의 방문 기록에 기반한 광고를 게재할 수
          있습니다. 이용자는{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            Google 광고 설정
          </a>
          에서 맞춤 광고를 관리하거나 비활성화할 수 있으며,{" "}
          <a
            href="https://www.aboutads.info"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            www.aboutads.info
          </a>
          에서 제3자 공급업체의 쿠키 사용을 거부할 수 있습니다.
        </p>

        <h2 className="mt-6 text-base font-semibold text-slate-900">4. 개인정보 보유 및 이용기간</h2>
        <p className="mt-2">
          본 사이트는 이용자의 입력값을 저장하지 않으므로 별도의 보유 기간이 없습니다. 광고
          목적으로 제3자가 수집하는 정보는 해당 서비스의 정책을 따릅니다.
        </p>

        <h2 className="mt-6 text-base font-semibold text-slate-900">5. 문의처</h2>
        <p className="mt-2">
          개인정보 처리에 관한 문의는 아래 이메일로 연락해 주시기 바랍니다.
          <br />
          이메일: {site.contactEmail}
        </p>

        <h2 className="mt-6 text-base font-semibold text-slate-900">6. 방침의 변경</h2>
        <p className="mt-2">
          본 개인정보처리방침은 법령 및 서비스 변경에 따라 수정될 수 있으며, 변경 시 본
          페이지를 통해 공지합니다.
        </p>

        <p className="mt-8 text-sm">
          <Link href="/" className="font-medium text-indigo-600 hover:underline">
            ← 계산기로 돌아가기
          </Link>
        </p>
      </article>
    </main>
  );
}
