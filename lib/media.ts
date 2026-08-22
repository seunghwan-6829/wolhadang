export const KIM_STILL = {
  hero: "/characters/kim-hero.png",
  funnel: "/characters/kim-funnel.png",
  story: "/characters/kim-story.png",
  gate: "/characters/kim-gate.png",
  hands: "/characters/kim-hands.png",
  face: "/characters/kim-face.png",
  oheng: "/characters/kim-oheng.png",
  back: "/characters/kim-back.png",
} as const;

export const KIM_VIDEO = {
  hero: "/video/kim-hero.mp4",
  bg: "/video/kim-bg.mp4",
} as const;

/** Per-cut stills. Never point splash/paywall at hero/funnel/story (chest 墨). */
export const CUT_STILL = {
  cover: KIM_STILL.gate,
  wait: KIM_STILL.face,
  unfold: KIM_STILL.hands,
  splash: KIM_STILL.oheng,
  p1: KIM_STILL.face,
  p2: KIM_STILL.hands,
  p3: KIM_STILL.face,
  oheng: KIM_STILL.hands,
  asked: KIM_STILL.hands,
  teaser: KIM_STILL.hands,
  teaser2: KIM_STILL.face,
  paywall: KIM_STILL.back,
  myeongshik: KIM_STILL.hands,
  today: KIM_STILL.hands,
  locked: KIM_STILL.face,
} as const;
