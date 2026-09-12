import React from 'react';
import { Camera, Focus, AudioLines } from 'lucide-react';

// Replace null with a local transparent PNG/WebP path, e.g. /images/studio/mobile-rig.webp.
export const STUDIO_EQUIPMENT = {
	tripod: { src: null, label: 'Smartphone em tripé', format: '9:16', camera: 'MOBILE / A' },
	rig: { src: null, label: 'Mobile rig de produção', format: '16:9', camera: 'MOBILE / B' },
};

export default function StudioEquipment({ kind = 'tripod', asset = STUDIO_EQUIPMENT[kind] }) {
	return (
		<div className={`studio-equipment studio-equipment--${kind}`} data-equipment aria-hidden="true">
			{asset.src ? <img src={asset.src} alt="" width="420" height="640" loading="lazy" decoding="async" /> : (
				<div className="equipment-placeholder">
					<div className="equipment-monitor">
						<div className="equipment-hud"><span><i /> REC</span><span>{asset.format}</span></div>
						<Focus className="equipment-focus" strokeWidth={0.7} />
						<div className="equipment-subject"><Camera strokeWidth={1} /><span>AVLS<br />IN FRAME.</span></div>
						<div className="equipment-hud equipment-hud-bottom"><AudioLines size={18} /><span>00:00:24</span></div>
					</div>
					<span className="equipment-mount" /><span className="equipment-stand" />
				</div>
			)}
			<span className="equipment-caption">{asset.camera} <span>{asset.label}</span></span>
		</div>
	);
}
