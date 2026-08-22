import type { Product } from "../data/products";
import type {
  BirthInput,
  ComputedSaju,
  Element,
  FullReading,
  ReadingSection,
} from "./types";
import { computeSaju } from "./engine";
import { calculateFourPillars, getTenGod } from "manseryeok";

const PERSONALITY: Record<string, string> = {
  갑: "너는 곧게 솟은 큰 나무다. 굽히기보다 밀어붙인다. 방향이 맞으면 한 계절을 통째로 밀어 올린다. 가지가 너무 곧으면 바람이 아프다.",
  을: "너는 덩굴이다. 부러지지 않고 감아 올라간다. 겉은 부드러워 보여도 속은 질기다. 남과 비교하면 흔들리고, 의지할 곳이 생기면 단단해진다.",
  병: "너는 한낮의 해다. 숨기면 기운이 죽는다. 자리를 데우는 재능이 있으나, 너무 오래 비추면 스스로도 탄다.",
  정: "너는 촛불이다. 크지 않아도 가까운 곳은 정확히 비춘다. 마음이 가는 일에는 오래 타고, 관심 없는 자리에선 금방 사그라진다.",
  무: "너는 산이다. 쉽게 안 움직이고, 한 번 앉으면 버틴다. 변화가 두려운 게 아니라, 모래처럼 흩어질까 봐 두려운 거다.",
  기: "너는 밭의 흙이다. 사람을 기르고 일을 익힌다. 남의 감정까지 떠안지 마라. 거절도 농사다.",
  경: "너는 칼의 등이다. 선이 분명하고, 애매한 말을 오래 못 견딘다. 감정보다 공정이 먼저 나온다.",
  신: "너는 바늘이자 보석이다. 작아 보여도 빛이 있고, 티를 못 참는다. 무딘 말 한마디가 오래 남는다.",
  임: "너는 큰 강이다. 막히면 돌아가고, 돌아가면 더 넓어진다. 마음을 한 곳에 두면 그때부터 바다가 된다.",
  계: "너는 이슬이다. 스며들어 사람을 적신다. 말로 하기 전에 이미 안다. 너무 많이 담으면 흐려진다.",
};

const TRAIT: Record<string, string[]> = {
  갑: [
    "시작을 여는 사람이다. 남이 망설일 때 이미 한 발을 뗀다.",
    "자존과 명분을 동시에 챙기다 지친다. 옳은 일보다 이어질 일을 골라라.",
  ],
  을: [
    "유연함이 생존이다. 센 상대 앞에서도 각을 세우기보다 리듬을 바꾼다.",
    "거절을 미루다 스스로 엉킨다. 부드러운 거절 한 줄을 미리 정해 둬라.",
  ],
  병: [
    "존재감이 곧 운이다. 숨으면 기회도 같이 숨는다.",
    "열정이 과하면 주변이 먼저 탄다. 쉬는 것도 일이다.",
  ],
  정: [
    "한 사람, 한 분야를 깊게 비춘다. 넓히기보다 선명하게.",
    "예민함이 재능이다. 무딘 환경에 오래 있으면 불이 꺼진다.",
  ],
  무: [
    "말이 적어도 자리에 있으면 중심이 잡힌다.",
    "고집이 산이 되지 않게, 작은 실험 창구를 하나 열어 둬라.",
  ],
  기: [
    "사람을 모으고 일을 익히는 밭이다. 조력과 실무에서 빛이 난다.",
    "남의 농사까지 짓지 마라. 네 흙이 먼저다.",
  ],
  경: [
    "결단이 빠르다. 어중간한 타협보다 선 긋는 쪽이 속 편하다.",
    "날 선 말이 관계를 베지 않게, 칼은 칼집에 두는 시간도 필요하다.",
  ],
  신: [
    "완성도를 목숨처럼 여긴다. 디테일이 곧 명성이다.",
    "스스로를 너무 깎지 마라. 보석도 과하면 가루가 된다.",
  ],
  임: [
    "판을 읽고 흐름을 탄다. 고정된 자리보다 움직이는 일이 숨 쉽다.",
    "깊이를 보여 주는 한 사람에게는 전부, 그 외에는 물처럼 흘려라.",
  ],
  계: [
    "분위기와 사람의 밑그림을 먼저 본다. 창작·상담·기획에 결이 맞다.",
    "생각이 밤을 넘기지 않게, 아침에 한 가지씩만 결정해라.",
  ],
};

const WEALTH: Record<string, string[]> = {
  갑: [
    "큰돈을 한 번에 움켜쥐기보다, 숲을 키우듯 자산의 뿌리를 넓히는 형이다. 명의·브랜드·장기 프로젝트가 재물이 된다.",
    "충동 투자보다 ‘내가 이해할 수 있는 나무’에만 물을 주라. 올해는 한 그루를 깊게.",
  ],
  을: [
    "여러 줄기의 수입이 안전합니다. 부업·네트워크·중개가 본업을 받칩니다.",
    "정이 지갑을 열기 쉽다. 사람 좋은 소비를 한도 안에서만.",
  ],
  병: [
    "보이는 곳에서 돈이 돕니다. 얼굴·콘텐츠·무대가 재성이다.",
    "씀씀이가 빛과 같아서, 벌리는 달과 잠그는 달을 달력에 표시해 두라.",
  ],
  정: [
    "소수의 고객, 촘촘한 관계가 큰돈이다. 대량보다 단가가 높은 일.",
    "예쁜 소비에 약하니, ‘갖고 싶은 것’과 ‘나를 키우는 것’을 나누라.",
  ],
  무: [
    "부동산·적금·지분처럼 잘 안 움직이는 자산이 마음을 놓게 합니다.",
    "현금 흐름이 막히면 산이 갈라집니다. 비상금 세 달은 산의 밑동이다.",
  ],
  기: [
    "실무와 관리에서 돈이 자랍니다. 남의 일을 체계화해 주는 대가가 재물.",
    "빌려 주는 돈은 인연을 상하게 하기 쉽다. 선물은 하되 대출은 삼가라.",
  ],
  경: [
    "실력의 대가, 계약, 전문직의 칼값이 재물이다. 헐값에 칼을 빌려 주지 마라.",
    "한 방에 베려다 날이 나갑니다. 분할과 원칙 매매가 경금의 금고이다.",
  ],
  신: [
    "희소성·미감·정밀함이 곧 단가이다. 싸게 많이보다 비싸게 정확하게.",
    "자존 소비(명품·도구)가 과하면 보석이 빛 대신 빚이 된다.",
  ],
  임: [
    "회전하는 자금, 거래, 물류, 해외, 정보가 강물처럼 돈을 실어 온다.",
    "고이면 썩는다. 흐름을 멈추지 말되, 바닥 돌(비상금)은 건드리 지 마라.",
  ],
  계: [
    "눈에 안 띄는 수익—로열티, 지분, 암묵지—이 이슬처럼 쌓이다.",
    "감정의 소비(야식, 새벽 쇼핑)를 줄이면 통장이 맑아집니다.",
  ],
};

const LOVE: Record<string, string[]> = {
  갑: [
    "한 사람을 ‘내 사람’으로 키우고 싶어 합니다. 연애도 방향이 있어야 숨이 쉽다.",
    "상대를 나무 그늘로 두기보다, 같이 숲을 이루는 사람을 고르라.",
  ],
  을: [
    "분위기에 스며드는 연애. 강한 상대에게 감기 쉽고, 그때 자아를 잃기 쉽다.",
    "달콤함이 구속이 되지 않게, 나만의 덩굴대를 하나 남겨 두라.",
  ],
  병: [
    "고백과 이벤트가 자연스럽다. 숨기는 연애는 불을 덮는 일이다.",
    "식는 속도를 두려워 마라. 다시 켜는 법을 아는 것이 병화의 사랑이다.",
  ],
  정: [
    "소수의 깊은 관계. 스쳐 가는 호감보다 ‘이 사람만의 온기’를 원합니다.",
    "질투와 예민이 사랑을 조이면, 촛불이 먼저 꺼집니다. 공간을 선물하라.",
  ],
  무: [
    "한 번 마음을 주면 잘 안 거둡니다. 그래서 시작이 늦고, 끝도 늦다.",
    "말보다 책임으로 사랑합니다. 상대에게는 그 말이 필요하니, 한 줄만 더.",
  ],
  기: [
    "챙겨 주는 사랑이 본능이다. 엄마·아빠 역할이 과하면 연인이 사라집니다.",
    "받는 연습이 궁합이다. ‘고마워’를 먼저 말하는 사람을 가까이.",
  ],
  경: [
    "선이 분명한 연애. 밀당보다 계약서처럼 명확한 관계가 편합니다.",
    "날카로운 직언이 상처를 남깁니다. 칼날은 문제 향해, 등날은 사람 향해.",
  ],
  신: [
    "취향이 까다롭고, 첫인상보다 결이 맞는지가 중요합니다.",
    "완벽한 상대를 기다리다 계절이 지나갑니다. 70점의 따뜻함을 허용하라.",
  ],
  임: [
    "자유와 깊이를 동시에 원합니다. 묶이면 넘치고, 너무 헐거우면 말라 붙는다.",
    "여행·대화·지적 자극이 애정 표현이다. 일상만 반복되면 강이 얕아집니다.",
  ],
  계: [
    "말하지 않아도 알아주길 바랍니다. 그 기대를 말로 바꾸면 관계가 맑아집니다.",
    "감정의 비가 길면 둘 다 젖는다. 울고 난 다음 날, 창문을 여라.",
  ],
};

const CAREER: Record<string, string[]> = {
  갑: [
    "기획·창업·리더십·교육처럼 ‘방향을 제시하는 일’이 천직에 가깝다.",
    "조직의 말단에서 오래 굽히면 목이 아픕니다. 작은 팀의 큰 권한이 약이다.",
  ],
  을: [
    "조정·디자인·브랜딩·케어 직군처럼 유연한 전문성이 길을 엽니다.",
    "한 회사의 기둥보다, 여러 프로젝트에 감기는 형태가 숨 쉽다.",
  ],
  병: [
    "방송, 세일즈, 강의, 공공의 얼굴. 빛이 필요한 자리가 병화의 직장이다.",
    "야근으로 불을 키우지 말고, 무대가 있는 일로 불을 키우라.",
  ],
  정: [
    "연구·편집·상담·공예의 한 우물. 전문가의 작은 방이 정화의 왕좌이다.",
    "대형 조직의 소음에서 재능이 줄으니, 집중할 수 있는 환경을 협상하라.",
  ],
  무: [
    "공공, 부동산, 제조, 운영처럼 땅이 있는 일이 오래갑니다.",
    "이직을 겁내지 말되, 뿌리를 뽑는 이직은 계절을 보고 하라.",
  ],
  기: [
    "HR, 총무, 요리, 농업, 실무 PM. 사람을 키우고 일을 익히는 자리.",
    "직함보다 실권이 있는 실무 수장이 기토를 살립니다.",
  ],
  경: [
    "법·회계·엔지니어·외과적 결단이 필요한 일. 칼이 먹히는 직업.",
    "정치질이 많은 조직은 날을 상하게 합니다. 규칙이 있는 판을 고르라.",
  ],
  신: [
    "디자인, 감정, 분석, 의료, 보석처럼 정밀함이 돈 되는 일.",
    "대충 넘기는 팀에서는 자존이 깎이다. 퀄리티를 존중하는 곳으로.",
  ],
  임: [
    "유통, 무역, 컨설팅, 투자, 여행. 물이 흐르는 산업이 임수의 강이다.",
    "같은 자리 10년은 강을 댐으로 만듭니다. 순환 가능한 커리어를 설계하라.",
  ],
  계: [
    "글, 연구, 치유, 데이터, 영성. 스며드는 업이 계수와 맞다.",
    "실적의 숫자만 보는 판에서는 재능이 안 보이다. 과정을 보는 리더를 찾으라.",
  ],
};

const SEUN_BY_GOD: Record<string, string> = {
  비견: "나와 비슷한 사람이 늘고, 자립과 분업이 주제이다. 혼자 다 하지 말고 역할을 나누면 길이 열립니다.",
  겁재: "경쟁과 나눠 갖기가 동시에 온다. 욕심을 조금만 낮추면 오히려 사람이 남고, 높이면 자리만 남는다.",
  식신: "표현·건강·작은 즐거움이 돈이 되는 해이다. 몸을 돌보는 것이 가장 비싼 투자이다.",
  상관: "기존 틀이 답답해지고, 말과 아이디어가 앞섭니다. 날카로움을 창작으로 돌리면 약이 된다.",
  편재: "움직이는 돈, 예상 못한 기회가 스친다. 계약서를 읽기 전에는 웃지 마라.",
  정재: "성실한 적립이 빛이다. 한 방보다 월급·배당·월세처럼 예측 가능한 흐름을 지키라.",
  편관: "압박·마감·윗사람의 눈이 강해진다. 도망치면 커지고, 정면의 성실이 관살을 관인으로 바꾼다.",
  정관: "책임과 명예가 붙는다. 직함, 자격, 공식 자리가 열릴 수 있으니 서류를 준비해 두라.",
  편인: "직관이 빨라지고 예기치 않은 조력이 온다. 다만 생각이 많아 시작이 늦어질 수 있다.",
  정인: "공부·자격·윗사람의 보호가 들어온다. 배움을 열어 두면 내년의 밑천이 된다.",
};

function pick<T>(stem: string, table: Record<string, T>, fallback: T): T {
  return table[stem] ?? fallback;
}

function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function decadeText(saju: ComputedSaju): string[] {
  const lp = saju.luckPillars;
  if (!lp || lp.pillars.length === 0) {
    return [
      "대운은 성별과 생월 절기를 기준으로 흐릅니다. 시주가 생략되면 세밀한 대운 시작점은 참고치이다.",
      "앞으로 십 년은 일간의 힘을 보충하는 쪽의 사람을 곁에 두는 것이 핵심이다.",
    ];
  }
  const nowAgeGuess = new Date().getFullYear() - saju.solar.year + 1;
  const current = [...lp.pillars].reverse().find((p) => p.age <= nowAgeGuess) ?? lp.pillars[0];
  const next = lp.pillars.find((p) => p.age > (current?.age ?? 0));
  return [
    `대운은 ${lp.forward ? "순행" : "역행"}이며, 첫 대운은 약 ${lp.startAge}세에 열립니다. 지금은 ${current.ganjiHanja}(${current.ganjiKo}) 대운의 결을 타고 있다.`,
    next
      ? `다음 고개는 ${next.age}세 전후 ${next.ganjiHanja} 대운이다. 그 전에 몸과 계약, 인연의 정리를 끝내는 것이 좋다.`
      : "현재 대운의 끝자락을 알뜰히 쓰라. 다음 기둥은 아직 멀리 있다.",
    saju.strength === "신약"
      ? "신약한 사주는 십 년의 흐름에서 ‘돕는 사람·돕는 환경’이 곧 실력이다."
      : saju.strength === "신강"
        ? "신강한 사주는 십 년 안에서 과한 승부를 줄이면, 그 힘이 명성으로 남는다."
        : "중화된 사주는 십 년의 기복이  소란보다 조율로 읽힙니다. 한쪽으로 치우치지 마라.",
  ];
}

function loveStatusLine(saju: ComputedSaju): string | null {
  const ls = saju.input.loveStatus;
  if (!ls) return null;
  if (ls === "solo") {
    return "지금은 솔로로 적었다. 조급히 자리를 채우기보다, 도화가 있는 자리(모임·취미)에만 몸을 두라. 인연은 구하면 달아나고, 빛나면 앉는다.";
  }
  if (ls === "dating") {
    return "연애중으로 적었다. 올해는 상대의 말보다 태도를 믿으라. 십성이 재·관으로 흐르는 달에는 관계의 정의(우리 뭐야)를 미루지 않는 것이 좋다.";
  }
  return "관계의 형태가 또렷하지 않아도 된다. 사주는 호칭이 아니라 호흡을 봅니다. 숨이 편한 사람만 남기라.";
}

function gunghapScore(a: ComputedSaju, b: ComputedSaju): { score: number; paragraphs: string[] } {
  const gen: Record<Element, Element> = { 목: "화", 화: "토", 토: "금", 금: "수", 수: "목" };
  const ctl: Record<Element, Element> = { 목: "토", 화: "금", 토: "수", 금: "목", 수: "화" };
  const A = a.dayMasterElement;
  const B = b.dayMasterElement;
  let score = 72;
  let relation = "같은 결";
  if (A === B) {
    score = 78;
    relation = "같은 오행이라 말이 잘 통하고, 대신 약점도 겹칩니다.";
  } else if (gen[A] === B) {
    score = 88;
    relation = `${a.input.name}의 ${A}이(가) ${b.input.name}의 ${B}을(를) 살립니다. 당신이 상대를 빛내는 궁합이다.`;
  } else if (gen[B] === A) {
    score = 86;
    relation = `${b.input.name}의 ${B}이(가) ${a.input.name}의 ${A}을(를) 살립니다. 상대에게서 힘이 들어오는 궁합이다.`;
  } else if (ctl[A] === B) {
    score = 64;
    relation = `${A}이(가) ${B}을(를) 극합니다. 당신이 리드하다 상대가 지칠 수 있다. 권한을 나누면 점수가 올라간다.`;
  } else if (ctl[B] === A) {
    score = 62;
    relation = `${B}이(가) ${A}을(를) 극합니다. 상대의 속도에 눌릴 수 있으니, 나만의 시간을 계약처럼 정해 두라.`;
  } else {
    score = 70;
    relation = "직접 생극보다 옆자리에서 바라보는 관계. 친구로는 편하고, 연애로는 자극이 필요할 수 있다.";
  }
  const peach =
    a.shinsal.some((s) => s.name === "도화살") || b.shinsal.some((s) => s.name === "도화살");
  if (peach) {
    score = Math.min(95, score + 4);
  }
  return {
    score,
    paragraphs: [
      relation,
      `두 사람의 일간은 ${a.dayMasterHanja}${a.dayMaster}와 ${b.dayMasterHanja}${b.dayMaster}이다. 점수는 오행 생극의 뼈대일 뿐, 살아가는 태도가 최종 궁합이다.`,
      peach
        ? "도화가 있는 쪽은 바깥의 시선이 많다. 질투를 규칙으로 다루지 말고, 일정과 솔직함으로 다루라."
        : "화려한 합성보다, 같이 밥을 먹을 때의 호흡을 믿으라. 사주는 식탁에서 더 정확합니다.",
    ],
  };
}

function todayText(saju: ComputedSaju, now: Date): { title: string; paragraphs: string[] } {
  const t = calculateFourPillars({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    hour: 12,
    minute: 0,
  });
  const god = getTenGod(saju.dayMaster as never, t.day.heavenlyStem as never);
  const doList: Record<string, string> = {
    비견: "혼자 결정하기보다 동료와 나눠 하라.",
    겁재: "큰돈·큰 약속은 내일로. 오늘은 지키는 날.",
    식신: "만들고 말하고 드라. 창작과 식사가 길하다.",
    상관: "직언은 메모로. 공개 발언은 한 박자 늦추라.",
    편재: "제안은 받되 도장은 보류. 숫자만 확인하라.",
    정재: "밀린 정산, 세금, 청소. 작은 질서가 돈을 부른다.",
    편관: "마감이 있다면 정면으로. 피하면 밤에 더 커진다.",
    정관: "공식 자리, 서류, 어른과의 약속이 길하다.",
    편인: "직감을 믿되 제3자에게 한 번 검증하라.",
    정인: "공부·상담·휴식이 생산이다. 무리한 실적은 내일.",
  };
  return {
    title: `오늘의 일진 ${t.dayHanja.replace("日柱", "")} · ${god}`,
    paragraphs: [
      `오늘 일주는 ${t.day.heavenlyStem}${t.day.earthlyBranch}이며, 네 일간 ${saju.dayMaster}와의 관계는 ${god}이다.`,
      doList[god] ?? "흐름을 거스르지 말고, 한 가지만 잘 마무리해라.",
      "이 한 줄은 맛보기다. 인생 전체의 결은 정통사주에서 이어진다.",
    ],
  };
}

function rankOf(saju: ComputedSaju): { percentile: number; title: string; paragraphs: string[] } {
  const key = saju.pillars.map((p) => (p.omitted ? "x" : p.ganjiKo)).join("");
  const h = hashCode(key + saju.dayMaster);
  const percentile = 4 + (h % 27); // 4~30, 희소해 보이게. 예시 산출식.
  const rare = saju.shinsal.map((s) => s.name).join("·") || "신살 없음";
  return {
    percentile,
    title: `명식 희소 지수 · 상위 ${percentile}%`,
    paragraphs: [
      `일간 ${saju.dayMasterHanja}${saju.dayMaster} · ${saju.strength} · ${rare}. 같은 간지라도 월지와 시주의 결이 다르면 삶의 온도가 달라집니다.`,
      `이 수치는 만세력 조합의 단순 해시로 산출한 데모 지표이다. 길흉의 점수가 아니라, ‘얼마나 드문 배치인가’의 장난 같은 거울이다.`,
      "상위권이라고 행복한 것도, 흔하다고 평범한 것도 아닙니다. 쓰임이 운이다.",
    ],
  };
}

export function buildReading(
  input: BirthInput,
  product: Product,
  opts?: { paid?: boolean; now?: Date },
): FullReading {
  const now = opts?.now ?? new Date();
  const paid = Boolean(opts?.paid) || product.price === 0;
  const saju = computeSaju(input, now);
  saju.yearLuck.text = SEUN_BY_GOD[saju.yearLuck.stemTenGod] ?? "올해는 조율의 해이다.";

  const personality = pick(saju.dayMaster, PERSONALITY, PERSONALITY.갑);
  const trait = pick(saju.dayMaster, TRAIT, TRAIT.갑);
  const wealth = pick(saju.dayMaster, WEALTH, WEALTH.갑);
  const love = [...pick(saju.dayMaster, LOVE, LOVE.갑)];
  const extraLove = loveStatusLine(saju);
  if (extraLove) love.push(extraLove);
  const career = pick(saju.dayMaster, CAREER, CAREER.갑);

  const shinsalPara =
    saju.shinsal.length > 0
      ? saju.shinsal.map((s) => `${s.name}(${s.hanja}) — ${s.summary}`).join("\n")
      : "도화·역마·화개가 뚜렷이 앉지는 않았다. 매력은 신살이 아니라 일간의 결에서 나온다.";

  const unlockedTrait: ReadingSection = {
    id: "trait",
    title: "타고난 기질",
    locked: false,
    paragraphs: [...trait, shinsalPara],
  };
  const unlockedYear: ReadingSection = {
    id: "year",
    title: `${saju.yearLuck.year}년 세운 · ${saju.yearLuck.keyword}`,
    locked: false,
    paragraphs: [
      `올해 세운은 ${saju.yearLuck.ganjiHanja}(${saju.yearLuck.ganjiKo})이며, 일간과의 십성은 ${saju.yearLuck.stemTenGod}이다.`,
      saju.yearLuck.text,
    ],
  };

  const lockedWealth: ReadingSection = {
    id: "wealth",
    title: "재물운",
    locked: !paid,
    paragraphs: paid ? wealth : ["더 보려면 복채가 필요하다. 재성의 강약, 올해 돈의 흐름."],
  };
  const lockedLove: ReadingSection = {
    id: "love",
    title: "연애 · 인연",
    locked: !paid,
    paragraphs: paid ? love : ["더 보려면 복채가 필요하다. 도화와 인연의 자리."],
  };
  const lockedCareer: ReadingSection = {
    id: "career",
    title: "직업 · 진로",
    locked: !paid,
    paragraphs: paid ? career : ["더 보려면 복채가 필요하다. 일이 풀리는 자리."],
  };
  const lockedDecade: ReadingSection = {
    id: "decade",
    title: "10년 대운",
    locked: !paid,
    paragraphs: paid
      ? decadeText(saju)
      : ["더 보려면 복채가 필요하다. 대운의 고개."],
  };

  let sections: ReadingSection[] = [unlockedTrait, unlockedYear, lockedWealth, lockedLove, lockedCareer, lockedDecade];

  if (product.slug === "jaemul") {
    sections = [unlockedTrait, lockedWealth, unlockedYear, lockedLove, lockedCareer, lockedDecade];
  } else if (product.slug === "today") {
    sections = [unlockedTrait, unlockedYear];
  }

  const reading: FullReading = {
    saju,
    personality,
    sections,
  };

  if (product.slug === "today") {
    reading.today = todayText(saju, now);
  }
  // rank / gunghap products removed — engine helpers stay unused

  return reading;
}
