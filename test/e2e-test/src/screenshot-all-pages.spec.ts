import { fetchSitemapLinks } from '@pkerschbaum/fetch-sitemap-locations';
import { test, expect } from '@playwright/test';

const allLinks: string[] = [];
for await (const links of fetchSitemapLinks(new URL('https://pkerschbaum.com/sitemap.xml'))) {
  allLinks.push(...links);
}

for (const link of allLinks) {
  test(`visit ${link}`, async ({ page }) => {
    await page.goto(link);
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
}
