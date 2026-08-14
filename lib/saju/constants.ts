import type { Element } from "./types";

export const STEM_HANJA: Record<string, string> = {
  갑: "甲",
  을: "乙",
  병: "丙",
  정: "丁",
  무: "戊",
  기: "己",
  경: "庚",
  신: "辛",
  임: "壬",
  계: "癸",
};

export const BRANCH_HANJA: Record<string, string> = {
  자: "子",
  축: "丑",
  인: "寅",
  묘: "卯",
  진: "辰",
  사: "巳",
  오: "午",
  미: "未",
  신: "申",
  유: "酉",
  술: "戌",
  해: "亥",
};

export const ELEMENT_COLOR: Record<Element, string> = {
  목: "#7dcea0",
  화: "#e07a5f",
  토: "#d4a373",
  금: "#d4af37",
  수: "#7eb6d9",
};

export const ELEMENT_BG: Record<Element, string> = {
  목: "rgba(125, 206, 160, 0.16)",
  화: "rgba(224, 122, 95, 0.16)",
  토: "rgba(212, 163, 115, 0.16)",
  금: "rgba(212, 175, 55, 0.18)",
  수: "rgba(126, 182, 217, 0.16)",
};

export const TEN_GOD_HANJA: Record<string, string> = {
  비견: "比肩",
  겁재: "劫財",
  식신: "食神",
  상관: "傷官",
  편재: "偏財",
  정재: "正財",
  편관: "偏官",
  정관: "正官",
  편인: "偏印",
  정인: "正印",
  일간: "日干",
};

export const SHI_JIN: { hour: number; name: string; hanja: string; range: string }[] =
  [
    { hour: 0, name: "자시", hanja: "子時", range: "23:00–01:00" },
    { hour: 2, name: "축시", hanja: "丑時", range: "01:00–03:00" },
    { hour: 4, name: "인시", hanja: "寅時", range: "03:00–05:00" },
    { hour: 6, name: "묘시", hanja: "卯時", range: "05:00–07:00" },
    { hour: 8, name: "진시", hanja: "辰時", range: "07:00–09:00" },
    { hour: 10, name: "사시", hanja: "巳時", range: "09:00–11:00" },
    { hour: 12, name: "오시", hanja: "午時", range: "11:00–13:00" },
    { hour: 14, name: "미시", hanja: "未時", range: "13:00–15:00" },
    { hour: 16, name: "신시", hanja: "申時", range: "15:00–17:00" },
    { hour: 18, name: "유시", hanja: "酉時", range: "17:00–19:00" },
    { hour: 20, name: "술시", hanja: "戌時", range: "19:00–21:00" },
    { hour: 22, name: "해시", hanja: "亥時", range: "21:00–23:00" },
  ];

export const YEAR_MIN = 1940;
export const YEAR_MAX = 2026;

export const LOVE_STATUS_LABEL: Record<string, string> = {
  solo: "솔로",
  dating: "연애중",
  other: "기타",
};

export const GENDER_LABEL: Record<string, string> = {
  male: "남성",
  female: "여성",
};
