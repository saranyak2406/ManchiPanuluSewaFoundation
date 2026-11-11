import { test, expect } from '@playwright/test';

const ROUTES = [
  { path: '/', headingMatch: /Future|పునరుద్ధరణ/i },
  { path: '/about', headingMatch: /Good Deeds Rooted in/i },
  { path: '/services', headingMatch: /Six Pillars of Dedicated Sewa/i },
  { path: '/projects', headingMatch: /Ongoing & Completed Projects/i },
  { path: '/gallery', headingMatch: /Moments of Sewa/i },
  { path: '/blog', headingMatch: /Stories, Perspectives/i },
  { path: '/volunteer', headingMatch: /Be the Change/i },
  { path: '/donate', headingMatch: /Your Contribution Powers/i },
  { path: '/contact', headingMatch: /We Would Love/i }
];

test.describe('Navigation, Routes, Multilingual & Responsive Shell', () => {
  test('all 9 routes render cleanly without errors or horizontal overflow on desktop', async ({ page }) => {
    const consoleErrors = [];
    const pageErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => pageErrors.push(err.message));

    for (const route of ROUTES) {
      await page.goto(route.path, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer.site-footer')).toBeVisible();
      await expect(page.locator('h1').first()).toContainText(route.headingMatch);

      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth
      }));
      expect(overflow.scrollWidth, `Horizontal overflow on ${route.path}`).toBeLessThanOrEqual(overflow.clientWidth + 1);
    }

    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
  });

  test('language switcher updates UI between English, Telugu and Hindi', async ({ page }) => {
    await page.goto('/');

    const langButton = page.getByRole('button', { name: 'Select Language' });
    await langButton.click();
    await page.locator('.lang-menu .lang-item').nth(1).click();

    await expect(page.locator('body')).toHaveClass(/lang-te/);
    await expect(page.locator('h1')).toContainText('నేటి మంచి పనులు');

    await langButton.click();
    await page.locator('.lang-menu .lang-item').nth(2).click();
    await expect(page.locator('body')).toHaveClass(/lang-hi/);

    await langButton.click();
    await page.locator('.lang-menu .lang-item').nth(0).click();
    await expect(page.locator('body')).not.toHaveClass(/lang-te|lang-hi/);
    await expect(page.locator('h1')).toContainText('Today');
  });

  test('mobile navigation drawer opens, switches language, navigates & maintains zero overflow', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const toggleBtn = page.getByRole('button', { name: 'Toggle navigation menu' });
    await expect(toggleBtn).toBeVisible();
    await toggleBtn.click();

    const drawer = page.getByRole('dialog', { name: 'Mobile Navigation Menu' });
    await expect(drawer).toBeVisible();

    await drawer.getByRole('button', { name: 'తెలుగు' }).click();
    await expect(page.locator('body')).toHaveClass(/lang-te/);
    await drawer.getByRole('button', { name: 'English' }).click();

    await drawer.locator('a.btn-drawer-donate[href="/donate"]').click();
    await expect(page).toHaveURL(/\/donate$/);
    await expect(drawer).toBeHidden();

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth
    }));
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
  });

  test('responsive viewports maintain zero horizontal overflow, aligned filter pills, and clean copy', async ({ page }) => {
    const viewports = [
      { width: 320, height: 700 },
      { width: 375, height: 812 },
      { width: 480, height: 854 },
      { width: 768, height: 1024 },
      { width: 1024, height: 768 },
      { width: 2560, height: 1440 }
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      for (const route of ['/', '/about', '/projects', '/gallery', '/donate']) {
        await page.goto(route, { waitUntil: 'domcontentloaded' });
        await expect(page.locator('main')).toBeVisible();
        const metrics = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          bodyWidth: document.body.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          hasPlaceholder: /\(Placeholder\)/i.test(document.body.innerText || '')
        }));
        expect(metrics.scrollWidth, `doc overflow at ${vp.width} on ${route}`).toBeLessThanOrEqual(metrics.clientWidth + 1);
        expect(metrics.bodyWidth, `body overflow at ${vp.width} on ${route}`).toBeLessThanOrEqual(metrics.clientWidth + 1);
        expect(metrics.hasPlaceholder, `unexpected Placeholder copy on ${route}`).toBe(false);
      }
    }

    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('a[href="/projects"].btn').first()).toHaveText('View All');

    await page.goto('/gallery', { waitUntil: 'domcontentloaded' });
    const galleryRowCounts = await page.evaluate(() => {
      const pills = Array.from(document.querySelectorAll('.gallery-filter-bar .filter-pill'));
      const rows = new Map();
      for (const p of pills) {
        const key = Math.round(p.getBoundingClientRect().top / 4) * 4;
        rows.set(key, (rows.get(key) || 0) + 1);
      }
      return Array.from(rows.values());
    });
    expect(galleryRowCounts.slice(0, -1).every((count) => count === 2)).toBe(true);

    await page.goto('/projects', { waitUntil: 'domcontentloaded' });
    const projectsStatusRows = await page.evaluate(() => {
      const pills = Array.from(document.querySelectorAll('.projects-status-pills .project-status-pill'));
      const rows = new Map();
      for (const p of pills) {
        const key = Math.round(p.getBoundingClientRect().top / 4) * 4;
        rows.set(key, (rows.get(key) || 0) + 1);
      }
      return Array.from(rows.values());
    });
    expect(projectsStatusRows.every((count) => count === 2)).toBe(true);

    await page.goto('/contact', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main')).toContainText('+91 8333905567');
    await expect(page.locator('main')).toContainText('+91 8333906567');
    await expect(page.locator('main')).not.toContainText('Manchi Panulu:');
    await expect(page.locator('main')).not.toContainText('Manchi Panulu 2');
  });
});
