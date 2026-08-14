# 월하당 (Wolhadang)

달빛 아래, 내 사주를 보다.

Meta 광고 유입용 사주 퍼널 데모입니다. 오리지널 브랜드이며 타사 자산과 카피를 쓰지 않았습니다.

## 실행

프로젝트 폴더에서:

```
npm install
npm run dev
```

브라우저: http://localhost:3000

포트가 쓰이면 `npm run dev -- -p 3001`

빌드: `npm run build` 후 `npm start`

## 페이지

- `/` 홈 카탈로그
- `/s/[slug]` 상품 랜딩
- `/s/[slug]/input` 생년월일 입력
- `/s/[slug]/result` 명식 + 무료 티저 + 페이월
- `/s/[slug]/pay` 목 결제 (실결제 없음)
- `/s/[slug]/unlock` 전체 풀이

슬러그: jeongtong, yeonae, gunghap, jaemul, today, rank

## 폴더 구조

- `app/` App Router
- `components/` UI
- `lib/data/` 상품·리뷰 모듈 (이후 원격 DB로 교체하기 쉽게 분리)
- `lib/saju/` 만세력 엔진과 풀이 템플릿
- `lib/birth-query.ts` 입력값 쿼리스트링

사주 월주는 음력월이 아니라 절기 기준입니다. 라이브러리: manseryeok (KASI 절기·음력). 음력/윤달 지원. 시간 모름이면 시주 생략.

## 이후 계획

Vercel 배포 + Supabase(인증, 주문, 결과 저장). `lib/data` 모듈만 교체하면 됩니다. 결제 비밀값은 환경 변수로만 두고 코드에 넣지 마세요.

리뷰 티커는 예시 데이터입니다.
