export function frameIndex(progress, count) {
  return Math.round(Math.max(0, Math.min(1, progress)) * Math.max(0, count - 1));
}

// Only the current frame and its neighbours are requested, with two downloads at most.
export function createSequencePlayer({ frames, draw, onError, maxCache = 8, ImageClass = Image }) {
  const cache = new Map(), pending = new Map();
  let wanted = 0, stopped = false;
  function paint() {
    if (!cache.size || stopped) return;
    const nearest = [...cache.keys()].sort((a, b) => Math.abs(a - wanted) - Math.abs(b - wanted))[0];
    draw(cache.get(nearest), frames[nearest].frame);
  }
  function pump() {
    if (stopped) return;
    for (const index of [wanted, wanted + 1, wanted - 1]) {
      if (pending.size >= 2) break;
      if (index < 0 || index >= frames.length || cache.has(index) || pending.has(index)) continue;
      const img = new ImageClass();
      pending.set(index, img);
      img.onload = () => {
        if (stopped) return;
        pending.delete(index); cache.set(index, img);
        while (cache.size > maxCache) {
          const farthest = [...cache.keys()].sort((a, b) => Math.abs(b - wanted) - Math.abs(a - wanted))[0];
          cache.delete(farthest);
        }
        paint(); pump();
      };
      img.onerror = () => { if (!stopped) { dispose(); onError(); } };
      img.src = frames[index].url;
    }
  }
  function dispose() {
    stopped = true;
    for (const img of pending.values()) { img.onload = null; img.onerror = null; img.src = ''; }
    pending.clear(); cache.clear();
  }
  return {
    update(progress) { if (!stopped) { wanted = frameIndex(progress, frames.length); paint(); pump(); } },
    redraw: paint,
    dispose,
    stats: () => ({ cached: cache.size, pending: pending.size, wanted }),
  };
}
