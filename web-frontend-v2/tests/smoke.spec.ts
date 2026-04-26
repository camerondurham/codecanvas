import { expect, test } from '@playwright/test';

test('runs bash code and renders stdout', async ({ page }) => {
	const expected = 'smoke-runner-ok';

	await page.goto('/');

	await expect(page.getByTestId('api-target-select')).toHaveValue('local');
	await expect(page.getByTestId('api-base-url')).toContainText('http://localhost:10100');

	const languageSelect = page.getByTestId('language-select');
	await expect(languageSelect).toBeEnabled();

	await languageSelect.selectOption('go');
	await expect(page.getByTestId('source-input')).toHaveValue(/fmt\.Println\("Hello from Go!"\)/);

	await languageSelect.selectOption('bash');
	await expect(page.getByTestId('source-input')).toHaveValue('echo "Hello from Bash!"');

	await page.getByTestId('source-input').fill(`echo ${expected}`);
	await page.getByTestId('run-button').click();

	await expect(page.getByTestId('stdout-output')).toContainText(expected);
	await expect(page.getByTestId('error-output')).toHaveText('');
});
