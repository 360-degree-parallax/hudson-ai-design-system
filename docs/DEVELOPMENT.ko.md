# Hudson AI Design System — 개발·권한 설정

배포 URL: https://hudson-ai-design-system.66everlast99.workers.dev/  
소스 저장소: https://github.com/360-degree-parallax/hudson-ai-design-system

## 1. 로컬 / Cloud Agent에서 실행

```sh
npm ci          # 잠금 파일에 맞춰 의존성 설치
npm run setup   # Pretendard 폰트 (최초 1회, 네트워크 필요)
npm run build
npm run check
npm start       # README 기본: http://localhost:8000
```

Cloud Agent 환경(`.cursor/environment.json`)은 빌드 후 **8847** 포트에서 문서를 띄웁니다.

## 2. GitHub 권한 (Cursor Cloud Agent)

에이전트가 이 저장소에 **push**하려면:

1. Cursor의 GitHub 연결에서 개인 계정 `360-degree-parallax`에 설치된 Cursor 앱의 저장소 접근 목록에 `hudson-ai-design-system`을 추가합니다.
2. 새 Cloud Agent를 만들 때 GitHub 저장소 `360-degree-parallax/hudson-ai-design-system`을 직접 선택합니다. Origin 저장소 `66everlast99/hudson-ai-kit`은 별도 저장소입니다.
3. 로그인 계정의 저장소 Write 이상 권한을 확인합니다.

`.cursor/environment.json`은 의존성 설치와 미리보기 실행을 설정합니다. GitHub 토큰이나 push 권한을 발급하지 않습니다. 저장소 선택, 네트워크 허용 목록, 포트 포워딩은 Cursor 환경 설정에서 확인하세요. 이 저장소는 개인 계정 소유이므로 조직 SSO 승인은 해당하지 않습니다.

## 3. Cloudflare Workers 배포 권한

Worker 이름: `hudson-ai-design-system` (`wrangler.jsonc`)

### A. GitHub Actions (대체 배포 방식)

Cloudflare 대시보드의 Git 연동 자동 배포가 이미 활성화되어 있다면 이 워크플로와 중복 배포될 수 있습니다. 하나의 자동 배포 경로를 선택하세요. 이 워크플로는 아래 시크릿을 등록해야 동작합니다.

Repository **Settings → Secrets and variables → Actions**에 추가:

| Secret | 설명 |
|--------|------|
| `CLOUDFLARE_API_TOKEN` | Workers Scripts **Edit** + Account **Read** 권한 API 토큰 |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 대시보드 → Workers → 우측 Account ID |

`main`에 push하면 `.github/workflows/deploy-workers.yml`이 `dist/`를 배포합니다.

### B. Cursor 환경 시크릿 (에이전트가 CLI로 배포할 때)

동일한 이름으로 Cursor **Environment secrets**에 등록하면 `npm run deploy`를 에이전트가 실행할 수 있습니다.

로컬/VM에서 직접 배포:

```sh
npm ci
npm run setup
export CLOUDFLARE_API_TOKEN=...
export CLOUDFLARE_ACCOUNT_ID=...
npm run deploy
```

## 4. 편집 위치

README와 `CLAUDE.md`를 참고하세요. UX·토큰·컴포넌트 데이터는 주로 `dist/app.js`, 스타일은 `dist/style.css`, 생성물은 `npm run build` 후 갱신됩니다.
