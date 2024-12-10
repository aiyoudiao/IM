import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:8000/');

  await page.goto('http://localhost:8000/user/login');
  await page.getByPlaceholder('用户名: admin or user').click();
  await page.getByPlaceholder('用户名: admin or user').fill('admin');
  await page
    .locator(
      'div:nth-child(4) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper',
    )
    .click();
  await page.getByPlaceholder('密码: ant.design').fill('ant.design');
  expect(
    await page.getByPlaceholder('密码: ant.design').inputValue(),
  ).toContain('ant.design');
  await page.getByRole('button', { name: '登 录' }).click();
  await page.getByRole('menuitem', { name: 'crown 管理页' }).click();
  await page.getByRole('link', { name: '二级管理页' }).click();
  await page.getByRole('link', { name: 'smile 欢迎' }).click();
  await page.getByRole('link', { name: 'table 查询表格' }).click();
  await page.getByText('展开').click();
});
