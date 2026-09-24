import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const tabs = await (await fetch('http://127.0.0.1:9337/json')).json();
const socket = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl);
await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));
let id = 0; const pending = new Map(), errors = [];
socket.addEventListener('message', event => {
  const data = JSON.parse(event.data);
  if (data.id) { const task = pending.get(data.id); pending.delete(data.id); data.error ? task.reject(data.error) : task.resolve(data.result); }
  if (data.method === 'Runtime.exceptionThrown') errors.push(data.params.exceptionDetails.text);
});
const command = (method, params = {}) => new Promise((resolve, reject) => { const current = ++id; pending.set(current, { resolve, reject }); socket.send(JSON.stringify({ id: current, method, params })); });
const evaluate = async expression => (await command('Runtime.evaluate', { expression, returnByValue: true })).result.value;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function waitFor(expression) { for (let i = 0; i < 30; i++) { if (await evaluate(expression)) return; await delay(150); } throw new Error('Timeout: ' + expression); }
async function navigate() { await command('Page.navigate', { url: 'http://127.0.0.1:4319/?test=' + Date.now() }); await waitFor('Boolean(document.querySelector(".office-cinema"))'); await delay(600); }
await command('Runtime.enable'); await command('Page.enable'); await command('Network.enable');
await command('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await navigate(); await waitFor('document.querySelector("canvas").dataset.frame === "1"');
for (const [progress, frame] of [[.34,41],[.67,81],[1,121],[0,1]]) {
  await evaluate('window.scrollTo({top: document.querySelector(".office-cinema").offsetTop + (document.querySelector(".office-cinema").offsetHeight-innerHeight)*'+progress+', behavior:"instant"})');
  await waitFor('document.querySelector("canvas").dataset.frame === "'+frame+'"');
}
const before = await evaluate('document.querySelector("canvas").dataset.frame'); await delay(500);
assert.equal(await evaluate('document.querySelector("canvas").dataset.frame'), before);
assert.equal(await evaluate('performance.getEntriesByType("resource").some(r => /\.glb/.test(r.name))'), false);
const screenshot = await command('Page.captureScreenshot', { format: 'png' });
await writeFile(new URL('../../working/office-cinema/review/scroll-desktop.png', import.meta.url), Buffer.from(screenshot.data,'base64'));
await evaluate('document.querySelector("#servicos").scrollIntoView({behavior:"instant"})');
assert.ok(await evaluate('document.querySelector("#servicos").getBoundingClientRect().top < innerHeight'));
await command('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await navigate();
assert.equal(await evaluate('document.querySelector(".office-cinema").dataset.motion'), 'false');
assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth'));
const mobile = await command('Page.captureScreenshot', { format: 'png' });
await writeFile(new URL('../../working/office-cinema/review/scroll-mobile.png', import.meta.url), Buffer.from(mobile.data,'base64'));
await command('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await command('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await navigate(); assert.equal(await evaluate('document.querySelector(".office-cinema").dataset.motion'), 'false');
await command('Emulation.setEmulatedMedia', { features: [] });
const injected = await command('Page.addScriptToEvaluateOnNewDocument', { source: 'Object.defineProperty(navigator,"connection",{value:{saveData:true},configurable:true})' });
await navigate(); assert.equal(await evaluate('document.querySelector(".office-cinema").dataset.motion'), 'false');
await command('Page.removeScriptToEvaluateOnNewDocument', { identifier: injected.identifier });
await command('Network.setBlockedURLs', { urls: ['*office-sequence/manifest.json*'] });
await navigate(); assert.equal(await evaluate('document.querySelector(".office-cinema").dataset.motion'), 'false');
assert.deepEqual(errors, []);
console.log('PASS: preview frames forward/backward, stop, normal sections, no GLB requests, mobile, reduced motion, save-data, loading failure.');
socket.close();
