import { defineConfig, devices } from '@playwright/test';
import { Config } from './src/utils/config';
import { Logger } from './src/utils/logger'


let config: Config | null = null;
try {
  config = new Config()
}catch(error) {
  Logger.logging.warn("Nx Config inistialization failied", error)
  config = null;
}

const getConfigValue = <T>(getter: () => T, defaultValue: T) : T => {
  try {
    return config ? getter() : defaultValue;
  } catch {
    return defaultValue;
  }
}


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'iru-tests',
      testMatch:[
        '/tests/**.spec.ts'
      ],
      use: {
        baseURL: getConfigValue(()=> config !.baseUrl, '')
      },
    }
  ],
});
