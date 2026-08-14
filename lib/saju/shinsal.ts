import type { ShinsalHit } from "./types";

const PEACH: Record<string, string> = {
  인: "묘",
  오: "묘",
  술: "묘",
  신: "유",
  자: "유",
  진: "유",
  해: "자",
  묘: "자",
  미: "자",
  사: "오",
  유: "오",
  축: "오",
};

const YEKMA: Record<string, string> = {
  인: "신",
  오: "신",
  술: "신",
  신: "인",
  자: "인",
  진: "인",
  해: "사",
  묘: "사",
  미: "사",
  사: "해",
  유: "해",
  축: "해",
};

const HWAGAE: Record<string, string> = {
  인: "술",
  오: "술",
  술: "술",
  신: "진",
  자: "진",
  진: "진",
  해: "미",
  묘: "미",
  미: "미",
  사: "축",
  유: "축",
  축: "축",
};

function hasBranch(branches: string[], target: string): boolean {
  return branches.includes(target);
}

/**
 * 일지·연지 기준 신살. 학파마다 기준이 갈리므로 일지 우선, 연지 보조.
 */
export function detectShinsal(branches: {
  year: string;
  month: string;
  day: string;
  hour?: string | null;
}): ShinsalHit[] {
  const all = [branches.year, branches.month, branches.day, branches.hour]
    .filter((b): b is string => Boolean(b));
  const hits: ShinsalHit[] = [];

  const peach = PEACH[branches.day] ?? PEACH[branches.year];
  if (peach && hasBranch(all, peach)) {
    hits.push({
      name: "도화살",
      hanja: "桃花",
      summary:
        "사람 사이에서 잘 띄고, 마음이 먼저 가는 자리입니다. 매력이 선물인 동시에 오해가 되기 쉽습니다.",
    });
  }

  const yekma = YEKMA[branches.day] ?? YEKMA[branches.year];
  if (yekma && hasBranch(all, yekma)) {
    hits.push({
      name: "역마살",
      hanja: "驛馬",
      summary:
        "발이 바쁩니다. 자리보다 길이 편하고, 한곳에 묶이면 기운이 답답해집니다. 이동·전환이 약이 됩니다.",
    });
  }

  const hwagae = HWAGAE[branches.day] ?? HWAGAE[branches.year];
  if (hwagae && hasBranch(all, hwagae)) {
    hits.push({
      name: "화개살",
      hanja: "華蓋",
      summary:
        "혼자 있는 시간이 내공을 만듭니다. 예술·공부·신앙처럼 ‘깊이’가 있는 일에 마음이 갑니다.",
    });
  }

  return hits;
}
