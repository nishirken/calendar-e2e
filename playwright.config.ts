import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    browserName: 'chromium',
    viewport: { width: 1680, height: 1280 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    launchOptions: {
      executablePath: './chromium/bin/chromium',
    },
  },
};

export default config;