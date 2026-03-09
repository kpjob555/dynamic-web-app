import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

// Go to configuration page
await page.goto('http://localhost:5173/dynamic-web-app/configuration');
await page.waitForTimeout(2000);

// Click the Add New button
await page.click('text=Add New Configuration');
await page.waitForTimeout(2000);

// Take screenshot
await page.screenshot({ path: 'screenshots/json-editor-modal.png', fullPage: true });

console.log('Screenshot taken!');
await browser.close();
