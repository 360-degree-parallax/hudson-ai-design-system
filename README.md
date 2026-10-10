# Hudson AI Web Design System

Hudson AI 웹 디자인 시스템 문서 사이트의 HTML·CSS·JavaScript 소스입니다.

배포된 사이트: https://hudson-ai-design-system.66everlast99.workers.dev/

개발·배포 설정: [docs/DEVELOPMENT.ko.md](docs/DEVELOPMENT.ko.md)

## 실행

Node.js 22 이상과 Python 3가 필요합니다. Wrangler는 잠금 파일에 맞춰 설치합니다.

```sh
npm ci
npm run setup   # Pretendard 다운로드 및 SHA-256 검증. 인터넷 필요.
npm run build   # 토큰·계약·48개 직접 진입 경로(문서 44 + 허브 4) 생성
npm start       # http://localhost:8000
```

`dist/`를 정적 서버에 배포하세요. 폰트는 대용량 바이너리 대신 재현 가능한 설치 스크립트로 제공하며, setup 후 자체 호스팅됩니다. 라이선스는 `dist/assets/OFL.txt`입니다. setup 없이도 시스템 글꼴 폴백으로 문서를 사용할 수 있습니다.

## 편집할 파일

- `dist/app.js`: 페이지, 디자인 토큰 데이터, 컴포넌트 registry, 작동 예제
  - `registry`: 컴포넌트 목적·상태·props
  - `guides`: 컴포넌트별 사용·회피 기준, 대안, 키보드, 토큰 바인딩, 복사용 코드 (registry.json과 위임 프롬프트의 원본)
  - `briefSchema`·`defaultBrief`: ScreenBrief 스키마 원본 (`screen-brief.schema.json`으로 생성)
- `dist/style.css`: 반응형 레이아웃과 컴포넌트 스타일
- `dist/index.html`: 문서 Shell
- `generate.mjs`: JSON·토큰 CSS·직접 진입 HTML 생성
- `dist/spec.json`: 전체 기획·구현 명세의 문서 데이터
- `dist/assets/Hudson_AI_Web_Design_System_Spec.md`: 원본 명세
- `CLAUDE.md`: UX 개선 작업 안내

`tokens.json`, `tokens.css`, `registry.json`, 경로별 `index.html`은 빌드로 생성합니다. 데이터 원본을 변경한 뒤 다시 빌드하세요. 이 저장소는 요청한 HTML 사이트이며 독립 React 컴포넌트 패키지는 아직 아닙니다.

## UX 개선 시 유지할 것

브랜드 #FD4D20·차콜·웜그레이·화이트, semantic token, 웹 반응형, 키보드 조작, 브라우저 확대, 실패 복구를 유지하세요. 디자인 시스템을 탐색하고 이해하고 복사해 실제 구현에 적용하는 흐름을 먼저 개선합니다.

업로드·더빙·송출 예제는 데모입니다. 실제 파일 전송·과금 작업·음원 재생을 하지 않습니다.

## 검증

```sh
npm run check
```

생성 시 44개 문서와 4개 허브의 렌더 함수, 토큰 참조, 팔레트 비율(colorRatio 합계 100)을 검증합니다. 다음 경우 빌드가 실패합니다: 컴포넌트끼리 useWhen·avoidWhen·tokenBindings·keyboardBehavior가 같음, 알 수 없는 토큰 바인딩, 없는 대안 문서, 코드 예제의 데모 전용 마크업, 기본 ScreenBrief의 스키마 불일치, `style.css`의 HEX. 제작 환경에서 DOM 기반 검색·탭·입력 검증·표 필터·정렬·페이지 이동·비동기 상태·양식 생성을 검사했습니다. 실제 브라우저 화면, 200% 글자 확대, 400% 브라우저 확대, 스크린리더, 실사용 성능은 별도로 검수해야 합니다. 접근성 인증을 주장하지 않습니다.

## 다크 모드 · English · 색상 규칙 (UX 개선)

- 헤더의 테마 토글 또는 `?theme=dark`로 다크 모드, KO/EN 토글 또는 `?lang=en`으로 영어 화면을 바로 볼 수 있습니다. 선택은 브라우저(localStorage)에만 저장됩니다.
- 영어 화면은 `dist/i18n-en.json`(문구 사전)과 `dist/spec.en.json`(전체 명세 영문판)을 사용합니다. 복사되는 AI 위임 프롬프트·계약 JSON도 영어로 나옵니다. 사전에 없는 문구는 한국어로 남으므로 새 문구를 추가하면 사전도 갱신하세요.
- 모든 색은 오렌지·차콜·웜그레이·화이트 팔레트 안에서만 씁니다. 상태색(성공·경고·오류)도 `--hds-status-*` 토큰이 팔레트 램프를 참조하며, 초록·노랑·빨강은 쓰지 않습니다. 의미는 아이콘·글자·채움 방식으로 함께 전달합니다.
- 새 토큰(이유·영향): `warm-800`(다크 입력 바탕), `bg.inverse`/`text.inverse`(Badge·Toast·Tooltip 차콜 면), `field.bg/border/border.hover`(연한 입력 필드), `action.primary.pressed.fg`, `status.*.border`. 모두 `generate.mjs`가 라이트·다크 대비 4.5:1을 검사합니다.
- 알려진 절충: 연한 입력 필드 경계는 인접 대비 3:1에 못 미칩니다(요청에 따른 선택). 내부 글자·placeholder는 4.5:1을 유지합니다.
