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
};

export const SAMPLE_REVIEWS: SampleReview[] = [
  {
    id: "r1",
    maskedName: "김*연",
    productSlug: "makhin",
    productLabel: "정통사주",
    text: "막힌 한 군데가 정확히 지금 자리였다.",
    ago: "방금 전",
  },
  {
    id: "r2",
    maskedName: "이*훈",
    productSlug: "makhin",
    productLabel: "정통사주",
    text: "말이 짧은데 남는 문장이 있다.",
    ago: "방금 전",
  },
  {
    id: "r3",
    maskedName: "박*서",
    productSlug: "jaemul",
    productLabel: "재물",
    text: "돈 새는 습관까지 짚혀서 찔렸다.",
    ago: "방금 전",
  },
  {
    id: "r4",
    maskedName: "최*아",
    productSlug: "makhin",
    productLabel: "정통사주",
    text: "안 풀린 게 아니라 막혀 있다는 말이 맞았다.",
    ago: "방금 전",
  },
  {
    id: "r5",
    maskedName: "정*우",
    productSlug: "today",
    productLabel: "오늘의 한 줄",
    text: "한 줄인데 오늘 할 일이 정해졌다.",
    ago: "방금 전",
  },
  {
    id: "r6",
    maskedName: "한*진",
    productSlug: "today",
    productLabel: "오늘의 한 줄",
    text: "무료로 보고 정통사주를 열었다.",
    ago: "방금 전",
  },
  {
    id: "r7",
    maskedName: "오*리",
    productSlug: "jaemul",
    productLabel: "재물",
    text: "모으는 형인지 굴리는 형인지 바로 갈렸다.",
    ago: "방금 전",
  },
  {
    id: "r8",
    maskedName: "윤*호",
    productSlug: "makhin",
    productLabel: "정통사주",
    text: "에두르지 않아서 오히려 믿겼다.",
    ago: "방금 전",
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
