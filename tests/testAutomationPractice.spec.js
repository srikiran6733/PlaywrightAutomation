const { test, expect } = require('@playwright/test');

test('TestAutomationPractice Website Test', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Verify title and URL
  await expect(page).toHaveTitle('Automation Testing Practice');
  await expect(page).toHaveURL('https://testautomationpractice.blogspot.com/');

  // Verify heading and sub-heading text
  await expect(page.locator('h1')).toHaveText('Automation Testing Practice');
  await expect(page.locator("xpath=//span[normalize-space()='For Selenium, Cypress & Playwright']"))
        .toContainText('Cypress & Playwright');

  // Get header links using a locator
  const headerLinks = page.locator('#PageList2 div ul li');

  const count = await headerLinks.count();
  for (let i = 0; i < count; i++) {
    const link = headerLinks.nth(i);
    const text = await link.textContent();
    console.log(`Clicking on: ${text?.trim()}`);

    await link.click();
    await page.waitForTimeout(2000);
    await page.goBack();
  }

  //verify the GUI Elements text
  await expect(page.locator("//a[text()='GUI Elements']")).toHaveText('GUI Elements');

  //verify the Name field placeholder is presence 
  const nameField = page.locator('#name');
  await expect(nameField).toHaveAttribute('placeholder')
  if(nameField.isEnabled){
    console.log("Name field is enabled");
   await nameField.fill("KirannKumarCH")
  }else{
    console.log("Name field is disabled");
  }


});
