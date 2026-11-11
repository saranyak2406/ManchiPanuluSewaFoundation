import { test, expect } from '@playwright/test';

test.describe('Donation Flow, PDF Receipt Download & Transaction History', () => {
  test('validates amount, switches international currencies/pillars, downloads PDF receipt & persists transaction history', async ({ page }) => {
    await page.goto('/donate');

    // Verify pillar multi-selection prevents deselecting the final remaining pillar
    await page.getByRole('button', { name: 'Deselect' }).click();
    const checkedCount = await page.locator('.donate-choice-chip[aria-checked="true"]').count();
    expect(checkedCount).toBe(1);
    await page.getByRole('button', { name: 'Select All' }).click();
    expect(await page.locator('.donate-choice-chip[aria-checked="true"]').count()).toBe(6);

    // Submitting empty domestic form triggers inline validation messages & focuses first invalid field (amount)
    await page.getByRole('button', { name: 'I Have Completed This Transfer' }).click();
    await expect(page.getByPlaceholder('e.g. 10000')).toBeFocused();
    await expect(page.locator('.form-error-msg')).toHaveCount(4);
    await expect(page.getByText('Please enter a valid contribution amount (minimum 1)')).toBeVisible();
    await expect(page.getByText('Please enter your full name (at least 3 characters)')).toBeVisible();
    await expect(page.getByText('Please enter a valid email address')).toBeVisible();
    await expect(page.getByText('Please enter a valid 10-digit Indian mobile number')).toBeVisible();

    // Entering malformed inputs validates amount, name, email, phone & optional PAN format
    await page.getByPlaceholder('e.g. 10000').fill('0');
    await page.getByPlaceholder('As per PAN / Bank records').fill('Jo');
    await page.getByPlaceholder('receipt@example.com').fill('invalid-email');
    await page.getByPlaceholder('+91 98765 XXXXX').fill('1234567890');
    await page.getByPlaceholder('ABCDE1234F (Mandatory for Indian 80G claims)').fill('BADPAN');
    await page.getByRole('button', { name: 'I Have Completed This Transfer' }).click();
    await expect(page.locator('.form-error-msg')).toHaveCount(5);
    await expect(page.getByText('Please enter a valid 10-character PAN (e.g. ABCDE1234F)')).toBeVisible();

    // Fill valid donor details (clearing errors as user types) without valid amount
    await page.getByPlaceholder('e.g. 10000').fill('');
    await page.getByPlaceholder('As per PAN / Bank records').fill('Srinivas Rao');
    await page.getByPlaceholder('receipt@example.com').fill('srinivas@example.com');
    await page.getByPlaceholder('+91 98765 XXXXX').fill('9876543210');
    await page.getByPlaceholder('ABCDE1234F (Mandatory for Indian 80G claims)').fill('');
    await page.getByRole('button', { name: 'I Have Completed This Transfer' }).click();
    await expect(page.locator('.form-error-msg')).toHaveCount(1);
    await expect(page.getByText('Please enter a valid contribution amount (minimum 1)')).toBeVisible();

    // Enter valid INR contribution & PAN, submit
    await page.getByPlaceholder('e.g. 10000').fill('2500');
    await page.getByPlaceholder('ABCDE1234F (Mandatory for Indian 80G claims)').fill('ABCDE1234F');
    await page.getByRole('button', { name: 'I Have Completed This Transfer' }).click();

    // Verify Receipt Modal opens with receipt number & formatted INR amount
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('MPSF-REC-');
    await expect(modal).toContainText('Srinivas Rao');
    await expect(modal).toContainText('₹2,500');

    // Wait for Download PDF Receipt button to finish pre-generating & trigger real browser download
    const downloadBtn = modal.getByRole('button', { name: /Download PDF Receipt/i });
    await expect(downloadBtn).toBeEnabled({ timeout: 10_000 });

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      downloadBtn.click()
    ]);
    expect(download.suggestedFilename()).toMatch(/^MPSF-Receipt-MPSF-REC-\d+\.pdf$/i);
    await expect(modal.getByText('Receipt PDF downloaded successfully.')).toBeVisible();

    // Close receipt modal & verify transaction history below form
    await modal.getByRole('button', { name: 'Close Receipt Window' }).first().click();
    await expect(modal).toBeHidden();

    const txSection = page.locator('#donation-transactions');
    await expect(txSection).toBeVisible();
    await expect(txSection).toContainText('Srinivas Rao');
    await expect(txSection).toContainText('₹2,500');

    // Verify persistence across full page reload
    await page.reload();
    await expect(page.locator('#donation-transactions')).toContainText('Srinivas Rao');

    // Verify View Receipt button re-opens modal & Clear History empties list
    await page.locator('#donation-transactions').getByRole('button', { name: 'View Receipt' }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeHidden();

    await page.getByRole('button', { name: 'Clear History' }).click();
    await expect(page.locator('#donation-transactions')).toBeHidden();

    // Switch to International Supporters tab, confirm currency toggles & validate international fields
    await page.getByRole('button', { name: /International Supporters/i }).click();
    await page.getByRole('button', { name: /EUR/i }).click();
    await expect(page.getByPlaceholder('e.g. 45')).toBeVisible();

    // Verify International Organization field stays isolated from Domestic PAN and validates short optional org name
    await expect(page.getByPlaceholder('Individual / Diaspora Foundation / Corporate CSR')).toHaveValue('');
    await page.getByPlaceholder('As per PAN / Bank records').fill('');
    await page.getByPlaceholder('receipt@example.com').fill('');
    await page.getByPlaceholder('e.g. United States, United Kingdom, UAE, Germany').fill('');
    await page.getByPlaceholder('Individual / Diaspora Foundation / Corporate CSR').fill('A');
    await page.getByRole('button', { name: /Register Overseas Interest/i }).click();
    await expect(page.locator('.form-error-msg')).toHaveCount(5);
    await expect(page.getByText('Please enter your country of residence')).toBeVisible();
    await expect(page.getByText('Organization name must be at least 2 characters if provided')).toBeVisible();

    // Fill valid international pledge details and confirm acknowledgment modal opens
    await page.getByPlaceholder('e.g. 45').fill('75');
    await page.getByPlaceholder('As per PAN / Bank records').fill('Meera Nair');
    await page.getByPlaceholder('receipt@example.com').fill('meera.nair@example.org');
    await page.getByPlaceholder('e.g. United States, United Kingdom, UAE, Germany').fill('Germany');
    await page.getByPlaceholder('Individual / Diaspora Foundation / Corporate CSR').fill('Diaspora Aid');
    await page.getByRole('button', { name: /Register Overseas Interest/i }).click();
    await expect(page.getByRole('dialog')).toContainText('EUR 75');
    await expect(page.getByRole('dialog')).toContainText('Meera Nair');
    await expect(page.getByRole('dialog')).toContainText('Diaspora Aid');
  });
});

