
import { test, expect } from '@playwright/test';
import path from 'path';
import { pathToFileURL } from 'url';

test('should navigate through every table page until the last page', async ({ page }) => {
  const filePath = path.resolve(
    process.cwd(),
    'src/pages/HTMLPage/datatables_1000_rows_test_page.html'
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

  await expect(rows).toHaveCount(25);

  const infoText = await info.innerText();
  const match = infoText.match(/of ([\d,]+) employees/);

  expect(match, `Unexpected table info: ${infoText}`).not.toBeNull();

  const totalRows = Number(match![1].replace(/,/g, ''));
  const pageSize = 25;
  const totalPages = Math.ceil(totalRows / pageSize);

  expect(totalRows).toBe(1000);

  await expect(currentPage).toHaveText('1');

  for (let expectedPage = 2; expectedPage <= totalPages; expectedPage++) {
    await expect(nextButton).toBeEnabled();
    await nextButton.click();

    await expect(currentPage).toHaveText(String(expectedPage));

    const expectedRows =
      expectedPage === totalPages
        ? totalRows - pageSize * (totalPages - 1)
        : pageSize;

    await expect(rows).toHaveCount(expectedRows);

    console.log(`Page ${expectedPage}/${totalPages} passed`);
  }

  await expect(currentPage).toHaveText(String(totalPages));
  await expect(nextButton).toBeDisabled();
});
