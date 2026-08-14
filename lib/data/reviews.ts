/**
 * 예시 데이터 — 광고/데모용 샘플 리뷰입니다.
 * 실제 결제·후기 연동 시 이 모듈을 Supabase 조회로 교체하세요.
 */
export type SampleReview = {
  id: string;
  maskedName: string;
  productSlug: string;
  productLabel: string;
  text: string;
  ago: string;
  avatar: string;
};

export const SAMPLE_REVIEWS: SampleReview[] = [
  {
    id: "r1",
    maskedName: "김*연",
    productSlug: "jeongtong",
    productLabel: "은월아씨 정통사주",
    text: "일간이 저랑 너무 같아서 소름 돋았어요.",
    ago: "방금 전",
    avatar: "/characters/eunwol-poster.png",
  },
  {
    id: "r2",
    maskedName: "이*훈",
    productSlug: "yeonae",
    productLabel: "단홍낭자 연애비책",
    text: "올해 인연 시기 얘기가 현실적으로 다가왔어요.",
    ago: "방금 전",
    avatar: "/characters/danhong-poster.png",
  },
  {
    id: "r3",
    maskedName: "박*서",
    productSlug: "jaemul",
    productLabel: "월하선생 재물보감",
    text: "돈 새는 습관까지 짚혀서 솔직히 찔렸습니다.",
    ago: "방금 전",
    avatar: "/characters/jaemul-poster.png",
  },
  {
    id: "r4",
    maskedName: "최*아",
    productSlug: "jeongtong",
    productLabel: "은월아씨 정통사주",
    text: "웹툰처럼 읽히는데 내용은 진짜 사주예요.",
    ago: "방금 전",
    avatar: "/characters/eunwol-poster.png",
  },
  {
    id: "r5",
    maskedName: "정*우",
    productSlug: "yeonae",
    productLabel: "단홍낭자 연애비책",
    text: "솔로인데 조급해하지 말라는 문장이 위로가 됐음.",
    ago: "방금 전",
    avatar: "/characters/danhong-poster.png",
  },
  {
    id: "r6",
    maskedName: "한*진",
    productSlug: "rank",
    productLabel: "내 사주 상위 몇%",
    text: "무료인데 재밌어서 정통사주도 봤어요.",
    ago: "방금 전",
    avatar: "/characters/eunwol-poster.png",
  },
  {
    id: "r7",
    maskedName: "오*리",
    productSlug: "gunghap",
    productLabel: "단홍낭자 사주궁합",
    text: "싸우는 포인트가 진짜 우리 패턴이랑 같았어요.",
    ago: "방금 전",
    avatar: "/characters/danhong-poster.png",
  },
  {
    id: "r8",
    maskedName: "윤*호",
    productSlug: "shinjeom",
    productLabel: "묵운도령 신점사주",
    text: "말이 짧은데 남는 문장이 있어요. 소름.",
    ago: "방금 전",
    avatar: "/characters/mukun-poster.png",
  },
  {
    id: "r9",
    maskedName: "서*윤",
    productSlug: "marriage",
    productLabel: "설아씨 결혼사주",
    text: "서두르지 말라는 타이밍이 지금이랑 맞아서 울컥.",
    ago: "방금 전",
    avatar: "/characters/seola-poster.png",
  },
];

export function reviewsForProduct(slug: string): SampleReview[] {
  const mine = SAMPLE_REVIEWS.filter((r) => r.productSlug === slug);
  if (mine.length >= 3) return mine;
  return [...mine, ...SAMPLE_REVIEWS.filter((r) => r.productSlug !== slug)].slice(
    0,
    4,
  );
}
