/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo } from 'react';
import { RoundedBox } from '@react-three/drei';
import { CanvasTexture, SRGBColorSpace } from 'three';
import { DESK_HEIGHT } from './officeConfig';

function makeTexture(kind) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024; canvas.height = kind === 'screen' ? 640 : 512;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = kind === 'screen' ? '#10151e' : '#383c43';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (kind === 'screen') {
    ctx.fillStyle = '#f5f2eb'; ctx.font = 'bold 68px sans-serif'; ctx.fillText('AVLS', 60, 100);
    ['#3078e8', '#8050c9', '#d7579b', '#e69a57'].forEach((color, i) => {
      ctx.fillStyle = color; ctx.fillRect(63 + i * 32, 122, 24, 5);
    });
    ctx.fillStyle = '#f5f2eb'; ctx.font = 'bold 74px sans-serif';
    ctx.fillText('Do ideal', 60, 260); ctx.fillText('ao real.', 60, 348);
    ctx.font = '26px sans-serif'; ctx.fillStyle = '#c8cdd8';
    ctx.fillText('Estratégia. Criação. Resultados.', 60, 408);
    ctx.fillStyle = '#f5f2eb'; ctx.beginPath(); ctx.roundRect(60, 462, 240, 60, 30); ctx.fill();
    ctx.fillStyle = '#171b24'; ctx.font = 'bold 24px sans-serif'; ctx.fillText('AVLS / Estúdio', 90, 501);
    const gradient = ctx.createLinearGradient(580, 160, 960, 530);
    gradient.addColorStop(0, '#3078e8'); gradient.addColorStop(0.5, '#8050c9'); gradient.addColorStop(1, '#d7579b');
    ctx.fillStyle = gradient; ctx.beginPath(); ctx.moveTo(650, 240); ctx.lineTo(930, 160);
    ctx.lineTo(820, 420); ctx.lineTo(575, 490); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#e69a57'; ctx.fillRect(60, 574, 44, 4);
    ctx.fillStyle = '#8d96a5'; ctx.font = '22px sans-serif'; ctx.fillText('Sites  /  Tráfego  /  Conteúdo', 130, 582);
  } else {
    for (let row = 0; row < 5; row++) for (let col = 0; col < 13; col++) {
      ctx.fillStyle = '#14181e'; ctx.beginPath(); ctx.roundRect(24 + col * 75, 20 + row * 56, 65, 45, 7); ctx.fill();
      ctx.fillStyle = '#858b95'; ctx.fillRect(48 + col * 75, 38 + row * 56, 10, 3);
    }
    ctx.strokeStyle = '#666c76'; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(336, 333, 352, 155, 12); ctx.stroke();
  }
  const texture = new CanvasTexture(canvas); texture.colorSpace = SRGBColorSpace;
  return texture;
}

// The supplied room has no computer. This is the only added desk object.
export default function AvlsLaptop({ mobile }) {
  const maps = useMemo(() => ({ screen: makeTexture('screen'), keys: makeTexture('keys') }), []);
  useEffect(() => () => { maps.screen.dispose(); maps.keys.dispose(); }, [maps]);
  return <group position={[0, DESK_HEIGHT + 0.008, 0.1]} rotation={[0, -Math.PI / 2, 0]}>
    <RoundedBox args={[0.38, 0.014, 0.275]} radius={0.006} smoothness={3} castShadow={!mobile} receiveShadow>
      <meshStandardMaterial color="#454a53" metalness={0.65} roughness={0.34} />
    </RoundedBox>
    <mesh position={[0, 0.0075, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[0.355, 0.247]} /><meshStandardMaterial map={maps.keys} roughness={0.7} />
    </mesh>
    <group position={[0, 0.008, -0.12]} rotation={[-0.18, 0, 0]}>
      <RoundedBox position={[0, 0.125, 0]} args={[0.38, 0.25, 0.009]} radius={0.006} smoothness={3} castShadow={!mobile}>
        <meshStandardMaterial color="#22262e" metalness={0.45} roughness={0.32} />
      </RoundedBox>
      <mesh position={[0, 0.127, 0.0048]}>
        <planeGeometry args={[0.357, 0.223]} /><meshBasicMaterial map={maps.screen} toneMapped={false} />
      </mesh>
    </group>
  </group>;
}
