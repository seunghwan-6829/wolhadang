import {
  calculateFourPillars,
  getTenGod,
  HEAVENLY_STEMS_HANJA,
  EARTHLY_BRANCHES_HANJA,
  lunarToSolar,
  solarToLunar,
} from "manseryeok";
import type { BirthInput, ComputedSaju, Element, ElementCount, PillarView } from "./types";
import { BRANCH_HANJA, STEM_HANJA } from "./constants";
import { detectShinsal } from "./shinsal";

const PILLAR_LABEL: Record<PillarView["key"], string> = {
  year: "연주",
  month: "월주",
  day: "일주",
  hour: "시주",
};

function hanjaStem(ko: string): string {
  return STEM_HANJA[ko] ?? ko;
}
function hanjaBranch(ko: string): string {
  return BRANCH_HANJA[ko] ?? ko;
}

function emptyCount(): ElementCount {
  return { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 };
}

function strengthOf(dayEl: Element, count: ElementCount, totalChars: number): ComputedSaju["strength"] {
  const mine = count[dayEl];
  const ratio = mine / Math.max(totalChars, 1);
  if (ratio >= 0.38) return "신강";
  if (ratio <= 0.16) return "신약";
  return "중화";
}

function seunYear(now = new Date()): number {
  return now.getFullYear();
}

export function toSolarDate(input: BirthInput): { year: number; month: number; day: number } {
  if (input.calendar === "lunar") {
    const s = lunarToSolar(input.year, input.month, input.day, input.isLeapMonth);
    return { year: s.year, month: s.month, day: s.day };
  }
  return { year: input.year, month: input.month, day: input.day };
}

function pillarView(
  key: PillarView["key"],
  stem: string,
  branch: string,
  stemTenGod: string,
  branchTenGod: string,
  stemEl: Element,
  branchEl: Element,
  omitted?: boolean,
): PillarView {
  return {
    key,
    label: PILLAR_LABEL[key],
    stemKo: stem,
    branchKo: branch,
    stemHanja: hanjaStem(stem),
    branchHanja: hanjaBranch(branch),
    ganjiKo: `${stem}${branch}`,
    ganjiHanja: `${hanjaStem(stem)}${hanjaBranch(branch)}`,
    stemElement: stemEl,
    branchElement: branchEl,
    stemTenGod,
    branchTenGod,
    omitted,
  };
}

export function computeSaju(input: BirthInput, now = new Date()): ComputedSaju {
  const hour = input.hourUnknown ? 12 : input.hour;
  const minute = input.hourUnknown ? 0 : input.minute;

  const raw = calculateFourPillars({
    year: input.year,
    month: input.month,
    day: input.day,
    hour,
    minute,
    isLunar: input.calendar === "lunar",
    isLeapMonth: input.calendar === "lunar" && input.isLeapMonth,
    gender: input.gender,
  });

  const solar = toSolarDate(input);

  const keys = ["year", "month", "day", "hour"] as const;
  const pillars: PillarView[] = keys.map((key) => {
    const p = raw[key];
    const el = raw[`${key}Element`];
    const tg = raw.tenGods[key];
    const omitted = key === "hour" && input.hourUnknown;
    return pillarView(
      key,
      p.heavenlyStem,
      p.earthlyBranch,
      key === "day" ? "일간" : tg.stem,
      tg.branch,
      el.stem as Element,
      el.branch as Element,
      omitted,
    );
  });

  const count = emptyCount();
  for (const p of pillars) {
    if (p.omitted) continue;
    count[p.stemElement] += 1;
    count[p.branchElement] += 1;
  }
  const totalChars = pillars.reduce((a, p) => a + (p.omitted ? 0 : 2), 0);
  const dayMasterElement = raw.dayElement.stem as Element;

  const shinsal = detectShinsal({
    year: raw.year.earthlyBranch,
    month: raw.month.earthlyBranch,
    day: raw.day.earthlyBranch,
    hour: input.hourUnknown ? null : raw.hour.earthlyBranch,
  });

  const y = seunYear(now);
  const seun = calculateFourPillars({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    hour: 12,
    minute: 0,
  });
  const seunStemGod = getTenGod(raw.day.heavenlyStem, seun.year.heavenlyStem);

  const luck = raw.luckPillars
    ? {
        forward: raw.luckPillars.forward,
        startAge: raw.luckPillars.startAge,
        pillars: raw.luckPillars.pillars.slice(0, 8).map((lp) => ({
          age: lp.age,
          ganjiKo: lp.korean,
          ganjiHanja: `${hanjaStem(lp.pillar.heavenlyStem)}${hanjaBranch(lp.pillar.earthlyBranch)}`,
        })),
      }
    : undefined;

  let lunarNote = "";
  try {
    const L = solarToLunar(solar.year, solar.month, solar.day);
    lunarNote = `${L.year}.${L.month}.${L.day}${L.isLeapMonth ? " 윤" : ""}`;
  } catch {
    lunarNote = "";
  }
  void lunarNote;

  return {
    input,
    solar,
    pillars,
    dayMaster: raw.day.heavenlyStem,
    dayMasterHanja: hanjaStem(raw.day.heavenlyStem),
    dayMasterElement,
    dayMasterYinYang: raw.dayYinYang.stem,
    hourUnknown: input.hourUnknown,
    tenGodSummary: `${raw.tenGods.year.stem} · ${raw.tenGods.month.stem} · 일간 · ${
      input.hourUnknown ? "시주 생략" : raw.tenGods.hour.stem
    }`,
    voidBranches: [...raw.voidBranches],
    shinsal,
    elementCount: count,
    strength: strengthOf(dayMasterElement, count, totalChars),
    yearLuck: {
      year: y,
      ganjiKo: seun.yearString.replace("연주", "") || `${seun.year.heavenlyStem}${seun.year.earthlyBranch}`,
      ganjiHanja: seun.yearHanja.replace("年柱", "") || `${hanjaStem(seun.year.heavenlyStem)}${hanjaBranch(seun.year.earthlyBranch)}`,
      stemTenGod: seunStemGod,
      keyword: seunKeyword(seunStemGod, y),
      text: "",
    },
    luckPillars: luck,
  };
}

function seunKeyword(god: string, year: number): string {
  const map: Record<string, string> = {
    비견: "자립",
    겁재: "경쟁",
    식신: "표현",
    상관: "파격",
    편재: "기회",
    정재: "저축",
    편관: "압박",
    정관: "책임",
    편인: "직관",
    정인: "배움",
  };
  return `${year} · ${map[god] ?? "전환"}`;
}

export function ganjiHanjaTable(): { stems: string[]; branches: string[] } {
  return {
    stems: [...HEAVENLY_STEMS_HANJA],
    branches: [...EARTHLY_BRANCHES_HANJA],
  };
}
