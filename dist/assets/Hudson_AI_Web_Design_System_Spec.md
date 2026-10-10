# Hudson AI Web Design System

웹 디자인 시스템 문서 사이트 기획·구현·AI 위임 명세 v1.0 · 2026-10-10

## 0. 이 문서의 사용 방법

이 문서는 Hudson AI의 웹사이트와 웹 제품을 만드는 공통 시스템, 그리고 그 시스템을 설명하는 문서 웹사이트를 함께 정의한다. 실제 사이트 구현 전 사용할 실행 명세이며, 구현·배포 완료 보고가 아니다. 토스 TDS Mobile 문서의 정보 구조와 예제 중심 학습 방식을 참고하고, 첨부 이미지의 UX 판단 원칙과 AI 위임 원칙을 웹 환경에 적용했다.

비개발자는 1~4절로 방향을 결정하고, 디자이너는 5~10절로 화면을 설계하고, 개발자·AI는 11~16절로 구현한다. 값과 컴포넌트가 없는 경우 임의로 추가하지 말고 14절의 변경 절차를 따른다. 출시 전 15절의 수용 기준을 통과해야 한다.

현재 확정한 범위는 반응형 웹이다. iOS·Android 전용 API, 네이티브 폰트 확대 매핑, 모바일 앱의 하단 탭바를 기본 구조로 사용하지 않는다. 모바일 브라우저는 같은 웹의 좁은 화면 조건으로 지원한다. 기본 테마는 라이트, 차콜 미디어 작업 영역은 별도 inverse scope로 제공한다. 전체 다크 테마는 후속 범위다.

## 1. 기획 의도

**사람이 중요한 결정을 정의하고, AI가 검증된 토큰과 컴포넌트를 선택·조합해 일관된 웹을 만든다.**

Hudson의 인상은 정확함, 명료함, 작업 속도다. 흰색과 웜그레이가 정보 구조를 만들고, 차콜이 텍스트와 미디어를 지탱하며, #FD4D20이 다음 행동과 브랜드의 에너지를 드러낸다. 밝은 오렌지를 모든 제목·아이콘·테두리에 반복해 우선순위를 흐리지 않는다.

시스템의 사용자는 세 그룹이다. 디자이너는 적용 이유와 시각적 예외를 찾고, 개발자는 API·상태·접근성 계약을 찾으며, AI는 허용된 선택지와 검수 조건을 읽는다. 따라서 모든 문서 페이지에는 설명, 작동 예제, 기계가 읽는 명세가 함께 있어야 한다.

제품 기능 예시는 프로젝트 생성, 파일 업로드, 화자 분리, 번역·더빙 작업, 자막 검수, 라이브 언어 설정이다. 이는 UI 패턴을 검증하기 위한 예시이며, 실제 지원 기능·정확도·지연시간·요금으로 간주하지 않는다. 수치와 제품 약속은 검증된 제품 데이터만 사용한다.

## 2. 레퍼런스를 웹으로 개선하는 기준

| 참고 요소 | Hudson 웹 적용 | 실행 규칙 |
|---|---|---|
| 파운데이션·컴포넌트로 구분된 문서 | Foundations → Components → Patterns → AI Kit | URL과 탐색 메뉴를 같은 manifest에서 생성 |
| 추상화된 Typography 토큰 | 역할 이름을 가진 웹 타이포 토큰 | heading-xl, body-md 등의 토큰 사용, 임의 px 금지 |
| 다양한 네이티브 확대 대응 표 | 브라우저 확대·기본 글꼴 변경·리플로 대응 | rem, 단위 없는 line-height, 200%/400% 확대 검수 |
| 모바일 단일 작업 흐름 | 문서 3열, 제품 목록·편집 2~3영역 | 작은 화면에서는 같은 정보의 우선순위를 재배치 |
| BottomCTA·BottomSheet 등 | 작업 영역 내 ActionBar·Dialog·Inspector | 중요 CTA를 맥락 가까이 배치, 하단 고정은 필요할 때만 |
| 터치 중심 상태 | hover·focus-visible·키보드·선택 상태 추가 | hover만으로 기능을 노출하지 않음 |
| 단순 목록 | 웹 데이터 테이블·필터·검색·다중 선택 | 정렬·페이지 이동·일괄 작업의 상태 계약 제공 |
| 컴포넌트 모양 설명 | 사용 의도·API·비동기·실패 복구까지 문서화 | 모든 컴포넌트에 동일한 문서 템플릿 적용 |

구조와 학습 방식을 참고하되 토스 브랜드, 문구, 자산, 전용 패키지나 비공개 컴포넌트를 그대로 사용하지 않는다. 화면의 유사성보다 Hudson에서 실행 가능한 규칙을 우선한다.

## 3. UX 공식을 실행 규칙으로 바꾸기

첨부 자료에서 확인한 Hick, Fitts, Jakob, Proximity, Von Restorff를 다음과 같이 적용한다. 아래 개수와 간격은 Hudson의 초기 설계 기준이지 법칙 자체의 절대 수치가 아니다. 사용자 검증에 따라 변경할 수 있다.

| 원칙 | 화면 설계에서 물을 것 | 실행 규칙 | 확인 방법 |
|---|---|---|---|
| Hick | 지금 결정할 선택지는 무엇인가? | 핵심 액션을 먼저 보여주고 고급 옵션을 접는다. 긴 언어 목록에는 검색과 최근 사용 제공 | 첫 진입에서 다음 행동을 설명할 수 있는지 관찰 |
| Fitts | 중요한 조작이 쉽게 닿는가? | 일반 버튼 최소 높이 40px, 터치·주요 CTA 44px. 아이콘은 실제 클릭 영역을 확보 | 키보드와 포인터, 터치에서 접근·선택 가능 |
| Jakob | 이미 아는 웹 관습과 맞는가? | 로고는 시작 페이지, 링크는 이동, 버튼은 실행. 검색 Cmd/Ctrl+K, Esc는 팝업 닫기 | 사용자에게 새 조작법을 설명하지 않아도 수행 |
| Proximity | 무엇이 같은 그룹인가? | 그룹 내부 8~16px, 그룹 사이 24~32px. 라벨·필드·설명·오류는 같은 Field에 묶기 | 테두리를 제거해도 그룹 관계가 보이는지 확인 |
| Von Restorff | 지금 가장 중요한 하나는 무엇인가? | 하나의 작업 영역에서 solid primary는 원칙적으로 하나. 전체와 행별·모달 맥락을 구별 | 경쟁하는 CTA와 불필요한 오렌지 면을 확인 |

선택지를 무조건 삭제하지 않는다. 빈도가 낮은 설정은 progressive disclosure로 보존한다. 웹의 상단 버튼이 항상 나쁜 것도 아니다. 작업 영역과 가까운 위치, 화면 가림, 포인터 이동, 스크롤 조건을 함께 판단한다.

디자인 검토 순서: 사용자 목적 → 가장 중요한 정보 → 다음 행동 → 필요한 상태 → 그룹과 간격 → 시각적 마감. 장식부터 정하고 목적을 끼워 맞추지 않는다.

## 4. 문서 웹사이트 정보 구조와 레이아웃

### 4.1 탐색 구조

| 메뉴 | 페이지 | 대표 URL |
|---|---|---|
| Overview | 시스템 소개, 빠른 시작, 설계 원칙 | /overview, /getting-started |
| Foundations | Color, Typography, Spacing, Layout, Radius, Elevation, Motion, Iconography | /foundations/typography |
| Components | Button, Link, Field, TextInput, Select, Combobox, Checkbox, Radio, Switch, Tabs, Badge, Alert, Toast, Tooltip, Dialog, Drawer, Table, Pagination, Skeleton, Progress | /components/button |
| Patterns | DocsShell, ProductShell, Upload, AsyncJob, MediaWorkspace, LiveSession, EmptyState, ErrorRecovery | /patterns/async-job |
| Content & A11y | 용어·문장 규칙, 국제화, 접근성 | /guidelines/accessibility |
| AI Kit | ScreenBrief, 토큰 manifest, 컴포넌트 registry, 위임 프롬프트, 검수 | /ai-kit |
| Governance | 버전, 변경 이력, 기여, deprecated 항목 | /changelog |

홈은 한 줄 선언과 검색, 대분류 허브 타일, AI Kit 소개, 팔레트 비율, 자주 찾는 문서로 구성한다. 허브와 문서는 모두 같은 route manifest에서 생성한다.

### 4.2 문서 화면

- 상단 Global nav: 높이 64px, 로고 · 대분류 5개(파운데이션·컴포넌트·패턴·가이드·AI Kit) · 검색. 반투명 배경과 하단 1px 구분선. 스킵 링크는 첫 Tab에서 노출한다.
- 소메뉴는 탐색 막대에 두지 않는다. 각 대분류는 허브 페이지(/foundations, /components, /patterns, /guides)를 가지며, 그 본문에서 문서를 카드로 보여주고 분류 칩으로 거른다.
- 문서 페이지: Global nav 아래 48px sticky Local nav(페이지 제목 + 섹션 링크 + 위임 버튼). 좌측 탐색과 우측 목차는 두지 않는다.
- 본문 컨테이너 최대 72rem, 좌우 여백 1024px 이상 32px · 768–1023px 24px · 768px 미만 16px. 1024px 미만에서 대분류는 메뉴 버튼과 Drawer로 이동하고, Local nav 링크는 가로 스크롤한다.
- 페이지 하단: 같은 분류 안의 이전·다음 문서, 그리고 전체 문서를 나열한 사이트맵 푸터.
- 본문 설명은 최대 68ch, 예제와 API 표는 본문 영역 전체를 사용할 수 있다. sticky 영역의 top은 header 높이와 간격 토큰을 합산한다.
- 현재 대분류에 aria-current, Local nav의 현재 섹션에 aria-current="location"을 사용한다. sticky 영역이 초점을 가리지 않도록 scroll-padding-top을 두 막대 높이의 합으로 둔다.
- URL 직접 진입·새로고침·뒤로가기·해시 링크가 모두 작동한다. 예제의 선택 상태는 필요할 때 URL query로 공유한다.

### 4.3 모든 페이지의 공통 템플릿

Breadcrumb → 제목·한 문장 목적·상태(Stable/Beta/Deprecated) → 언제 사용하는가/피하는가 → 실제 예제 → 규칙과 해부도 → 상태 → API 표 → 접근성·반응형·국제화 → 잘못된 사용 → 코드 → AI 계약 → 변경 이력.

Preview / Code / Specification 탭은 동일한 데이터와 예제를 보여준다. Code 복사는 성공·실패를 알리고, Specification은 JSON 다운로드 및 복사를 제공한다. 외부 서비스가 없는 예제는 “데모 데이터”라고 명시한다. 실행되는 듯 보이는 가짜 다운로드·가짜 API 성공을 만들지 않는다.

Typography 페이지에는 한글/영문/혼합 예문, 역할별 크기·행간·굵기·CSS 토큰 표, 좁은 화면 토글, 긴 제목·200% 글자 확대 예시를 넣는다. 접근성 시연 토글은 사이트 전체 브라우저 확대를 대체하지 않는다.

## 5. 색상 시스템

### 5.1 Primitive

오렌지 램프는 #FD4D20(500)을 고정하고, 어두운 단계(600–900)는 OKLCH 색상각을 웜그레이 쪽(35°→50°)으로, 밝은 단계(50–400)는 피치 쪽으로 돌린다. 같은 색상각으로 명도만 낮추면 벽돌색·빨강으로 읽혀 웜그레이와 어울리지 않기 때문이다. 오류 빨강은 크림슨 쪽(약 18°)에 두어 브랜드 오렌지와 12° 이상 떨어뜨린다. 빌드는 이 색상각 규칙과 대비 쌍을 검사한다.

| 토큰 | 값 | 사용 |
|---|---|---|
| orange-50 | #FEF5EE | 가장 연한 브랜드 바탕 |
| orange-100 | #FFE9DB | 선택 상태 배경 |
| orange-200 | #FED4BE | 연한 강조 경계 |
| orange-300 | #FFB392 | 일러스트·차트 보조 |
| orange-400 | #FE8B64 | 일러스트·차트 보조 |
| orange-500 | #FD4D20 | 고정 브랜드 포인트·주요 행동 |
| orange-600 | #E8480B | 주요 행동 hover (차콜 글자 4.62:1) |
| orange-700 | #B34202 | 작은 브랜드 텍스트·pressed (흰 배경 5.68:1) |
| orange-800 | #8B3901 | 진한 강조 텍스트 |
| orange-900 | #662D03 | 가장 진한 강조 |
| warm-0 | #FFFFFF | 기본 surface |
| warm-50 | #FAF9F6 | 문서 전체 background |
| warm-100 | #F5F3EF | inset·hover surface |
| warm-200 | #E7E3DC | 장식 divider |
| warm-300 | #D2CCC3 | 비활성 테두리 |
| warm-500 | #78716C | 제한된 보조 텍스트 |
| warm-600 | #625B54 | 기본 secondary text |
| warm-700 | #4A443E | inverse 위의 경계·중립 강도 |
| warm-900 | #282521 | inverse surface |
| warm-950 | #171614 | 주요 텍스트·차콜 |

### 5.2 Semantic

| 의미 토큰 | 라이트 값 | inverse scope 값 |
|---|---|---|
| bg.canvas | warm-50 | warm-950 |
| bg.surface | warm-0 | warm-900 |
| bg.subtle | warm-100 | warm-700 |
| text.primary | warm-950 | warm-0 |
| text.secondary | warm-600 | warm-300 |
| text.muted | warm-600 | warm-300 |
| text.brand | orange-700 | orange-500 |
| border.subtle | warm-200 | warm-700 |
| border.control | warm-500 | warm-300 |
| action.primary.bg | orange-500 | orange-500 |
| action.primary.hover | orange-600 | orange-600 |
| action.primary.pressed | orange-700 | orange-700 |
| action.primary.fg | warm-950 | warm-950 |
| action.selected.bg | orange-100 | warm-700 |
| action.selected.fg | orange-700 | warm-0 |
| focus.ring | warm-950 | warm-0 |

화면 면적 기준 사용 비율은 바탕(warm-0·50) 60%, 구조(warm-100–600) 25%, 차콜(warm-900·950) 12%, 포인트(orange) 3%로 시작한다. 오렌지는 화면당 주요 행동 하나와 선택 상태에만 쓴다. 이 비율은 tokens.json의 colorRatio에 기록한다.

색은 primitive → semantic → component의 3단계로 참조한다. 화면 파일에서 HEX를 직접 사용하지 않는다. 실시간 상태·오류는 브랜드 컬러로 통합하지 않는다. 최소한의 상태색으로 danger #B61D3A / surface #FEEFF0, success #17643B / surface #EDF7F0, warning #805500 / surface #FFF7E0를 별도 정의한다. inverse에서는 더 밝은 foreground와 어두운 surface의 조합을 추가하고 실제 대비 테스트 후 활성화한다. 상태는 항상 텍스트·아이콘과 함께 보여준다.

### 5.3 대비와 금지 조합

WCAG 상대 휘도 공식으로 계산한 대비: #FD4D20 / #FFFFFF ≈ 3.36:1, #FD4D20 / #171614 ≈ 5.39:1, #E8480B / #171614 ≈ 4.62:1, #B34202 / #FFFFFF ≈ 5.68:1. 일반 텍스트는 최소 4.5:1, 큰 텍스트는 3:1을 기준으로 한다. 큰 텍스트는 대략 24 CSS px 이상 또는 18.67px 이상 굵은 텍스트다.

따라서 작은 흰색 글자가 들어가는 밝은 오렌지 버튼을 기본으로 만들지 않는다. 기본은 차콜 글자다. 흰 글자를 꼭 쓰는 변형은 orange-700 배경에 별도 컴포넌트 토큰으로 제공한다. #78716C는 흰 배경에서 약 4.798:1이지만 #F5F3EF에서 약 4.329:1이므로 모든 surface에 무조건 사용하지 않는다. 필수 입력 경계·아이콘 등에는 실제 인접 배경 대비 3:1을 검수하며, 약한 divider를 입력 경계로 재사용하지 않는다. hover·pressed·선택·투명도·inverse 조합도 개별 검수한다.

## 6. Typography

기본 글꼴은 Pretendard Variable을 정식 배포본에서 확보해 라이선스와 함께 self-host한다. 폴백은 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif. 코드는 ui-monospace, SFMono-Regular, Consolas, monospace. 외부 폰트 CDN 로딩을 필수로 두지 않는다. font-display: swap을 사용하고 폴백에 의한 레이아웃 이동을 확인한다.

| 역할 | 기본 font-size | line-height | weight | 사용 |
|---|---|---|---|---|
| display | clamp(2.5rem, 1.5rem + 3vw, 4rem) | 1.1 | 700 | 마케팅 히어로에 한정 |
| heading-xl | 3rem / 좁은 화면 2.25rem | 1.15 | 700 | 문서 H1 |
| heading-lg | 2.25rem / 좁은 화면 1.75rem | 1.2 | 700 | 섹션 H2 |
| heading-md | 1.5rem | 1.35 | 600 | H3 |
| heading-sm | 1.25rem | 1.4 | 600 | 패널·카드 제목 |
| body-lg | 1.125rem | 1.6 | 400 | 도입 설명 |
| body-md | 1rem | 1.6 | 400 | 본문·입력 |
| body-sm | .875rem | 1.5 | 400 | 테이블·설명 |
| label-md | .875rem | 1.4 | 600 | 버튼·라벨 |
| caption | .8125rem | 1.5 | 400 | 메타데이터 |
| code | .875rem | 1.6 | 400 | 코드·토큰 |

html font-size는 100%로 유지하고 62.5% 리셋을 하지 않는다. 표의 값은 루트 16px 기준이며 사용자 설정을 덮어쓰지 않는다. 제목에만 -0.02em 자간, 본문 기본 자간 0을 사용한다. 한글은 word-break: keep-all + overflow-wrap: anywhere로 긴 URL 등을 처리한다. 문단 전체 uppercase·양끝 정렬을 피한다.

텍스트 역할과 HTML 의미를 분리한다. 작은 시각적 제목도 논리적으로 H2일 수 있다. 화면에는 하나의 주 H1과 일관된 heading 순서를 둔다. 꼭 읽어야 하는 설명·오류를 11~12px로 축소하지 않는다. 표의 숫자는 tabular-nums, 단위와 열 제목을 제공한다. truncation을 쓰면 전체 값을 확인할 접근 가능한 경로를 제공한다.

고정 높이 텍스트 상자는 피한다. 버튼은 min-height로 구현해 줄바꿈을 허용한다. 200% 글자 확대와 400% 브라우저 확대에서 제목·버튼·라벨이 잘리지 않아야 한다. clamp 기반 display도 확대 검수를 통과해야 한다.

## 7. Spacing·Radius·Elevation·Layout

| 체계 | 허용 값 | 선택 기준 |
|---|---|---|
| spacing | 0, 4, 8, 12, 16, 24, 32, 48, 64, 96px | 아이콘-라벨 8, 필드 내부 12, 카드 24, 섹션 48~64 |
| radius | 0, 4, 8, 12, 16px, full | 코드 4, 입력·버튼 8, 카드 12, 모달 16, 아바타·상태점 full |
| elevation-0 | none | 일반 문서 카드·패널 |
| elevation-1 | 0 2px 8px rgb(23 22 20 / .08) | 떠 있는 작은 요소 |
| elevation-2 | 0 8px 24px rgb(23 22 20 / .12) | 메뉴·팝오버 |
| elevation-3 | 0 16px 48px rgb(23 22 20 / .18) | 모달 |
| z-index | base 0, sticky 100, dropdown 200, modal 300, toast 400, tooltip 500 | 레이어를 임의 9999로 덮지 않음 |

큰 카드마다 그림자를 붙이지 않는다. 기본 위계는 배경·선·간격으로 만든다. border 두께 1px, 포커스 outline 2px / offset 2px를 허용한다. 이러한 선 두께와 폰트 크기·아이콘 크기는 spacing scale의 예외다. 아이콘은 16·20·24px, 실제 클릭 영역은 컴포넌트 크기에 따른다.

ProductShell은 Header 64px, Nav 240px, 작업 Main, 필요 시 Inspector 320px로 시작한다. 1280px 미만에서는 Inspector를 Drawer로 전환하고, 1024px 미만에서는 Nav를 접는다. 편집기의 지원 최소 폭이 필요하면 Pattern 계약에 따로 기록한다. 기본 문서 사이트를 데스크톱 전용으로 막지 않는다.

12열 grid는 넓은 마케팅 레이아웃에, 일반 문서는 CSS Grid와 고정 탐색 폭에 사용한다. 모든 화면을 12열에 억지로 맞추지 않는다. 재사용 카드·패널의 내부 재배치는 container query로 처리할 수 있으며 viewport breakpoint와 목적을 구분해 기록한다.

## 8. 컴포넌트 계약

### 8.1 공통 상태

상태는 하나의 enum으로 모든 조합을 표현하지 않는다. interaction(default/hover/pressed/focus-visible), availability(enabled/disabled), async(idle/loading/success/error), selection(unselected/selected)를 직교 축으로 정의한다. 우선순위는 disabled → loading 동작 제한 → invalid/selected 의미 표시 → interaction이며, focus-visible은 키보드 포커스가 있는 동안 의미 표시와 함께 남는다.

| 컴포넌트 | 반드시 정의할 상태 | 동작 계약 |
|---|---|---|
| Button | default, hover, pressed, focus-visible, disabled, loading | type 기본 button. loading 중 중복 실행 차단, 라벨·폭 유지 |
| Field/TextInput | empty, filled, hover, focus, invalid, disabled, readOnly | label 연결, 설명·오류 id 연결, invalid에서 aria-invalid |
| Combobox | closed, open, filtering, no-result, selected, error | 검색, Arrow 이동, Enter 선택, Esc 닫기, 로딩 표시 |
| Tabs | selected, focus-visible, disabled | WAI-ARIA tabs 패턴, Arrow 이동, aria-controls 연결 |
| Dialog/Drawer | closed, open, submitting, error | 이름·설명, 초점 이동·가두기·복귀, 배경 비활성화 |
| Table | loading, data, empty, filtered-empty, error, selected | 실제 table 의미 구조, 정렬 버튼·aria-sort, 일괄 선택 |
| Upload | idle, dragover, validating, uploading, paused, complete, error, canceled | 선택 버튼 제공, 실제 progress, 실패 항목별 재시도 |
| AsyncJob | queued, running, succeeded, failed, canceling, canceled | 확정된 백엔드 상태로만 전이, 재시도 조건·취소 결과 명시 |

Button variants: primary / secondary / ghost / danger. sizes: sm(32px, 조밀한 보조 작업만), md(40px), lg(48px). touch UI에는 44px 이상을 확보한다. icon-only에는 accessibleName 필수, 비동기 loading에는 aria-busy와 상태 알림을 사용한다. sm을 주요 CTA에 사용하지 않는다.

disabled는 HTML disabled로 동작을 차단한다. 비활성 이유를 hover tooltip에만 넣지 않고 인접 설명으로 제공한다. 로딩 중 초점 보존이 필요한 경우 aria-disabled로 표시하며 click·키보드 이벤트를 모두 차단한다. 사용자가 오류를 고칠 수 있는 입력은 오류 때문에 disabled로 만들지 않는다.

폼은 blur 또는 제출 시 검증하고 이후에는 입력에 따라 오류를 해소한다. 제출 실패 시 오류 요약과 첫 잘못된 필드로의 이동 경로를 제공한다. placeholder는 label을 대체하지 않는다. readOnly와 disabled를 시각·동작상 구분한다.

Tooltip은 설명용이며 필수 정보나 인터랙티브 콘텐츠를 담지 않는다. 클릭·키보드로 조작해야 하는 내용은 Popover로 분리한다. Toast는 보조 확인에 사용하고 중요한 실패는 본문 Alert로 남긴다. 메뉴와 dialog의 초점·Esc·중첩 동작은 접근성 primitive의 검증된 패턴을 사용한다.

### 8.2 Button API 예시

```ts
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};
// 링크는 별도 Link 컴포넌트로 제공한다. onClick으로 URL 이동을 흉내 내지 않는다.
// native button 속성·ref 전달은 실제 구현에서 충돌 없이 합성한다.
```

variant별 색, 모든 상태, 줄바꿈, icon, submit 동작을 Storybook 또는 동등한 예제 환경에서 재현한다. 구현에서는 접근성 이름이 누락된 icon-only 버튼을 lint/테스트로 차단한다.

## 9. Hudson 도메인 패턴

### Upload

큰 Dropzone + “파일 선택”을 함께 제공한다. 지원 형식·최대 크기는 제품 설정에서 가져와 선택 전 표시한다. 서버에서도 검증한다. 파일별 진행·취소·재시도와 완료 목록을 보여준다. 드래그만으로 동작하게 하지 않는다. 클라이언트 파일명·MIME을 신뢰해 서버 처리를 결정하지 않는다.

### MediaWorkspace

미디어 Preview는 차콜 inverse 영역, Timeline은 작업 영역, Transcript는 텍스트 검수 영역, Inspector는 선택한 화자·언어 설정 영역이다. 색상만으로 화자를 구별하지 않고 이름·번호를 함께 사용한다. 파형 canvas에는 비시각적 대체 정보와 DOM 기반 재생·탐색 컨트롤을 제공한다. 자동 재생 소리는 기본 금지한다. 단축키 목록과 충돌 회피 규칙을 제공한다.

### AsyncJob

진행 단계와 완료율을 구분한다. 백엔드가 percent를 제공하지 않으면 indeterminate progress와 “번역 중” 같은 단계 텍스트를 표시한다. 임의로 99%까지 증가시키지 않는다. estimate가 있으면 예상치임을 명시한다. 종료 상태에서 polling을 중지하고 탭 복귀 시 갱신한다. 재시도는 idempotency와 중복 과금·작업 생성 여부를 고려한다. 실제 정책 없이는 무료 재시도를 약속하지 않는다.

### LiveSession

연결 상태, 언어, 지연·품질의 측정 기준, 마지막 갱신 시각, 복구 행동을 제공한다. “실시간”이라는 단어만으로 연결을 보장하지 않는다. 끊김 → 재연결 → 복구·실패를 구분하고 사용자가 확인해야 할 영향 범위를 표시한다. 색상점 하나로 연결 상태를 전달하지 않는다.

### Table·EmptyState·ErrorRecovery

기본 밀도 comfortable(행 min-height 48px), 선택적 compact(40px). 행 높이는 긴 내용·글자 확대에 맞게 늘어난다. 선택·행 이동·메뉴 버튼을 서로 중첩하지 않는다. 빈 데이터, 검색 결과 없음, 권한 부족, 통신 실패를 같은 화면으로 취급하지 않는다. 재시도 가능 실패에는 재시도 버튼과 입력·선택 보존을 제공한다. 삭제와 세션 종료 등 복구 어려운 작업은 영향을 명시한 확인 Dialog를 제공한다.

## 10. Motion·Content·접근성·국제화

Motion duration: instant 0ms, fast 120ms, standard 180ms, slow 240ms. 기본 easing cubic-bezier(.2,0,0,1). 색·opacity·transform 중심으로 사용하며 레이아웃을 흔드는 반복 모션을 피한다. prefers-reduced-motion에서는 이동·확대·반복을 제거하고 상태 전달은 유지한다. 정보성 진행 상태까지 숨기지 않는다.

문구는 동사와 대상을 명확히 한다: “확인”보다 “프로젝트 생성”, “실패했습니다”보다 “파일 업로드를 완료하지 못했어요. 네트워크를 확인하고 다시 시도하세요.” 실제 원인이 확인되지 않으면 원인을 추정해서 단정하지 않는다. 버튼의 완료 약속은 작업 상태와 일치해야 한다.

접근성 목표는 WCAG 2.2 AA. 키보드 전체 작업, visible focus, focus가 sticky 영역에 가리지 않기, skip link, 시맨틱 landmark, 이름·역할·값, 상태 알림, 화면 확대, 색 이외 정보 전달을 검수한다. 목표 클릭 크기 44px는 Hudson의 권장 기본값이다. WCAG 2.5.8의 AA 최소는 24×24 CSS px 또는 명시된 간격·예외 조건이며 두 기준을 혼동하지 않는다.

문서는 lang="ko"로 시작하고 영어 전용 영역에는 적절한 lang을 적용한다. 라이브러리는 문자열을 외부에서 주입 가능하게 만든다. 시간·숫자·통화는 Intl API와 명시적인 timezone으로 처리한다. 날짜를 “10/11”만으로 표시하지 않는다. 텍스트가 50% 길어지는 조건과 한글·영문 혼합을 검수한다. layout에는 margin-inline 등 logical property를 우선해 RTL 확장에 대비한다.

## 11. 구현 구조

권장 초기 스택은 React + TypeScript + Vite, CSS custom properties + CSS Modules, MDX 문서, React Router, Storybook, Vitest + Testing Library, Playwright + axe-core다. 이는 프로젝트의 제안 스택이며 현재 설치되었다고 가정하지 않는다. 기존 저장소가 있다면 그 스택과 버전을 우선한다. 새 프로젝트의 의존성 버전은 구현 시 공식 문서와 지원 범위를 확인하고 lockfile에 고정한다. backend가 필요 없는 문서 사이트는 정적 빌드를 기본으로 한다.

```text
packages/tokens/      원본 JSON, 검증, 생성 CSS·TS
packages/ui/          공통 컴포넌트, 타입, stories, 동작 테스트
packages/contracts/   ScreenBrief·ComponentContract JSON Schema
apps/docs/           문서 라우트, MDX, 검색, playground
apps/examples/       Hudson 패턴 예제
tests/e2e/           키보드·라우팅·확대·반응형 검수
```

위 경로는 제안 구조다. 실제 저장소가 단일 앱이면 src/tokens, src/components, src/docs 등으로 유지하되 같은 책임 분리를 지킨다. UI 패키지는 문서 앱을 import하지 않는다. public export만 사용하고 내부 구현 경로를 화면에서 직접 import하지 않는다.

토큰 JSON을 유일한 원본으로 사용하고 빌드에서 CSS·TS·문서 표를 생성한다. semantic alias의 존재·순환 참조·타입·색상 대비 조합을 검증한다. component registry에서 props 표·검색 인덱스·AI manifest를 생성해 수작업 문서와 코드가 어긋나지 않게 한다.

검색은 정적 생성된 문서 제목·설명·키워드·토큰 이름을 대상으로 한다. 데이터 규모에 맞는 클라이언트 검색을 사용하고 결과에 문서 이름과 위치를 보여준다. no-result·로딩·키보드 이동을 제공한다. Cmd/Ctrl+K는 입력 충돌을 고려한다. 선택 시 실제 라우트로 이동하고 초점을 본문 제목에 전달한다.

코드 블록은 빌드 시 highlight하고 동적 실행 코드를 eval로 실행하지 않는다. Playground는 사전에 등록한 예제와 허용 props만 조절한다. 클립보드 기능은 HTTPS와 브라우저 권한 실패를 처리하고 수동 선택 폴백을 제공한다.

보안: 비밀키·실제 업로드 데이터·개인정보를 예제 bundle에 넣지 않는다. MDX는 신뢰된 저장소 콘텐츠만 빌드하고 임의 사용자 HTML을 실행하지 않는다. 실제 업로드·API 데모를 연결할 경우 인증·권한·rate limit·서버 검증·보관 정책을 별도 설계한다. 데모 로그에 원문 파일과 민감한 내용을 남기지 않는다.

## 12. 토큰·반응형 CSS 시작 예시

다음은 구조 예시다. 최종 코드는 토큰 원본에서 생성하며 아래 CSS를 별도 원본으로 관리하지 않는다. spacing 토큰 이름은 px 값을 그대로 쓴다(`--hds-space-16` = 16px = 1rem).

```css
:root {
  --hds-color-orange-500: #fd4d20;
  --hds-color-orange-700: #b34202;
  --hds-color-warm-0: #fff;
  --hds-color-warm-50: #faf9f6;
  --hds-color-warm-950: #171614;
  --hds-bg-canvas: var(--hds-color-warm-50);
  --hds-bg-surface: var(--hds-color-warm-0);
  --hds-text-primary: var(--hds-color-warm-950);
  --hds-action-primary-bg: var(--hds-color-orange-500);
  --hds-action-primary-fg: var(--hds-color-warm-950);
  --hds-space-16: 1rem;   /* 이름 = px 값 */
  --hds-space-24: 1.5rem;
  --hds-space-32: 2rem;
  --hds-radius-control: .5rem;
  --hds-font-body-md: 1rem;
  --hds-line-body-md: 1.6;
}
html { font-size: 100%; }
body { color: var(--hds-text-primary); background: var(--hds-bg-canvas); }
.docs-shell {
  display: grid;
  grid-template-columns: 15rem minmax(0, 1fr) 12rem;
  gap: var(--hds-space-32);
  max-width: 90rem;
  margin-inline: auto;
  padding-inline: var(--hds-space-32);
}
.docs-main { min-width: 0; }
.prose { max-width: 68ch; overflow-wrap: anywhere; }
.code-scroll { max-width: 100%; overflow-x: auto; }
.button {
  min-height: 2.5rem;
  padding: .625rem 1rem;
  border-radius: var(--hds-radius-control);
  white-space: normal;
}
.button:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
@media (max-width: 79.999rem) {
  .docs-shell { grid-template-columns: 14rem minmax(0, 1fr); }
  /* 오른쪽 목차는 본문 상단의 접이식 목차로 옮긴다. 단순히 삭제하지 않는다. */
}
@media (max-width: 63.999rem) {
  .docs-shell { grid-template-columns: minmax(0, 1fr); padding-inline: var(--hds-space-24); }
  /* 왼쪽 탐색은 접근 가능한 Drawer로 전환한다. */
}
@media (max-width: 47.999rem) {
  .docs-shell { padding-inline: var(--hds-space-16); }
}
@media (prefers-reduced-motion: reduce) {
  .motion-element { transition-duration: 0ms; animation: none; }
}
```

미디어쿼리 전환은 DOM·접근성 상태 변경과 함께 구현한다. CSS로 감추기만 해서 같은 navigation이 두 번 읽히거나 화면 밖에 포커스가 남지 않도록 한다. spacing의 rem은 사용자 글꼴 설정에 함께 대응하며 보더 등은 px로 유지할 수 있다.

## 13. AI가 읽는 명세

### 13.1 ScreenBrief 입력 양식

```json
{
  "schemaVersion": "1.0.0",
  "systemVersion": "1.0.0",
  "screenId": "docs.typography",
  "purpose": "역할별 타이포 토큰을 선택하고 적용한다",
  "audience": ["designer", "developer", "ai"],
  "primaryAction": {"label": "명세 복사", "actionId": "copy-spec"},
  "secondaryActions": ["copy-code", "change-preview-locale"],
  "layout": "DocsShell",
  "density": "comfortable",
  "theme": "light",
  "contentPriority": ["purpose", "preview", "tokens", "rules", "api"],
  "requiredStates": ["ready", "search-empty", "copy-success", "copy-error"],
  "dataSource": "static-registry",
  "responsivePolicy": "docs-default",
  "acceptanceCriteria": ["keyboard-complete", "no-page-overflow", "contrast-aa"]
}
```

위 JSON은 설명용 예시다. 실행 가능하게 하려면 JSON Schema에 required, enum, 추가 속성 허용 여부, schemaVersion 검증을 선언하고 validator를 CI에서 실행한다. actionId는 실제 event handler registry에 존재해야 한다. 제품 화면 Brief에는 데이터 모델·권한·상태 전이·API 실패 정책을 추가한다.

### 13.2 ComponentContract 필수 필드

id, version, status, purpose, useWhen, avoidWhen, props, variants, stateAxes, statePrecedence, tokenBindings, keyboardBehavior, accessibility, responsiveBehavior, i18nBehavior, events, examples, acceptanceCriteria, deprecatedReplacement.

각 prop에는 이름·type·default·required·설명을 기입한다. 토큰 바인딩에는 어떤 상태의 어떤 CSS 속성을 어느 semantic token에 연결하는지 기록한다. allowedComponents와 allowedTokens는 실제 export·토큰 데이터에서 생성하고 모든 예제의 참조 유효성을 빌드에서 확인한다.

### 13.3 그대로 전달할 구현 지시문

> Hudson AI Web Design System v1.0을 구현하세요. 먼저 저장소의 구조·AGENTS.md·의존성을 확인하고 기존 기술 스택을 유지하세요. 이 명세와 tokens/registry/ScreenBrief를 기준으로 DocsShell, Foundations, Components, Patterns, AI Kit를 구성하세요. 토스 문서의 탐색·설명·예제 구조를 참고하고 Hudson의 #FD4D20·차콜·웜그레이·화이트 토큰을 적용하세요. 모바일 앱의 네이티브 확대 규칙이나 하단 탭바를 기본으로 사용하지 마세요. 모든 컴포넌트는 기존 export와 semantic token에서 선택하세요. 검색·라우팅·복사·상태 전환·키보드 조작을 실제로 작동하게 하세요. 데이터가 없는 예제는 데모라고 표시하세요. 색·간격·곡률·그림자·새 컴포넌트를 임의로 추가하지 마세요. 누락된 요구는 명세의 변경 절차로 해결하고 이유를 기록하세요. 문서와 API를 같은 원본에서 생성하고 구현 후 15절의 수용 기준을 검사하세요. 결과에는 변경 파일·실행 명령·검증 결과·미해결 항목을 기록하세요.

### 13.4 AI의 선택 순서

1. 목적·사용자·primaryAction·데이터·권한을 확인한다.
2. 기존 Pattern에서 Layout을 선택한다.
3. 기존 Component·variant·state를 선택한다.
4. semantic token을 바인딩한다.
5. 반응형·키보드·비동기·실패·긴 텍스트를 구현한다.
6. 실제 화면과 계약을 검수한다.
7. 필요 항목이 없으면 누락을 기록하고 최소 변경안으로 registry에 추가한다.

AI가 자유롭게 바꿀 수 있는 것: 실제 제품 데이터에 맞는 문구, 허용된 토큰·variant 선택, 기존 패턴의 조합. 변경 검토가 필요한 것: 새 토큰, public API, 새 패턴, 접근성 동작, 파괴적 액션 정책. 한 화면의 미관을 위해 시스템 전체를 바꾸지 않는다.

## 14. 버전·유지보수·예외

토큰·컴포넌트·문서에 같은 시스템 버전을 표시한다. patch는 버그 수정, minor는 호환되는 추가, major는 토큰 삭제·API 변경 등 호환성 변경에 사용한다. Deprecated 항목은 replacement와 migration 예제를 제공하고 제거 시점을 기록한다.

변경 절차: 사용 시나리오·기존 시스템으로 해결 못하는 이유 작성 → 최소 추가안과 영향 범위 작성 → tokens/registry/schema 갱신 → 예제·테스트·문서 갱신 → 리뷰와 변경 이력. AI는 검토 가능한 변경을 먼저 작성하고 저장소의 리뷰 정책을 따른다. 예외는 exceptionId, reason, scope, owner, reviewDate를 기록한다. 임의 inline style이나 HEX를 예외라는 이름으로 숨기지 않는다.

완료 정의: 동작하는 구현, 상태 예제, 문서, 계약, 접근성·반응형 검수, 변경 이력이 함께 존재한다. 디자인 화면만 있고 버튼·라우팅이 연결되지 않은 결과는 완료로 간주하지 않는다.

## 15. 수용 기준과 테스트

| 영역 | 통과 기준 | 검증 |
|---|---|---|
| 라우트 | 직접 진입·새로고침·뒤로가기·해시 링크 정상, 존재하지 않는 경로 404 | E2E |
| 검색 | Cmd/Ctrl+K, 키보드 탐색, 결과 이동, 결과 없음·Esc 처리 | E2E + 수동 |
| 복사 | HTTPS 환경 성공 및 권한 거부 실패를 알림, 수동 폴백 | 브라우저 테스트 |
| 토큰 | 알 수 없는 참조·alias 순환 없음, 화면 HEX·임의 간격 없음 | schema + lint |
| 대비 | 텍스트 4.5:1, 큰 텍스트 3:1, 정보성 UI 인접 대비 3:1 | 계산 + axe + 시각 확인 |
| 반응형 | 360/768/1024/1440/1920px에서 페이지 전체 가로 스크롤 없음 | Playwright viewport |
| 확대 | 200% 글자 확대, 400% 브라우저 확대에서 정보·작업 유실 없음 | 실제 브라우저 수동 검수 |
| 키보드 | 모든 작업 가능, 초점 순서·복귀·Esc 정상, 초점 가림 없음 | 키보드 수동 + E2E |
| 컴포넌트 | 명세에 있는 상태·긴 라벨·invalid+focus·loading 중 재실행 검수 | stories + 동작 테스트 |
| 테이블 | 정렬·선택·빈 결과·실패 처리, 좁은 화면 독립 스크롤 | E2E |
| 비동기 | 실패·취소·재시도·중복 방지, 가짜 진행률 없음 | mock API 통합 테스트 |
| 문서 | props·예제·JSON이 실제 registry와 일치 | 빌드 검증 |
| 국제화 | 한영 혼합·텍스트 50% 확장·긴 URL에서 잘림 없음 | fixtures + 시각 확인 |
| 모션 | reduced-motion에서 반복·큰 이동 없음, 상태 정보 유지 | 미디어 설정 테스트 |
| 보안 | 비밀키·민감 데이터·eval·임의 HTML 실행 없음 | 코드 리뷰 |

400% 확대는 예를 들어 1280px 폭 창에서 유효 폭 약 320 CSS px 조건을 포함한다. 데이터 테이블·타임라인·코드처럼 2차원 구조가 필요한 영역은 독립적인 가로 스크롤을 허용하되 제목·설명·주요 행동은 리플로되어야 한다. automated axe 통과만으로 접근성 전체 통과라고 보고하지 않는다.

성능 초기 예산: 기본 문서 진입의 압축 JS 200KB 이하를 목표로 잡고 대형 playground·syntax 기능은 필요 시 로딩한다. 폰트·이미지에 크기와 로딩 정책을 설정한다. 모바일·데스크톱을 나누어 실사용 75백분위로 판단하는 Core Web Vitals 목표는 LCP ≤2.5초, INP ≤200ms, CLS ≤0.1이며, 실사용 데이터가 없으면 측정 조건을 명시한 실험실 결과만 보고한다. 성능 예산은 프로젝트 환경 확인 후 조정한다.

지원 브라우저는 구현 당시 최근 2개 안정 버전의 Chrome·Edge·Firefox·Safari, 모바일 Safari·Chrome을 기준으로 명시한다. 특정 CSS·clipboard·dialog 동작의 지원은 구현 시 확인한다.

## 16. 구현 순서와 납품 범위

1. 시스템 기반: tokens JSON·CSS·TS, schema, color 대비, typography·spacing·radius.
2. 문서 골격: DocsShell, route manifest, 실제 검색, 제목·목차·해시·404.
3. 대표 페이지: Typography와 Color, 미리보기·코드·명세 복사, 반응형.
4. 핵심 컴포넌트: Button, Field, Input, Combobox, Tabs, Dialog, Alert, Table, Progress.
5. Hudson 패턴: Upload, AsyncJob, MediaWorkspace, LiveSession. 실제 서비스 없이 데모로 재현.
6. AI Kit: ScreenBrief 양식·JSON Schema·registry·위임 지시문·검수표 다운로드.
7. 품질 검수: 키보드·확대·상태·실패·긴 텍스트, 버전·변경 이력.

최종 납품에는 실행 가능한 문서 웹 소스, 생성된 토큰, 컴포넌트 public API, 타입·schema, 데모 데이터, 테스트, README 실행 지침, 변경 이력을 포함한다. backend 연동과 공개 배포는 별도 범위로 명시한다. 첫 단계가 끝났다는 이유로 전체 시스템 구현 완료라고 보고하지 않는다.

## 참고와 근거

- Toss TDS Mobile Typography: https://tossmini-docs.toss.im/tds-mobile/foundation/typography/ — 메뉴 구조, 역할별 토큰, 하드코딩 회피와 텍스트 확대 설명을 참고. 제공 URL의 HTML 본문을 직접 확인했다.
- 사용자 첨부 UX 이미지 6장: Hick·Fitts·Jakob·Proximity 및 요약의 Von Restorff. 개별 Von Restorff 상세 페이지는 첨부에 없으므로 강조 규칙은 이 문서의 설계 제안이다.
- 사용자 첨부 AI UI 이미지 8장: Color 역할, 재사용 컴포넌트, State, Spacing, Radius, Shadow, 판단 기준을 시스템에 고정하는 원칙.
- W3C Contrast Minimum: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- W3C Target Size Minimum: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- 나머지 값·기술 구조·초기 성능 예산은 Hudson 웹을 위한 설계 제안이며 토스의 공식 규칙이나 현재 Hudson 서비스 사양으로 주장하지 않는다.

- Web Vitals 공식 설명: https://web.dev/articles/vitals
- W3C Modal Dialog Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- W3C Reflow: https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
- Vite 공식 시작 가이드: https://vite.dev/guide/
