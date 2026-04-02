import { chromium } from 'playwright';

const SCREENSHOT_DIR = new URL('../screenshots/', import.meta.url).pathname;
const BASE = 'http://localhost:8080';

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

// 1. Admin onboarding list (already captured but let's redo for consistency)
await page.goto(`${BASE}/02-retailer-onboarding.html`);
await page.waitForTimeout(2000);
await page.screenshot({ path: `${SCREENSHOT_DIR}02-retailer-onboarding.png` });
console.log('Captured: 02-retailer-onboarding');

// 2. Wizard - Step 1: GSTIN
await page.goto(`${BASE}/09-retailer-wizard.html`);
await page.waitForTimeout(2000);
await page.screenshot({ path: `${SCREENSHOT_DIR}09-wizard-step1-gstin.png` });
console.log('Captured: step 1 - GSTIN');

// 3. Wizard - Step 2: Documents
await page.evaluate(() => goToStep(2));
await page.waitForTimeout(500);
await page.screenshot({ path: `${SCREENSHOT_DIR}09-wizard-step2-documents.png` });
console.log('Captured: step 2 - Documents');

// 4. Wizard - Step 3: Bank Details
await page.evaluate(() => goToStep(3));
await page.waitForTimeout(500);
await page.screenshot({ path: `${SCREENSHOT_DIR}09-wizard-step3-bank.png` });
console.log('Captured: step 3 - Bank Details');

// 5. Wizard - Step 4: Verification
await page.evaluate(() => goToStep(4));
await page.waitForTimeout(500);
await page.screenshot({ path: `${SCREENSHOT_DIR}09-wizard-step4-verification.png` });
console.log('Captured: step 4 - Verification');

// 5b. Complete duplicate check so it shows all-green
await page.evaluate(() => completeDuplicateCheck());
await page.waitForTimeout(1500);
await page.screenshot({ path: `${SCREENSHOT_DIR}09-wizard-step4-verified.png` });
console.log('Captured: step 4 - All verified');

// 6. Wizard - Step 5: Confirmation
await page.evaluate(() => goToStep(5));
await page.waitForTimeout(500);
await page.screenshot({ path: `${SCREENSHOT_DIR}09-wizard-step5-confirmation.png` });
console.log('Captured: step 5 - Confirmation');

await browser.close();
console.log('\nAll screenshots saved to:', SCREENSHOT_DIR);
