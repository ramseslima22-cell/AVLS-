// Coordinates in metres, after raising the GLB floor to y = 0.
// Window: x = -2.37. Desk: x ±0.336, z ±1.11, top y = 0.720.
export const MODEL_URL = '/models/modern-office.glb';
export const MODEL_FLOOR_OFFSET = 1.53958544;
export const DESK_HEIGHT = 0.719672;

// Keep cameras inside the room and above furniture. Mobile changes FOV, not paths.
export const CAMERA_SHOTS = [
  { section: 'inicio', position: [-1.18, 1.28, 0.38], target: [0, 0.92, -0.3], fov: 43 },
  { section: 'servicos', position: [-1.92, 1.75, -0.65], target: [0, 0.85, 0], fov: 53 },
  { section: 'trabalhos', position: [-0.9, 1.5, -1.65], target: [0, 0.98, 0.16], fov: 48 },
  { section: 'sobre', position: [1.15, 1.7, -1.55], target: [-0.8, 1.15, 0.4], fov: 55 },
  { section: 'contato', position: [2.6, 1.8, 1.55], target: [-1.05, 1.35, 0], fov: 58 },
];

// Exact material names found in the supplied GLB. Baked shadows stay in map.
export const MATERIAL_OVERRIDES = {
  Structure: { color: '#f3eee5', roughness: 0.78, metalness: 0, emissiveIntensity: 0.2 },
  Table: { color: '#cfb795', roughness: 0.62, metalness: 0, emissiveIntensity: 0.16 },
  Chair: { color: '#666a70', roughness: 0.68, metalness: 0.12, emissiveIntensity: 0.12 },
  Carpet: { color: '#c8c0b4', roughness: 1, metalness: 0, emissiveIntensity: 0.12 },
  Plant: { color: '#b8c3a2', roughness: 0.88, metalness: 0, emissiveIntensity: 0.18 },
  Books: { color: '#eee7da', roughness: 0.82, metalness: 0, emissiveIntensity: 0.15 },
  Table_Decoration: { color: '#ece6dc', roughness: 0.65, metalness: 0.05, emissiveIntensity: 0.15 },
  Lights: { color: '#333840', roughness: 0.42, metalness: 0.4, emissiveIntensity: 0.12 },
  Window: { color: '#dce6e9', roughness: 0.15, metalness: 0, opacity: 0.16, transparent: true, depthWrite: false, emissiveIntensity: 0.12 },
  Backdrop: { color: '#cbd8dc', roughness: 1, metalness: 0, emissiveIntensity: 0.55 },
  Painting: { color: '#ffffff', roughness: 0.85, metalness: 0, emissiveIntensity: 0.08 },
};
// Add an exact mesh name here to hide it without modifying the source GLB.
export const HIDDEN_MESHES = [];
