import * as THREE from '../../cave-river-quest/vendor/three.module.js';

const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
const smooth = (a: number, b: number, x: number) => THREE.MathUtils.smoothstep(x, a, b);
const palette: Record<string, number> = {
  stone: 0x999c8b, wall: 0xc2c3ad, roof: 0x536765, timber: 0x766b54,
  window: 0x416e78, reflection: 0x8da5a2, frame: 0x9fada6, metal: 0x566362, soil: 0x777260,
  paving: 0x979889, road: 0x737b6b, teal: 0x467e78, red: 0x9d655b, violet: 0x757686,
  leaf: 0x648263, gold: 0xb4a474, dark: 0x354340, water: 0x497e89
};
const materials: Record<string, any> = {};
const detailMaterial = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .88, metalness: .03 });
function mat(name: string) {
  return materials[name] ||= new THREE.MeshStandardMaterial({ color: palette[name], roughness: name === 'window' ? .3 : .88, metalness: name === 'window' ? .25 : .03 });
}
function add(g: any, geo: any, name: string, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, mat(name)); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; g.add(m); return m;
}
function box(g: any, w: number, h: number, d: number, name: string, x = 0, y = 0, z = 0) {
  return add(g, new THREE.BoxGeometry(w, h, d), name, x, y, z);
}
function cyl(g: any, r: number, h: number, name: string, x = 0, y = 0, z = 0, sides = 12) {
  return add(g, new THREE.CylinderGeometry(r, r, h, sides), name, x, y, z);
}
function bar(g: any, a: any, b: any, r: number, name = 'frame') {
  const p = a.clone().add(b).multiplyScalar(.5), m = cyl(g, r, a.distanceTo(b), name, p.x, p.y, p.z, 6);
  m.quaternion.setFromUnitVectors(V(0, 1, 0), b.clone().sub(a).normalize()); return m;
}

// Bake static parts per material, including windows and roof ribs, into a handful of draws.
function bake(root: any, vertexColours = false) {
  root.updateMatrixWorld(true);
  const inverse = root.matrixWorld.clone().invert(), buckets = new Map<any, any[]>();
  root.traverse((o: any) => {
    if (!o.isMesh || o.isInstancedMesh) return;
    const geo = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
    geo.applyMatrix4(inverse.clone().multiply(o.matrixWorld));
    const material = vertexColours ? detailMaterial : o.material;
    if (vertexColours) {
      const colours = new Float32Array(geo.attributes.position.count * 3), c = o.material.color;
      for (let i = 0; i < colours.length; i += 3) colours.set([c.r, c.g, c.b], i);
      geo.setAttribute('color', new THREE.BufferAttribute(colours, 3));
    }
    const list = buckets.get(material) || []; list.push(geo); buckets.set(material, list);
  });
  root.traverse((o: any) => { if (o.isMesh) o.geometry.dispose(); }); root.clear();
  for (const [material, pieces] of buckets) {
    const geo = new THREE.BufferGeometry();
    for (const key of vertexColours ? ['position', 'normal', 'uv', 'color'] : ['position', 'normal', 'uv']) {
      const size = key === 'uv' ? 2 : 3, count = pieces.reduce((sum, g) => sum + g.attributes.position.count, 0);
      const data = new Float32Array(count * size); let offset = 0;
      for (const g of pieces) { const attr = g.attributes[key]; if (attr) data.set(attr.array, offset); offset += g.attributes.position.count * size; }
      geo.setAttribute(key, new THREE.BufferAttribute(data, size));
    }
    pieces.forEach(g => g.dispose()); geo.computeBoundingSphere();
    const mesh = new THREE.Mesh(geo, material); mesh.castShadow = mesh.receiveShadow = true; root.add(mesh);
  }
}
export function disposeScenery(root: any) {
  root.traverse((o: any) => { if (o.isMesh) o.geometry.dispose(); }); root.clear();
}

function house(g: any, x: number, z: number, w: number, d: number, h: number, accent: string, flat = false) {
  const b = new THREE.Group(); b.position.set(x, 0, z); g.add(b);
  box(b, w + .35, .24, d + .4, 'stone', 0, .05);
  box(b, w, h, d, 'wall', 0, h / 2 + .16);
  box(b, w + .04, .23, d + .04, accent, 0, h * .76);
  if (flat) {
    box(b, w + .35, .16, d + .35, 'roof', 0, h + .26);
    for (const sx of [-1, 1]) box(b, .12, .28, d + .35, 'frame', sx * (w + .23) / 2, h + .46);
    box(b, 1, .45, .85, 'metal', -w * .22, h + .55, -.5);
  } else {
    const rise = w * .25, slope = Math.atan2(rise, w / 2);
    const shape = new THREE.Shape(); shape.moveTo(-w / 2, 0); shape.lineTo(w / 2, 0); shape.lineTo(0, rise); shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, { depth: d, bevelEnabled: false }); geo.translate(0, 0, -d / 2);
    add(b, geo, 'wall', 0, h + .16);
    for (const side of [-1, 1]) {
      const roof = box(b, Math.hypot(w / 2, rise) + .25, .14, d + .5, 'roof', side * w / 4, h + .22 + rise / 2); roof.rotation.z = -side * slope;
      for (let rz = -d / 2; rz <= d / 2; rz += .7) {
        const rib = box(b, Math.hypot(w / 2, rise) + .25, .035, .035, 'metal', side * w / 4, h + .31 + rise / 2, rz); rib.rotation.z = -side * slope;
      }
    }
  }
  for (let wx = -w / 2 + .7; wx < w / 2 - .25; wx += 1.05) {
    for (const side of [-1, 1]) {
      box(b, .63, .72, .055, 'window', wx, h * .56 + .16, side * (d / 2 + .03));
      box(b, .58, .12, .018, 'reflection', wx, h * .56 + .4, side * (d / 2 + .065));
      box(b, .7, .06, .15, 'frame', wx, h * .56 - .23, side * (d / 2 + .05));
      box(b, .035, .72, .07, 'frame', wx, h * .56 + .16, side * (d / 2 + .04));
    }
  }
  box(b, .8, 1.35, .09, 'dark', .15, .81, d / 2 + .04);
  box(b, 1.45, .1, .8, accent, .15, 1.6, d / 2 + .35);
  for (const sx of [-.48, .78]) box(b, .055, 1.5, .055, 'frame', sx, .83, d / 2 + .65);
  for (let i = 0; i < 3; i++) box(b, 1.25, .09, .4 + i * .23, 'stone', .15, .22 - i * .065, d / 2 + .38);
  return b;
}
function solar(g: any, x: number, z: number, y = .75) {
  const frame = box(g, 2.4, .1, 1.5, 'frame', x, y, z); frame.rotation.x = -.3;
  const panel = box(g, 2.25, .03, 1.36, 'window', x, y + .075, z); panel.rotation.x = -.3;
  for (const dx of [-.9, .9]) box(g, .06, y, .08, 'metal', x + dx, y / 2, z);
  for (let i = -2; i <= 2; i++) { const grid = box(g, .025, .02, 1.35, 'frame', x + i * .4, y + .1, z); grid.rotation.x = -.3; }
}
function greenhouse(g: any, x: number, z: number, scale = 1) {
  const b = new THREE.Group(); b.position.set(x, 0, z); b.scale.setScalar(scale); g.add(b);
  box(b, 4, .22, 6, 'stone', 0, .1);
  box(b, 3.8, 1.7, 5.8, 'window', 0, 1);
  for (const side of [-1, 1]) { const pane = box(b, 2.2, .09, 5.9, 'window', side, 2.24); pane.rotation.z = -side * .45; }
  for (let rz = -2.8; rz <= 2.9; rz += .72) {
    for (const side of [-1, 1]) {
      bar(b, V(side * 1.93, .2, rz), V(side * 1.93, 1.8, rz), .045);
      bar(b, V(side * 1.93, 1.8, rz), V(0, 2.73, rz), .045);
    }
  }
  for (const y of [.45, 1.65]) for (const x of [-1.95, 1.95]) bar(b, V(x, y, -2.9), V(x, y, 2.9), .035);
  box(b, .95, 1.55, .07, 'teal', 0, .98, 2.95);
  for (const dx of [-3.3, 3.3]) for (let iz = -2; iz <= 2; iz += 1.35) {
    box(b, 1.5, .22, .9, 'timber', dx, .15, iz); box(b, 1.3, .25, .7, 'leaf', dx, .36, iz);
  }
}
function observatory(g: any, x: number, z: number, scale = 1) {
  const b = new THREE.Group(); b.position.set(x, 0, z); b.scale.setScalar(scale); g.add(b);
  cyl(b, 2.4, .3, 'stone', 0, .12, 0, 32); cyl(b, 2.05, 2.3, 'wall', 0, 1.3, 0, 32);
  cyl(b, 2.13, .17, 'violet', 0, 2.46, 0, 32);
  add(b, new THREE.SphereGeometry(2.12, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), 'frame', 0, 2.52);
  const slit = add(b, new THREE.SphereGeometry(2.15, 8, 12, 1.38, .3, 0, Math.PI / 2), 'dark', 0, 2.52); slit.rotation.y = -.35;
  bar(b, V(0, 3.2, 0), V(0, 4.3, 2.4), .22, 'metal');
  box(b, .8, 1.4, .12, 'dark', 0, .9, 2.08);
  for (const dx of [-1.1, 1.1]) box(b, .5, .7, .12, 'window', dx, 1.4, 1.76);
}
function bridge(g: any, x: number, z: number, length = 12, width = 3.4) {
  box(g, width + .45, .4, length, 'stone', x, -.04, z);
  box(g, width, .08, length, 'timber', x, .21, z);
  for (let dz = -length / 2; dz <= length / 2; dz += .65) box(g, width, .035, .05, 'metal', x, .265, z + dz);
  for (const side of [-1, 1]) {
    const sx = x + side * (width / 2 + .12);
    for (let dz = -length / 2; dz <= length / 2; dz += 1.5) box(g, .14, 1.05, .14, 'frame', sx, .66, z + dz);
    for (const y of [.65, 1.15]) bar(g, V(sx, y, z - length / 2), V(sx, y, z + length / 2), .065);
    for (const dz of [-length * .3, length * .3]) box(g, .7, 3, 1.25, 'stone', sx, -1.1, z + dz);
  }
}

export class ValleyScenery {
  root = new THREE.Group(); water: any; ready: Promise<void>;
  projects = new Map<string, any>(); loadouts = new Map<string, any>();
  repairs = new Map<number, any>();
  campuses = new Map<string, any>();
  readonly activitySites = new Map<string, THREE.Group>();
  private activityPaths: any[][] = [];
  roads: any[][] = []; locations: Record<string, any>; nodes: Record<string, any[]>;
  river = new THREE.CatmullRomCurve3([V(-86, 0, 1), V(-62, 0, 5), V(-43, 0, 18), V(-24, 0, 22), V(-4, 0, 19), V(13, 0, 20), V(30, 0, 28), V(53, 0, 28), V(86, 0, 36)]);
  riverPoints: any[];
  private brookPoints = new THREE.CatmullRomCurve3([V(-67, 0, -47), V(-61, 0, -33), V(-66, 0, -20), V(-59, 0, -9), V(-62, 0, 5)]).getPoints(100);
  constructor(parent: any, locations: Record<string, any>, nodes: Record<string, any[]>, errors: string[]) {
    this.locations = locations; this.nodes = nodes; this.riverPoints = this.river.getPoints(200); parent.add(this.root); this.root.name = 'Expedition valley';
    this.makeRoads(); this.createActivities(); this.ready = this.landscape(errors); this.vegetation(); this.infrastructure(); this.naturalDetails();
  }
  riverDistance(x: number, z: number) { return Math.sqrt(Math.min(...this.riverPoints.map(p => (p.x - x) ** 2 + (p.z - z) ** 2))); }
  height(x: number, z: number) {
    const r = this.riverDistance(x, z), bed = -2.4 + smooth(2.3, 5.2, r) * 2.34;
    if (r < 5.2) return bed;
    const north = smooth(47, 79, -z), east = smooth(47, 83, x), west = smooth(47, 81, -x);
    const ridge = Math.max(north, east, west) * (5 + 8 * (.5 + .5 * Math.sin(x * .11 + z * .07)));
    const hills = 2.3 * Math.exp(-((x + 8) ** 2 / 55 + (z + 23) ** 2 / 85)) + 2.1 * Math.exp(-((x - 18) ** 2 / 44 + (z + 6) ** 2 / 90));
    // Campus pads and travelled corridors stay at the existing navigation elevation.
    let clear = 1;
    for (const p of Object.values(this.locations)) clear *= smooth(8, 12, Math.hypot(x - p.x, z - p.z));
    for (const list of Object.values(this.nodes)) for (const n of list) clear *= smooth(2.3, 4.3, Math.hypot(x - n.position.x, z - n.position.z));
    for (const site of this.activitySites.values()) clear *= smooth(4.5, 6.5, Math.hypot(x - site.position.x, z - site.position.z));
    for (const points of [...this.roads, ...this.activityPaths]) {
      if (points.some(p => Math.hypot(x - p.x, z - p.z) < 2)) { clear = 0; break; }
    }
    const land = -.065 + (ridge + hills) * clear;
    const brook = Math.sqrt(Math.min(...this.brookPoints.map(p => (p.x - x) ** 2 + (p.z - z) ** 2)));
    return THREE.MathUtils.lerp(-1.65, land, smooth(.6, 2.1, brook));
  }
  createActivities() {
    // Register all pads before terrain/path sampling so the construction order cannot change their height.
    for (const [id, x, z] of [['jokes', -13, 14], ['riddles', 16, -18], ['lookout', -8, -15], ['numbers', 19, 13]] as const) {
      const site = new THREE.Group(); site.position.set(x, 0, z); site.name = `Activity: ${id}`;
      site.userData.activity = id; this.activitySites.set(id, site); this.root.add(site);
    }
    for (const [id, g] of this.activitySites) {
      const bench = (x: number, z: number, width = 1.5) => {
        box(g, width, .14, .48, 'timber', x, .48, z);
        for (const dx of [-width * .35, width * .35]) box(g, .13, .43, .4, 'timber', x + dx, .2, z);
      };
      if (id === 'jokes') {
        box(g, 3.8, .24, 2.2, 'timber', 0, .12, -.65);
        for (let i = 0; i < 10; i++) box(g, .34, .04, 2.16, 'gold', -1.66 + i * .37, .26, -.65);
        box(g, 1.3, .12, .48, 'timber', 0, .06, .65);
        for (const x of [-1.8, 1.8]) for (const z of [-1.65, .35]) cyl(g, .055, 2.6, 'timber', x, 1.3, z, 6);
        for (let i = 0; i < 8; i++) for (const side of [-1, 1]) {
          const panel = box(g, .49, .055, 1.22, i % 2 ? 'wall' : 'red', -1.715 + i * .49, 2.66, -.65 + side * .57);
          panel.rotation.x = side * .2;
          box(g, .49, .17, .06, i % 2 ? 'wall' : 'red', -1.715 + i * .49, 2.44, -.65 + side * 1.18);
        }
        cyl(g, .24, .05, 'metal', 0, .3, -.25, 10);
        bar(g, V(0, .32, -.25), V(0, 1.5, -.25), .035, 'metal');
        bar(g, V(0, 1.5, -.25), V(.35, 1.65, -.05), .065, 'dark');
        for (const x of [-1.1, 1.1]) bench(x, 1.8, 1.35);
      } else if (id === 'riddles') {
        for (const x of [-1.15, 1.15]) for (let i = 0; i < 4; i++) box(g, .55, .42, .62, 'stone', x, .21 + i * .44, -.85);
        // Wedge stones form a real open arch, not a solid doorway silhouette.
        for (let i = 0; i < 9; i++) {
          const a = i * Math.PI / 8, block = box(g, .43, .55, .66, 'stone', Math.cos(a) * 1.15, 1.76 + Math.sin(a) * 1.15, -.85);
          block.rotation.z = a - Math.PI / 2;
        }
        for (const [i, x] of [-1.4, 0, 1.4].entries()) {
          const slab = box(g, .63, .95 + i * .13, .26, 'stone', x, .49 + i * .065, 1.1); slab.rotation.z = (i - 1) * .08;
          const symbol = i === 0 ? new THREE.TorusGeometry(.18, .032, 4, 12) : new THREE.RingGeometry(.14, .19, i === 1 ? 3 : 4);
          add(g, symbol, 'dark', x, .65, 1.242);
          box(g, .36, .025, .014, 'dark', x, .32, 1.242);
        }
        for (const x of [-.8, .6]) { const stone = cyl(g, .38, .1, 'stone', x, .015, .25, 7); stone.scale.z = .7; }
      } else if (id === 'lookout') {
        for (let i = 0; i < 9; i++) box(g, 3.4, .16, .3, 'timber', 0, .45, -1.45 + i * .33);
        for (const x of [-1.55, 1.55]) for (const z of [-1.5, .95]) {
          cyl(g, .085, 1.6, 'timber', x, .75, z, 8);
        }
        for (const x of [-1.55, 1.55]) bar(g, V(x, 1.25, -1.5), V(x, 1.25, .95), .06, 'timber');
        bar(g, V(-1.55, 1.25, -1.5), V(1.55, 1.25, -1.5), .06, 'timber');
        for (let i = 0; i < 3; i++) box(g, 1.25, .15, .42, 'timber', 0, .375 - i * .15, 1.15 + i * .38);
        for (const a of [0, 2.094, 4.189]) bar(g, V(Math.cos(a) * .5, .55, -.3 + Math.sin(a) * .5), V(0, 1.5, -.3), .04, 'metal');
        const rear = V(.1, 1.5, 0), front = V(-.35, 1.94, -.92);
        bar(g, rear, front, .16, 'gold');
        const lens = cyl(g, .18, .07, 'window', front.x, front.y, front.z, 16);
        lens.quaternion.setFromUnitVectors(V(0, 1, 0), front.clone().sub(rear).normalize());
        const pond = cyl(g, 1, .035, 'water', 2.55, .015, -.6, 24); pond.scale.set(.65, 1, 1.25);
        for (let i = 0; i < 12; i++) {
          const a = i * Math.PI / 6; const rock = add(g, new THREE.DodecahedronGeometry(.17, 0), 'stone', 2.55 + Math.cos(a) * .72, .07, -.6 + Math.sin(a) * 1.3); rock.scale.y = .6;
        }
      } else {
        // Physical inset digits on a meandering dry-bank trail; no floating labels or extra textures.
        const digits = ['bc', 'abdeg', 'abcdg', 'bcfg', 'acdfg'];
        const segments: Record<string, number[]> = { a: [0, -.2, .24, .045], b: [.12, -.1, .045, .2], c: [.12, .1, .045, .2], d: [0, .2, .24, .045], e: [-.12, .1, .045, .2], f: [-.12, -.1, .045, .2], g: [0, 0, .24, .045] };
        for (let i = 0; i < 5; i++) {
          const x = -1.9 + i * .91, z = .75 + Math.sin(i * 1.3) * .38;
          const stone = cyl(g, .46, .16, 'stone', x, .05, z, 7); stone.scale.z = .84;
          for (const key of digits[i]) { const [dx, dz, w, d] = segments[key]; box(g, w, .012, d, 'dark', x + dx, .137, z + dz); }
        }
        box(g, 1.9, .14, .8, 'timber', .3, .85, -.7);
        for (const x of [-.35, .95]) for (const side of [-1, 1]) bar(g, V(x, .05, -.7 + side * .65), V(x, .8, -.7 - side * .2), .065, 'timber');
        bench(.3, -1.4, 2); bench(.3, .05, 2);
        box(g, .35, .27, .3, 'gold', .7, 1.05, -.7);
        const handle = add(g, new THREE.TorusGeometry(.13, .025, 4, 10, Math.PI), 'timber', .7, 1.2, -.7); handle.rotation.y = Math.PI / 2;
      }
      if (id === 'jokes') for (const part of g.children) part.position.x -= .65;
      bake(g, true);
      // Also tag baked descendants for consumers that raycast meshes directly.
      g.traverse((o: any) => { o.userData.activity = id; });
      const entrance = g.position.clone().add(V(id === 'jokes' ? 3 : id === 'numbers' ? -2.7 : 0, 0, id === 'jokes' ? -3.5 : id === 'numbers' ? .8 : 2.7));
      const nearest = this.roads.flat().reduce((a, b) => a.distanceToSquared(entrance) < b.distanceToSquared(entrance) ? a : b);
      const middle = nearest.clone().lerp(entrance, .5); middle.x += .25;
      const connector = new THREE.CatmullRomCurve3([nearest, middle, entrance]).getPoints(16);
      const parking = this.activityParking(id)!;
      // Keep the final legs outside the structures: north/east of the stage, south of the other sites.
      if (id !== 'jokes') connector.push(V(entrance.x, .08, parking.z));
      connector.push(parking); this.activityPaths.push(connector);
    }
  }
  makeRoads() {
    const hub = this.locations.hq.clone().add(V(2.4, .02, 4.5));
    for (const [id, loc] of Object.entries(this.locations)) {
      if (id === 'hq') continue;
      const end = loc.clone().add(V(2.4, .02, 4.5));
      const west = id === 'harbour' || id === 'english';
      const gate = V(west ? -10 : 10, .02, 9.5);
      const bend = id === 'grove' ? V(20, .02, 8.5) : V(west ? -12 : 12, .02, -5);
      // Approach outside the southern field buildings and their adjacent solar arrays.
      const approach = id === 'english' || id === 'physics'
        ? [loc.clone().add(V(5.8, .02, 10)), loc.clone().add(V(5.8, .02, 6))]
        : id === 'grove' ? [V(24, .02, 12), V(29, .02, 12), V(29, .02, 8)] : [];
      this.roads.push(new THREE.CatmullRomCurve3([hub, gate, bend, ...approach, end]).getPoints(64));
    }
  }
  roadPath(start: any, region: string, currentArea = 'hq') {
    const ids = Object.keys(this.locations).filter(id => id !== 'hq'), index = ids.indexOf(region);
    const hub = this.locations.hq.clone().add(V(2.4, .02, 4.5));
    const currentRoad = this.roads[ids.indexOf(currentArea)];
    if (currentArea.startsWith('activity-')) {
      const source = this.activityRoadPoints(currentArea.slice('activity-'.length));
      if (source.length) {
        let nearest = 0;
        source.forEach((p, i) => { if (p.distanceToSquared(start) < source[nearest].distanceToSquared(start)) nearest = i; });
        const departure = source.slice(0, nearest + 1).reverse();
        const arrival = region === 'hq' ? [] : this.roads[index]?.slice(1) || [];
        return [start.clone(), ...departure, ...arrival];
      }
    }
    if (region === 'hq') {
      const nearest = currentRoad || this.roads.find(points => start.distanceTo(points.at(-1)) < 3);
      if (nearest) return [start.clone(), ...nearest.slice().reverse()];
      return [start.clone(), hub];
    }
    const road = this.roads[index]; if (!road) return [start.clone(), hub];
    if (currentArea === region) return [start.clone(), road.at(-1).clone()];
    const previous = currentRoad || this.roads.find(points => start.distanceTo(points.at(-1)) < 3);
    const approach = previous ? previous.slice().reverse() : start.distanceTo(hub) > 2 ? [hub] : [];
    return [start.clone(), ...approach, ...road.slice(1)];
  }
  activityParking(id: string) {
    return this.activitySites.get(id)?.position.clone().add(V(3, .08, id === 'jokes' ? -2 : 3));
  }
  private activityRoadPoints(id: string): any[] {
    const connector = this.activityPaths[[...this.activitySites.keys()].indexOf(id)];
    if (!connector?.length) return [];
    let roadIndex = -1, nodeIndex = -1, distance = Infinity;
    this.roads.forEach((road, r) => road.forEach((p, n) => {
      const d = p.distanceToSquared(connector[0]);
      if (d < distance) { distance = d; roadIndex = r; nodeIndex = n; }
    }));
    if (roadIndex < 0) return [];
    return [...this.roads[roadIndex].slice(0, nodeIndex + 1), ...connector.slice(1)];
  }
  activityRoute(start: any, id: string, currentArea = 'hq'): any[] {
    const arrival = this.activityRoadPoints(id);
    if (!arrival.length) return [start.clone()];
    const nearestIndex = (points: any[]) => {
      let index = 0, distance = Infinity;
      points.forEach((p, i) => {
        const d = (p.x - start.x) ** 2 + (p.z - start.z) ** 2;
        if (d < distance) { distance = d; index = i; }
      });
      return index;
    };
    const area = currentArea.replace(/^activity[-:]/, '');
    // Infer parking when a caller has not yet updated currentArea after an activity arrival.
    const parked = [...this.activitySites.keys()].find(key => {
      const p = this.activityParking(key)!;
      return Math.hypot(p.x - start.x, p.z - start.z) < .75;
    });
    const sourceActivity = parked || (this.activitySites.has(area) ? area : undefined);
    let departure: any[];
    if (sourceActivity === id) {
      departure = [];
      arrival.splice(0, nearestIndex(arrival));
    } else if (sourceActivity) {
      const source = this.activityRoadPoints(sourceActivity);
      departure = source.slice(0, nearestIndex(source) + 1).reverse();
    } else {
      const regions = Object.keys(this.locations).filter(key => key !== 'hq');
      const road = this.roads[regions.indexOf(currentArea)]
        || this.roads.find(points => points.at(-1).distanceTo(start) < 3);
      departure = road ? road.slice(0, nearestIndex(road) + 1).reverse() : [];
    }
    const route = [start.clone()];
    for (const p of [...departure, ...arrival]) {
      if (route.at(-1).distanceToSquared(p) > 1e-8) route.push(p.clone());
    }
    return route;
  }
  ribbon(points: any[], width: number, material: any, elevation: number, ground = false) {
    const vertices: number[] = [], uvs: number[] = [], indices: number[] = [];
    points.forEach((p, i) => {
      const tangent = points[Math.min(i + 1, points.length - 1)].clone().sub(points[Math.max(0, i - 1)]).normalize();
      for (const side of [-1, 1]) {
        const x = p.x + tangent.z * width * side / 2, z = p.z - tangent.x * width * side / 2;
        vertices.push(x, elevation + (ground ? this.height(x, z) : 0), z); uvs.push((side + 1) / 2, i / 6);
      }
      if (i) { const a = (i - 1) * 2; indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
    });
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3)); geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2)); geo.setIndex(indices); geo.computeVertexNormals();
    const m = new THREE.Mesh(geo, material); m.receiveShadow = true; this.root.add(m); return m;
  }
  async landscape(errors: string[]) {
    const apron = new THREE.PlaneGeometry(1500, 1500); apron.rotateX(-Math.PI / 2);
    const distantGround = new THREE.Mesh(apron, new THREE.MeshStandardMaterial({ color: 0x8c987d, roughness: 1 })); distantGround.position.y = -3.2; this.root.add(distantGround);
    const geo = new THREE.PlaneGeometry(230, 210, 180, 168); geo.rotateX(-Math.PI / 2); geo.translate(0, 0, -12);
    const p = geo.attributes.position, colours: number[] = [], c = new THREE.Color();
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), z = p.getZ(i), y = this.height(x, z), river = this.riverDistance(x, z); p.setY(i, y);
      c.set(0x8ca17d); c.lerp(new THREE.Color(0xabb29a), smooth(1.5, 10, y) * .7);
      c.lerp(new THREE.Color(0x9b9986), (1 - smooth(4.6, 7.1, river)) * .85);
      const meadow = .5 + .5 * Math.sin(x * .095 + Math.sin(z * .12)) * Math.cos(z * .085);
      c.lerp(new THREE.Color(0x718b68), meadow * .23);
      c.multiplyScalar(.96 + .045 * Math.sin(x * .27) * Math.cos(z * .31)); colours.push(c.r, c.g, c.b);
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colours, 3)); geo.computeVertexNormals();
    const ground = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .98 });
    const terrain = new THREE.Mesh(geo, ground); terrain.receiveShadow = true; terrain.castShadow = true; terrain.name = 'Sculpted grass and stone valley'; this.root.add(terrain);
    const waterMat = new THREE.MeshStandardMaterial({ color: 0x487d88, metalness: .22, roughness: .28 });
    this.water = this.ribbon(this.riverPoints, 6.5, waterMat, -1.02); this.water.name = 'Winding river';
    this.ribbon(this.brookPoints, 1.5, mat('stone'), .04, true).name = 'Tributary pebble bed';
    this.ribbon(this.brookPoints, 1.2, waterMat, -1.02).name = 'Woodland tributary';
    const paths = new THREE.Group(); paths.name = 'Activity footpaths'; this.root.add(paths);
    for (const points of this.activityPaths) paths.add(this.ribbon(points, 1.15, mat('soil'), .1, true));
    bake(paths, true);
    for (const points of this.roads) {
      this.ribbon(points, 3.2, mat('soil'), .075, true);
      this.ribbon(points, 2.65, mat('road'), .092, true);
    }
    for (const [region, nodes] of Object.entries(this.nodes)) {
      const hub = this.locations[region].clone().add(V(2.4, 0, 4.5));
      for (const n of nodes) {
        const p = n.position, middle = hub.clone().lerp(p, .5); middle.z += 1;
        this.ribbon(new THREE.CatmullRomCurve3([hub, middle, p]).getPoints(20), 1.35, mat('soil'), .083, true);
      }
    }
    const load = (name: string) => new Promise<any>(resolve => new THREE.TextureLoader().load(`./assets/${name}`, resolve, undefined, () => { errors.push(name); resolve(null); }));
    const colour = await load('valley-ground.jpg'), normal = await load('ground-normal.jpg');
    if (colour) {
      colour.colorSpace = THREE.SRGBColorSpace; colour.wrapS = colour.wrapT = THREE.RepeatWrapping; colour.repeat.set(14, 14); colour.anisotropy = 4;
      // Preserve fine raster detail without allowing the albedo to overpower biome colours.
      ground.map = colour;
      ground.onBeforeCompile = (shader: any) => { shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>', '#ifdef USE_MAP\nvec4 grass = texture2D(map, vMapUv);\ndiffuseColor.rgb *= mix(vec3(1.0), grass.rgb, 0.46);\n#endif'); };
      ground.customProgramCacheKey = () => 'valley-grass-46';
    }
    if (normal) {
      normal.wrapS = normal.wrapT = THREE.RepeatWrapping; normal.repeat.set(31, 28); normal.anisotropy = 4; ground.normalMap = normal; ground.normalScale.set(.32, .32);
      const ripples = normal.clone(); ripples.repeat.set(2, 7); ripples.needsUpdate = true; waterMat.normalMap = ripples; waterMat.normalScale.set(.14, .07); waterMat.needsUpdate = true;
    }
    const masonry = await load('concrete-colour.jpg');
    if (masonry) {
      masonry.colorSpace = THREE.SRGBColorSpace; masonry.wrapS = masonry.wrapT = THREE.RepeatWrapping; masonry.repeat.set(2, 2); masonry.anisotropy = 4;
      for (const name of ['wall', 'stone']) {
        const surface = mat(name); surface.map = masonry;
        surface.onBeforeCompile = (shader: any) => { shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>', '#ifdef USE_MAP\ndiffuseColor.rgb *= mix(vec3(1.0), texture2D(map, vMapUv).rgb, 0.32);\n#endif'); };
        surface.customProgramCacheKey = () => 'valley-masonry-32'; surface.needsUpdate = true;
      }
    }
    ground.needsUpdate = true;
  }
  vegetation() {
    let seed = 12091; const rand = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
    const trees: any[] = [], stones: any[] = [];
    for (let i = 0; i < 1700 && trees.length < 490; i++) {
      const x = rand() * 158 - 79, z = rand() * 120 - 82, y = this.height(x, z);
      if (this.activityClearance(x, z, 2)) continue;
      if (this.brookPoints.some(p => Math.hypot(x - p.x, z - p.z) < 2.8)) continue;
      if ([[10, 19.7], [12, -48], [44, 6]].some(([px, pz]) => Math.hypot(x - px, z - pz) < 7.5)) continue;
      if (this.riverDistance(x, z) < 6 || Object.values(this.locations).some(p => Math.hypot(x - p.x, z - p.z) < 9)) continue;
      if (Object.values(this.nodes).flat().some(n => Math.hypot(x - n.position.x, z - n.position.z) < 3)) continue;
      const onFieldPath = Object.entries(this.nodes).some(([region, nodes]) => {
        const a = this.locations[region].clone().add(V(2.4, 0, 4.5));
        return nodes.some(n => {
          const b = n.position, dx = b.x - a.x, dz = b.z - a.z;
          const t = THREE.MathUtils.clamp(((x - a.x) * dx + (z - a.z) * dz) / (dx * dx + dz * dz), 0, 1);
          return Math.hypot(x - a.x - dx * t, z - a.z - dz * t) < 2.5;
        });
      });
      if (onFieldPath) continue;
      if (this.roads.some(points => points.some(p => Math.hypot(x - p.x, z - p.z) < 3))) continue;
      if (z > 11 && rand() > .25) continue;
      if (rand() > .62 + .24 * Math.sin(x * .13 + z * .21)) continue;
      trees.push({ x, y, z, s: .55 + rand() * .68, a: rand() * 6.28 });
    }
    const dummy = new THREE.Object3D();
    const crown = (radius: number, height: number, seed: number) => {
      const branches = new THREE.Group();
      for (let layer = 0; layer < 3; layer++) {
        const t = layer / 3, reach = radius * (1 - t * .68), y = -height * .3 + t * height * .68;
        for (let arm = 0; arm < 4; arm++) {
          const a = arm / 4 * Math.PI * 2 + layer * 1.7 + seed;
          const branch = add(branches, new THREE.IcosahedronGeometry(1, 0), 'leaf', Math.sin(a) * reach * .48, y + Math.sin(a * 3) * .08, Math.cos(a) * reach * .48);
          branch.scale.set(reach * .53, height * .14 * (1 - t * .45), reach * .81); branch.rotation.set(.14, a, .08 * Math.sin(a));
        }
      }
      const tip = add(branches, new THREE.ConeGeometry(radius * .25, height * .4, 7), 'leaf', 0, height * .37); tip.rotation.y = seed;
      bake(branches); return branches.children[0].geometry;
    };
    const specs = [
      { geo: new THREE.CylinderGeometry(.075, .17, 3.8, 6), colour: 0x645f4f, y: 1.9, s: 1 },
      { geo: crown(1.12, 2.65, 1), colour: 0x415d4d, y: 2.2, s: 1 },
      { geo: crown(.88, 2.3, 3), colour: 0x4e6c55, y: 3.15, s: 1 },
      { geo: crown(.59, 1.9, 5), colour: 0x5c775b, y: 4.05, s: 1 }
    ];
    for (const spec of specs) {
      const m = new THREE.InstancedMesh(spec.geo, new THREE.MeshStandardMaterial({ color: spec.colour, roughness: 1 }), trees.length);
      trees.forEach((p, i) => { dummy.position.set(p.x, p.y + spec.y * p.s, p.z); dummy.scale.setScalar(p.s); dummy.rotation.set(0, p.a, .025 * Math.sin(p.a)); dummy.updateMatrix(); m.setMatrixAt(i, dummy.matrix); m.setColorAt(i, new THREE.Color().setScalar(.86 + (i % 7) * .035)); });
      m.castShadow = m.receiveShadow = true; m.name = 'Instanced conifer canopy'; this.root.add(m);
    }
    for (let i = 0; i < 210; i++) {
      const p = this.riverPoints[Math.floor(rand() * this.riverPoints.length)], side = rand() > .5 ? 1 : -1;
      const x = p.x + (rand() - .5) * 3, z = p.z + side * (4.5 + rand() * 2.2), y = this.height(x, z);
      if (this.activityClearance(x, z, 1.2) || this.roads.some(points => points.some(p => Math.hypot(x - p.x, z - p.z) < 2.6))) continue;
      stones.push({ x, y, z, s: .25 + rand() * .75, a: rand() * 6 });
    }
    const rocks = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1, 0), mat('stone'), stones.length);
    stones.forEach((p, i) => { dummy.position.set(p.x, p.y, p.z); dummy.scale.set(p.s * 1.4, p.s * .8, p.s); dummy.rotation.set(p.a, p.a * .5, 0); dummy.updateMatrix(); rocks.setMatrixAt(i, dummy.matrix); }); rocks.castShadow = rocks.receiveShadow = true; this.root.add(rocks);
  }
  private activityClearance(x: number, z: number, margin = 0) {
    return [...this.activitySites.values()].some(g => Math.hypot(x - g.position.x, z - g.position.z) < 3.7 + margin)
      || [...this.activitySites.keys()].some(id => { const p = this.activityParking(id)!; return Math.hypot(x - p.x, z - p.z) < 4.2 + margin; })
      || this.activityPaths.some(points => points.some(p => Math.hypot(x - p.x, z - p.z) < .8 + margin));
  }
  private naturalDetails() {
    const g = new THREE.Group(); g.name = 'Local wildflowers, reeds and rocky outcrops'; this.root.add(g);
    const clear = (x: number, z: number) => !this.roads.some(points => points.some(p => Math.hypot(x - p.x, z - p.z) < 2.8))
      && !this.activityPaths.some(points => points.some(p => Math.hypot(x - p.x, z - p.z) < 1.3))
      && !Object.values(this.locations).some(p => Math.hypot(x - p.x, z - p.z) < 9)
      && !Object.values(this.nodes).flat().some(n => Math.hypot(x - n.position.x, z - n.position.z) < 4);
    for (const [id, site] of this.activitySites) {
      for (const side of [-1, 1]) for (let i = 0; i < 10; i++) {
        const x = site.position.x + side * (2.35 + (i % 3) * .2), z = site.position.z - 1.8 + Math.floor(i / 3) * .24;
        if (!clear(x, z) || (id === 'lookout' && side === 1) || this.riverDistance(x, z) < 5.5) continue;
        const y = this.height(x, z);
        bar(g, V(x, y, z), V(x + .035, y + .27, z), .018, 'leaf');
        const bloom = add(g, new THREE.IcosahedronGeometry(.095, 0), i % 4 ? 'wall' : 'gold', x + .035, y + .29, z); bloom.scale.y = .45;
        const leaf = add(g, new THREE.OctahedronGeometry(.11, 0), 'leaf', x + .065, y + .12, z); leaf.scale.set(1.2, .25, .5);
      }
    }
    for (const [cx, cz] of [[-55, -31], [-47, -51], [47, -47], [64, 11], [-65, 19]]) {
      for (let i = 0; i < 8; i++) {
        const x = cx + Math.sin(i * 2.4) * 2.7, z = cz + Math.cos(i * 1.8) * 2;
        if (!clear(x, z)) continue;
        const rock = add(g, new THREE.DodecahedronGeometry(1, 0), i % 3 ? 'stone' : 'soil', x, this.height(x, z) + .15, z);
        rock.scale.set(1.1 + (i % 3) * .35, .45 + (i % 2) * .5, .7 + (i % 4) * .2); rock.rotation.set(.15, i * 1.7, .2);
      }
    }
    const reed = (x: number, y: number, z: number, i: number) => {
      const tip = V(x + Math.sin(i) * .1, y + .45 + (i % 3) * .09, z);
      bar(g, V(x, y, z), tip, .018, 'leaf');
      cyl(g, .035, .16, 'timber', tip.x, tip.y, tip.z, 5);
    };
    for (let i = 5; i < this.riverPoints.length - 5; i += 4) {
      const p = this.riverPoints[i], next = this.riverPoints[i + 1], tangent = next.clone().sub(p).normalize();
      for (const side of [-1, 1]) {
        const x = p.x + tangent.z * side * 4, z = p.z - tangent.x * side * 4;
        if (!clear(x, z) || this.activityClearance(x, z, .8) || Math.abs(x - 10) < 3 || Math.abs(x + 23) < 3 || Math.abs(x - 53) < 3) continue;
        for (let j = 0; j < 3; j++) reed(x + j * .13, this.height(x + j * .13, z), z, i + j);
      }
    }
    const pond = this.activitySites.get('lookout')!.position;
    for (let i = 0; i < 7; i++) reed(pond.x + 2.95 + (i % 2) * .12, .03, pond.z - 1.3 + i * .2, i);
    bake(g, true);
  }
  infrastructure() {
    const g = new THREE.Group(); this.root.add(g);
    bridge(g, -23, 22, 12); bridge(g, 53, 28, 13);
    this.ribbon([V(-23, 0, 16), V(-23, 0, 13), V(-25, 0, 10), V(-28.6, 0, -2.5)], 2.8, mat('soil'), .12, true);
    this.ribbon([V(-23, 0, 28), V(-23, 0, 32), V(0, 0, 34), V(25, 0, 38), V(53, 0, 36)], 2.4, mat('soil'), .12, true);
    // River-side wharf, mooring piles and a compact cargo launch.
    box(g, 7, .27, 2.2, 'timber', -35, -.2, 15.2);
    for (let x = -38; x <= -32; x += 1.1) cyl(g, .12, 2.7, 'timber', x, -1, 16.2, 8);
    const hull = add(g, new THREE.CylinderGeometry(1, .7, .65, 6), 'teal', -35, -.65, 18); hull.scale.set(1, 1, 2.7);
    box(g, 1.1, .75, 1.25, 'wall', -35, -.03, 17.7); box(g, 1.2, .08, 1.45, 'roof', -35, .38, 17.7);
    for (const x of [-30.8, -29.6]) box(g, .8, .7, .9, 'timber', x, .4, 13.8);
    bake(g);
    for (const id of ['bridge', 'observatory', 'greenhouse']) {
      const project = new THREE.Group(); project.name = `Restoration: ${id}`; this.root.add(project);
      if (id === 'bridge') bridge(project, 10, 19.7, 13, 4);
      if (id === 'observatory') observatory(project, 12, -48, .9);
      if (id === 'greenhouse') greenhouse(project, 44, 6, .85);
      bake(project); project.visible = false; this.projects.set(id, project);
    }
    for (const threshold of [2, 5]) {
      const repair = new THREE.Group(); repair.name = `HQ repair after ${threshold} resolved stations`; this.root.add(repair);
      if (threshold === 2) {
        const glow = new THREE.MeshStandardMaterial({ color: 0xf4dfad, emissive: 0xffd28a, emissiveIntensity: 1.6, roughness: .5 });
        for (const x of [-5.8, -2.4, 1, 4.4]) {
          cyl(repair, .065, 1.5, 'metal', x, .75, 12.2);
          const light = new THREE.Mesh(new THREE.BoxGeometry(.22, .24, .22), glow); light.position.set(x, 1.55, 12.2); repair.add(light);
          box(repair, .32, .08, .32, 'roof', x, 1.72, 12.2);
        }
      } else {
        for (const x of [-5.2, -2.1]) solar(repair, x, 12.9, .9);
        for (const x of [4.8, 6]) box(repair, .95, .75, .9, 'timber', x, .4, 9.2);
      }
      bake(repair); repair.visible = false; this.repairs.set(threshold, repair);
    }
  }
  campus(id: string, target?: any, level = 1) {
    const g = target || new THREE.Group(); if (!target) { g.position.copy(this.locations[id]); this.root.add(g); }
    g.name = `${id} miniature campus`;
    g.userData.destination = id; this.campuses.set(id, g);
    const accent = ({ hq: 'teal', harbour: 'teal', english: 'red', physics: 'violet', chemistry: 'teal', grove: 'leaf' } as Record<string, string>)[id];
    box(g, 10.7, .08, 8.1, 'paving', 0, -.01, -.8);
    if (id === 'hq') {
      house(g, -3.5, -3.2, 4.8, 4.5, 2 + .5 * (level - 1), accent);
      house(g, 3.3, -3.2, 4.3, 4.2, 2.3, 'metal', true);
      box(g, 2.7, 1.6, .09, 'dark', 3.3, .95, -1.04);
      for (let i = 0; i < 3; i++) box(g, 2.6, .045, .05, 'frame', 3.3, .5 + i * .48, -1);
      for (let i = 0; i < 5; i++) box(g, .85, .7, .9, i % 2 ? 'timber' : 'teal', -6.8 + i * 1.08, .4, 3.3);
      for (const x of [-6.6, 6.7]) { cyl(g, .07, 3.4, 'metal', x, 1.7, 1); box(g, .5, .12, .28, 'gold', x, 3.45, 1); }
      if (level > 1) for (let i = 0; i < 3; i++) solar(g, -4 + i * 3, -7.3);
      if (level > 2) { house(g, -7.6, -2, 2, 2, 5.2, 'teal', true); box(g, 2.2, .8, 2.2, 'window', -7.6, 4.7, -2); }
    } else if (id === 'harbour') {
      house(g, -2.3, -2.4, 5.6, 4, 2.6, accent); house(g, 3.8, -.9, 2.7, 3.1, 1.9, 'gold', true);
      for (let i = 0; i < 6; i++) box(g, 1.45, .8 + (i % 2) * .7, 1.1, i % 2 ? 'timber' : 'teal', -4.8 + i * 1.7, .5 + (i % 2) * .35, 2.2);
      for (const x of [-4.5, 4.5]) bar(g, V(x, 0, 3.7), V(x, 4.7, 3.7), .11, 'gold'); bar(g, V(-4.5, 4.7, 3.7), V(4.5, 4.7, 3.7), .14, 'gold'); bar(g, V(-1, 4.7, 3.7), V(-1, 2.3, 3.7), .035, 'metal');
    } else if (id === 'english') {
      house(g, -1.8, -2.2, 5.6, 4.5, 2.7, accent); house(g, 3.1, -1.1, 2.9, 3.2, 2, accent);
      house(g, -4.8, 1.8, 1.6, 1.7, 4.6, accent, true);
      const clock = cyl(g, .5, .06, 'wall', -4.8, 3.75, 2.7, 24); clock.rotation.x = Math.PI / 2;
      bar(g, V(-4.8, 3.75, 2.75), V(-4.8, 4.1, 2.75), .025, 'dark'); bar(g, V(-4.8, 3.75, 2.75), V(-4.52, 3.75, 2.75), .025, 'dark');
      for (const x of [-1, 2]) { box(g, 1.8, .13, .55, 'timber', x, .55, 3); for (const dx of [-.65, .65]) box(g, .08, .5, .5, 'metal', x + dx, .25, 3); }
    } else if (id === 'physics') {
      observatory(g, -2.1, -1.7); house(g, 3.3, -.7, 3.4, 3.8, 2.1, accent, true);
      for (const x of [-4, -.9, 2.2]) solar(g, x, 3.4);
      cyl(g, .09, 5, 'frame', 5, 2.5, -3.4); bar(g, V(4, 4.6, -3.4), V(6, 4.6, -3.4), .06);
    } else if (id === 'chemistry') {
      house(g, -1.9, -1.9, 5.7, 4.4, 2.5, accent, true); house(g, 3.9, -.1, 2.5, 3.2, 1.9, accent, true);
      for (const x of [-4.2, -2.3, -.4]) { cyl(g, .58, 2, 'frame', x, 1.1, 2.4); cyl(g, .6, .15, 'teal', x, 2.16, 2.4); bar(g, V(x, 2.2, 2.4), V(x, 3, -.2), .075, 'metal'); }
      for (const x of [-3.3, -.7]) { cyl(g, .22, 1.25, 'metal', x, 3.3, -2.7); cyl(g, .32, .1, 'frame', x, 3.98, -2.7); }
    } else {
      greenhouse(g, -1.4, -1.5, .86); house(g, 4.1, .2, 2.7, 3.5, 1.9, accent);
      for (let i = 0; i < 4; i++) { box(g, 2.8, .16, .6, 'timber', -4.7, .1, -2 + i * 1.3); box(g, 2.6, .26, .44, 'leaf', -4.7, .3, -2 + i * 1.3); }
      cyl(g, .75, 1.8, 'teal', 4.3, .98, -3.2);
    }
    // Actual field buildings sit behind their existing arrival/marker coordinates.
    for (const [i, node] of (this.nodes[id] || []).entries()) {
      const p = node.position.clone().sub(this.locations[id]);
      const buildingX = p.x + (id === 'grove' && i === 3 ? -3.3 : 0);
      box(g, 3.2, .08, 3.5, 'paving', buildingX, -.005, p.z - 1.25);
      if (id === 'grove' && i === 1) greenhouse(g, p.x, p.z - 2, .45);
      else house(g, buildingX, p.z - 2, 2.45 + (i % 2) * .4, 2.3, 1.4 + (i % 3) * .15, accent, id === 'chemistry');
      cyl(g, .055, 1.5, 'metal', p.x + 1.5, .75, p.z); box(g, .34, .36, .08, accent, p.x + 1.5, 1.3, p.z);
      if (i % 2 === 0) solar(g, p.x + 2.7, p.z - 2, .6);
    }
    bake(g); return g;
  }
  syncCampaign(campaign: any, totalResolved?: number) {
    const built = campaign?.projectsBuilt ?? campaign?.builtProjects ?? campaign?.projects ?? [];
    const resolved = totalResolved ?? campaign?.totalResolved ?? (Array.isArray(campaign?.resolvedStations) ? campaign.resolvedStations.length : Number(campaign?.resolvedStations) || 0);
    for (const [threshold, root] of this.repairs) root.visible = resolved >= threshold;
    for (const [id, root] of this.projects) {
      root.visible = Array.isArray(built)
        ? built.some(p => p === id || (p?.id === id && (p.built === true || p.status === 'built' || p.completed === true)))
        : built[id] === true || built[id]?.built === true || built[id]?.status === 'built';
    }
  }
  setLoadout(tank: any, id: string) {
    if (!this.loadouts.size) {
      for (const type of ['survey', 'engineering', 'ecology']) {
        const g = new THREE.Group(); g.name = `Atlas ${type} equipment`; tank.add(g);
        if (type === 'survey') { cyl(g, .04, 1.4, 'frame', -.8, 2.2, -1.5); add(g, new THREE.SphereGeometry(.23, 12, 8), 'wall', -.8, 2.95, -1.5); box(g, .52, .38, .55, 'window', .75, 1.92, -1.5); }
        if (type === 'engineering') { box(g, 2.1, .35, .45, 'gold', 0, .53, 2.5); for (const x of [-.75, .75]) bar(g, V(x, .6, 1.6), V(x, .55, 2.5), .065, 'metal'); }
        if (type === 'ecology') { for (const x of [-.85, .85]) { box(g, .55, .65, .8, 'teal', x, 1.98, -1.5); box(g, .59, .08, .84, 'frame', x, 2.34, -1.5); } }
        bake(g); this.loadouts.set(type, g);
      }
    }
    const alias: Record<string, string> = { scout: 'survey', surveyor: 'survey', hauler: 'engineering', builder: 'engineering', engineer: 'engineering', botanist: 'ecology', ranger: 'ecology' };
    for (const [type, g] of this.loadouts) g.visible = type === (alias[id] || id);
  }
}
