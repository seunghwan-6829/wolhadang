export type ProductTab = "saju" | "yeonae" | "free";

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
  needsLoveStatus?: boolean;
  needsPartner?: boolean;
  partnerSoon?: boolean;
  poster: string;
  funnel: string;
  cta: string;
  introLines: string[];
  /** object-position for landscape art cropped to 3:4 / 9:16 */
  objectPos?: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "jeongtong",
    character: "은월아씨",
    shortName: "정통사주",
    name: "은월아씨 정통사주",
    hook: "네 앞에 펼쳐진 길, 이미 사주에 적혀 있어.",
    description:
      "일간의 결부터 재물·직업·인연·10년 흐름까지. 은월아씨가 달빛 아래 천천히 읽어 줍니다.",
    price: 29900,
    originalPrice: 49000,
    category: "saju",
    poster: "/characters/eunwol-poster.png",
    funnel: "/characters/eunwol-funnel.png",
    cta: "내 사주팔자 바로 확인하기",
    objectPos: "center 22%",
    introLines: [
      "달 아래 앉아 있었어. 네가 올 줄 알았거든.",
      "이름만 알려줄래? 네 일주가, 벌써부터 궁금해.",
    ],
    bullets: [
      "일주로 읽는 타고난 기질",
      "오행의 치우침과 삶의 온도",
      "재물·직업·연애의 큰 줄기",
      "올해 세운과 10년 대운",
    ],
  },
  {
    slug: "yeonae",
    character: "단홍낭자",
    shortName: "연애비책",
    name: "단홍낭자 연애비책",
    hook: "곧 스칠 인연인지, 아직 안 온 계절인지.",
    description:
      "도화와 인연의 자리만 따로 꺼냅니다. 어떤 사람을 끌어당기는지, 올해 연애의 온도는 어떤지.",
    price: 19900,
    originalPrice: 29000,
    category: "yeonae",
    needsLoveStatus: true,
    poster: "/characters/danhong-poster.png",
    funnel: "/characters/danhong-funnel.png",
    cta: "내 연애운 지금 열어보기",
    objectPos: "center 18%",
    introLines: [
      "어머, 여기까지 왔으면 이미 마음 정한 거지?",
      "그 사람 얘기든 네 연애든. 솔직하게만 말해 봐.",
    ],
    bullets: [
      "이성을 끌어당기는 사주의 매력",
      "올해 연애운의 고점과 쉬어갈 달",
      "만나기 쉬운 상대의 기질",
      "솔로 / 연애중, 지금 자리에 맞춘 한 줄",
    ],
  },
  {
    slug: "gunghap",
    character: "단홍낭자",
    shortName: "사주궁합",
    name: "단홍낭자 사주궁합",
    hook: "두 사주가 마주 앉으면, 말이 되기 시작해.",
    description:
      "나와 그 사람의 일간·오행이 서로를 살리는지, 부딪히는지. 연애·결혼 전 한 번쯤 비춰 볼 궁합.",
    price: 19900,
    category: "yeonae",
    needsPartner: true,
    poster: "/characters/danhong-poster.png",
    funnel: "/characters/danhong-funnel.png",
    cta: "우리 궁합 바로 확인하기",
    objectPos: "center 18%",
    introLines: [
      "둘이 온 거야? 아니면 그 사람 몰래 온 거야. 둘 다 괜찮아.",
      "네 사주, 그 사람 사주. 둘 다 들려줄래?",
    ],
    bullets: [
      "두 사람 일간의 호흡",
      "오행 상생·상극으로 보는 거리",
      "갈등 포인트와 다독일 줄 아는 자리",
      "같이일 때 커지는 운, 혼자일 때 편한 운",
    ],
  },
  {
    slug: "marriage",
    character: "설아씨",
    shortName: "결혼사주",
    name: "설아씨 결혼사주",
    hook: "같이 늙을 사람, 사주에도 온기가 있어.",
    description:
      "결혼의 시기와 인연의 결. 설아씨가 따뜻하게, 그러나 에두르지 않고 읽어 줍니다.",
    price: 29900,
    originalPrice: 45000,
    category: "saju",
    poster: "/characters/seola-poster.png",
    funnel: "/characters/seola-funnel.png",
    cta: "내 결혼사주 펼쳐보기",
    objectPos: "center 20%",
    introLines: [
      "잘 왔어. 결혼은 겁나는 일이 아니라, 같이 밥 먹을 사람을 고르는 일이야.",
      "네 사주 속 인연, 내가 천천히 펼쳐줄게. 이름부터?",
    ],
    bullets: [
      "사주에 새겨진 인연의 자리",
      "서두르면 어긋나는 계절, 기다리면 열리는 계절",
      "같이 오래갈 상대의 기질",
      "결혼 후 흐르는 재물·가정운",
    ],
  },
  {
    slug: "shinjeom",
    character: "묵운도령",
    shortName: "신점사주",
    name: "묵운도령 신점사주",
    hook: "글자 뒤에 앉은 기운까지, 짧게 본다.",
    description:
      "명식 위의 신살과 공망, 말로 잘 안 나오는 자리. 묵운도령이 낮고 차갑게 짚습니다.",
    price: 29900,
    originalPrice: 45000,
    category: "saju",
    poster: "/characters/mukun-poster.png",
    funnel: "/characters/mukun-funnel.png",
    cta: "신점으로 내 사주 보기",
    objectPos: "center 16%",
    introLines: [
      "말은 짧게 할게. 네 사주는 이미 와 있어.",
      "이름과 태어난 날만. 나머지는 내가 본다.",
    ],
    bullets: [
      "신살·공망이 가리키는 자리",
      "일간의 빛과 그늘",
      "올해, 피하면 좋은 고개",
      "귀인이 들어오는 방향",
    ],
  },
  {
    slug: "jaemul",
    character: "월하선생",
    shortName: "재물보감",
    name: "월하선생 재물보감",
    hook: "돈은 성격이 있지. 네 사주가 어떤 돈을 부르는지.",
    description:
      "편재·정재의 자리, 돈이 들어오는 해와 새는 습관. 재물운만 모아 읽는 보감.",
    price: 19900,
    originalPrice: 39000,
    category: "saju",
    poster: "/characters/jaemul-poster.png",
    funnel: "/characters/jaemul-poster.png",
    cta: "내 재물운 바로 확인하기",
    objectPos: "center 28%",
    introLines: [
      "앉게. 돈 얘기는 서두르면 오히려 달아나네.",
      "이름과 생년월일만 적게. 나머지는 보감이 말할 테니.",
    ],
    bullets: [
      "사주에 새겨진 재성의 강약",
      "모으는 형 vs 굴리는 형",
      "올해 재물 세운과 주의할 소비",
      "직업·사업으로 이어지는 돈의 흐름",
    ],
  },
  {
    slug: "today",
    character: "은월아씨",
    shortName: "오늘의 운세",
    name: "은월아씨 오늘의 운세",
    hook: "오늘 하루, 달빛이 어디에 머무는지.",
    description:
      "일간과 오늘의 일주로 읽는 짧은 운세. 마음 둘 곳과 피하면 좋은 일만 골라 드립니다.",
    price: 0,
    category: "free",
    poster: "/characters/eunwol-poster.png",
    funnel: "/characters/eunwol-funnel.png",
    cta: "오늘 운세 무료로 보기",
    objectPos: "center 22%",
    introLines: [
      "오늘은 길게 안 읽을게. 하루치만, 정확하게.",
      "이름과 생일만 주면, 오늘 일진이 네게 뭐라고 하는지 알려줄게.",
    ],
    bullets: [
      "오늘 일진과 내 일간의 만남",
      "하기 좋은 일 / 미룰 일 한 줄",
      "컨디션·인간관계 짧은 조언",
    ],
  },
  {
    slug: "rank",
    character: "은월아씨",
    shortName: "내 사주 상위 몇%",
    name: "내 사주 상위 몇%",
    hook: "흔한 사주는 없어. 다만, 드문 조합은 있지.",
    description:
      "일간·월지·신살 조합으로 보는 희소 지수. 재미로 읽는 무료 진단.",
    price: 0,
    category: "free",
    poster: "/characters/eunwol-poster.png",
    funnel: "/characters/eunwol-funnel.png",
    cta: "내 사주 상위 몇%인지 보기",
    objectPos: "center 22%",
    introLines: [
      "네 사주가 얼마나 드문지, 장난처럼 거울을 들어볼게.",
      "길흉의 점수는 아니야. 그래도… 궁금하지?",
    ],
    bullets: [
      "명식 조합의 희소 지수",
      "일간이 갖는 자리의 특징",
      "신살이 더하는 개성 한 줄",
    ],
  },
];

export const HERO_SLUGS = [
  "jeongtong",
  "yeonae",
  "marriage",
  "shinjeom",
  "jaemul",
] as const;

export const HOME_SECTIONS: {
  id: string;
  title: string;
  slugs: string[];
  tab?: ProductTab;
}[] = [
  {
    id: "hook",
    title: "✨ 잠깐, 나 지금 소름 돋았어",
    slugs: ["jeongtong", "shinjeom", "marriage"],
    tab: "saju",
  },
  {
    id: "love",
    title: "💌 썸도 연애도, 일단 앉아 봐요",
    slugs: ["yeonae", "gunghap"],
    tab: "yeonae",
  },
  {
    id: "hot",
    title: "🔥 방금 올라온 풀이예요",
    slugs: ["shinjeom", "marriage", "jaemul"],
    tab: "saju",
  },
  {
    id: "money",
    title: "💰 돈이 붙는 사주, 새는 사주",
    slugs: ["jaemul", "jeongtong"],
    tab: "saju",
  },
  {
    id: "free",
    title: "😮 진짜 공짜로 본다고요?",
    slugs: ["today", "rank"],
    tab: "free",
  },
];

export const TABS: { id: "all" | ProductTab; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "saju", label: "사주" },
  { id: "yeonae", label: "연애" },
  { id: "free", label: "무료" },
];

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
