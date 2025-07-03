import { test, expect } from '@playwright/test'

/**
 * Test Name: LinkedIn HomePage Test (Rediff.com used in test)
 * Description: This test automates verification of Rediff homepage and account creation form functionality.
 */

test('LinkedIn HomePage Test', async ({ page }) => {

  // Navigate to Rediff homepage
  await page.goto('https://www.rediff.com/');

  // Verify the Rediff logo is present on the homepage
  await expect(page.locator("//div[@class='logo']//img[contains(@src,'imworld.rediff.com')]")).toHaveAttribute('src');

  // Fetch and print all top header links
  const allLinks = await page.$$('.toplinks a');
  for (const link of allLinks) {
    const text = await link.textContent();
    console.log(text);
  }

  // Verify 'Sign In' link is visible
  await expect(page.locator(".signin")).toBeVisible();

  // Verify 'Create Account' link is visible and click if visible
  const createAcLink = page.locator("//a[text()='Create Account']");
  await expect(createAcLink).toBeVisible();
  if (await createAcLink.isVisible()) {
    await createAcLink.click();
  }

  // Wait for the registration form to appear
  await page.waitForSelector("//h2[text()='Create a Rediffmail account']");
  await expect(page.locator('h2')).toHaveText('Create a Rediffmail account');

  // Fill in personal details in the form
  await page.waitForSelector("input[placeholder='Enter your full name']");
  await page.fill("input[placeholder='Enter your full name']", "KiranKumarCH");

  await page.waitForSelector("input[placeholder='Enter Rediffmail ID']");
  await page.fill("input[placeholder='Enter Rediffmail ID']", "kirankumar");

  // Check availability of Rediffmail ID
  await page.waitForSelector("input[class='btn_checkavail button']");
  await page.click("input[class='btn_checkavail button']");

  // Select alternate login option (radio button)
  await page.waitForSelector("(//input[@id='radio_login'])[2]");
  await page.check("(//input[@id='radio_login'])[2]");

  // Fill password and confirm password fields
  const passwordEditbox = page.locator('#newpasswd');
  await page.waitForSelector('#newpasswd');
  await passwordEditbox.fill("Kiran@123");
  await page.click('#toggle-password');
  await expect(passwordEditbox).toHaveValue('Kiran@123');

  const retypePasswordEditbox = page.locator('#newpasswd1');
  await page.waitForSelector('#newpasswd1');
  await retypePasswordEditbox.fill("Kiran@123");
  await page.click('#toggle-retype-password');
  await expect(retypePasswordEditbox).toHaveValue('Kiran@123');

  // Select date of birth
  await page.selectOption("select[class='day']", "30");
  await page.selectOption("select[class='middle month']", "JUN");
  await page.selectOption(".year", "1991");

  // Select gender (first female, then male)
  await page.waitForSelector("div[class=gender] input[value=f]");
  await page.click("div[class=gender] input[value=f]");
  await page.waitForSelector("div[class=gender] input[value=m]");
  await page.check("div[class=gender] input[value=m]");

  // Select country and city
  await page.selectOption("#country", 'Anguilla');
  await page.selectOption("#country", 'India');

  await page.waitForSelector("//select[contains(@name,'city')]");
  await page.locator("//select[contains(@name,'city')]").selectOption('Vijaywada');

  // Handle recovery email field based on checkbox state
  const recoverEmailEditbox = page.locator("input[placeholder='Enter recovery email']");
  const checkbox = page.locator('input[type=checkbox]');

  // Click checkbox to hide recovery email field
  await checkbox.click();
  if (await checkbox.isChecked()) {
    console.log("Checkbox is checked");
    await expect(recoverEmailEditbox).not.toBeVisible();
  } else {
    console.log("Checkbox is not checked");
  }

  // Uncheck to show recovery email field again
  await checkbox.uncheck();
  await expect(recoverEmailEditbox).toBeVisible();
  await recoverEmailEditbox.fill("kirankumarchennuboina@gmail.com");

  // Fill mobile number
  const mobileNumberEditbox = page.locator('#mobno');
  await mobileNumberEditbox.scrollIntoViewIfNeeded();
  await expect(mobileNumberEditbox).toBeVisible();
  await mobileNumberEditbox.fill("9985998599");

  // Verify terms and conditions message
  await page.waitForSelector(".tnc");
  await expect(page.locator(".tnc")).toContainText("By clicking on 'Create my account' above, you confirm that you accept the");

  await page.locator('#Register').click()

});
