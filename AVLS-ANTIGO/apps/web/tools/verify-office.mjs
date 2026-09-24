import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { BufferAttribute, BufferGeometry, Matrix4, Mesh, MeshBasicMaterial, DoubleSide, Raycaster, Vector3 } from 'three';
import { CAMERA_SHOTS, MATERIAL_OVERRIDES, MODEL_FLOOR_OFFSET } from '../src/components/office3d/officeConfig.js';

const file = await fs.readFile(fileURLToPath(new URL('../public/models/modern-office.glb', import.meta.url)));
assert.equal(file.readUInt32LE(0), 0x46546c67);
assert.equal(file.readUInt32LE(4), 2);
assert.equal(file.readUInt32LE(8), file.length);
const jsonLength = file.readUInt32LE(12);
const data = JSON.parse(file.subarray(20, 20 + jsonLength).toString());
const binOffset = 28 + jsonLength;
const components = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 };
const readers = { 5126: ['getFloat32', 4], 5125: ['getUint32', 4], 5123: ['getUint16', 2], 5121: ['getUint8', 1] };
function readAccessor(index) {
  const a = data.accessors[index], view = data.bufferViews[a.bufferView];
  const [reader, bytes] = readers[a.componentType], size = components[a.type];
  const stride = view.byteStride || bytes * size;
  const binary = new DataView(file.buffer, file.byteOffset, file.length);
  const output = new (a.componentType === 5126 ? Float32Array : Uint32Array)(a.count * size);
  for (let i = 0; i < a.count; i++) for (let j = 0; j < size; j++) {
    output[i * size + j] = binary[reader](binOffset + (view.byteOffset || 0) + (a.byteOffset || 0) + i * stride + j * bytes, true);
  }
  return new BufferAttribute(output, size);
}
const meshes = [], inventory = [];
function visit(index, parent) {
  const node = data.nodes[index];
  const matrix = new Matrix4();
  if (node.matrix) matrix.fromArray(node.matrix);
  matrix.premultiply(parent);
  if (node.mesh !== undefined) for (const primitive of data.meshes[node.mesh].primitives) {
    assert.ok(MATERIAL_OVERRIDES[data.materials[primitive.material].name], 'Unmapped material');
    const geometry = new BufferGeometry(); geometry.setAttribute('position', readAccessor(primitive.attributes.POSITION));
    if (primitive.indices !== undefined) geometry.setIndex(readAccessor(primitive.indices));
    geometry.applyMatrix4(matrix); geometry.translate(0, MODEL_FLOOR_OFFSET, 0); geometry.computeBoundingBox();
    inventory.push({ mesh: node.name, material: data.materials[primitive.material].name, min: geometry.boundingBox.min.toArray(), max: geometry.boundingBox.max.toArray() });
    const mesh = new Mesh(geometry, new MeshBasicMaterial({ side: DoubleSide })); mesh.name = node.name;
    mesh.updateMatrixWorld(); meshes.push(mesh);
  }
  for (const child of node.children || []) visit(child, matrix);
}
for (const node of data.scenes[data.scene || 0].nodes) visit(node, new Matrix4());
const ray = new Raycaster(), position = new Vector3(), direction = new Vector3();
const clearance = 0.12;
let samples = 0;
for (let i = 0; i < CAMERA_SHOTS.length - 1; i++) {
  const from = new Vector3(...CAMERA_SHOTS[i].position), to = new Vector3(...CAMERA_SHOTS[i + 1].position);
  const path = to.clone().sub(from), distance = path.length();
  ray.set(from, path.normalize()); ray.far = distance;
  assert.equal(ray.intersectObjects(meshes, false).length, 0, 'Camera path intersects model');
  for (let step = 0; step <= 100; step++) {
    position.copy(from).lerp(to, step / 100);
    assert.ok(position.x > -2.2 && position.x < 3.25 && Math.abs(position.z) < 2.04);
    assert.ok(position.y > 1.12 && position.y < 2.2, 'Clearance from desktop/laptop and pendant lights');
    for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) {
      if (!x && !y && !z) continue;
      direction.set(x, y, z).normalize(); ray.set(position, direction); ray.far = clearance;
      assert.equal(ray.intersectObjects(meshes, false).length, 0, 'Camera too close to model surface');
    }
    samples++;
  }
}
const footer = await fs.readFile(new URL('../src/components/Footer.jsx', import.meta.url), 'utf8');
assert.equal(footer.split('https://skfb.ly/oDPCS').length - 1, 2);
assert.ok(footer.includes('http://creativecommons.org/licenses/by/4.0/'));
console.log(JSON.stringify({ bytes: file.length, meshes: inventory, cameraSamples: samples, clearance, status: 'PASS' }, null, 2));
