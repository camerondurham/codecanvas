import { expect, test } from '@playwright/test';

test('runs bash code and renders stdout', async ({ page }) => {
	const expected = 'smoke-runner-ok';

	await page.goto('/');

	const languageSelect = page.getByTestId('language-select');
	await expect(languageSelect).toBeEnabled();
	await languageSelect.selectOption('bash');

	await page.getByTestId('source-input').fill(`echo ${expected}`);
	await page.getByTestId('run-button').click();

	await expect(page.getByTestId('stdout-output')).toContainText(expected);
	await expect(page.getByTestId('error-output')).toHaveText('');
});
