import { test, expect } from '@playwright/test';
import path from 'path';
import { pathToFileURL } from 'url';

test('should navigate through all 1,000 pages of the 10K table', async ({ page }) => {
  const filePath = path.resolve(
    process.cwd(),
    'src/pages/HTMLPage/datatables_10000_rows_test_page.html'
  );

  await page.goto(pathToFileURL(filePath).href);

  const table = page.locator('#employees');
  const rows = table.locator('tbody tr');
  const pagination = page.locator('#employees_wrapper .dt-paging');
  const currentPage = pagination.locator('button[aria-current="page"]');
  const nextButton = pagination.locator('button.dt-paging-button.next');
  const info = page.locator('#employees_info');

  await expect(
    page.getByRole('heading', { name: 'Employee directory' })
  ).toBeVisible();

  await expect(rows).toHaveCount(10);

  const infoText = await info.innerText();
  const match = infoText.match(/of ([\d,]+) employees/);

  expect(match, `Unexpected table info: ${infoText}`).not.toBeNull();

  const totalRows = Number(match![1].replace(/,/g, ''));
  const pageSize = 10;
  const totalPages = Math.ceil(totalRows / pageSize);

  expect(totalRows).toBe(10_000);
  expect(totalPages).toBe(1_000);

  await expect(currentPage).toHaveText('1');

  for (let expectedPage = 2; expectedPage <= totalPages; expectedPage++) {
    await expect(nextButton).toBeEnabled();
    await nextButton.click();
    await expect(currentPage).toHaveText(
      expectedPage.toLocaleString('en-US')
    );
    await expect(rows).toHaveCount(pageSize);

    if (expectedPage % 100 === 0 || expectedPage === totalPages) {
      console.log(`Progress: page ${expectedPage}/${totalPages}`);
    }
  }

  await expect(currentPage).toHaveText(
  totalPages.toLocaleString('en-US')
);
  await expect(rows).toHaveCount(10);
  await expect(nextButton).toBeDisabled();
});
