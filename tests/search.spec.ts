import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("can search for podcasts", () => {
  test("Searching returns result", async ({ page }) => {
    await page.locator("text=Search").click();
    await page.locator("#standard-search").fill("soft skills engineering");

    await expect(
      page.locator("a", { hasText: "Soft Skills Engineering" }),
    ).toBeVisible();
  });
});
