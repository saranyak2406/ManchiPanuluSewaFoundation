import { test, expect } from '@playwright/test';

test.describe('Contact, Volunteer, Projects & Blog Interactive Flows', () => {
  test('contact form validates inputs, toggles FAQs & submits cleanly', async ({ page }) => {
    await page.goto('/contact');

    await expect(page.locator('main')).toContainText('E Block 2107, Aditya Empress Towers, Shaikpet, Hyderabad, 500008');
    await expect(page.locator('main')).toContainText('+91 8333905567');
    await expect(page.locator('main')).toContainText('+91 8333906567');
    await expect(page.locator('main')).not.toContainText('Manchi Panulu:');
    await expect(page.locator('main')).not.toContainText('Manchi Panulu 2');
    await expect(page.locator('main')).toContainText('manchipanulusewafoundation@gmail.com');
    await expect(page.locator('main')).not.toContainText('manchipanulusewa.org');
    await expect(page.locator('footer.site-footer')).toContainText('E Block 2107, Aditya Empress Towers, Shaikpet, Hyderabad, 500008');
    await expect(page.locator('footer.site-footer')).toContainText('+91 8333905567');
    await expect(page.locator('footer.site-footer')).toContainText('+91 8333906567');
    await expect(page.locator('footer.site-footer')).not.toContainText('Manchi Panulu:');
    await expect(page.locator('footer.site-footer')).not.toContainText('Manchi Panulu 2');
    await expect(page.locator('footer.site-footer')).toContainText('manchipanulusewafoundation@gmail.com');
    await expect(page.locator('footer.site-footer')).not.toContainText('manchipanulusewa.org');

    await page.getByRole('button', { name: 'Send Message' }).click();
    await expect(page.locator('.form-error-msg')).toHaveCount(3);

    await page.getByPlaceholder('e.g. Anjali Sharma').fill('Anjali Sharma');
    await page.getByPlaceholder('name@example.com').fill('anjali@example.com');
    await page.getByPlaceholder('How can we assist you or collaborate with you?').fill('Interested in sponsoring weekend sapling drives in Medchal.');
    await page.getByRole('button', { name: 'Send Message' }).click();

    await expect(page.getByText('Message Received!')).toBeVisible();

    // Test FAQ Accordion
    const secondFaq = page.locator('.faq-trigger').nth(1);
    await secondFaq.click();
    await expect(secondFaq).toHaveAttribute('aria-expanded', 'true');
  });

  test('volunteer registration validates fields and confirms track summary', async ({ page }) => {
    await page.goto('/volunteer');

    await page.getByRole('button', { name: 'Submit Volunteer Registration' }).click();
    await expect(page.locator('.form-error-msg')).toHaveCount(4);

    await page.getByPlaceholder('e.g. Sravanthi Reddy').fill('Sravanthi Reddy');
    await page.getByPlaceholder('e.g. 9876543210').fill('9876543210');
    await page.getByPlaceholder('name@example.com').fill('sravanthi@example.com');
    await page.getByPlaceholder('e.g. Hyderabad, Secunderabad, Vizag').fill('Hyderabad');

    await page.getByLabel(/Annadanam/i).check();
    await page.getByRole('button', { name: 'Submit Volunteer Registration' }).click();

    await expect(page.getByText('Welcome to the Sewa Family!')).toBeVisible();
    await expect(page.locator('.volunteer-form-card')).toContainText('Hyderabad');
    await expect(page.locator('.volunteer-form-card')).toContainText('Annadanam');
  });

  test('projects search, category filter & detail modal work', async ({ page }) => {
    await page.goto('/projects');
    await expect(page.locator('.project-card')).toHaveCount(9);

    const searchInput = page.getByPlaceholder(/Search projects/i);
    await searchInput.fill('Miyawaki');
    await expect(page.locator('.project-card')).toHaveCount(1);

    await page.locator('.project-card').getByRole('button', { name: /View Project Details/i }).click();
    await expect(page.getByRole('dialog')).toContainText('Haritha Sankalpam');
    await page.getByRole('dialog').getByRole('button', { name: 'Close' }).first().click();

    await searchInput.fill('zzz-nonexistent-query');
    await expect(page.getByText('No projects match your filter')).toBeVisible();
    await page.getByRole('button', { name: 'Reset All Filters' }).click();
    await expect(page.locator('.project-card')).toHaveCount(9);
  });

  test('blog filters articles and opens article detail modal', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.locator('.blog-card')).toHaveCount(4);

    await page.getByRole('button', { name: 'Environmental Service' }).click();
    await expect(page.locator('.blog-card')).toHaveCount(1);

    await page.locator('.blog-card').first().click();
    await expect(page.getByRole('dialog')).toContainText('Restoring the Lifelines');
  });
});

