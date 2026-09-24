import { useEffect, useRef, useState } from 'react';
import { createSequencePlayer } from './sequencePlayer';

export default function OfficeExperience({ children }) {
  const section = useRef(null), canvas = useRef(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = matchMedia('(max-width: 760px)');
    const connection = navigator.connection;
    let cleanup = () => {};
    function configure() {
      cleanup(); setActive(false);
      if (reduced.matches || connection?.saveData) return;
      const ctx = canvas.current.getContext('2d', { alpha: false });
      if (!ctx) return;
      const abort = new AbortController();
      let disposed = false, player, raf = 0;
      const update = () => {
        raf = 0;
        if (disposed || !player) return;
        const rect = section.current.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > innerHeight) return;
        const dpr = Math.min(devicePixelRatio || 1, mobile.matches ? 1 : 1.5);
        const width = Math.round(canvas.current.clientWidth * dpr);
        const height = Math.round(canvas.current.clientHeight * dpr);
        if (canvas.current.width !== width || canvas.current.height !== height) {
          canvas.current.width = width; canvas.current.height = height;
        }
        player.update(-rect.top / Math.max(1, rect.height - innerHeight));
      };
      const schedule = () => { if (!raf && !disposed) raf = requestAnimationFrame(update); };
      const observer = new ResizeObserver(schedule);
      cleanup = () => {
        disposed = true; abort.abort(); player?.dispose(); cancelAnimationFrame(raf);
        observer.disconnect(); removeEventListener('scroll', schedule); removeEventListener('resize', schedule);
      };
      fetch('/office-sequence/manifest.json', { signal: abort.signal, cache: 'no-cache' })
        .then(response => { if (!response.ok) throw new Error('Sequence unavailable'); return response.json(); })
        .then(manifest => {
          if (disposed) return;
          const sequence = mobile.matches ? manifest.mobile : manifest.desktop;
          if (!Array.isArray(sequence?.frames) || sequence.frames.length < 2) return;
          player = createSequencePlayer({
            frames: sequence.frames, maxCache: mobile.matches ? 5 : 8,
            onError: () => { setActive(false); cleanup(); },
            draw: (image, frame) => {
              if (disposed) return;
              const target = canvas.current;
              const scale = Math.max(target.width / image.naturalWidth, target.height / image.naturalHeight);
              const w = image.naturalWidth * scale, h = image.naturalHeight * scale;
              ctx.drawImage(image, (target.width - w) / 2, (target.height - h) / 2, w, h);
              target.dataset.frame = String(frame);
            },
          });
          setActive(true);
          observer.observe(section.current);
          addEventListener('scroll', schedule, { passive: true }); addEventListener('resize', schedule);
          schedule();
        }).catch(() => { if (!disposed) { setActive(false); cleanup(); } });
    }
    configure();
    reduced.addEventListener('change', configure); mobile.addEventListener('change', configure);
    connection?.addEventListener?.('change', configure);
    return () => {
      cleanup(); reduced.removeEventListener('change', configure); mobile.removeEventListener('change', configure);
      connection?.removeEventListener?.('change', configure);
    };
  }, []);
  return <div ref={section} className="office-cinema" data-motion={active ? 'true' : 'false'}>
    <div className="office-cinema-sticky">
      <div className="office-cinema-media" aria-hidden="true">
        <picture>
          <source media="(max-width: 760px)" srcSet="/office-sequence/preview/mobile-1.webp" />
          <img src="/office-sequence/preview/desktop-1.webp" alt="" fetchPriority="high" />
        </picture>
        <canvas ref={canvas} style={{ visibility: active ? 'visible' : 'hidden' }} />
      </div>
      {children}
    </div>
  </div>;
}
