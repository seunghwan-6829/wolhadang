"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/lib/data/products";
import { YEAR_MAX, YEAR_MIN } from "@/lib/saju/constants";
import type { BirthInput, CalendarType, Gender } from "@/lib/saju/types";
import { BIRTH_STORAGE_KEY, birthToQuery } from "@/lib/birth-query";
import { BackBar } from "./Header";

type PersonDraft = {
  name: string;
  gender: Gender | "";
  calendar: CalendarType;
  isLeapMonth: boolean;
  year: number;
  month: number;
  day: number;
  hourUnknown: boolean;
  time: string;
};

const INPUT_DRAFT_KEY = "wolhadang_input_draft";

type InputDraft = PersonDraft & { question: string };

const emptyPerson = (): PersonDraft => ({
  name: "",
  gender: "",
  calendar: "solar",
  isLeapMonth: false,
  year: 0,
  month: 0,
  day: 0,
  hourUnknown: false,
  time: "",
});

function readInputDraft(): InputDraft | null {
  try {
    const raw = sessionStorage.getItem(INPUT_DRAFT_KEY);
    if (!raw) return null;
    const d = JSON.parse(raw) as Partial<InputDraft>;
    return {
      ...emptyPerson(),
      name: typeof d.name === "string" ? d.name : "",
      gender: d.gender === "male" || d.gender === "female" ? d.gender : "",
      calendar: d.calendar === "lunar" ? "lunar" : "solar",
      isLeapMonth: Boolean(d.isLeapMonth),
      year: Number(d.year) || 0,
      month: Number(d.month) || 0,
      day: Number(d.day) || 0,
      hourUnknown: Boolean(d.hourUnknown),
      time: typeof d.time === "string" ? d.time : "",
      question: typeof d.question === "string" ? d.question : "",
    };
  } catch {
    return null;
  }
}

function writeInputDraft(me: PersonDraft, question: string) {
  try {
    const draft: InputDraft = { ...me, question };
    sessionStorage.setItem(INPUT_DRAFT_KEY, JSON.stringify(draft));
  } catch {
    /* ignore */
  }
}

function daysInMonth(year: number, month: number, lunar: boolean): number {
  if (year < YEAR_MIN || month < 1) return 31;
  if (lunar) return 30;
  return new Date(year, month, 0).getDate();
}

function PersonFields({
  value,
  onChange,
  title,
  namePlaceholder,
  tone,
  showGenderError,
}: {
  value: PersonDraft;
  onChange: (v: PersonDraft) => void;
  title: string;
  namePlaceholder: string;
  tone: "dark" | "paper";
  showGenderError: boolean;
}) {
  const maxDay = daysInMonth(value.year, value.month, value.calendar === "lunar");
  const years = useMemo(() => {
    const out: number[] = [];
    for (let y = YEAR_MAX; y >= YEAR_MIN; y--) out.push(y);
    return out;
  }, []);
  const set = (patch: Partial<PersonDraft>) => onChange({ ...value, ...patch });
  const dark = tone === "dark";
  const label = dark ? "mb-1 text-[12px] text-white/60" : "mb-1 text-[12px] text-sub";
  const legend = dark
    ? "mb-1 font-serif text-[17px] text-[#f3ead8]"
    : "mb-1 font-serif text-[17px] text-ink";
  const field = dark ? "underline-input-light" : "underline-input";
  const radio = dark ? "flex items-center gap-1.5 text-[14px] text-[#f3ead8]" : "flex items-center gap-1.5 text-[14px]";
  const check = dark ? "mt-2 flex items-center gap-2 text-[13px] text-white/60" : "mt-2 flex items-center gap-2 text-[13px] text-sub";

  return (
    <fieldset className={dark ? "space-y-3.5" : "space-y-5"}>
      <legend className={legend}>{title}</legend>

      <div>
        <p className={label}>이름</p>
        <input
          value={value.name}
          placeholder={namePlaceholder}
          maxLength={4}
          onChange={(e) => set({ name: e.target.value.slice(0, 4) })}
          className={field}
          autoComplete="name"
        />
      </div>

      <div>
        <p className={`${label} mb-2`}>생년월일</p>
        <div className="mb-3 flex gap-4">
          {([
            ["solar", "양력"],
            ["lunar", "음력"],
          ] as const).map(([c, lab]) => (
            <label key={c} className={radio}>
              <input
                type="radio"
                name={`${title}-cal`}
                checked={value.calendar === c}
                onChange={() =>
                  set({
                    calendar: c,
                    isLeapMonth: c === "lunar" ? value.isLeapMonth : false,
                  })
                }
                className="accent-[#f3ead8]"
              />
              {lab}
            </label>
          ))}
        </div>
        <div className="space-y-2">
          <select
            value={value.year || ""}
            onChange={(e) => set({ year: Number(e.target.value) || 0 })}
            className={field}
            aria-label="년"
          >
            <option value="">년</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}년
              </option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={value.month || ""}
              onChange={(e) => set({ month: Number(e.target.value) || 0 })}
              className={field}
              aria-label="월"
            >
              <option value="">월</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  {m}월
                </option>
              ))}
            </select>
            <select
              value={value.day ? Math.min(value.day, maxDay) : ""}
              onChange={(e) => set({ day: Number(e.target.value) || 0 })}
              className={field}
              aria-label="일"
            >
              <option value="">일</option>
              {Array.from({ length: maxDay }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>
                  {d}일
                </option>
              ))}
            </select>
          </div>
        </div>
        {value.calendar === "lunar" ? (
          <label className={check}>
            <input
              type="checkbox"
              checked={value.isLeapMonth}
              onChange={(e) => set({ isLeapMonth: e.target.checked })}
            />
            윤달
          </label>
        ) : null}
      </div>

      <div>
        <p className={label}>태어난 시간</p>
        <input
          inputMode="numeric"
          placeholder="시간 (예: 13:20)"
          value={value.time}
          disabled={value.hourUnknown}
          onChange={(e) => set({ time: e.target.value })}
          className={field}
          aria-label="태어난 시간"
        />
        <label className={check}>
          <input
            type="checkbox"
            checked={value.hourUnknown}
            onChange={(e) => set({ hourUnknown: e.target.checked })}
          />
          시간 모름
        </label>
      </div>

      <div>
        <p className={`${label} mb-2`}>성별</p>
        <div className="grid grid-cols-2 gap-2">
          {([
            ["male", "남자"],
            ["female", "여자"],
          ] as const).map(([g, lab]) => (
            <button
              key={g}
              type="button"
              onClick={() => set({ gender: g })}
              className={`h-12 rounded-xl text-[15px] font-medium ${
                value.gender === g
                  ? dark
                    ? "bg-[#f3ead8] text-ink"
                    : "bg-cta text-white"
                  : dark
                    ? "bg-white/10 text-[#f3ead8] ring-1 ring-white/25"
                    : "bg-white/70 text-ink ring-1 ring-black/10"
              }`}
            >
              {lab}
            </button>
          ))}
        </div>
        {showGenderError ? (
          <p className="keep-all mt-2 text-[12px] text-red-400">
            ⚠ 성별을 고르라.
          </p>
        ) : null}
      </div>
    </fieldset>
  );
}

function validPerson(p: PersonDraft): boolean {
  const named = p.name.trim().length >= 1;
  const gendered = p.gender === "male" || p.gender === "female";
  const dated = p.year >= YEAR_MIN && p.month >= 1 && p.day >= 1;
  const timed = p.hourUnknown || p.time.trim().length > 0;
  return named && gendered && dated && timed;
}

function readyExceptGender(p: PersonDraft): boolean {
  const named = p.name.trim().length >= 1;
  const dated = p.year >= YEAR_MIN && p.month >= 1 && p.day >= 1;
  const timed = p.hourUnknown || p.time.trim().length > 0;
  return named && dated && timed;
}

export function BirthForm({
  product,
  tone = "paper",
}: {
  product: Product;
  tone?: "dark" | "paper";
}) {
  const router = useRouter();
  const sp = useSearchParams();
  const phase = sp.get("step") === "ask" ? "ask" : "birth";
  const [me, setMe] = useState<PersonDraft>(emptyPerson);
  const [question, setQuestion] = useState("");
  const [ready, setReady] = useState(false);
  const [submittedAttempt, setSubmittedAttempt] = useState(false);
  const ok = validPerson(me);
  const canClick = readyExceptGender(me);

  useEffect(() => {
    const draft = readInputDraft();
    if (draft) {
      const { question: q, ...person } = draft;
      setMe(person);
      setQuestion(q);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    writeInputDraft(me, question);
  }, [ready, me, question]);

  function toInput(p: PersonDraft): Omit<BirthInput, "loveStatus" | "partner"> {
    const [hh, mm] = (p.time || "0:0").split(":").map(Number);
    return {
      name: p.name.trim(),
      gender: p.gender === "male" ? "male" : "female",
      calendar: p.calendar,
      isLeapMonth: p.isLeapMonth,
      year: p.year,
      month: p.month,
      day: Math.min(p.day, daysInMonth(p.year, p.month, p.calendar === "lunar")),
      hourUnknown: p.hourUnknown,
      hour: p.hourUnknown ? 12 : hh || 12,
      minute: p.hourUnknown ? 0 : mm || 0,
    };
  }

  function goStory(ask: string) {
    const input: BirthInput = {
      ...toInput(me),
      question: ask.trim().slice(0, 200) || undefined,
    };
    try {
      sessionStorage.setItem(BIRTH_STORAGE_KEY, JSON.stringify(input));
    } catch {
      /* ignore */
    }
    router.push(`/s/${product.slug}/story?${birthToQuery(input)}`);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (phase === "birth") {
      setSubmittedAttempt(true);
      if (!ok) return;
      writeInputDraft(me, question);
      router.push(`/s/${product.slug}/input?step=ask`);
      return;
    }
    goStory(question);
  }

  const bar =
    tone === "dark"
      ? "bg-gradient-to-t from-black via-black/85 to-transparent"
      : "";
  const dark = tone === "dark";
  const backHref =
    phase === "ask" ? `/s/${product.slug}/input` : `/s/${product.slug}/intro`;

  return (
    <>
      <BackBar href={backHref} light={dark} fixed />
      <form onSubmit={onSubmit} className={dark ? "space-y-4 pb-4" : "space-y-8 pb-8"}>
        {phase === "birth" ? (
          <PersonFields
            value={me}
            onChange={setMe}
            title="네 사주"
            namePlaceholder="이름부터 대라"
            tone={tone}
            showGenderError={submittedAttempt && me.gender === ""}
          />
        ) : (
          <div>
            <p className={dark ? "font-serif text-[17px] text-[#f3ead8]" : "font-serif text-[17px] text-ink"}>
              특별히 물어볼 것
            </p>
            <p className={dark ? "mt-1 text-[13px] text-white/55" : "mt-1 text-[13px] text-sub"}>
              없어도 된다. 건너뛰어도 사주는 펼친다.
            </p>
            <textarea
              value={question}
              maxLength={200}
              rows={8}
              placeholder="올해 이직해도 되나, 이런 것."
              onChange={(e) => setQuestion(e.target.value.slice(0, 200))}
              className={
                dark
                  ? "mt-4 min-h-[220px] w-full resize-none rounded-xl bg-white/8 px-3 py-3 text-[15px] text-[#f3ead8] outline-none ring-1 ring-white/20 placeholder:text-white/30"
                  : "mt-4 min-h-[220px] w-full resize-none rounded-xl bg-white px-3 py-3 text-[15px] text-ink outline-none ring-1 ring-black/10"
              }
            />
            <p className={dark ? "mt-2 text-right text-[12px] text-white/45" : "mt-2 text-right text-[12px] text-sub"}>
              {question.length}/200
            </p>
          </div>
        )}

        <div
          className={`relative mt-8 w-full pb-[max(12px,env(safe-area-inset-bottom))] pt-2 ${bar}`}
        >
          {phase === "ask" ? (
            <button
              type="button"
              onClick={() => goStory("")}
              className={`mt-0 mb-6 h-11 w-full text-[14px] ${
                dark ? "text-white/60" : "text-sub"
              }`}
            >
              건너뛰기
            </button>
          ) : null}
          <button
            type="submit"
            disabled={phase === "birth" && !canClick}
            className={`h-12 w-full rounded-full text-[15px] ${
              tone === "dark" ? "pill-cream" : "cta-dark"
            }`}
          >
            다음으로
          </button>
        </div>
      </form>
    </>
  );
}
