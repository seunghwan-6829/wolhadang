export function Footer() {
  return (
    <footer className="mt-4 px-4 pb-8 pt-6 text-[11px] leading-5 text-sub">
      <p className="font-serif text-sm text-ink">터줏 김선생</p>
      <p className="mt-0.5 text-[11px] tracking-wide text-neutral-500">월하당</p>
      <p className="mt-3">
        대표: 홍길동 · 사업자등록번호: 000-00-00000
        <br />
        통신판매업신고: 제2026-서울강남-0000호
        <br />
        주소: 서울특별시 ○○구 ○○로 00
        <br />
        고객센터: 0000-0000 · 이메일: hello@wolhadang.example
      </p>
      <p className="mt-3 text-[10px] text-neutral-400">
        본 서비스는 오락 및 참고용 명리 콘텐츠입니다. 중요한 결정은 본인 판단에
        따르시기 바랍니다. 사업자 정보는 플레이스홀더입니다.
      </p>
      <p className="mt-3">© {new Date().getFullYear()} 월하당</p>
    </footer>
  );
}
