import type { Product } from "../data/products";
import { CUT_STILL } from "../media";
import { iGa } from "./josa";
import type { ComputedSaju, Element, ElementCount, FullReading } from "./types";

export type StoryCut = {
  id: string;
  type: "cover" | "dialogue" | "splash" | "oheng" | "myeongshik";
  image?: string;
  video?: string;
  speaker?: string;
  text: string;
  sub?: string;
  hanja?: string;
  hanjaKo?: string;
  element?: Element;
  lock?: boolean;
  name?: string;
  productTitle?: string;
  tall?: boolean;
  objectPosition?: string;
};

const DAY_LINE: Record<string, string> = {
  갑: "너는 굽히지 않는 나무다. 막힌 곳은 뿌리다. 방향이 틀리면 하늘이 닫힌다.",
  을: "너는 덩굴이다. 부러지지 않고 감아 올라간다. 의지할 곳이 없으면 엉킨다.",
  병: "너는 한낮의 해다. 숨기면 기회도 같이 숨는다.",
  정: "너는 촛불이다. 크지 않아도 가까운 곳은 정확히 비춘다.",
  무: "너는 산이다. 쉽게 안 움직이고, 한 번 앉으면 버틴다.",
  기: "너는 밭의 흙이다. 사람을 기르고 일을 익힌다. 남의 농사까지 짓지 마라.",
  경: "너는 칼의 등이다. 선이 분명하고, 애매한 말을 오래 못 견딘다.",
  신: "너는 바늘이자 보석이다. 작아 보여도 빛이 있고, 티를 못 참는다.",
  임: "너는 큰 강이다. 막히면 돌아가고, 돌아가면 더 넓어진다.",
  계: "너는 이슬이다. 스며들어 사람을 적신다. 말로 하기 전에 이미 안다.",
};

/** 기질 한 줄 — splash DAY_LINE과 겹치지 않음 */
const TRAIT_LINE: Record<string, string> = {
  갑: "시작을 여는 기질이다. 남이 망설일 때 이미 한 발을 뗀다.",
  을: "유연함이 생존이다. 각을 세우기보다 리듬을 바꾼다.",
  병: "존재감이 곧 운이다. 숨으면 자리도 같이 숨는다.",
  정: "한 자리를 깊게 비추는 기질이다. 넓히기보다 선명하게.",
  무: "말이 적어도 자리에 있으면 중심이 잡힌다.",
  기: "조력과 실무에서 빛이 난다. 사람을 모으는 쪽이 네 결이다.",
  경: "결단이 빠르다. 선 긋는 쪽이 속 편하다.",
  신: "완성도를 목숨처럼 여긴다. 디테일이 곧 명성이다.",
  임: "판을 읽고 흐름을 탄다. 움직이는 일이 숨 쉽다.",
  계: "분위기와 밑그림을 먼저 본다. 창작·상담에 결이 맞다.",
};

/** 막힌 버릇 — splash / 기질과 다른 정보 */
const HABIT_LINE: Record<string, string> = {
  갑: "자존과 명분을 동시에 챙기다 지친다. 이어질 일을 골라라.",
  을: "거절을 미루다 스스로 엉킨다. 부드러운 거절을 미리 정해 둬라.",
  병: "열정이 과하면 주변이 먼저 탄다. 쉬는 것도 일이다.",
  정: "예민함이 재능이다. 무딘 자리에 오래 있으면 불이 꺼진다.",
  무: "고집이 산이 되기 쉽다. 작은 실험 창구를 하나 열어 둬라.",
  기: "남의 감정까지 떠안는 버릇이 있다. 거절도 네 일이다.",
  경: "날 선 말이 관계를 벤다. 칼은 칼집에 두는 시간도 필요하다.",
  신: "스스로를 너무 깎는다. 보석도 과하면 가루가 된다.",
  임: "한 사람에게는 전부, 그 외에는 흘려라. 중간이 없다.",
  계: "생각이 밤을 넘긴다. 아침에 한 가지씩만 결정해라.",
};

const STEM_KO: Record<string, string> = {
  갑: "갑목",
  을: "을목",
  병: "병화",
  정: "정화",
  무: "무토",
  기: "기토",
  경: "경금",
  신: "신금",
  임: "임수",
  계: "계수",
};

type Voice = {
  wait: (name: string) => string;
  unfold: string;
  traitLead: string;
  more: string;
  oheng: (many: string, few: string, body: string) => string;
  teaserLead: string;
  lockLine: string;
};

const KIM: Voice = {
  wait: (n) => `${n}. 왔구나.`,
  unfold: "사주를 펴 본다. 뼈부터.",
  traitLead: "먼저, 네가 어떤 사람인지.",
  more: "조금 더 본다.",
  oheng: (m, f, b) => `${iGa(m)} 많고 ${iGa(f)} 비었다. ${b}`,
  teaserLead: "막힌 한 군데. 여기다.",
  lockLine: "더 보려면 복채가 필요하다.",
};

function voiceOf(_character: string): Voice {
  return KIM;
}

const OHENG_BODY: Record<Element, { many: string; few: string }> = {
  목: {
    many: "뻗고 싶어 해. 시작은 빠른데 마무리가 숙제야.",
    few: "뿌리가 귀해. 한 곳에 앉아 주는 사람이 너를 살린다.",
  },
  화: {
    many: "존재감이 먼저 나가. 숨으면 답답해서 일이 안 풀려.",
    few: "온기가 귀해. 사람을 데우는 일이 네 숙제야.",
  },
  토: {
    many: "버티는 힘이 커. 대신 변화가 오면 속이 먼저 무거워져.",
    few: "중심이 흔들리기 쉬워. 루틴이 곧 너의 땅이야.",
  },
  금: {
    many: "선이 분명하고 기준이 높아. 무딘 말에 오래 아파해.",
    few: "칼이 무뎌. 거절과 마무리를 연습해야 돈이든 사람이든 남아.",
  },
  수: {
    many: "흐르고 싶어 해. 묶이면 넘치고, 너무 헐거우면 말라 붙어.",
    few: "지혜의 물이 얕아. 배우거나 상담하는 시간이 보약이야.",
  },
};

function ohengPick(count: ElementCount): { many: Element; few: Element; body: string } {
  const entries = (Object.entries(count) as [Element, number][]).sort(
    (a, b) => b[1] - a[1],
  );
  const many = entries[0][0];
  const few = entries[entries.length - 1][0];
  const body =
    entries[0][1] >= 3
      ? OHENG_BODY[many].many
      : entries[entries.length - 1][1] === 0
        ? OHENG_BODY[few].few
        : OHENG_BODY[many].many;
  return { many, few, body };
}

function dayPillar(saju: ComputedSaju) {
  return saju.pillars.find((p) => p.key === "day")!;
}

function sec(reading: FullReading, id: string) {
  return reading.sections.find((s) => s.id === id);
}

function compact(text: string): string {
  return text.replace(/[ \t]+/g, " ").replace(/\n{2,}/g, "\n").trim();
}

function yearLine(saju: ComputedSaju): string {
  const y = saju.yearLuck;
  const clean = String(y.keyword).replace(/^\d{4}\s*[·.\-]\s*/, "").trim() || "흐름";
  return `올해는 ${clean} 기운이다. ${y.ganjiKo}가 네 일간을 건드린다.`;
}

export function buildStoryCuts(
  reading: FullReading,
  product: Product,
  paid: boolean,
): StoryCut[] {
  const { saju } = reading;
  const name = saju.input.name;
  const v = voiceOf(product.character);
  const day = dayPillar(saju);
  const dm = saju.dayMaster;
  const unlocked = paid || product.price <= 0;
  const cuts: StoryCut[] = [];
  const seen = new Set<string>();

  const push = (cut: StoryCut) => {
    const text = compact(cut.text ?? "");
    if (!text) return;
    const key = text.replace(/\s+/g, " ");
    if (seen.has(key)) return;
    seen.add(key);
    cuts.push({ ...cut, text });
  };

  push({
    id: "cover",
    type: "cover",
    image: CUT_STILL.cover,
    name,
    speaker: product.character,
    productTitle: `${product.character} · ${product.shortName}`,
    text: name,
    tall: true,
  });

  push({
    id: "wait",
    type: "dialogue",
    image: CUT_STILL.wait,
    speaker: product.character,
    text: v.wait(name),
    tall: true,
  });

  push({
    id: "unfold",
    type: "dialogue",
    image: CUT_STILL.unfold,
    speaker: product.character,
    text: v.unfold,
    tall: true,
  });

  push({
    id: "splash",
    type: "splash",
    image: CUT_STILL.splash,
    hanja: `${day.stemHanja}${day.branchHanja}`,
    hanjaKo: `${day.stemKo}${day.branchKo}`,
    element: saju.dayMasterElement,
    sub: `${STEM_KO[dm] ?? dm} · ${saju.dayMasterYinYang}${saju.dayMasterElement}`,
    text: DAY_LINE[dm] ?? DAY_LINE.갑,
    speaker: product.character,
    tall: true,
  });

  const traitLine = TRAIT_LINE[dm] ?? "기질부터 본다. 뼈가 먼저다.";
  const habitLine = HABIT_LINE[dm] ?? "막힌 버릇이 목을 만든다.";
  const yLine = yearLine(saju);

  push({
    id: "p1",
    type: "dialogue",
    image: CUT_STILL.p1,
    speaker: product.character,
    text: `${v.traitLead}\n${traitLine}`,
    tall: true,
  });

  push({
    id: "p2",
    type: "dialogue",
    image: CUT_STILL.p2,
    speaker: product.character,
    text: habitLine,
    tall: false,
  });

  push({
    id: "p3",
    type: "dialogue",
    image: CUT_STILL.p3,
    speaker: product.character,
    text: yLine,
    tall: false,
  });

  const oh = ohengPick(saju.elementCount);
  push({
    id: "oheng",
    type: "oheng",
    image: CUT_STILL.oheng,
    speaker: product.character,
    text: v.oheng(oh.many, oh.few, oh.body),
    sub: `${saju.strength} · 일간 ${saju.dayMasterHanja}${saju.dayMaster}`,
    element: saju.dayMasterElement,
    objectPosition: "top",
    tall: true,
  });

  const asked = saju.input.question?.trim();
  if (asked) {
    push({
      id: "asked",
      type: "dialogue",
      image: CUT_STILL.asked,
      speaker: product.character,
      text: `${iGa(name)} 물은 것.\n「${asked}」\n그 질문은 사주 안에 답이 있다. 뼈대부터 보고, 그 자리를 짚는다.`,
      tall: false,
    });
  }

  if (product.slug === "today" && reading.today) {
    push({
      id: "today1",
      type: "dialogue",
      image: CUT_STILL.today,
      speaker: product.character,
      text: reading.today.title,
      sub: "오늘의 한 줄",
      tall: false,
    });
    for (const [i, p] of reading.today.paragraphs.slice(0, 2).entries()) {
      push({
        id: `today-${i}`,
        type: "dialogue",
        image: CUT_STILL.today,
        speaker: product.character,
        text: p,
        tall: false,
      });
    }
  } else {
    const fewName = iGa(oh.few);
    push({
      id: "t1",
      type: "dialogue",
      image: CUT_STILL.teaser,
      speaker: product.character,
      text:
        product.slug === "jaemul"
          ? `${fewName} 비었다. 돈의 목도 거기다.`
          : `${fewName} 비었다. 네 목은 거기다.`,
      tall: false,
    });
    push({
      id: "t2",
      type: "dialogue",
      image: CUT_STILL.teaser2,
      speaker: product.character,
      text:
        product.slug === "jaemul"
          ? "버는 달과 잠그는 달을 달력에 표시해 둬. 그게 첫 장이다."
          : "그 자리를 풀면 나머지 줄기가 움직인다. 에두르지 않는다.",
      tall: false,
    });
  }

  const lockedIds: { id: string; secId: string; fallback: string }[] = [
    { id: "wealth", secId: "wealth", fallback: "재물 얘기는 여기서부터." },
    { id: "career", secId: "career", fallback: "일이 풀리는 자리, 막히는 자리." },
    { id: "year", secId: "year", fallback: "올해 세운." },
    { id: "decade", secId: "decade", fallback: "앞으로 십 년의 고개." },
  ];

  if (!unlocked && product.price > 0) {
    push({
      id: "paywall",
      type: "dialogue",
      image: CUT_STILL.paywall,
      speaker: product.character,
      text: "여기까지가 앞장이다.\n더 보려면 복채가 필요하다.",
      tall: true,
    });
  }

  if (unlocked && product.slug !== "today") {
    for (const row of lockedIds) {
      const s = sec(reading, row.secId);
      const body =
        s && !s.locked
          ? s.paragraphs.filter((p) => !p.startsWith("잠긴")).slice(0, 2).join("\n")
          : row.fallback;
      push({
        id: row.id,
        type: "dialogue",
        image: CUT_STILL.locked,
        speaker: product.character,
        text: body || row.fallback,
        sub: s?.title,
        tall: true,
      });
    }
  }

  if (unlocked) {
    push({
      id: "myeongshik",
      type: "myeongshik",
      image: CUT_STILL.myeongshik,
      speaker: product.character,
      text: "명식이다. 가사가 아니라 악보다.",
      tall: false,
    });
  }

  return cuts;
}
