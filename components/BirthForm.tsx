"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/data/products";
import { YEAR_MAX, YEAR_MIN } from "@/lib/saju/constants";
import type { BirthInput, CalendarType, Gender } from "@/lib/saju/types";
import { BIRTH_STORAGE_KEY, birthToQuery } from "@/lib/birth-query";

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

const emptyPerson = (): PersonDraft => ({
  name: "",
  gender: "",
  calendar: "solar",
  isLeapMonth: false,
  year: 1995,
  month: 8,
  day: 15,
  hourUnknown: false,
  time: "13:20",
});

function daysInMonth(year: number, month: number, lunar: boolean): number {
  if (lunar) return 30;
  return new Date(year, month, 0).getDate();
}

function PersonFields({
  value,
  onChange,
  title,
  namePlaceholder,
  tone,
}: {
  value: PersonDraft;
  onChange: (v: PersonDraft) => void;
  title: string;
  namePlaceholder: string;
  tone: "dark" | "paper";
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
    <fieldset className="space-y-5">
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
        <div className="grid grid-cols-3 gap-2">
          <select
            value={value.year}
            onChange={(e) => set({ year: Number(e.target.value) })}
            className={field}
            aria-label="년"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}년
              </option>
            ))}
          </select>
          <select
            value={value.month}
            onChange={(e) => set({ month: Number(e.target.value) })}
            className={field}
            aria-label="월"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {m}월
              </option>
            ))}
          </select>
          <select
            value={Math.min(value.day, maxDay)}
            onChange={(e) => set({ day: Number(e.target.value) })}
            className={field}
            aria-label="일"
          >
            {Array.from({ length: maxDay }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>
                {d}일
              </option>
            ))}
          </select>
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
          placeholder="13:20"
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
            ["male", "남성"],
            ["female", "여성"],
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
      </div>
    </fieldset>
  );
}

function validPerson(p: PersonDraft): boolean {
  return p.name.trim().length >= 1 && (p.gender === "male" || p.gender === "female");
}

export function BirthForm({
  product,
  tone = "paper",
}: {
  product: Product;
  tone?: "dark" | "paper";
}) {
  const router = useRouter();
  const [me, setMe] = useState<PersonDraft>(emptyPerson);
  const ok = validPerson(me);

  function toInput(p: PersonDraft): Omit<BirthInput, "loveStatus" | "partner"> {
    const [hh, mm] = (p.time || "13:20").split(":").map(Number);
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

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ok) return;
    const input: BirthInput = {
      ...toInput(me),
    };
    try {
      sessionStorage.setItem(BIRTH_STORAGE_KEY, JSON.stringify(input));
    } catch {
      /* ignore */
    }
    router.push(`/s/${product.slug}/story?${birthToQuery(input)}`);
  }

  const bar =
    tone === "dark"
      ? "bg-gradient-to-t from-black via-black/85 to-transparent"
      : "";

  return (
    <form onSubmit={onSubmit} className="space-y-8 pb-28">
      <PersonFields
        value={me}
        onChange={setMe}
        title="네 사주"
        namePlaceholder="이름부터 대라"
        tone={tone}
      />

      <div
        className={`fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-6 ${bar}`}
      >
        <button
          type="submit"
          disabled={!ok}
          className={`h-12 w-full rounded-full text-[15px] ${
            tone === "dark" ? "pill-cream" : "cta-dark"
          }`}
        >
          때를 맡긴다
        </button>
      </div>
    </form>
  );
}
