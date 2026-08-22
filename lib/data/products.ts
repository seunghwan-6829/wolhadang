export type ProductTab = "saju" | "free";

export type Product = {
  slug: string;
  character: string;
  shortName: string;
  name: string;
  hook: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: ProductTab;
  bullets: string[];
  landingCuts: string[];
  beatLine: string;
  poster: string;
  funnel: string;
  story: string;
  video?: string;
  videoBg?: string;
  cta: string;
  introLines: string[];
  introReplies: string[];
};

export const CHARACTER = "터줏 김선생";

export const HERO_LINE =
  "인생이 안 풀린 게 아니야.\n한 군데가 막혀 있어.";

export function flatLine(s: string): string {
  return s.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
}

const KIM_POSTER = "/characters/kim-hero.png";
const KIM_FUNNEL = "/characters/kim-funnel.png";
const KIM_STORY = "/characters/kim-story.png";
const KIM_VIDEO = "/video/kim-hero.mp4";
const KIM_BG = "/video/kim-bg.mp4";

export const PRODUCTS: Product[] = [
  {
    slug: "makhin",
    character: CHARACTER,
    shortName: "정통사주",
    name: "터줏 김선생 정통사주",
    hook: "네 사주, 안 풀린 게 아니야.\n한 군데가 막혀 있어.",
    description:
      "일간부터 재물·직업·인연·세운까지. 막힌 한 군데를 짚는다. 에두르지 않는다.",
    price: 29900,
    originalPrice: 49000,
    category: "saju",
    poster: KIM_POSTER,
    funnel: KIM_FUNNEL,
    story: KIM_STORY,
    video: KIM_VIDEO,
    videoBg: KIM_BG,
    cta: "내 사주부터 보자",
    introLines: [
      "네 사주,\n안 풀린 게 아니야.",
      "한 군데가 막혀 있어.",
      "운명을 펴기 전에,\n이름부터 대라.",
    ],
    introReplies: [
      "그래서?",
      "그래서, 어디가 막혔는데.",
      "좋아, 내 이름은…",
    ],
    landingCuts: [
      "왔구나.",
      "안 풀린 게 아니야.",
      "한 군데가 막혀 있어.",
      "이름과 태어난 때를 대라.",
      "에두르지 않는다. 막힌 자리만 짚는다.",
    ],
    beatLine:
      "일주로 기질을 읽고, 오행에서 막힌 자리를 본다. 재물·직업·인연, 올해 세운까지.",
    bullets: [
      "일주로 읽는 타고난 기질",
      "오행의 치우침, 막힌 자리",
      "재물·직업·인연의 큰 줄기",
      "올해 세운과 10년 대운",
    ],
  },
  {
    slug: "today",
    character: CHARACTER,
    shortName: "오늘의 한 줄",
    name: "터줏 김선생 오늘의 한 줄",
    hook: "오늘은 한 줄이면 된다.",
    description:
      "일간과 오늘 일주로 읽는 짧은 운세. 할 일과 미룰 일만 짚는다.",
    price: 0,
    category: "free",
    poster: KIM_POSTER,
    funnel: KIM_FUNNEL,
    story: KIM_STORY,
    video: KIM_VIDEO,
    videoBg: KIM_BG,
    cta: "오늘 한 줄을 보라",
    introLines: [
      "오늘은 길게 안 본다.\n하루치만.",
      "이름부터 대라.",
    ],
    introReplies: [
      "그래, 오늘 것만 보자.",
      "좋아, 내 이름은…",
    ],
    landingCuts: [
      "왔구나.",
      "오늘은 길게 안 본다.",
      "하루치만 보면 된다.",
      "이름부터 대라.",
    ],
    beatLine: "오늘 일진과 네 일간만 본다. 할 일, 미룰 일, 한 줄.",
    bullets: [
      "오늘 일진과 네 일간의 만남",
      "하기 좋은 일, 미룰 일",
      "컨디션과 사람, 한 줄",
    ],
  },
  {
    slug: "jaemul",
    character: CHARACTER,
    shortName: "재물",
    name: "터줏 김선생 재물",
    hook: "돈은 성격이 있다.\n네 사주가 어떤 돈을 부르는지.",
    description:
      "편재·정재의 자리, 돈이 들어오는 해와 새는 습관. 재물만 모아 읽는다.",
    price: 19900,
    originalPrice: 39000,
    category: "saju",
    poster: KIM_POSTER,
    funnel: KIM_FUNNEL,
    story: KIM_STORY,
    video: KIM_VIDEO,
    videoBg: KIM_BG,
    cta: "내 재물부터 보자",
    introLines: [
      "돈 얘기는 서두르면 달아난다.\n앉어.",
      "운명을 펴기 전에,\n이름부터 대라.",
    ],
    introReplies: [
      "그래, 돈 얘기부터.",
      "좋아, 내 이름은…",
    ],
    landingCuts: [
      "왔구나.",
      "돈은 성격이 있다.",
      "네 사주가 어떤 돈을 부르는지.",
      "이름과 태어난 때를 대라.",
    ],
    beatLine: "재성의 강약, 모으는 형과 굴리는 형, 올해 돈이 새는 구멍.",
    bullets: [
      "사주에 새겨진 재성의 강약",
      "모으는 형과 굴리는 형",
      "올해 재물 세운, 새는 소비",
      "일과 사업으로 이어지는 돈",
    ],
  },
];

export const FLAGSHIP_SLUG = "makhin";

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productsBySlugs(slugs: string[]): Product[] {
  return slugs
    .map((s) => getProduct(s))
    .filter((p): p is Product => Boolean(p));
}

export function formatPrice(price: number): string {
  if (price <= 0) return "무료";
  return `${price.toLocaleString("ko-KR")}원`;
}

export function formatPriceNum(price: number): string {
  return price.toLocaleString("ko-KR");
}
