import { motion } from 'framer-motion';
import usePointerDepth from '@/hooks/use-pointer-depth';

export default function DepthSurface({ children, className = '', surfaceClassName = '', strength = 5, shine = true }) {
  const depth = usePointerDepth(strength);
  return (
    <div className={`depth-scene ${className}`} {...depth.pointerEvents} data-depth-enabled={depth.enabled}>
      <motion.div className={`depth-surface ${surfaceClassName}`}
        style={{ rotateX: depth.enabled ? depth.rotateX : 0, rotateY: depth.enabled ? depth.rotateY : 0 }}>
        {children}
        {shine && <motion.div aria-hidden="true" className="depth-shine"
          style={{ '--light-x': depth.lightX, '--light-y': depth.lightY }} />}
      </motion.div>
    </div>
  );
}
