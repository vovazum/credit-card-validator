const puppeteer = require('puppeteer');

describe('Credit Card Validator E2E Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:8080');
  });

  afterAll(async () => {
    await browser.close();
  });

  test('valid Visa card validation', async () => {
    await page.type('#card-number', '4111111111111111');
    await page.click('#validate-btn');
    await page.waitForSelector('#result');
    
    const resultText = await page.$eval('#result', el => el.textContent);
    expect(resultText).toContain('Valid visa card');
  });

  test('invalid card validation', async () => {
    await page.type('#card-number', '4111111111111112');
    await page.click('#validate-btn');
    await page.waitForSelector('#result');
    
    const resultText = await page.$eval('#result', el => el.textContent);
    expect(resultText).toContain('Invalid card number');
  });
});