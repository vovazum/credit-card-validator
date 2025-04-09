import puppeteer from 'puppeteer';
import { fork } from 'child_process';
import path from 'path';

jest.setTimeout(30000);

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(path.resolve(__dirname, './e2e.server.js'));

    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
      setTimeout(() => reject(new Error('Server startup timeout')), 5000);
    });

    browser = await puppeteer.launch({
      headless: true,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    if (browser) await browser.close();
    if (server) server.kill();
  });

  test('should load main page', async () => {
    await page.goto(baseUrl);
    const title = await page.title();
    expect(title).not.toBeNull();
  });
});
