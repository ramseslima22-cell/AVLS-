import { useState } from 'react';
import './Folder.css';

// Adaptado do componente Folder (React Bits), a partir do código fornecido.
const darkenColor = (hex, percent) => {
  let color = hex.replace('#', '');
  if (color.length === 3) color = color.split('').map(c => c + c).join('');
  const value = parseInt(color.slice(0, 6), 16);
  const channel = shift => Math.max(0, Math.floor(((value >> shift) & 255) * (1 - percent)));
  return '#' + [channel(16), channel(8), channel(0)].map(c => c.toString(16).padStart(2, '0')).join('');
};

export default function Folder({ color = '#a77550', size = 3, items = [], label = 'Portfólio', className = '' }) {
  const [open, setOpen] = useState(false);
  const [offsets, setOffsets] = useState({});
  const papers = items.slice(0, 3);
  function move(event, index) {
    if (!open || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setOffsets(current => ({ ...current, [index]: {
      x: (event.clientX - rect.left - rect.width / 2) * 0.06,
      y: (event.clientY - rect.top - rect.height / 2) * 0.06,
    } }));
  }
  return (
    <div className={`rb-folder-stage ${className}`} style={{ '--folder-size': size, '--folder-color': color, '--folder-back-color': darkenColor(color, 0.18) }}>
      <div className={`rb-folder ${open ? 'is-open' : ''}`}>
        <div className="rb-folder__back" data-paper-count={papers.length}>
          {papers.map((item, index) => (
            <div key={index} className={`rb-folder__paper rb-folder__paper--${index + 1}`}
              aria-hidden={!open} inert={open ? undefined : ''}
              onMouseMove={event => move(event, index)}
              onMouseLeave={() => setOffsets(current => ({ ...current, [index]: { x: 0, y: 0 } }))}
              style={{ '--magnet-x': `${offsets[index]?.x || 0}px`, '--magnet-y': `${offsets[index]?.y || 0}px` }}>
              <div className="rb-folder__content">{item}</div>
            </div>
          ))}
          <div className="rb-folder__front" aria-hidden="true" />
          <div className="rb-folder__front rb-folder__front--right" aria-hidden="true" />
          <button type="button" className="rb-folder__trigger"
            aria-label={`${open ? 'Fechar' : 'Abrir'} pasta de ${label}`} aria-expanded={open}
            onClick={() => { setOpen(value => !value); setOffsets({}); }}>
            <span className="rb-folder__mark">AVLS / PORTFÓLIO</span>
            <span className="rb-folder__label">{label}</span>
            <span className="rb-folder__hint">{open ? 'Fechar pasta −' : 'Explorar projetos +'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
