# iru

UI test automation suite built with [Playwright Test](https://playwright.dev/) and TypeScript, using a Page Object Model and environment-aware configuration.

## What this project does

- Automates browser-based UI tests (login flow, sidebar navigation, etc.) against the app under test.
- Page Object Model: page-specific locators/actions live in `src/pages/*`, shared by all specs through `src/uiFixtures.ts`.
- Environment-aware config: the target URL (and other run settings) are picked automatically from `resources/.env.*` based on which environment you ask for — no editing config files to switch between local/staging/prod/prs.
- Reporting: Playwright's built-in HTML reporter plus [Allure](https://allurereport.org/) reporting, with screenshots and video captured only on failure.

## Project structure

```
resources/          .env.local / .env.staging / .env.prod / .env.prs — per-environment settings (tracked in git, no secrets)
src/
  pages/             Page objects (locators + actions), e.g. login-page.ts, side-bar-pages.ts
  utils/
    config.ts        Loads the right resources/.env.* file based on TEST_ENV
    logger.ts        Shared Winston logger
  uiFixtures.ts       Playwright fixtures that expose page objects to tests (loginPage, sideBarPage, ...)
tests/               Spec files (*.spec.ts)
playwright.config.ts Playwright test runner configuration
```

## Install dependencies

```bash
npm install
npx playwright install   # downloads the browser binaries Playwright needs (chromium/firefox/webkit)
```

This project's `.npmrc` points at the public npm registry, so `npm install` doesn't require any internal/Artifactory credentials.

## Configuring the test environment

Which environment a run targets is controlled by the `TEST_ENV` variable, resolved (case-insensitively) to one of these files:

| `TEST_ENV` value | File loaded              |
|------------------|---------------------------|
| `LOCAL` (default) | `resources/.env.local`    |
| `STAGING`         | `resources/.env.staging`  |
| `PROD`             | `resources/.env.prod`     |
| `PRS`              | `resources/.env.prs`      |

Each of those files defines:

- `BASEURL` — the app URL for that environment.
- `HEADLESS` — `true`/`false`, whether the browser runs headed or headless.
- `TEST_BROWSER_VIEWPORT` — JSON viewport size, e.g. `{"width": 1920, "height": 1080}`.

**Credentials are never stored in these files.** `TEST_USERNAME` / `TEST_PASSWORD` are read purely from the process environment at run time — pass them inline on the command line (see below), never commit them.

## Running tests locally

Convenience scripts per environment (default browser project only):

```bash
npm run test:local
npm run test:staging
npm run test:prod
npm run test:prs
```

Or set `TEST_ENV` yourself for full control over browser/spec:

```bash
TEST_ENV=STAGING npx playwright test --project=chromium
TEST_ENV=STAGING npx playwright test tests/library.spec.ts --project=firefox
```

For specs that log in, add credentials on the same command (they're read from `process.env`, not from any `.env.*` file):

```bash
TEST_ENV=STAGING TEST_USERNAME=<user> TEST_PASSWORD=<pass> npx playwright test tests/login.spec.ts --project=chromium
```

Available browser projects: `chromium`, `firefox`, `webkit` (see `playwright.config.ts`).

### Viewing results

- HTML report: `npx playwright show-report`
- Allure report:
  ```bash
  npm run allure:report      # generates + opens the report
  # or individually:
  npm run allure:generate
  npm run allure:open
  ```
  Screenshots and videos are only captured for failing tests (`use.screenshot`/`use.video` in `playwright.config.ts`). `allure-results/` and `allure-report/` are git-ignored — they're generated locally/in CI, not committed.

## Running in CI/CD

A GitHub Actions workflow is set up at [.github/workflows/playwright.yml](.github/workflows/playwright.yml). It:

1. Checks out the repo and sets up Node.
2. `npm ci` — installs dependencies from the lockfile.
3. `npx playwright install --with-deps` — installs browsers + OS deps on the Ubuntu runner.
4. Picks `TEST_ENV` based on how the run was triggered (see table below).
5. `npx playwright test` — runs the suite.
6. Uploads the `playwright-report/` folder as a build artifact (kept 30 days), even if the run fails.

### Which environment runs when

| Trigger | `TEST_ENV` used |
|---|---|
| Pull request opened/updated against `main`/`master` | `PRS` (PR/preview environment) |
| Push to `main`/`master` | `STAGING` |
| Manually run via "Run workflow" in the Actions tab | Whichever environment you pick from the `test_env` dropdown: `PRS`, `STAGING`, or `PROD` |

Production is intentionally **not** run automatically on every push/PR — it's only reachable via a manual `workflow_dispatch` run, so a `PROD` run always requires someone to explicitly trigger it.

### Credentials in CI

`TEST_USERNAME`/`TEST_PASSWORD` are wired in from [GitHub Actions secrets](https://docs.github.com/actions/security-guides/encrypted-secrets), never from a committed file. Add them under the repo's **Settings → Secrets and variables → Actions**:

- `TEST_USERNAME`
- `TEST_PASSWORD`

If those secrets aren't configured, the workflow still runs fine — specs that need credentials (e.g. `login.spec.ts`) just report as skipped, the same as running locally without them set.
