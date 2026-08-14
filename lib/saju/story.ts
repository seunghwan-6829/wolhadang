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
  갑: "너는 굽히지 않는 나무야. 바람이 아파도, 하늘은 네 쪽으로 열려 있어.",
  을: "너는 덩굴이야. 부러지지 않고, 감아 올라가는 사람.",
  병: "너는 한낮의 해야. 숨기면 기회도 같이 숨어.",
  정: "너는 촛불이야. 크지 않아도, 가까운 곳은 정확히 비추지.",
  무: "너는 산이야. 쉽게 안 움직이고, 한 번 앉으면 버텨.",
  기: "너는 밭의 흙이야. 사람을 기르고, 일을 익히는 손.",
  경: "너는 칼의 등이야. 선이 분명하고, 애매한 말을 오래 못 견뎌.",
  신: "너는 바늘이자 보석이야. 작아 보여도 빛이 있고, 티를 못 참지.",
  임: "너는 큰 강이야. 막히면 돌아가고, 돌아가면 더 넓어져.",
  계: "너는 이슬이야. 스며들어 사람을 적시고, 말로 하기 전에 이미 알지.",
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

const VOICES: Record<string, Voice> = {
  은월아씨: {
    wait: (n) => `기다리고 있었어, ${n}.`,
    unfold: "네 사주부터 펼쳐볼게.",
    traitLead: "먼저, 네가 어떤 사람인지부터.",
    more: "조금 더 가까이 읽어볼게.",
    oheng: (m, f, b) => `${m}이 많고 ${f}이 거의 없어. 그래서 너는… ${b}`,
    teaserLead: "인연 얘기도 빼놓을 수 없지.",
    lockLine: "여기부터는, 전체 스토리에서 이어질게.",
  },
  단홍낭자: {
    wait: (n) => `어머 ${n}, 여기까지 온 거야? 기다렸지.`,
    unfold: "자, 네 사주부터 살짝 열어볼게. 긴장하지 마.",
    traitLead: "네가 연애에서 어떤 사람인지, 사주가 먼저 말해.",
    more: "이건 조금 깊은 얘기야. 그래도 들을래?",
    oheng: (m, f, b) => `${m}은 넘치고 ${f}은 비어 있어. 연애로 치면… ${b}`,
    teaserLead: "자, 이제 그 사람 얘기.",
    lockLine: "달콤한 건 여기부터. 전체 스토리에서 열어줄게.",
  },
  설아씨: {
    wait: (n) => `잘 왔어, ${n}. 네 인연이 궁금했어.`,
    unfold: "자, 네 사주부터 따뜻하게 펼쳐볼게.",
    traitLead: "결혼 전에, 너라는 사람을 먼저 알아야 해.",
    more: "이 부분은 조금 솔직하게 말할게.",
    oheng: (m, f, b) => `${m}이 많고 ${f}이 얇아. 같이 살 때는… ${b}`,
    teaserLead: "그럼, 같이 늙을 자리에 대해.",
    lockLine: "평생 얘기는 전체 스토리에서 이어갈게.",
  },
  묵운도령: {
    wait: (n) => `왔군, ${n}.`,
    unfold: "말은 줄일게. 네 사주부터 본다.",
    traitLead: "기질부터. 꾸미지 않고.",
    more: "그늘도 같이 본다.",
    oheng: (m, f, b) => `${m} 과다, ${f} 결여. ${b}`,
    teaserLead: "신살이 가리키는 자리.",
    lockLine: "나머지는 값을 치른 뒤에. 장난이 아니라서.",
  },
  월하선생: {
    wait: (n) => `${n}, 앉게. 서두를 것 없네.`,
    unfold: "네 사주부터 차분히 펼쳐보세.",
    traitLead: "돈 전에, 사람부터. 재물은 성격을 따라가거든.",
    more: "이 대목은 조금 더 깊게.",
    oheng: (m, f, b) => `${m}이 두텁고 ${f}이 비었네. ${b}`,
    teaserLead: "이제 금고를 열어 보지.",
    lockLine: "보감의 뒷장은 전체 스토리에서.",
  },
};

function voiceOf(character: string): Voice {
  return VOICES[character] ?? VOICES.은월아씨;
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
  const img = product.funnel;
  const day = dayPillar(saju);
  const unlocked = paid || product.price <= 0;
  const cuts: StoryCut[] = [];

  cuts.push({
    id: "cover",
    type: "cover",
    image: img,
    name,
    speaker: product.character,
    productTitle: `${product.character}가 읽어주는 ${product.shortName}`,
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
  } else if (product.slug === "rank" && reading.rank) {
    cuts.push({
      id: "rank",
      type: "splash",
      hanja: `${reading.rank.percentile}`,
      hanjaKo: `상위 ${reading.rank.percentile}%`,
      element: saju.dayMasterElement,
      text: reading.rank.paragraphs[0] ?? "",
      speaker: product.character,
      sub: reading.rank.title,
      tall: true,
    });
    cuts.push({
      id: "rank2",
      type: "dialogue",
      image: img,
      speaker: product.character,
      text: reading.rank.paragraphs[1] ?? "희소한 게 행복한 건 아니야. 쓰임이 운이지.",
      tall: false,
    });
  } else if (product.slug === "gunghap" && reading.gunghap) {
    cuts.push({
      id: "g1",
      type: "dialogue",
      image: img,
      speaker: product.character,
      text: `${v.teaserLead}\n\n${name}과 ${reading.gunghap.partnerName}. 두 사주가 마주 앉았어.`,
      tall: false,
    });
    cuts.push({
      id: "g2",
      type: "dialogue",
      image: img,
      speaker: product.character,
      text: reading.gunghap.paragraphs[0] ?? "",
      sub: unlocked ? `${reading.gunghap.score}점` : undefined,
      tall: false,
    });
  } else {
    const love = sec(reading, "love");
    const loveText = love?.paragraphs[0];
    const shinsal =
      saju.shinsal.length > 0
        ? `${saju.shinsal[0].name}이 앉아 있어. ${saju.shinsal[0].summary}`
        : "신살이 요란하진 않아. 매력은 일간의 결에서 나와.";

    cuts.push({
      id: "t1",
      type: "dialogue",
      image: img,
      speaker: product.character,
      text:
        product.slug === "shinjeom"
          ? `${v.teaserLead}\n\n${shinsal}`
          : product.slug === "jaemul"
            ? `${v.teaserLead}\n\n재성은 성격이 있지. 네 사주가 부르는 돈의 결부터.`
            : `${v.teaserLead}\n\n${loveText ?? "인연은 구하면 달아나고, 빛나면 앉아."}`,
      tall: false,
    });
    cuts.push({
      id: "t2",
      type: "dialogue",
      image: img,
      speaker: product.character,
      text:
        product.slug === "shinjeom"
          ? traitBits[1] ?? "그늘을 아는 사람이, 빛을 더 오래 쓰지."
          : product.slug === "jaemul"
            ? "버는 달과 잠그는 달을 달력에 표시해 두게. 그게 보감의 첫 장이야."
            : (love?.paragraphs[1] ?? "조급히 자리를 채우지 마. 숨이 편한 사람만 남기면 돼."),
      tall: false,
    });
  }

  const lockedIds: { id: string; secId: string; fallback: string }[] = [
    { id: "wealth", secId: "wealth", fallback: "재물 얘기는 여기서부터." },
    { id: "career", secId: "career", fallback: "일이 풀리는 자리, 막히는 자리." },
    { id: "year", secId: "year", fallback: "올해 세운." },
    { id: "decade", secId: "decade", fallback: "앞으로 십 년의 고개." },
  ];

  if (product.slug !== "today" && product.slug !== "rank") {
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
      text: "참고로, 네 명식이야. 스토리의 가사가 아니라 악보 같은 것.",
      tall: false,
    });
  }

  return cuts;
}
