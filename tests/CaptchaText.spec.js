const { test, expect } = require('@playwright/test');
const fs = require('fs');
const Tesseract = require('tesseract.js');

test('Handle image captcha using OCR', async ({ page }) => {
  await page.goto('https://register.rediff.com/register/register.php?FormName=user_details');

  // Locate captcha image
  const captchaElement = page.locator('.captchaImage');
  const captchaBuffer = await captchaElement.screenshot(); // Take a screenshot of the image

  // Save image temporarily (optional)
  fs.writeFileSync('captcha.png', captchaBuffer);

  // Run OCR to extract text
  const result = await Tesseract.recognize(captchaBuffer, 'eng', {
    logger: m => console.log(m), // optional progress
  });

  const captchaText = result.data.text.trim();
  console.log("Extracted CAPTCHA:", captchaText);

  // Fill in the extracted CAPTCHA
  await page.fill('.captcha', captchaText);

  // Continue with the rest of the test...

  await page.waitForTimeout(6000)
});
