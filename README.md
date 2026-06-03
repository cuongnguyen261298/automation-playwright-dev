# 🎭 Playwright Automation Framework

A comprehensive end-to-end testing framework built with [Playwright](https://playwright.dev/) and TypeScript. This project covers **GUI automation**, **API testing**, **visual regression testing**, **performance testing (K6)**, and **AI-powered testing** (ZeroStep & Ollama).

---

## 📑 Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Reporters](#reporters)
- [Environment Configuration](#environment-configuration)
- [CI/CD](#cicd)
  - [GitHub Actions](#github-actions)
  - [Jenkins](#jenkins)
- [AI Integrations](#ai-integrations)
- [Performance Testing (K6)](#performance-testing-k6)
- [License](#license)

---

## Prerequisites

| Tool       | Version   | Notes                          |
|------------|-----------|--------------------------------|
| Node.js    | >= 20.x   | LTS recommended                |
| npm        | >= 10.x   | Bundled with Node.js           |
| Git        | >= 2.x    |                                |

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/cuongnguyen261298/automation-playwright-dev.git
cd automation-playwright-dev
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Install Playwright browsers

```bash
npx playwright install --with-deps
```

### 4. Set up environment variables

The project uses `dotenv` to manage environment-specific variables. Environment files are stored in `src/env/`:

```
src/env/.env.production   # default environment
src/env/.env.develop       # development (create as needed)
src/env/.env.staging       # staging (create as needed)
```

To use a specific environment, set the `NODE_ENV` variable before running tests:

```bash
NODE_ENV=develop npx playwright test
```

If `NODE_ENV` is not set, the framework defaults to **production**.

### 5. Verify installation

```bash
npx playwright test --list
```

This should list all discovered test specs without executing them.

---

## Project Structure

```
playwright-demo/
├── .github/workflows/          # GitHub Actions CI workflow
│   └── playwright.yml
├── .husky/                     # Git hooks (pre-commit linting/formatting)
├── src/
│   ├── .auth/                  # Stored authentication states (git-ignored)
│   ├── constants/              # Shared constants
│   ├── core/                   # Framework core (base test, global setup, shared data)
│   │   ├── baseTest.ts
│   │   ├── globalSetup.ts
│   │   └── sharedUserData.ts
│   ├── env/                    # Environment variable files (.env.*)
│   ├── fragments/              # Reusable page fragments / components
│   ├── interfaces/             # TypeScript interfaces
│   ├── pages/                  # Page Object Model (POM) classes
│   │   ├── BasePage/
│   │   ├── Saucedemo/
│   │   ├── GUI-Automation/
│   │   ├── Jsonplaceholder/
│   │   └── ...
│   ├── testData/               # Test data files
│   ├── tests/                  # Test specs organized by feature
│   │   ├── ApiTest/
│   │   ├── GUI_Automation/
│   │   ├── Saucedemo/
│   │   ├── VisualTestingExample/
│   │   ├── K6-Performance/
│   │   ├── Algorithm/
│   │   └── ...
│   └── utils/                  # Utility helpers
├── playwright.config.ts        # Default Playwright config (local)
├── ci.playwright.config.ts     # CI-specific Playwright config
├── Jenkinsfile                 # Jenkins pipeline definition
├── package.json
└── README.md
```

---

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run all tests in headed mode (visible browser)

```bash
npm run test:production
```

### Run a specific test file

```bash
npx playwright test src/tests/Saucedemo/login.test.ts
```

### Run a specific test file with debug mode

```bash
npx playwright test src/tests/Saucedemo/login.test.ts --debug
```

### Run tests by grep (test title)

```bash
npx playwright test --grep "login"
```

### Run with a specific config (CI config)

```bash
npx playwright test -c ci.playwright.config.ts
```

---

## Reporters

The framework is configured with two reporters by default:

| Reporter            | Description                                        |
|---------------------|----------------------------------------------------|
| `line`              | Concise terminal output (built-in)                 |
| `allure-playwright` | Rich HTML report via [Allure](https://allurereport.org/) |

### View the built-in Playwright HTML report

```bash
npx playwright show-report
```

### Generate & view Allure report

```bash
# Run tests with Allure reporter
npx playwright test --reporter=allure-playwright

# Generate and open the Allure report (requires Allure CLI)
npx allure generate allure-results -o allure-report --clean
npx allure open allure-report
```

---

## Environment Configuration

| File                       | Purpose                             |
|----------------------------|-------------------------------------|
| `playwright.config.ts`     | Local development config            |
| `ci.playwright.config.ts`  | CI pipeline config (dynamic workers)|

Key differences in CI config:
- `workers` is set dynamically: `process.env.CI ? 1 : undefined`
- `video.size` is explicitly set to `1920×1080`

---

## CI/CD

### GitHub Actions

The workflow is defined in [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml).

#### Triggers

| Trigger    | Details                                          |
|------------|--------------------------------------------------|
| `push`     | Runs on every push to the `main` branch          |
| `schedule` | Runs automatically every **Saturday at 12:00 UTC** |

> **Note:** Pull request triggers are currently commented out — uncomment `pull_request` in the workflow to enable them.

#### Pipeline steps

1. **Checkout** — clones the repository
2. **Setup Node.js 20** — with npm cache enabled
3. **Install dependencies** — `npm ci`
4. **Install Playwright browsers** — `npx playwright install --with-deps`
5. **Run tests** — `npx playwright test`
6. **Upload report artifact** — Playwright HTML report saved for 30 days

#### 🔍 Where to trace testing output

You can trace CI test results in **three places** on GitHub:

1. **Live console logs (real-time)**
   - Go to your repository → **Actions** tab
   - Click the relevant workflow run → click the **`test`** job
   - Expand the **"Run Playwright tests"** step to see the full terminal output (pass/fail per test, error messages, stack traces)

2. **Downloadable Playwright HTML report (artifact)**
   - On the same workflow run page, scroll to the bottom → **Artifacts** section
   - Download the **`playwright-report`** artifact (`.zip`)
   - Unzip and open `index.html` in your browser for a rich, interactive report with traces, screenshots, and videos

3. **GitHub Actions summary**
   - The workflow run summary page shows overall status (✅ passed / ❌ failed), duration, and any annotations

> **Tip:** The report artifact is retained for **30 days** (configured via `retention-days`). You can adjust this in the workflow file.

---

### Jenkins

The pipeline is defined in [`Jenkinsfile`](Jenkinsfile). It runs inside a `node:23.11.0` Docker container and provides **parameterized builds**:

| Parameter          | Options                              | Default      |
|--------------------|--------------------------------------|--------------|
| `TEST_ENVIRONMENT` | `develop`, `staging`, `production`   | `develop`    |
| `BROWSER`          | `chromium`, `webkit`, `firefox`      | `chromium`   |
| `BRANCH_NAME`      | Any branch name                      | `develop`    |
| `TEST_FILE`        | Test file or folder path             | `src/tests`  |

Uses `ci.playwright.config.ts` with 3 parallel workers.

---

## AI Integrations

### 1. ZeroStep

AI-powered test step generation using natural language.

- Install dependency: included in `package.json` (`@zerostep/playwright`)
- **Requires** a ZeroStep API key in `zerostep.config.json`
- Example test: `src/tests/playwright-zerostep-test.spec.ts`

### 2. Ollama

Local LLM integration for AI-powered assertions and image analysis.

```bash
# Install Ollama to your local machine
# Download from: https://ollama.com/download

# Verify Ollama is running
curl http://localhost:11434

# Pull the llava model (for image analysis)
ollama run llava
```

- npm dependency: included in `package.json` (`ollama`)
- Example test: `src/tests/playwright-ollama-tests.spec.ts`

---

## Performance Testing (K6)

Run K6 performance scripts:

```bash
k6 run <path-to-script>
```

K6 test scripts are located in `src/tests/K6-Performance/`.

> **Note:** K6 must be installed separately. See [K6 installation guide](https://grafana.com/docs/k6/latest/set-up/install-k6/).

---

## Code Quality

This project uses **Husky** + **lint-staged** for pre-commit hooks:

- **ESLint** — linting TypeScript files (`npm run lint`)
- **Prettier** — code formatting (`npm run format`)

Hooks are triggered automatically on `git commit` for staged `.ts` files.

---

## License

| Dependency              | License     |
|-------------------------|-------------|
| puppeteer, allure, bare | Apache-2.0  |
| dotenv, zerostep, ollama, proxy, husky, prettier | MIT |