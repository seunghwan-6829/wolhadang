export type CalendarType = "solar" | "lunar";
export type Gender = "male" | "female";
export type LoveStatus = "solo" | "dating" | "other";

export type BirthInput = {
  name: string;
  gender: Gender;
  calendar: CalendarType;
  isLeapMonth: boolean;
  year: number;
  month: number;
  day: number;
  hourUnknown: boolean;
  /** 24h clock; ignored if hourUnknown */
  hour: number;
  minute: number;
  loveStatus?: LoveStatus;
  /** optional free-text question from the form (max 200) */
  question?: string;
  partner?: Omit<BirthInput, "loveStatus" | "partner">;
};

export type Element = "목" | "화" | "토" | "금" | "수";

export type PillarView = {
  key: "year" | "month" | "day" | "hour";
  label: string;
  stemKo: string;
  branchKo: string;
  stemHanja: string;
  branchHanja: string;
  ganjiKo: string;
  ganjiHanja: string;
  stemElement: Element;
  branchElement: Element;
  stemTenGod: string;
  branchTenGod: string;
  omitted?: boolean;
};

export type ShinsalHit = {
  name: string;
  hanja: string;
  summary: string;
};

export type ElementCount = Record<Element, number>;

export type ComputedSaju = {
  input: BirthInput;
  solar: { year: number; month: number; day: number };
  pillars: PillarView[];
  dayMaster: string;
  dayMasterHanja: string;
  dayMasterElement: Element;
  dayMasterYinYang: string;
  hourUnknown: boolean;
  tenGodSummary: string;
  voidBranches: string[];
  shinsal: ShinsalHit[];
  elementCount: ElementCount;
  strength: "신강" | "중화" | "신약";
  yearLuck: {
    year: number;
    ganjiKo: string;
    ganjiHanja: string;
    stemTenGod: string;
    keyword: string;
    text: string;
  };
  luckPillars?: {
    forward: boolean;
    startAge: number;
    pillars: { age: number; ganjiKo: string; ganjiHanja: string }[];
  };
};

export type ReadingSection = {
  id: string;
  title: string;
  locked: boolean;
  paragraphs: string[];
};

export type FullReading = {
  saju: ComputedSaju;
  personality: string;
  sections: ReadingSection[];
  today?: { title: string; paragraphs: string[] };
  rank?: { percentile: number; title: string; paragraphs: string[] };
  gunghap?: {
    partnerName: string;
    partnerGanji: string;
    score: number;
    paragraphs: string[];
  };
};
