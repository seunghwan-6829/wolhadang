import type { Product } from "../data/products";
import type { ComputedSaju, Element, ElementCount, FullReading } from "./types";

export type StoryCut = {
  id: string;
  type: "cover" | "dialogue" | "splash" | "oheng" | "myeongshik";
  image?: string;
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
  unfold: "사주부터 펼친다. 안 풀린 게 아니야.",
  traitLead: "먼저, 네가 어떤 사람인지.",
  more: "조금 더 본다.",
  oheng: (m, f, b) => `${m}이 많고 ${f}이 비었다. ${b}`,
  teaserLead: "막힌 한 군데. 여기다.",
  lockLine: "뒷장은 값을 치러야 연다.",
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

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=다\.|요\.|지\.|네\.|군\.|어\.|가\.|까\?|야\.|세\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function sec(reading: FullReading, id: string) {
  return reading.sections.find((s) => s.id === id);
}

export function buildStoryCuts(
  reading: FullReading,
  product: Product,
  paid: boolean,
): StoryCut[] {
  const { saju } = reading;
  const name = saju.input.name;
  const v = voiceOf(product.character);
  const img = product.story || product.funnel;
  const day = dayPillar(saju);
  const unlocked = paid || product.price <= 0;
  const cuts: StoryCut[] = [];

  cuts.push({
    id: "cover",
    type: "cover",
    image: img,
    name,
    speaker: product.character,
    productTitle: `${product.character} · ${product.shortName}`,
    text: name,
    tall: true,
  });

  cuts.push({
    id: "wait",
    type: "dialogue",
    image: img,
    speaker: product.character,
    text: v.wait(name),
    tall: true,
  });

  cuts.push({
    id: "unfold",
    type: "dialogue",
    image: img,
    speaker: product.character,
    text: v.unfold,
    tall: true,
  });

  cuts.push({
    id: "splash",
    type: "splash",
    hanja: `${day.stemHanja}${day.branchHanja}`,
    hanjaKo: `${day.stemKo}${day.branchKo}`,
    element: saju.dayMasterElement,
    sub: `${STEM_KO[saju.dayMaster] ?? saju.dayMaster} · ${saju.dayMasterYinYang}${saju.dayMasterElement}`,
    text: DAY_LINE[saju.dayMaster] ?? DAY_LINE.갑,
    speaker: product.character,
    tall: true,
  });

  const personalityBits = splitSentences(reading.personality).slice(0, 2);
  const trait = sec(reading, "trait");
  const traitBits = (trait?.paragraphs ?? []).slice(0, 2);

  cuts.push({
    id: "p1",
    type: "dialogue",
    image: img,
    speaker: product.character,
    text: `${v.traitLead}\n\n${personalityBits[0] ?? traitBits[0] ?? ""}`,
    tall: true,
  });

  cuts.push({
    id: "p2",
    type: "dialogue",
    image: img,
    speaker: product.character,
    text: personalityBits[1] ?? traitBits[0] ?? v.more,
    tall: false,
  });

  cuts.push({
    id: "p3",
    type: "dialogue",
    image: img,
    speaker: product.character,
    text: traitBits[0] ?? v.more,
    tall: false,
  });

  const oh = ohengPick(saju.elementCount);
  cuts.push({
    id: "oheng",
    type: "oheng",
    speaker: product.character,
    text: v.oheng(oh.many, oh.few, oh.body),
    sub: `${saju.strength} · 일간 ${saju.dayMasterHanja}${saju.dayMaster}`,
    element: saju.dayMasterElement,
    tall: true,
  });

  // product-specific teasers (unlocked)
  if (product.slug === "today" && reading.today) {
    cuts.push({
      id: "today1",
      type: "dialogue",
      image: img,
      speaker: product.character,
      text: reading.today.title,
      sub: "오늘의 한 줄",
      tall: false,
    });
    for (const [i, p] of reading.today.paragraphs.slice(0, 2).entries()) {
      cuts.push({
        id: `today-${i}`,
        type: "dialogue",
        image: img,
        speaker: product.character,
        text: p,
        tall: false,
      });
    }
  } else {
    const love = sec(reading, "love");
    const loveText = love?.paragraphs[0];

    cuts.push({
      id: "t1",
      type: "dialogue",
      image: img,
      speaker: product.character,
      text:
        product.slug === "jaemul"
          ? `${v.teaserLead}\n\n돈은 성격이 있다. 네 사주가 부르는 돈의 결부터.`
          : `${v.teaserLead}\n\n${loveText ?? "인연은 구하면 달아나고, 빛나면 앉는다."}`,
      tall: false,
    });
    cuts.push({
      id: "t2",
      type: "dialogue",
      image: img,
      speaker: product.character,
      text:
        product.slug === "jaemul"
          ? "버는 달과 잠그는 달을 달력에 표시해 둬. 그게 첫 장이다."
          : (love?.paragraphs[1] ?? "조급히 자리를 채우지 마라. 숨이 편한 사람만 남겨."),
      tall: false,
    });
  }

  const lockedIds: { id: string; secId: string; fallback: string }[] = [
    { id: "wealth", secId: "wealth", fallback: "재물 얘기는 여기서부터." },
    { id: "career", secId: "career", fallback: "일이 풀리는 자리, 막히는 자리." },
    { id: "year", secId: "year", fallback: "올해 세운." },
    { id: "decade", secId: "decade", fallback: "앞으로 십 년의 고개." },
  ];

  if (product.slug !== "today") {
    for (const row of lockedIds) {
      const s = sec(reading, row.secId);
      const body =
        s && !s.locked
          ? s.paragraphs.filter((p) => !p.startsWith("잠긴")).slice(0, 2).join("\n\n")
          : row.fallback;
      cuts.push({
        id: row.id,
        type: "dialogue",
        image: img,
        speaker: product.character,
        text: unlocked ? body || row.fallback : `${v.lockLine}\n\n${body || row.fallback}`,
        sub: s?.title,
        lock: !unlocked,
        tall: true,
      });
    }
  }

  if (unlocked) {
    cuts.push({
      id: "myeongshik",
      type: "myeongshik",
      speaker: product.character,
      text: "명식이다. 가사가 아니라 악보다.",
      tall: false,
    });
  }

  return cuts;
}
