import { defineConfig, devices } from '@playwright/test';

const chromiumExecutablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;

export default defineConfig({
	testDir: './tests',
	timeout: 30_000,
	expect: {
		timeout: 10_000
	},
	use: {
		baseURL: 'http://127.0.0.1:4173',
		trace: 'on-first-retry'
	},
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				...(chromiumExecutablePath
					? {
							launchOptions: {
								executablePath: chromiumExecutablePath
							}
						}
					: {})
			}
		}
	],
	webServer: [
		{
			command: 'bash -lc "cd .. && go run ./server/main.go"',
			url: 'http://localhost:10100/api/v1/languages',
			reuseExistingServer: !process.env.CI,
			timeout: 120_000
		},
		{
			command: 'PUBLIC_API_BASE_URL=http://localhost:10100 npm run dev -- --host 127.0.0.1 --port 4173',
			url: 'http://127.0.0.1:4173',
			reuseExistingServer: !process.env.CI,
			timeout: 120_000
		}
	]
});
