/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils, Vector3 } from 'three';
import OfficeModel from './OfficeModel';
import AvlsLaptop from './AvlsLaptop';
import { CAMERA_SHOTS } from './officeConfig';

function CameraRig({ mobile, onReady }) {
  const invalidate = useThree(state => state.invalidate);
  const scroll = useRef(window.scrollY);
  const stops = useRef(CAMERA_SHOTS.map((_, i) => i * 1000));
  const pointer = useRef({ x: 0, y: 0 });
  const motion = useRef({ progress: null, x: 0, y: 0, frames: 0 });
  const target = useMemo(() => new Vector3(), []);
  const positions = useMemo(() => CAMERA_SHOTS.map(shot => new Vector3(...shot.position)), []);
  const targets = useMemo(() => CAMERA_SHOTS.map(shot => new Vector3(...shot.target)), []);

  useEffect(() => {
    const measure = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      stops.current = CAMERA_SHOTS.map(({ section }, i) => {
        const element = document.getElementById(section);
        return element ? Math.min(max, Math.max(0, element.getBoundingClientRect().top + window.scrollY - (i ? window.innerHeight * 0.18 : 0))) : max * i / (CAMERA_SHOTS.length - 1);
      });
      invalidate();
    };
    const onScroll = () => { scroll.current = window.scrollY; invalidate(); };
    const move = event => {
      if (event.pointerType !== 'mouse' || mobile) return;
      pointer.current.x = event.clientX / window.innerWidth * 2 - 1;
      pointer.current.y = event.clientY / window.innerHeight * 2 - 1;
      invalidate();
    };
    const reset = () => { pointer.current.x = 0; pointer.current.y = 0; invalidate(); };
    const resize = new ResizeObserver(measure); resize.observe(document.body);
    measure(); onScroll(); reset();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('blur', reset);
    document.addEventListener('pointerleave', reset);
    return () => {
      resize.disconnect(); window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure); window.removeEventListener('pointermove', move);
      window.removeEventListener('blur', reset); document.removeEventListener('pointerleave', reset);
    };
  }, [invalidate, mobile]);

  useFrame(({ camera }, delta) => {
    const last = CAMERA_SHOTS.length - 1;
    let segment = 0;
    while (segment < last - 1 && scroll.current >= stops.current[segment + 1]) segment++;
    const fraction = MathUtils.clamp((scroll.current - stops.current[segment]) / Math.max(1, stops.current[segment + 1] - stops.current[segment]), 0, 1);
    const goal = segment + fraction;
    const state = motion.current;
    // Damp a single path parameter, so anchor-link jumps cannot cut across the room.
    state.progress = state.progress === null ? goal : MathUtils.damp(state.progress, goal, 4.5, Math.min(delta, 0.05));
    state.x = MathUtils.damp(state.x, pointer.current.x, 4, Math.min(delta, 0.05));
    state.y = MathUtils.damp(state.y, pointer.current.y, 4, Math.min(delta, 0.05));
    const i = Math.min(last - 1, Math.floor(state.progress));
    const t = MathUtils.smoothstep(state.progress - i, 0, 1);
    camera.position.copy(positions[i]).lerp(positions[i + 1], t);
    camera.position.z += state.x * 0.012;
    camera.position.y -= state.y * 0.008;
    target.copy(targets[i]).lerp(targets[i + 1], t);
    camera.lookAt(target);
    const fov = MathUtils.lerp(CAMERA_SHOTS[i].fov, CAMERA_SHOTS[i + 1].fov, t) + (mobile ? 12 : 0);
    if (Math.abs(camera.fov - fov) > 0.001) { camera.fov = fov; camera.updateProjectionMatrix(); }
    state.frames++;
    if (state.frames === 2) onReady();
    if (state.frames < 2 || Math.abs(state.progress - goal) > 0.0001 || Math.abs(state.x - pointer.current.x) > 0.001 || Math.abs(state.y - pointer.current.y) > 0.001) invalidate();
  });
  return null;
}

export default function OfficeScene({ mobile = false, onReady }) {
  return <>
    <color attach="background" args={['#dad6ce']} />
    <ambientLight intensity={0.32} color="#fff7ed" />
    <hemisphereLight intensity={0.55} color="#e6edf7" groundColor="#aaa08d" />
    <directionalLight position={[-2.2, 2.8, -0.6]} intensity={1.35} color="#fff1d9"
      castShadow={!mobile} shadow-mapSize-width={1024} shadow-mapSize-height={1024}
      shadow-camera-left={-4} shadow-camera-right={4} shadow-camera-top={4} shadow-camera-bottom={-4}
      shadow-camera-near={0.1} shadow-camera-far={12} shadow-normalBias={0.012} shadow-bias={-0.00015} />
    <OfficeModel mobile={mobile} />
    <AvlsLaptop mobile={mobile} />
    <CameraRig mobile={mobile} onReady={onReady} />
  </>;
}
