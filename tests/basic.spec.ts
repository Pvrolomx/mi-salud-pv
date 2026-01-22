import { test, expect } from '@playwright/test';

test('página carga correctamente', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Mi Salud|Salud/i);
});

test('elementos principales visibles', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('body')).toBeVisible();
});
