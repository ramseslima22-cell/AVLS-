import test from 'node:test';
import assert from 'node:assert/strict';
import { createSequencePlayer, frameIndex } from '../../apps/web/src/components/office3d/sequencePlayer.js';
test('bounded requests/cache, seek backward, pause and failure disposal', () => {
  let requests = [], count = 0, frame, errors = 0;
  class FakeImage { set src(url) { if (url) { requests.push(this); count++; } } }
  const player = createSequencePlayer({frames:Array.from({length:121},(_,i)=>({frame:i+1,url:String(i)})),draw:(_,f)=>{frame=f;},onError:()=>{errors++;},maxCache:5,ImageClass:FakeImage});
  const flush = () => { while(requests.length) { assert.ok(player.stats().pending<=2); requests.shift().onload?.(); assert.ok(player.stats().cached<=5); } };
  for (const progress of [0,1,.5,.9,.1,0]) {player.update(progress);flush();assert.equal(frame,frameIndex(progress,121)+1);}
  const previous=count;player.update(0);flush();assert.equal(count,previous);
  player.update(1);requests[0].onerror();assert.equal(errors,1);assert.equal(player.stats().pending,0);assert.equal(player.stats().cached,0);
});
