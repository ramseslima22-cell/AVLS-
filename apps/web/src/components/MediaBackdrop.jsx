import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

// Scroll updates motion values directly; video backgrounds pause outside the viewport.
export default function MediaBackdrop({ src, videoSrc, paused = false, priority = false, className = '' }) {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const reduced = useReducedMotion();
  const [videoEnabled, setVideoEnabled] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-1.5%', '1.5%']);
  useEffect(() => {
    setVideoEnabled(Boolean(videoSrc) && !reduced && !navigator.connection?.saveData);
  }, [videoSrc, reduced]);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let visible = false;
    const update = () => {
      if (visible && !paused && !document.hidden) video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; update(); });
    observer.observe(video);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); video.pause(); };
  }, [videoEnabled, paused]);
  return (
    <div ref={ref} className={'media-backdrop ' + className} aria-hidden="true">
      <motion.img src={src} alt="" loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : 'auto'} decoding="async"
        style={reduced ? undefined : { y }} />
      {videoEnabled && <video ref={videoRef} src={videoSrc} poster={src} muted loop playsInline preload="metadata" tabIndex={-1} />}
    </div>
  );
}
