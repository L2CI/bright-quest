import * as THREE from '../../cave-river-quest/vendor/three.module.js';

type VehicleId = 'balanced' | 'survey' | 'hauler' | 'rescue' | 'crawler';
type Point = [number, number, number];
type Wheel = { x: number; y: number; z: number; radius: number };
type Model = { group: any; animate: (distance: number) => void };
const TAU = Math.PI * 2;
const V = (p: Point) => new THREE.Vector3(...p);
const wrap = (v: number, period: number) => ((v % period) + period) % period;

function wearTexture() {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas'); canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d'); if (!ctx) return null;
  ctx.fillStyle = '#f4f4f4'; ctx.fillRect(0, 0, 128, 128);
  let seed = 2317;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  for (let i = 0; i < 950; i++) {
    ctx.fillStyle = `rgba(65,62,54,${.015 + random() * .085})`;
    ctx.fillRect(random() * 128, random() * 128, .5 + random() * 2, .5 + random());
  }
  for (let i = 0; i < 40; i++) {
    ctx.fillStyle = '#60656330'; ctx.fillRect(random() * 128, random() * 128, 1 + random() * 8, .6);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function skyReflection() {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas'); canvas.width = 256; canvas.height = 128;
  const ctx = canvas.getContext('2d'); if (!ctx) return null;
  const sky = ctx.createLinearGradient(0, 0, 0, 128);
  sky.addColorStop(0, '#a6c7da'); sky.addColorStop(.42, '#e9eef0');
  sky.addColorStop(.51, '#a5b5ae'); sky.addColorStop(.6, '#68746d'); sky.addColorStop(1, '#454f48');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, 256, 128);
  ctx.fillStyle = '#ffffff'; ctx.fillRect(30, 17, 39, 17);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace; texture.mapping = THREE.EquirectangularReflectionMapping;
  return texture;
}

function palette() {
  const wear = wearTexture(), envMap = skyReflection();
  const metal = (color: number, metalness = .48, roughness = .43, worn = true) =>
    new THREE.MeshStandardMaterial({ color, metalness, roughness, map: worn ? wear : null, envMap, envMapIntensity: .55 });
  return {
    sage: metal(0x8f9b78), edge: metal(0x566351), light: metal(0xc3cbb0),
    sand: metal(0xd6ba79), teal: metal(0x398b89), cream: metal(0xeee9d7, .25),
    red: metal(0xad443f, .32), yellow: metal(0xeebf38), yellowEdge: metal(0xa77c25),
    steel: metal(0xb5c0c4, .83, .29), iron: metal(0x626d70, .7, .4),
    rubber: metal(0x24282a, .02, .88, false), inset: metal(0x363f42, .18, .72, false),
    seat: metal(0x454d49, .02, .94, false), cargo: metal(0x98a5aa, .3, .66),
    glass: new THREE.MeshStandardMaterial({ color: 0x397b8e, metalness: .4, roughness: .16, envMap, envMapIntensity: 1.1 }),
    lamp: new THREE.MeshStandardMaterial({ color: 0xf5f2d8, emissive: 0xffe5a0, emissiveIntensity: .6, roughness: .2 }),
    amber: new THREE.MeshStandardMaterial({ color: 0xffbc46, emissive: 0xee860d, emissiveIntensity: .35, roughness: .28 }),
    tail: new THREE.MeshStandardMaterial({ color: 0xc65442, emissive: 0x812419, emissiveIntensity: .25, roughness: .3 })
  };
}
type Palette = ReturnType<typeof palette>;

// Bake all stationary pieces into one geometry per material, including bolt/vent detail.
// Wheel templates use the same baker, then instance the complete assemblies.
class Parts {
  private buckets = new Map<any, any[]>();
  private transform = new THREE.Object3D();
  add(geometry: any, material: any, p: Point = [0, 0, 0], r: Point = [0, 0, 0]) {
    this.transform.position.set(...p); this.transform.rotation.set(...r); this.transform.updateMatrix();
    const flat = geometry.index ? geometry.toNonIndexed() : geometry;
    if (flat !== geometry) geometry.dispose();
    flat.applyMatrix4(this.transform.matrix);
    if (!this.buckets.has(material)) this.buckets.set(material, []);
    this.buckets.get(material)!.push(flat);
  }
  box(size: Point, material: any, p: Point, r: Point = [0, 0, 0]) {
    this.add(new THREE.BoxGeometry(...size), material, p, r);
  }
  cylinder(radius: number, depth: number, material: any, p: Point, r: Point = [0, 0, 0], top = radius, segments = 16) {
    this.add(new THREE.CylinderGeometry(top, radius, depth, segments), material, p, r);
  }
  rod(a: Point, b: Point, radius: number, material: any, segments = 8) {
    const start = V(a), end = V(b), delta = end.clone().sub(start);
    const geometry = new THREE.CylinderGeometry(radius, radius, delta.length(), segments);
    geometry.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize()));
    this.add(geometry, material, start.add(end).multiplyScalar(.5).toArray());
  }
  ring(radius: number, tube: number, material: any, p: Point, r: Point = [0, 0, 0]) {
    this.add(new THREE.TorusGeometry(radius, tube, 6, 24), material, p, r);
  }
  cable(points: Point[], radius: number, material: any) {
    this.add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(V)), 24, radius, 5, false), material);
  }
  finish(group: any) {
    for (const [material, parts] of this.buckets) {
      const total = parts.reduce((n, g) => n + g.attributes.position.count, 0);
      const geometry = new THREE.BufferGeometry();
      for (const [name, size] of [['position', 3], ['normal', 3], ['uv', 2]] as const) {
        const data = new Float32Array(total * size); let offset = 0;
        for (const part of parts) {
          const attribute = part.getAttribute(name);
          if (attribute) data.set(attribute.array, offset);
          offset += part.attributes.position.count * size;
        }
        geometry.setAttribute(name, new THREE.BufferAttribute(data, size));
      }
      geometry.computeBoundingSphere(); geometry.computeBoundingBox();
      const mesh = new THREE.Mesh(geometry, material); mesh.castShadow = mesh.receiveShadow = true;
      mesh.name = 'fleet-static'; group.add(mesh);
      for (const part of parts) part.dispose();
    }
    this.buckets.clear();
  }
}

// Clockwise in the XZ plane, with independently sized rings for genuinely sloping armour.
function outline(w: number, d: number, chamfer: number, y: number, z = 0): Point[] {
  const x = w / 2, l = d / 2, c = Math.min(chamfer, x * .8, l * .8);
  return [[-x + c, y, z - l], [x - c, y, z - l], [x, y, z - l + c], [x, y, z + l - c],
    [x - c, y, z + l], [-x + c, y, z + l], [-x, y, z + l - c], [-x, y, z - l + c]];
}
function loft(parts: Parts, rings: Point[][], material: any) {
  const positions: number[] = [];
  const tri = (a: Point, b: Point, c: Point) => positions.push(...a, ...b, ...c);
  const count = rings[0].length;
  for (let j = 0; j < rings.length - 1; j++) for (let i = 0; i < count; i++) {
    const next = (i + 1) % count;
    tri(rings[j][i], rings[j + 1][i], rings[j + 1][next]);
    tri(rings[j][i], rings[j + 1][next], rings[j][next]);
  }
  const bottom = rings[0], top = rings[rings.length - 1];
  for (let i = 1; i < count - 1; i++) { tri(bottom[0], bottom[i], bottom[i + 1]); tri(top[0], top[i + 1], top[i]); }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3)); geometry.computeVertexNormals();
  const uv: number[] = [];
  const normals = geometry.attributes.normal.array;
  for (let i = 0; i < positions.length; i += 3) {
    const nx = Math.abs(normals[i]), ny = Math.abs(normals[i + 1]);
    uv.push(nx > ny && nx > Math.abs(normals[i + 2]) ? positions[i + 2] : positions[i], ny > .6 ? positions[i + 2] : positions[i + 1]);
  }
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); parts.add(geometry, material);
}
function panel(parts: Parts, size: Point, material: any, p: Point, bevel = .06, rotation: Point = [0, 0, 0]) {
  const [w, h, d] = size, [x, y, z] = p, b = Math.min(bevel, h * .3);
  const rings = [outline(w - b, d - b, bevel, -h / 2), outline(w, d, bevel, -h / 2 + b),
    outline(w, d, bevel, h / 2 - b), outline(w - b, d - b, bevel, h / 2)];
  const euler = new THREE.Euler(...rotation);
  for (const ring of rings) for (const v of ring) {
    const point = V(v).applyEuler(euler); v[0] = point.x + x; v[1] = point.y + y; v[2] = point.z + z;
  }
  loft(parts, rings, material);
}
function vent(parts: Parts, p: Point, width: number, length: number, m: Palette, side = false) {
  const [x, y, z] = p;
  parts.box(side ? [.045, length, width] : [width, .035, length], m.inset, p);
  for (let i = 0; i < 9; i++) {
    const step = (i - 4) * length / 10;
    parts.box(side ? [.065, .026, width * .94] : [width * .94, .04, .028], m.iron,
      side ? [x, y + step, z] : [x, y + .025, z + step]);
  }
}
function boltRow(parts: Parts, a: Point, b: Point, count: number, m: Palette, side = false) {
  for (let i = 0; i < count; i++) {
    const p = V(a).lerp(V(b), count > 1 ? i / (count - 1) : 0).toArray();
    parts.cylinder(.025, .025, m.steel, p, side ? [0, 0, Math.PI / 2] : [0, 0, 0], .025, 6);
  }
}
function badge(parts: Parts, m: Palette, p: Point, side = 0, accent = m.light) {
  const [x, y, z] = p;
  // Original beacon mark: a diamond and two separated signal bars, never a cross.
  parts.box(side ? [.024, .22, .22] : [.22, .22, .024], accent, p,
    side ? [Math.PI / 4, 0, 0] : [0, 0, Math.PI / 4]);
  for (let i = 0; i < 2; i++) parts.box(side ? [.026, .035, .19 - i * .06] : [.19 - i * .06, .035, .026], m.steel,
    [x, y - .21 - i * .07, z]);
}
function lights(parts: Parts, m: Palette, x: number, y: number, front: number, rear: number) {
  for (const s of [-1, 1]) {
    panel(parts, [.32, .2, .13], m.iron, [s * x, y, front]);
    parts.box([.23, .11, .035], m.lamp, [s * x, y + .018, front + .077]);
    parts.box([.07, .095, .037], m.amber, [s * (x + .115), y + .02, front + .079]);
    parts.box([.23, .12, .07], m.inset, [s * x, y, rear]);
    parts.box([.16, .07, .025], m.tail, [s * x, y + .006, rear - .05]);
  }
}

function wheelTemplate(radius: number, width: number, m: Palette, rim: any, offroad: boolean) {
  const parts = new Parts();
  const profile = [[radius * .56, -width * .5], [radius * .85, -width * .5], [radius * .97, -width * .37],
    [radius, -width * .23], [radius, width * .23], [radius * .97, width * .37], [radius * .85, width * .5], [radius * .56, width * .5]];
  parts.add(new THREE.LatheGeometry(profile.map(([r, y]) => new THREE.Vector2(r, y)), 24), m.rubber, [0, 0, 0], [0, 0, Math.PI / 2]);
  parts.cylinder(radius * .61, width * .82, rim, [0, 0, 0], [0, 0, Math.PI / 2]);
  for (const s of [-1, 1]) {
    parts.ring(radius * .63, .023, m.iron, [s * width * .47, 0, 0], [0, Math.PI / 2, 0]);
    parts.ring(radius * .82, .012, m.rubber, [s * width * .505, 0, 0], [0, Math.PI / 2, 0]);
    parts.cylinder(radius * .22, .055, m.steel, [s * width * .49, 0, 0], [0, 0, Math.PI / 2]);
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * TAU;
      parts.cylinder(radius * .065, .02, m.inset, [s * width * .421, Math.cos(a) * radius * .44, Math.sin(a) * radius * .44], [0, 0, Math.PI / 2], radius * .065, 8);
      parts.cylinder(.023, .035, m.steel, [s * width * .465, Math.cos(a) * radius * .29, Math.sin(a) * radius * .29], [0, 0, Math.PI / 2], .023, 6);
    }
  }
  if (offroad) for (let i = 0; i < 28; i++) for (const s of [-1, 1]) {
    const a = (i + (s === 1 ? .35 : 0)) / 28 * TAU;
    parts.box([width * .46, .036, radius * .17], m.rubber,
      [s * width * .23, Math.cos(a) * (radius - .01), Math.sin(a) * (radius - .01)], [a, s * .2, 0]);
  }
  const group = new THREE.Group(); parts.finish(group); return group;
}

function wheels(group: any, locations: Wheel[], width: number, m: Palette, rim: any, offroad = true) {
  const template = wheelTemplate(locations[0].radius, width, m, rim, offroad);
  const batches = template.children.map((mesh: any) => {
    const batch = new THREE.InstancedMesh(mesh.geometry, mesh.material, locations.length);
    batch.name = 'fleet-wheels'; batch.castShadow = batch.receiveShadow = true;
    batch.instanceMatrix.setUsage(THREE.DynamicDrawUsage); group.add(batch); return batch;
  });
  const dummy = new THREE.Object3D();
  const update = (distance: number) => {
    for (let i = 0; i < locations.length; i++) {
      const w = locations[i]; dummy.position.set(w.x, w.y, w.z);
      dummy.scale.set(1, w.radius / locations[0].radius, w.radius / locations[0].radius);
      dummy.rotation.set(wrap(distance, TAU * w.radius) / w.radius, 0, 0); dummy.updateMatrix();
      for (const batch of batches) batch.setMatrixAt(i, dummy.matrix);
    }
    for (const batch of batches) batch.instanceMatrix.needsUpdate = true;
  };
  update(0);
  for (const batch of batches) {
    const bounds = new THREE.Box3();
    for (const w of locations) {
      const r = w.radius * 1.06;
      bounds.expandByPoint(new THREE.Vector3(w.x - width * .6, w.y - r, w.z - r));
      bounds.expandByPoint(new THREE.Vector3(w.x + width * .6, w.y + r, w.z + r));
    }
    batch.boundingBox = bounds; batch.boundingSphere = bounds.getBoundingSphere(new THREE.Sphere());
  }
  return update;
}

function runningTracks(group: any, parts: Parts, m: Palette, rim: any, halfLength = 1.63, x = 1.38, radius = .46, width = .64) {
  const centerY = radius + .069, straight = halfLength * 2, perimeter = straight * 2 + TAU * radius;
  const count = 64, pitch = perimeter / count;
  const shoes = new THREE.InstancedMesh(new THREE.BoxGeometry(width, .07, pitch * .94), m.iron, count * 2);
  const pads = new THREE.InstancedMesh(new THREE.BoxGeometry(width * .8, .046, pitch * .64), m.rubber, count * 2);
  for (const batch of [shoes, pads]) {
    batch.name = 'fleet-track-links'; batch.castShadow = batch.receiveShadow = true;
    batch.instanceMatrix.setUsage(THREE.DynamicDrawUsage); group.add(batch);
  }
  const locations: Wheel[] = [];
  for (const s of [-1, 1]) {
    const endRadius = radius - .047, count = halfLength > 1.4 ? 4 : 3;
    const roadRadius = (straight - endRadius * 2 - .12) / (count * 2);
    for (const end of [-1, 1]) locations.push({ x: s * x, y: centerY, z: end * halfLength, radius: endRadius });
    for (let i = 0; i < count; i++) {
      const z = (i - (count - 1) / 2) * (roadRadius * 2 + .03);
      locations.push({ x: s * x, y: roadRadius + .104, z, radius: roadRadius });
      parts.rod([s * (x - .13), .82, z - .15], [s * x, roadRadius + .104, z], .047, m.iron);
    }
    for (const z of [-halfLength * .47, halfLength * .47]) {
      parts.cylinder(.095, width * .6, m.rubber, [s * x, centerY + radius - .136, z], [0, 0, Math.PI / 2]);
    }
    parts.box([.24, .16, straight + .3], m.inset, [s * x, centerY, 0]);
  }
  const spin = wheels(group, locations, width * .68, m, rim, false);
  const dummy = new THREE.Object3D();
  const update = (distance: number) => {
    const offset = wrap(distance, perimeter);
    for (let side = 0; side < 2; side++) for (let i = 0; i < count; i++) {
      const d = wrap(i * pitch + offset, perimeter); let z: number, y: number, a: number;
      if (d < straight) { z = -halfLength + d; y = centerY + radius; a = 0; }
      else if (d < straight + Math.PI * radius) {
        a = (d - straight) / radius; z = halfLength + Math.sin(a) * radius; y = centerY + Math.cos(a) * radius;
      } else if (d < 2 * straight + Math.PI * radius) {
        a = Math.PI; z = halfLength - (d - straight - Math.PI * radius); y = centerY - radius;
      } else {
        a = Math.PI + (d - 2 * straight - Math.PI * radius) / radius;
        z = -halfLength + Math.sin(a) * radius; y = centerY + Math.cos(a) * radius;
      }
      dummy.position.set((side ? 1 : -1) * x, y, z); dummy.rotation.set(a, 0, 0); dummy.updateMatrix();
      shoes.setMatrixAt(side * count + i, dummy.matrix);
      dummy.position.y += Math.cos(a) * .041; dummy.position.z += Math.sin(a) * .041; dummy.updateMatrix();
      pads.setMatrixAt(side * count + i, dummy.matrix);
    }
    shoes.instanceMatrix.needsUpdate = pads.instanceMatrix.needsUpdate = true; spin(distance);
  };
  update(0);
  // The full belt envelope is invariant even though individual links move around it.
  for (const batch of [shoes, pads]) {
    batch.boundingBox = new THREE.Box3(new THREE.Vector3(-x - width / 2 - .03, -.02, -halfLength - radius - .09),
      new THREE.Vector3(x + width / 2 + .03, centerY + radius + .09, halfLength + radius + .09));
    batch.boundingSphere = batch.boundingBox.getBoundingSphere(new THREE.Sphere());
  }
  return update;
}

function tank(m: Palette): Model {
  const group = new THREE.Group(), p = new Parts();
  const animate = runningTracks(group, p, m, m.sage);
  loft(p, [outline(2.02, 3.9, .22, .56, -.12), outline(2.56, 4.48, .25, .94), outline(2.36, 3.52, .4, 1.46, -.28)], m.sage);
  panel(p, [2.36, .12, 1.65], m.light, [0, 1.42, -.92], .12);
  for (const s of [-1, 1]) {
    panel(p, [.74, .12, 4.38], m.edge, [s * 1.32, 1.16, -.04]);
    for (let i = 0; i < 4; i++) {
      panel(p, [.1, .3, .73], i % 2 ? m.sage : m.light, [s * 1.66, 1.05, -1.37 + i * .84], .025);
      boltRow(p, [s * 1.72, 1.14, -1.65 + i * .84], [s * 1.72, 1.14, -1.14 + i * .84], 3, m, true);
    }
    p.cable([[s * 1.23, 1.3, 1.62], [s * 1.34, 1.29, .6], [s * 1.35, 1.29, -1.4], [s * 1.19, 1.3, -1.85]], .023, m.steel);
    for (const z of [-1.65, .1, 1.5]) p.box([.17, .045, .08], m.iron, [s * 1.3, 1.31, z]);
    p.ring(.11, .032, m.steel, [s * .86, .91, 2.22]);
    panel(p, [.49, .29, .74], m.edge, [s * .82, 1.59, -1.49]);
    p.box([.35, .035, .53], m.light, [s * .82, 1.75, -1.49]);
    boltRow(p, [s * 1.01, 1.485, -.95], [s * .9, 1.485, .75], 9, m);
    p.rod([s * 1.1, 1.01, 2.08], [s * 1.0, 1.44, 1.24], .025, m.steel);
    p.rod([s * 1.02, 1.47, 1.21], [s * .95, 1.47, .66], .025, m.light);
  }
  vent(p, [0, 1.5, -1.39], 1, .78, m);
  p.cylinder(.78, .12, m.iron, [0, 1.5, -.1], [0, 0, 0], .78, 32);
  p.cylinder(.71, .08, m.inset, [0, 1.59, -.1], [0, 0, 0], .71, 32);
  loft(p, [outline(1.83, 1.94, .32, 1.59, -.18), outline(2.03, 1.98, .4, 1.76, -.2),
    outline(1.63, 1.56, .37, 2.12, -.31), outline(1.44, 1.39, .34, 2.19, -.32)], m.sage);
  for (const s of [-1, 1]) {
    panel(p, [.55, .08, .55], m.iron, [s * .53, 1.948, .626], .07, [.75, 0, 0]);
    panel(p, [.51, .065, .5], m.light, [s * .53, 1.982, .66], .06, [.75, 0, 0]);
    panel(p, [.43, .035, .4], m.sage, [s * .53, 2.013, .69], .055, [.75, 0, 0]);
    const cheek = [[s * .27, 1.74, .9], [s * .81, 1.74, .62], [s * .91, 1.77, .21]] as Point[];
    p.rod(cheek[0], cheek[1], .045, m.light);
    p.rod(cheek[1], cheek[2], .025, m.steel);
    badge(p, m, [s * .983, 1.86, -.28], s);
    panel(p, [.2, .24, .62], m.edge, [s * .7, 1.88, -.97]);
  }
  panel(p, [.65, .4, .38], m.edge, [0, 1.83, .77], .11);
  // Long stepped survey barrel with sealed optical glazing; no weapon effects or ammunition.
  for (const [radius, length, z, material] of [[.17, .46, 1.07, m.iron], [.125, 1.12, 1.81, m.sage],
    [.155, .28, 2.09, m.light], [.084, .91, 2.76, m.sage], [.12, .16, 3.22, m.iron]] as const) {
    p.cylinder(radius, length, material, [0, 1.87, z], [Math.PI / 2, 0, 0], radius * .94, 20);
  }
  p.cylinder(.077, .012, m.glass, [0, 1.87, 3.308], [Math.PI / 2, 0, 0], .077, 20);
  for (const z of [1.29, 1.62, 2.34, 3.12]) p.cylinder(.13, .048, m.steel, [0, 1.87, z], [Math.PI / 2, 0, 0], .13, 20);
  for (const x of [-.39, .38]) {
    p.cylinder(.26, .065, m.iron, [x, 2.215, -.43], [0, 0, 0], .26, 24);
    p.cylinder(.223, .045, m.light, [x, 2.266, -.43], [0, 0, 0], .223, 24);
    p.rod([x - .08, 2.31, -.43], [x + .08, 2.31, -.43], .022, m.steel);
  }
  panel(p, [.29, .17, .23], m.edge, [-.45, 2.24, .14]);
  p.box([.2, .065, .025], m.glass, [-.45, 2.263, .266]);
  p.cylinder(.065, .15, m.iron, [.66, 2.13, -.78]);
  p.rod([.66, 2.2, -.78], [.69, 2.88, -.87], .012, m.iron);
  lights(p, m, 1.04, 1.23, 1.85, -2.17);
  for (const s of [-1, 1]) {
    p.cylinder(.08, .048, m.iron, [s * 1.04, 1.247, 1.94], [Math.PI / 2, 0, 0], .08, 20);
    p.cylinder(.058, .012, m.lamp, [s * 1.04, 1.247, 1.971], [Math.PI / 2, 0, 0], .058, 20);
    p.ring(.065, .009, m.steel, [s * 1.04, 1.247, 1.978]);
  }
  badge(p, m, [0, 1.19, 1.923]);
  p.finish(group); return { group, animate };
}

function suspension(p: Parts, m: Palette, axles: number[], x: number, y: number) {
  for (const z of axles) {
    p.rod([-x, y, z], [x, y, z], .065, m.iron);
    p.add(new THREE.SphereGeometry(.17, 12, 8), m.iron, [0, y, z]);
    for (const s of [-1, 1]) {
      for (const dz of [-.23, .23]) p.rod([s * .63, y + .22, z + dz], [s * x, y, z], .04, m.iron);
      const a: Point = [s * .86, y + .5, z - .12], b: Point = [s * (x - .12), y + .04, z];
      p.rod(a, b, .035, m.steel); p.rod(a, V(a).lerp(V(b), .6).toArray(), .072, m.yellow);
      for (let i = 0; i < 6; i++) {
        const point = V(a).lerp(V(b), .16 + i * .09).toArray();
        p.ring(.085, .014, m.iron, point, [Math.PI / 2, 0, 0]);
      }
    }
  }
}
function bumper(p: Parts, m: Palette, width: number, y: number, z: number) {
  panel(p, [width, .17, .22], m.iron, [0, y, z]);
  for (const s of [-1, 1]) p.ring(.095, .026, m.steel, [s * .68, y - .03, z + Math.sign(z) * .13]);
}
function seat(p: Parts, m: Palette, x: number, y: number, z: number) {
  panel(p, [.52, .16, .54], m.seat, [x, y, z]);
  panel(p, [.53, .61, .15], m.seat, [x, y + .34, z - .24]);
  panel(p, [.31, .18, .16], m.inset, [x, y + .76, z - .24]);
  p.box([.055, .48, .026], m.sand, [x - .15, y + .4, z - .145]);
}

function buggy(m: Palette): Model {
  const group = new THREE.Group(), p = new Parts(), axles = [-1.48, 1.45];
  const locations = axles.flatMap(z => [-1, 1].map(s => ({ x: s * 1.31, y: .595, z, radius: .57 })));
  const animate = wheels(group, locations, .43, m, m.sand);
  suspension(p, m, axles, 1.23, .595);
  panel(p, [1.91, .19, 3.69], m.iron, [0, .76, -.04]);
  loft(p, [outline(1.55, 1.24, .12, .83, 1.17), outline(1.64, 1.18, .2, 1.13, 1.17), outline(1.42, .99, .22, 1.28, 1.12)], m.sand);
  p.box([1.08, .18, .06], m.inset, [0, 1.035, 1.79]);
  for (let i = 0; i < 7; i++) p.box([.035, .15, .025], m.steel, [(i - 3) * .135, 1.035, 1.832]);
  for (const s of [-1, 1]) {
    panel(p, [.15, .31, 1.41], m.sand, [s * .88, .97, -.1]);
    p.rod([s * .91, .96, -.92], [s * .91, 1.15, .66], .047, m.iron);
    p.rod([s * .87, 1.17, .69], [s * .79, 2.03, .41], .057, m.iron);
    p.rod([s * .79, 2.03, .41], [s * .8, 2.03, -.89], .057, m.iron);
    p.rod([s * .8, 2.03, -.89], [s * .88, .95, -1.26], .057, m.iron);
    p.rod([s * .8, 2.03, -.89], [s * .76, 1.01, -1.85], .045, m.steel);
    for (const z of axles) {
      panel(p, [.59, .09, .9], m.sand, [s * 1.15, 1.25, z]);
      p.rod([s * .86, .9, z], [s * 1.25, 1.2, z], .027, m.iron);
    }
    seat(p, m, s * .4, .97, -.28);
    badge(p, m, [s * .965, 1.0, -.15], s, m.teal);
  }
  p.rod([-.79, 2.03, .41], [.79, 2.03, .41], .057, m.iron);
  p.rod([-.8, 2.03, -.89], [.8, 2.03, -.89], .057, m.iron);
  p.rod([-.8, 2.03, -.89], [.83, 1.02, -1.22], .04, m.iron);
  panel(p, [1.62, .055, .79], m.teal, [0, 2.06, -.42]);
  p.box([1.36, .11, .11], m.inset, [0, 2.1, .4]);
  for (let i = 0; i < 6; i++) p.box([.13, .065, .025], m.lamp, [-.55 + i * .22, 2.1, .47]);
  p.box([1.46, .16, .16], m.inset, [0, 1.31, .52]);
  p.rod([-.4, 1.28, .49], [-.4, 1.49, .16], .035, m.iron);
  p.ring(.19, .025, m.rubber, [-.4, 1.49, .13], [-.55, 0, 0]);
  panel(p, [1.43, .19, .63], m.teal, [0, .98, -1.65]);
  const spare = wheelTemplate(.48, .33, m, m.sand, true);
  for (const mesh of spare.children) {
    mesh.geometry.rotateY(Math.PI / 2); p.add(mesh.geometry, mesh.material, [0, 1.35, -1.96]);
  }
  panel(p, [.36, .5, .25], m.teal, [.66, 1.3, -1.67]);
  p.rod([.68, 1.57, -1.69], [.71, 2.29, -1.76], .013, m.iron);
  bumper(p, m, 2.04, .78, 2.02); bumper(p, m, 1.91, .8, -2.23);
  lights(p, m, .73, 1.13, 1.75, -2.12);
  vent(p, [0, 1.293, 1.12], .61, .54, m);
  p.finish(group); return { group, animate };
}

function cab(p: Parts, m: Palette, color: any, z: number, width = 2.12) {
  loft(p, [outline(width, 1.35, .1, .91, z), outline(width, 1.36, .12, 1.54, z),
    outline(width - .25, 1.03, .13, 2.15, z - .1)], color);
  panel(p, [width - .09, .085, 1.13], color, [0, 2.17, z - .08]);
  p.box([width - .36, .52, .025], m.glass, [0, 1.83, z + .569], [-.41, 0, 0]);
  p.box([.045, .55, .047], m.iron, [0, 1.83, z + .588], [-.41, 0, 0]);
  for (const s of [-1, 1]) {
    p.box([.028, .48, .73], m.glass, [s * (width / 2 - .069), 1.82, z - .03], [0, 0, s * .19]);
    p.box([.033, .038, .22], m.iron, [s * (width / 2 + .014), 1.45, z - .35]);
    panel(p, [.21, .1, .89], m.steel, [s * (width / 2 + .06), .9, z]);
    p.rod([s * (width / 2 - .03), 1.67, z + .44], [s * (width / 2 + .24), 1.83, z + .49], .027, m.iron);
    panel(p, [.14, .23, .16], m.iron, [s * (width / 2 + .24), 1.86, z + .49]);
    p.box([.092, .16, .025], m.glass, [s * (width / 2 + .24), 1.86, z + .4]);
    p.rod([s * .16, 1.61, z + .674], [s * .58, 1.69, z + .642], .013, m.inset);
  }
  for (let i = 0; i < 5; i++) p.box([1.09, .029, .04], m.inset, [0, 1.03 + i * .069, z + .699]);
}

function truck(m: Palette): Model {
  const group = new THREE.Group(), p = new Parts(), axles = [-1.85, -.79, .77, 1.8];
  const animate = wheels(group, axles.flatMap(z => [-1, 1].map(s => ({ x: s * 1.29, y: .505, z, radius: .48 }))), .4, m, m.steel);
  suspension(p, m, axles, 1.27, .505);
  for (const s of [-1, 1]) p.box([.16, .23, 4.63], m.iron, [s * .68, .73, -.05]);
  cab(p, m, m.teal, 1.62);
  panel(p, [2.42, .15, 3.18], m.iron, [0, 1.03, -.92]);
  for (const s of [-1, 1]) {
    for (const z of axles) panel(p, [.48, .08, .88], m.teal, [s * 1.25, 1.08, z]);
    panel(p, [.11, .53, 3.07], m.teal, [s * 1.17, 1.36, -.94]);
    for (let i = 0; i < 5; i++) {
      p.box([.045, .57, .065], m.steel, [s * 1.239, 1.37, -2.32 + i * .69]);
      p.box([.025, .025, .32], m.light, [s * 1.244, 1.52, -2.04 + i * .57]);
    }
    panel(p, [.26, .34, .76], m.iron, [s * 1.02, .76, -.04]);
  }
  panel(p, [2.36, .52, .12], m.teal, [0, 1.36, -2.49]);
  for (const x of [-.79, .79]) p.box([.16, .08, .065], m.steel, [x, 1.11, -2.572]);
  for (const z of [-1.82, -.7, .38]) {
    panel(p, [1.82, .59, .92], m.cargo, [0, 1.42, z]);
    panel(p, [1.87, .07, .94], m.light, [0, 1.75, z]);
    for (const x of [-.64, .64]) p.box([.065, .69, .96], m.iron, [x, 1.42, z]);
    for (const s of [-1, 1]) p.box([.045, .095, .24], m.steel, [s * .94, 1.61, z]);
  }
  for (const x of [-.43, .43]) p.rod([x, 1.81, -2.29], [x, 1.81, .84], .022, m.sand);
  bumper(p, m, 2.44, .88, 2.41); bumper(p, m, 2.32, .84, -2.54);
  lights(p, m, .83, 1.17, 2.34, -2.58);
  badge(p, m, [0, 1.41, 2.317], 0, m.sand);
  for (const x of [-.74, .74]) p.cylinder(.07, .12, m.amber, [x, 2.276, 1.63]);
  p.finish(group); return { group, animate };
}

function rescue(m: Palette): Model {
  const group = new THREE.Group(), p = new Parts(), axles = [-1.57, -.26, 1.45];
  const animate = wheels(group, axles.flatMap(z => [-1, 1].map(s => ({ x: s * 1.29, y: .565, z, radius: .54 }))), .45, m, m.cream);
  suspension(p, m, axles, 1.24, .565);
  panel(p, [2.17, .22, 4.31], m.iron, [0, .77, -.04]);
  cab(p, m, m.cream, 1.24, 2.13);
  panel(p, [2.13, 1.24, 2.66], m.cream, [0, 1.53, -.93], .13);
  panel(p, [2.19, .09, 2.72], m.light, [0, 2.17, -.93]);
  for (const s of [-1, 1]) {
    p.box([.032, .13, 3.93], m.red, [s * 1.087, 1.22, -.22]);
    for (const z of axles) panel(p, [.54, .095, 1.02], m.red, [s * 1.19, 1.18, z]);
    for (const z of [-1.69, -.64]) {
      panel(p, [.055, .7, .86], m.light, [s * 1.084, 1.64, z]);
      p.box([.02, .49, .68], m.cream, [s * 1.121, 1.63, z]);
      p.box([.025, .045, .18], m.iron, [s * 1.139, 1.45, z + .2]);
      for (const y of [1.42, 1.87]) p.box([.037, .07, .065], m.steel, [s * 1.132, y, z - .33]);
    }
    badge(p, m, [s * 1.112, 1.75, .08], s, m.red);
    p.rod([s * .81, 2.29, -1.91], [s * .81, 2.29, .17], .026, m.steel);
    for (const z of [-1.87, .1]) p.rod([s * .81, 2.19, z], [s * .81, 2.29, z], .026, m.steel);
  }
  panel(p, [1.12, .16, 1.1], m.cargo, [0, 2.29, -1.05]);
  vent(p, [0, 2.383, -1.05], .76, .76, m);
  p.box([1.37, .09, .24], m.iron, [0, 2.245, 1.22]);
  for (const s of [-1, 1]) panel(p, [.47, .115, .23], m.amber, [s * .43, 2.338, 1.22]);
  p.box([1.73, .86, .025], m.iron, [0, 1.53, -2.278]);
  for (const s of [-1, 1]) {
    p.box([.82, .81, .035], m.cream, [s * .433, 1.53, -2.301]);
    p.box([.57, .25, .027], m.glass, [s * .433, 1.75, -2.335]);
    p.box([.045, .13, .038], m.iron, [s * .11, 1.44, -2.339]);
  }
  bumper(p, m, 2.42, .83, 2.09); bumper(p, m, 2.26, .8, -2.39);
  p.cylinder(.14, .48, m.iron, [0, .94, 2.1], [0, 0, Math.PI / 2]);
  p.box([.46, .12, .07], m.steel, [0, .94, 2.27]);
  lights(p, m, .81, 1.15, 1.968, -2.39);
  p.finish(group); return { group, animate };
}

function bulldozer(m: Palette): Model {
  const group = new THREE.Group(), p = new Parts();
  const animate = runningTracks(group, p, m, m.yellow, 1.25, 1.19, .44, .64);
  panel(p, [1.91, .43, 3.35], m.yellowEdge, [0, .88, -.18], .14);
  panel(p, [1.72, .55, 1.4], m.yellow, [0, 1.37, .71], .1);
  vent(p, [0, 1.661, .77], 1.11, .91, m);
  for (const s of [-1, 1]) {
    panel(p, [.68, .12, 3.35], m.yellow, [s * 1.14, 1.09, -.2]);
    vent(p, [s * .869, 1.39, .71], .93, .29, m, true);
    panel(p, [.2, .09, .43], m.iron, [s * .85, 1.22, -.57]);
  }
  seat(p, m, 0, 1.12, -.77);
  for (const s of [-1, 1]) {
    p.rod([s * .65, 1.1, -.03], [s * .6, 2.18, -.09], .056, m.iron);
    p.rod([s * .65, 1.09, -1.44], [s * .6, 2.18, -1.33], .056, m.iron);
    p.box([.022, .72, 1.03], m.glass, [s * .618, 1.75, -.73]);
    p.rod([s * .32, 1.2, -.51], [s * .36, 1.58, -.4], .022, m.iron);
    p.add(new THREE.SphereGeometry(.05, 8, 6), m.rubber, [s * .36, 1.58, -.4]);
  }
  p.box([1.1, .74, .027], m.glass, [0, 1.75, -.065]);
  p.box([1.1, .71, .027], m.glass, [0, 1.75, -1.39]);
  panel(p, [1.55, .115, 1.65], m.yellow, [0, 2.235, -.72]);
  p.cylinder(.075, .125, m.amber, [.4, 2.355, -.9]);
  p.cylinder(.05, .46, m.iron, [.66, 1.91, .56]);
  p.cylinder(.084, .04, m.iron, [.66, 2.155, .56]);
  panel(p, [1.65, .4, .45], m.yellow, [0, 1.19, -1.64]);
  // Curved mouldboard, with a steel cutting edge and heavy end plates.
  const bladeRows: Point[][] = [];
  for (let i = 0; i <= 8; i++) {
    const t = i / 8, y = .1 + t * .91, z = 2.04 + .37 * (2 * t - 1) ** 2;
    bladeRows.push([[-1.7, y, z], [1.7, y, z], [1.7, y, z - .12], [-1.7, y, z - .12]]);
  }
  // The blade's ring order matches the same outward-facing loft convention.
  loft(p, bladeRows.map(r => [r[3], r[2], r[1], r[0]]), m.yellow);
  p.box([3.47, .13, .19], m.steel, [0, .105, 2.39], [-.14, 0, 0]);
  p.rod([-1.7, 1.04, 2.4], [1.7, 1.04, 2.4], .058, m.yellowEdge);
  for (const s of [-1, 1]) {
    p.box([.12, .9, .44], m.yellowEdge, [s * 1.65, .57, 2.21]);
    p.rod([s * 1.1, .62, -.48], [s * 1.14, .4, 2.05], .095, m.yellowEdge);
    const a: Point = [s * .79, 1.37, .63], b: Point = [s * 1.17, .74, 2.09];
    p.rod(a, b, .047, m.steel); p.rod(a, V(a).lerp(V(b), .6).toArray(), .105, m.yellow);
    for (const point of [a, b]) p.cylinder(.115, .19, m.iron, point, [0, 0, Math.PI / 2]);
    p.cable([[s * .75, 1.43, .4], [s * .88, 1.49, .82], [s * .98, 1.12, 1.39]], .022, m.rubber);
    badge(p, m, [s * .968, .93, -.83], s, m.cream);
  }
  for (let i = 0; i < 11; i++) p.cylinder(.027, .024, m.iron, [-1.49 + i * .298, .137, 2.491], [Math.PI / 2, 0, 0], .027, 6);
  lights(p, m, .54, 2.15, .091, -1.53);
  p.finish(group); return { group, animate };
}

/** Procedural fleet, +Z forward and Y=0 ground. The supplied root keeps its transform. */
export class ExpeditionFleet {
  private readonly models = new Map<VehicleId, Model>();
  private readonly materials = palette();
  private current!: Model;
  private id: VehicleId = 'balanced';
  private distance = 0;

  constructor(private readonly root: any) {
    // Replace legacy tank visuals once; their resources remain owned by the caller.
    // Subsequent switches detach only this fleet's group, preserving gameplay children.
    const initial = this.build('balanced');
    root.clear(); this.current = initial; root.add(initial.group);
  }

  get activeId(): string { return this.id; }

  setVehicle(id: string): void {
    const next: VehicleId = id === 'survey' || id === 'hauler' || id === 'rescue' || id === 'crawler' ? id : 'balanced';
    if (next === this.id) return;
    const model = this.models.get(next) || this.build(next);
    this.root.remove(this.current.group); this.current.group.visible = false;
    this.current = model; this.id = next; model.group.visible = true;
    model.animate(this.distance); this.root.add(model.group);
  }

  /** Absolute signed travel distance in world units, not a delta or elapsed seconds. */
  animate(distance: number): void {
    if (!Number.isFinite(distance) || distance === this.distance) return;
    this.distance = distance; this.current.animate(distance);
  }

  private build(id: VehicleId): Model {
    const factories = { balanced: tank, survey: buggy, hauler: truck, rescue, crawler: bulldozer };
    const model = factories[id](this.materials); model.group.name = `expedition-${id}`;
    model.group.userData.vehicleId = id; this.models.set(id, model); return model;
  }
}
