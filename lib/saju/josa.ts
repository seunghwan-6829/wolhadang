/** Korean subject particle. Hangul batchim === 0 → 가, else 이. */
export function iGa(noun: string): string {
  const s = noun.trim();
  if (!s) return s;
  const code = s.charCodeAt(s.length - 1);
  if (code < 0xac00 || code > 0xd7a3) return `${s}이`;
  const batchim = (code - 0xac00) % 28;
  return batchim === 0 ? `${s}가` : `${s}이`;
}

/** Korean object particle. Hangul batchim === 0 → 를, else 을. */
export function eulReul(noun: string): string {
  const s = noun.trim();
  if (!s) return s;
  const code = s.charCodeAt(s.length - 1);
  if (code < 0xac00 || code > 0xd7a3) return `${s}을`;
  const batchim = (code - 0xac00) % 28;
  return batchim === 0 ? `${s}를` : `${s}을`;
}
