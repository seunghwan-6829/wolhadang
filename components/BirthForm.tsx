"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/data/products";
import { YEAR_MAX, YEAR_MIN } from "@/lib/saju/constants";
import type { BirthInput, CalendarType, Gender, LoveStatus } from "@/lib/saju/types";
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
}: {
  value: PersonDraft;
  onChange: (v: PersonDraft) => void;
  title: string;
  namePlaceholder: string;
}) {
  const maxDay = daysInMonth(value.year, value.month, value.calendar === "lunar");
  const years = useMemo(() => {
    const out: number[] = [];
    for (let y = YEAR_MAX; y >= YEAR_MIN; y--) out.push(y);
    return out;
  }, []);
  const set = (patch: Partial<PersonDraft>) => onChange({ ...value, ...patch });

  return (
    <fieldset className="space-y-5">
      <legend className="mb-1 font-serif text-[17px] text-ink">{title}</legend>

      <div>
        <p className="mb-1 text-[12px] text-sub">이름</p>
        <input
          value={value.name}
          placeholder={namePlaceholder}
          maxLength={4}
          onChange={(e) => set({ name: e.target.value.slice(0, 4) })}
          className="underline-input"
        />
      </div>

      <div>
        <p className="mb-2 text-[12px] text-sub">생년월일</p>
        <div className="mb-3 flex gap-4">
          {([
            ["solar", "양력"],
            ["lunar", "음력"],
          ] as const).map(([c, label]) => (
            <label key={c} className="flex items-center gap-1.5 text-[14px]">
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
                className="accent-ink"
              />
              {label}
            </label>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          <select
            value={value.year}
            onChange={(e) => set({ year: Number(e.target.value) })}
            className="underline-input"
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
            className="underline-input"
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
            className="underline-input"
          >
            {Array.from({ length: maxDay }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>
                {d}일
              </option>
            ))}
          </select>
        </div>
        {value.calendar === "lunar" ? (
          <label className="mt-2 flex items-center gap-2 text-[13px] text-sub">
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
        <p className="mb-1 text-[12px] text-sub">태어난 시간</p>
        <input
          inputMode="numeric" placeholder="13:20"
          value={value.time}
          disabled={value.hourUnknown}
          onChange={(e) => set({ time: e.target.value })}
          className="underline-input"
        />
        <label className="mt-2 flex items-center gap-2 text-[13px] text-sub">
          <input
            type="checkbox"
            checked={value.hourUnknown}
            onChange={(e) => set({ hourUnknown: e.target.checked })}
          />
          시간 모름
        </label>
      </div>

      <div>
        <p className="mb-2 text-[12px] text-sub">성별</p>
        <div className="grid grid-cols-2 gap-2">
          {([
            ["male", "남성"],
            ["female", "여성"],
          ] as const).map(([g, label]) => (
            <button
              key={g}
              type="button"
              onClick={() => set({ gender: g })}
              className={`h-12 rounded-xl text-[15px] font-medium ${
                value.gender === g
                  ? "bg-cta text-white"
                  : "bg-white/70 text-ink ring-1 ring-black/10"
              }`}
            >
              {label}
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

export function BirthForm({ product }: { product: Product }) {
  const router = useRouter();
  const [me, setMe] = useState<PersonDraft>(emptyPerson);
  const [partner, setPartner] = useState<PersonDraft>(() => ({
    ...emptyPerson(),
    gender: "",
  }));
  const [loveStatus, setLoveStatus] = useState<LoveStatus>("solo");

  const ok =
    validPerson(me) && (!product.needsPartner || validPerson(partner));

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
      loveStatus: product.needsLoveStatus ? loveStatus : undefined,
      partner: product.needsPartner ? toInput(partner) : undefined,
    };
    try {
      sessionStorage.setItem(BIRTH_STORAGE_KEY, JSON.stringify(input));
    } catch {
      /* ignore */
    }
    router.push(`/s/${product.slug}/story?${birthToQuery(input)}`);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 pb-28">
      <PersonFields value={me} onChange={setMe} title="나의 사주" namePlaceholder="이름 (최대 4자)" />

      {product.needsLoveStatus ? (
        <div>
          <p className="mb-2 font-serif text-[17px] text-ink">연애 상태</p>
          <div className="grid grid-cols-3 gap-2">
            {([
              ["solo", "솔로"],
              ["dating", "연애중"],
              ["other", "기타"],
            ] as const).map(([k, label]) => (
              <button
                key={k}
                type="button"
                onClick={() => setLoveStatus(k)}
                className={`h-11 rounded-xl text-[14px] ${
                  loveStatus === k
                    ? "bg-cta text-white"
                    : "bg-white/70 ring-1 ring-black/10"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {product.needsPartner ? (
        <PersonFields
          value={partner}
          onChange={setPartner}
          title="그 사람의 사주"
          namePlaceholder="상대 이름"
        />
      ) : null}

      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3">
        <button
          type="submit"
          disabled={!ok}
          className="cta-dark h-12 w-full rounded-full text-[15px]"
        >
          다음으로
        </button>
      </div>
    </form>
  );
}
