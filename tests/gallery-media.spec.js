import { test, expect } from '@playwright/test';

test.describe('Gallery, Replaced Sewa Imagery & Lightbox Modal', () => {
  test('gallery filters work and replaced blanket & free funeral images load cleanly in gallery and lightbox', async ({ page }) => {
    await page.goto('/gallery');

    const items = page.locator('.gallery-item');
    await expect(items).toHaveCount(14);

    // Verify Warm Blanket & Winter Relief card image loads with replaced photo
    const blanketCard = page.getByRole('button', { name: 'View Warm Blanket & Winter Relief Distribution' });
    await expect(blanketCard).toBeVisible();
    const blanketImg = blanketCard.locator('img');
    await blanketImg.scrollIntoViewIfNeeded();
    await expect(blanketImg).toHaveAttribute('src', '/gallery/blanket-distribution.jpg');
    await expect
      .poll(() => blanketImg.evaluate((el) => el.complete && el.naturalWidth > 500))
      .toBe(true);

    // Open lightbox modal for Warm Blanket & Winter Relief Distribution
    await blanketCard.click();
    const lightbox = page.getByRole('dialog');
    await expect(lightbox).toBeVisible();
    await expect(lightbox).toContainText('Warm Blanket & Winter Relief Distribution');
    await expect(lightbox.locator('img')).toHaveAttribute('src', '/gallery/blanket-distribution.jpg');

    // Navigate Next inside lightbox then close with Escape
    await lightbox.getByRole('button', { name: 'Next image' }).click();
    await expect(lightbox).toContainText('Plastic-Free Cloth Bag Campaign');
    await page.keyboard.press('Escape');
    await expect(lightbox).toBeHidden();

    // Filter by Free Funeral Services and verify replaced funeral image loads
    await page.getByRole('button', { name: 'Free Funeral Services' }).click();
    const funeralCard = page.getByRole('button', { name: 'View Dignified Antim Sanskar Final Rites Sewa' });
    await expect(funeralCard).toBeVisible();
    const funeralImg = funeralCard.locator('img');
    await expect(funeralImg).toHaveAttribute('src', '/pillars/funeral-services.jpg');
    await expect
      .poll(() => funeralImg.evaluate((el) => el.complete && el.naturalWidth > 500))
      .toBe(true);

    // Filter by Education Support and verify replaced Educational Kits image loads
    await page.getByRole('button', { name: 'Education Support' }).click();
    const eduCard = page.getByRole('button', { name: 'View Educational Kits Distribution Drive' });
    await expect(eduCard).toBeVisible();
    const eduImg = eduCard.locator('img');
    await expect(eduImg).toHaveAttribute('src', '/gallery/education-kits.jpg');
    await expect
      .poll(() => eduImg.evaluate((el) => el.complete && el.naturalWidth > 500))
      .toBe(true);
  });

  test('replaced Free Funeral Services and Education Support photos render cleanly on Services and Projects pages', async ({ page }) => {
    await page.goto('/services#education-support');
    const serviceEducationImg = page.locator('#education-support img[src="/pillars/education-support.jpg"]');
    await serviceEducationImg.scrollIntoViewIfNeeded();
    await expect
      .poll(() => serviceEducationImg.evaluate((el) => el.complete && el.naturalWidth > 500))
      .toBe(true);

    await page.goto('/services#funeral-services');
    const serviceFuneralImg = page.locator('#funeral-services img[src="/pillars/funeral-services.jpg"]');
    await serviceFuneralImg.scrollIntoViewIfNeeded();
    await expect
      .poll(() => serviceFuneralImg.evaluate((el) => el.complete && el.naturalWidth > 500))
      .toBe(true);

    await page.goto('/projects?category=Funeral');
    const projectFuneralImg = page.locator('.project-card img[src="/pillars/funeral-services.jpg"]');
    await expect(projectFuneralImg).toBeVisible();
    await expect
      .poll(() => projectFuneralImg.evaluate((el) => el.complete && el.naturalWidth > 500))
      .toBe(true);
  });
});

