import type { BirthInput, CalendarType, Gender, LoveStatus } from "./saju/types";

function n(v: string | null, fallback: number): number {
  if (v == null || v === "") return fallback;
  const x = Number(v);
  return Number.isFinite(x) ? x : fallback;
}

export function birthToQuery(input: BirthInput): string {
  const p = new URLSearchParams();
  p.set("n", input.name);
  p.set("g", input.gender === "female" ? "f" : "m");
  p.set("cal", input.calendar === "lunar" ? "l" : "s");
  if (input.isLeapMonth) p.set("leap", "1");
  p.set("y", String(input.year));
  p.set("m", String(input.month));
  p.set("d", String(input.day));
  if (input.hourUnknown) p.set("hu", "1");
  else {
    p.set("h", String(input.hour));
    p.set("mi", String(input.minute));
  }
  if (input.loveStatus) p.set("ls", input.loveStatus);
  if (input.partner) {
    const q = input.partner;
    p.set("pn", q.name);
    p.set("pg", q.gender === "female" ? "f" : "m");
    p.set("pcal", q.calendar === "lunar" ? "l" : "s");
    if (q.isLeapMonth) p.set("pleap", "1");
    p.set("py", String(q.year));
    p.set("pm", String(q.month));
    p.set("pd", String(q.day));
    if (q.hourUnknown) p.set("phu", "1");
    else {
      p.set("ph", String(q.hour));
      p.set("pmi", String(q.minute));
    }
  }
  return p.toString();
}

export function queryToBirth(
  sp: URLSearchParams | Record<string, string | string[] | undefined>,
): BirthInput | null {
  const get = (k: string): string | null => {
    if (sp instanceof URLSearchParams) return sp.get(k);
    const v = sp[k];
    if (Array.isArray(v)) return v[0] ?? null;
    return v ?? null;
  };

  const name = (get("n") ?? "").trim();
  const y = n(get("y"), 0);
  const m = n(get("m"), 0);
  const d = n(get("d"), 0);
  if (!name || y < 1900 || m < 1 || d < 1) return null;

  const gender: Gender = get("g") === "f" ? "female" : "male";
  const calendar: CalendarType = get("cal") === "l" ? "lunar" : "solar";
  const hourUnknown = get("hu") === "1";
  const ls = get("ls");
  const loveStatus: LoveStatus | undefined =
    ls === "solo" || ls === "dating" || ls === "other" ? ls : undefined;

  const input: BirthInput = {
    name,
    gender,
    calendar,
    isLeapMonth: get("leap") === "1",
    year: y,
    month: m,
    day: d,
    hourUnknown,
    hour: hourUnknown ? 12 : n(get("h"), 12),
    minute: hourUnknown ? 0 : n(get("mi"), 0),
    loveStatus,
  };

  const pn = (get("pn") ?? "").trim();
  const py = n(get("py"), 0);
  if (pn && py >= 1900) {
    const phu = get("phu") === "1";
    input.partner = {
      name: pn,
      gender: get("pg") === "f" ? "female" : "male",
      calendar: get("pcal") === "l" ? "lunar" : "solar",
      isLeapMonth: get("pleap") === "1",
      year: py,
      month: n(get("pm"), 1),
      day: n(get("pd"), 1),
      hourUnknown: phu,
      hour: phu ? 12 : n(get("ph"), 12),
      minute: phu ? 0 : n(get("pmi"), 0),
    };
  }
  return input;
}

export const BIRTH_STORAGE_KEY = "wolhadang_birth";
export const PAID_STORAGE_PREFIX = "wolhadang_paid_";
