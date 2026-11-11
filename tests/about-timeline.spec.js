import { test, expect } from '@playwright/test';

test.describe('About Page Animated Serpentine Milestones Timeline', () => {
  test('renders alternating S-curve ribbon aligned pixel-for-pixel with rows and hover spotlight', async ({ page }) => {
    await page.goto('/about');

    const root = page.locator('.milestones-serpentine-root');
    await root.scrollIntoViewIfNeeded();

    await expect(root).toHaveClass(/is-visible/, { timeout: 6000 });
    await expect(page.locator('.milestones-serp-row')).toHaveCount(4);

    // Wait for staggered path/content reveal to finish cleanly
    await expect
      .poll(async () => {
        return page.evaluate(() => {
          const els = Array.from(document.querySelectorAll('.milestones-serp-bay, .milestones-serp-content'));
          return els.length === 8 && els.every((el) => parseFloat(getComputedStyle(el).opacity) > 0.9);
        });
      })
      .toBe(true);

    // Verify exact SVG geometry matches measured rows
    const metrics = await page.evaluate(() => {
      const svg = document.querySelector('.milestones-serp-svg');
      const stage = document.querySelector('.milestones-serp-stage');
      const rows = Array.from(document.querySelectorAll('.milestones-serp-row')).map((r) => ({
        top: r.offsetTop,
        height: r.offsetHeight
      }));
      const last = rows[rows.length - 1];
      return {
        svgWidth: Number(svg?.getAttribute('width')),
        svgHeight: Number(svg?.getAttribute('height')),
        stageHeight: stage?.clientHeight,
        firstTop: rows[0]?.top,
        rowsBottom: last ? last.top + last.height : 0,
        pathCount: document.querySelectorAll('.milestones-serp-path').length,
        hasTraveler: !!document.querySelector('.milestones-serp-traveler animateMotion')
      };
    });

    expect(metrics.svgWidth).toBeGreaterThan(600);
    expect(metrics.firstTop).toBe(0);
    expect(metrics.svgHeight).toBe(metrics.rowsBottom);
    expect(metrics.stageHeight).toBe(metrics.rowsBottom);
    expect(metrics.pathCount).toBe(16);
    expect(metrics.hasTraveler).toBe(true);

    // Hovering 2nd row triggers active curve spotlight & frosted card highlight
    const secondRow = page.locator('.milestones-serp-row').nth(1);
    await secondRow.hover();
    await expect(secondRow).toHaveClass(/is-active/);
  });

  test('adapts dynamically across Telugu, Hindi & mobile stacked C-ribbon layout', async ({ page }) => {
    await page.goto('/about');
    const root = page.locator('.milestones-serpentine-root');
    await root.scrollIntoViewIfNeeded();
    await expect(root).toHaveClass(/is-visible/);

    // Switch to Telugu and confirm re-measured SVG still matches wrapped text height
    await page.getByRole('button', { name: 'Select Language' }).click();
    await page.locator('.lang-menu .lang-item').nth(1).click();
    await expect(root).toContainText('2026 & భవిష్యత్తు');

    await expect
      .poll(async () => {
        return page.evaluate(() => {
          const svgH = Number(document.querySelector('.milestones-serp-svg')?.getAttribute('height'));
          const rows = Array.from(document.querySelectorAll('.milestones-serp-row'));
          const last = rows[rows.length - 1];
          return svgH > 0 && last ? svgH === last.offsetTop + last.offsetHeight : false;
        });
      })
      .toBe(true);

    // Switch to Hindi and confirm zero overflow
    await page.getByRole('button', { name: 'Select Language' }).click();
    await page.locator('.lang-menu .lang-item').nth(2).click();
    await expect(root).toContainText('2026 और आगे');

    const overflowHi = await page.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      cw: document.documentElement.clientWidth
    }));
    expect(overflowHi.sw).toBeLessThanOrEqual(overflowHi.cw + 1);

    // Reset to English and switch to Mobile viewport
    await page.getByRole('button', { name: 'Select Language' }).click();
    await page.locator('.lang-menu .lang-item').nth(0).click();

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator('.milestones-serp-desktop')).toBeHidden();
    await expect(page.locator('.milestones-serp-mobile')).toBeVisible();
    await expect(page.locator('.milestones-mob-item')).toHaveCount(4);

    const overflowMob = await page.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      cw: document.documentElement.clientWidth
    }));
    expect(overflowMob.sw).toBeLessThanOrEqual(overflowMob.cw + 1);
  });
});

