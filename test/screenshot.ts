import puppeteer from 'puppeteer';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import LightStripEditor from '../src/LightStripEditor';

(async () => {
  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(LightStripEditor));
  const fullHtml = `<html><body>${html}</body></html>`;
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.setContent(fullHtml);
  await page.screenshot({ path: 'test/screenshot.png' });
  await browser.close();
})();
