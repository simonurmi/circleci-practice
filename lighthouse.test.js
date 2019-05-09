const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

jest.setTimeout(60000);

const launchChromeAndRunLighthouse = (url, opts = { chromeFlags: [] }, config = null) => chromeLauncher
  .launch({ chromeFlags: opts.chromeFlags })
  .then(chrome => lighthouse(url, { port: chrome.port, ...opts }, config).then(results => chrome.kill().then(() => results)));

test('Meaningful first paint score', () => launchChromeAndRunLighthouse('https://example.com').then(({ lhr: { audits } }) => expect(audits['first-meaningful-paint'].score).toBe(1)));
