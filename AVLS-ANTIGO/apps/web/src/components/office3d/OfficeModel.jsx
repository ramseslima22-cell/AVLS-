/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { CanvasTexture, Source, SRGBColorSpace } from 'three';
import { HIDDEN_MESHES, MATERIAL_OVERRIDES, MODEL_FLOOR_OFFSET, MODEL_URL } from './officeConfig';

function studioArtwork() {
  const canvas = document.createElement('canvas'); canvas.width = 1024; canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#e5dfd2'; ctx.fillRect(0, 0, 1024, 1024);
  // Original UV atlas: the right-hand panel is the front of the wall artwork.
  ctx.fillStyle = '#eeebe3'; ctx.fillRect(424, 16, 556, 980);
  ctx.strokeStyle = '#303740'; ctx.lineWidth = 5;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath(); ctx.ellipse(702, 505, 90 + i * 17, 260, -0.25, 0, Math.PI * 2); ctx.stroke();
  }
  ['#5276b4', '#8877a6', '#bd819b', '#cda17a'].forEach((color, i) => {
    ctx.fillStyle = color; ctx.fillRect(626 + i * 40, 858, 30, 7);
  });
  const map = new CanvasTexture(canvas); map.flipY = false; map.colorSpace = SRGBColorSpace;
  return map;
}

function prepareModel(source, mobile) {
  const scene = source.clone(true);
  const materials = []; const textures = new Set(); const resized = new Map();
  const artwork = studioArtwork(); textures.add(artwork);
  const resizeTexture = texture => {
    if (!texture || !mobile || !texture.image || Math.max(texture.image.width, texture.image.height) <= 1024) return texture;
    if (resized.has(texture)) return resized.get(texture);
    const canvas = document.createElement('canvas');
    const scale = 1024 / Math.max(texture.image.width, texture.image.height);
    canvas.width = Math.round(texture.image.width * scale); canvas.height = Math.round(texture.image.height * scale);
    canvas.getContext('2d').drawImage(texture.image, 0, 0, canvas.width, canvas.height);
    const copy = texture.clone(); copy.source = new Source(canvas); copy.needsUpdate = true;
    resized.set(texture, copy); textures.add(copy); return copy;
  };
  scene.traverse(object => {
    if (!object.isMesh) return;
    object.visible = !HIDDEN_MESHES.includes(object.name);
    object.receiveShadow = !mobile;
    // Shell has baked shadows; keep the window light unobstructed by its roof.
    object.castShadow = !mobile && !/Structure|Window_0|Backdrop|Painting/.test(object.name);
    const customize = original => {
      const material = original.clone(); materials.push(material);
      const settings = MATERIAL_OVERRIDES[original.name];
      if (settings) material.setValues(settings);
      for (const key of ['map', 'emissiveMap', 'roughnessMap', 'metalnessMap', 'normalMap', 'aoMap']) {
        material[key] = resizeTexture(material[key]);
      }
      // Replace the unrelated original print; retain the existing framed mesh.
      if (original.name === 'Painting') { material.map = artwork; material.emissiveMap = artwork; }
      material.needsUpdate = true;
      return material;
    };
    object.material = Array.isArray(object.material) ? object.material.map(customize) : customize(object.material);
  });
  return { scene, dispose: () => { materials.forEach(material => material.dispose()); textures.forEach(texture => texture.dispose()); } };
}

export default function OfficeModel({ mobile }) {
  // Intentionally no preload: reduced-motion/save-data users must never fetch 26 MB.
  const { scene } = useGLTF(MODEL_URL);
  const model = useMemo(() => prepareModel(scene, mobile), [scene, mobile]);
  useEffect(() => () => model.dispose(), [model]);
  return <group position={[0, MODEL_FLOOR_OFFSET, 0]}><primitive object={model.scene} dispose={null} /></group>;
}
