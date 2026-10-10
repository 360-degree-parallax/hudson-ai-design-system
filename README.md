# Hudson AI Web Design System

Hudson AI 웹 디자인 시스템 문서 사이트의 HTML·CSS·JavaScript 소스입니다.

배포된 사이트: https://hudson-ai-design-system.mcger.chatgpt.site (소유자 전용)

## 실행

Node.js 20 이상과 Python 3가 필요합니다. npm 의존성 설치는 필요하지 않습니다.

```sh
npm run setup   # Pretendard 다운로드 및 SHA-256 검증. 인터넷 필요.
npm run build   # 토큰·계약·44개 직접 진입 경로 생성
npm start       # http://localhost:8000
```

`dist/`를 정적 서버에 배포하세요. 폰트는 대용량 바이너리 대신 재현 가능한 설치 스크립트로 제공하며, setup 후 자체 호스팅됩니다. 라이선스는 `dist/assets/OFL.txt`입니다. setup 없이도 시스템 글꼴 폴백으로 문서를 사용할 수 있습니다.

## 편집할 파일

- `dist/app.js`: 페이지, 디자인 토큰 데이터, 컴포넌트 registry, 작동 예제
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

생성 시 44개 페이지 렌더 함수와 토큰 참조를 검증합니다. 제작 환경에서 DOM 기반 검색·탭·입력 검증·표 필터·정렬·페이지 이동·비동기 상태·양식 생성을 검사했습니다. 실제 브라우저 화면, 200% 글자 확대, 400% 브라우저 확대, 스크린리더, 실사용 성능은 별도로 검수해야 합니다. 접근성 인증을 주장하지 않습니다.
