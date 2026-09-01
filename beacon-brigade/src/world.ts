import * as THREE from '../../cave-river-quest/vendor/three.module.js';

const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
const LOCATIONS = { hq: V(0, 0, 0), harbour: V(-26, 0, -18), grove: V(24, 0, -22) };
const REGION_NODES: Record<string, any[]> = {
  harbour: [
    { id: 'station-0', label: 'Cargo Crane', position: LOCATIONS.harbour.clone().add(V(-5.2, 0, 2.6)) },
    { id: 'station-1', label: 'Supply Depot', position: LOCATIONS.harbour.clone().add(V(4.8, 0, -1.7)) },
    { id: 'station-2', label: 'Repair Workshop', position: LOCATIONS.harbour.clone().add(V(5.6, 0, 4.7)) }
  ],
  grove: [
    { id: 'station-0', label: 'Materials Lab', position: LOCATIONS.grove.clone().add(V(-3.2, 0, -1.5)) },
    { id: 'station-1', label: 'Field Test Rig', position: LOCATIONS.grove.clone().add(V(-5.5, 0, 4.5)) },
    { id: 'station-2', label: 'Research Outpost', position: LOCATIONS.grove.clone().add(V(5.6, 0, 4.6)) }
  ]
};
const clamp = THREE.MathUtils.clamp;
const lerp = THREE.MathUtils.lerp;
const mats: Record<string, any> = {};
function material(name: string, colour: number, metalness = 0, roughness = .8) {
  return mats[name] ||= new THREE.MeshStandardMaterial({ color: colour, metalness, roughness });
}
const paint = material('armour', 0x68715a, .5, .54);
const edge = material('edge', 0x454d40, .65, .6);
const steel = material('steel', 0x69757b, .8, .35);
const dark = material('rubber', 0x22282a, .1, .96);
const concrete = material('concrete', 0xadb0a7, .04, .94);
const blue = material('blue', 0x2e5b67, .4, .6);
const ochre = material('safety', 0xd9b557, .35, .6);
const glass = material('glass', 0x214656, .65, .19);
const lamp = new THREE.MeshStandardMaterial({ color: 0xe9f7ee, emissive: 0xb7ddcc, emissiveIntensity: 1.2 });
const routeMat = new THREE.MeshStandardMaterial({ color: 0xf0d478, emissive: 0x7a5a16, emissiveIntensity: .85, roughness: .5, transparent: true, opacity: .94 });
const waypointMat = new THREE.MeshStandardMaterial({ color: 0xeff6cf, emissive: 0x9fc75c, emissiveIntensity: 1.4, roughness: .35, transparent: true, opacity: .9 });
function surfaceTexture() {
  const canvas = document.createElement('canvas'); canvas.width = canvas.height = 256;
  const ctx = canvas.getContext('2d')!; const pixels = ctx.createImageData(256, 256); let seed = 71;
  for (let i = 0; i < pixels.data.length; i += 4) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const value = 191 + seed % 38; pixels.data.set([value, value, value - 3, 255], i);
  }
  ctx.putImageData(pixels, 0, 0); ctx.strokeStyle = '#9b9d9230'; ctx.lineWidth = .5;
  for (let y = 0; y < 256; y += 6) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(256, y + 2); ctx.stroke(); }
  const texture = new THREE.CanvasTexture(canvas); texture.wrapS = texture.wrapT = THREE.RepeatWrapping; texture.repeat.set(3, 3); texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function mesh(group: any, geometry: any, mat: any, x = 0, y = 0, z = 0) {
  const obj = new THREE.Mesh(geometry, mat);
  obj.position.set(x, y, z); obj.castShadow = true; obj.receiveShadow = true;
  group.add(obj); return obj;
}
function box(g: any, w: number, h: number, d: number, m: any, x = 0, y = 0, z = 0) {
  return mesh(g, new THREE.BoxGeometry(w, h, d), m, x, y, z);
}
function cylinder(g: any, rt: number, rb: number, h: number, m: any, x = 0, y = 0, z = 0, n = 16) {
  return mesh(g, new THREE.CylinderGeometry(rt, rb, h, n), m, x, y, z);
}
function line(g: any, a: any, b: any, radius: number, m: any) {
  const mid = a.clone().add(b).multiplyScalar(.5);
  const obj = cylinder(g, radius, radius, a.distanceTo(b), m, mid.x, mid.y, mid.z, 8);
  obj.quaternion.setFromUnitVectors(V(0, 1, 0), b.clone().sub(a).normalize());
  return obj;
}
function track(g: any, a: any, b: any, width = 1.6) {
  const shoulder = material('track-shoulder', 0x6b624d, 0, .99);
  const dirt = material('track-dirt', 0x8c8269, 0, .98);
  const mid = a.clone().add(b).multiplyScalar(.5); const length = a.distanceTo(b); const angle = Math.atan2(b.x - a.x, b.z - a.z);
  const edgeStrip = box(g, width + .55, .045, length, shoulder, mid.x, .055, mid.z); edgeStrip.rotation.y = angle;
  const road = box(g, width, .055, length, dirt, mid.x, .09, mid.z); road.rotation.y = angle;
  return road;
}
function armour(g: any, w: number, h: number, d: number, m: any, x = 0, y = 0, z = 0, bevel = .12) {
  const shape = new THREE.Shape();
  shape.moveTo(-w / 2 + bevel, -d / 2); shape.lineTo(w / 2 - bevel, -d / 2);
  shape.lineTo(w / 2, -d / 2 + bevel); shape.lineTo(w / 2, d / 2 - bevel);
  shape.lineTo(w / 2 - bevel, d / 2); shape.lineTo(-w / 2 + bevel, d / 2);
  shape.lineTo(-w / 2, d / 2 - bevel); shape.lineTo(-w / 2, -d / 2 + bevel); shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: h, bevelEnabled: true, bevelThickness: bevel / 2, bevelSize: bevel / 2, bevelSegments: 2, steps: 1 });
  geometry.rotateX(-Math.PI / 2); geometry.translate(0, -h / 2, 0);
  return mesh(g, geometry, m, x, y, z);
}
function label(g: any, text: string, x: number, y: number, z: number, width: number, colour = '#eef3ed') {
  const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 128;
  const ctx = canvas.getContext('2d')!; ctx.font = 'bold 65px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = colour; ctx.fillText(text, 256, 64);
  const tex = new THREE.CanvasTexture(canvas); tex.colorSpace = THREE.SRGBColorSpace;
  const obj = mesh(g, new THREE.PlaneGeometry(width, width / 4), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }), x, y, z);
  obj.castShadow = false; return obj;
}

export class ExpeditionWorld {
  renderer: any; scene: any; camera: any; tank: any; tracks: any[] = []; wheels: any[] = [];
  group: any; hq: any; dish: any; rig: any; water: any; canvas: HTMLCanvasElement;
  routeLayer = new THREE.Group(); waypoint = new THREE.Group(); waypointRing: any; dustPuffs: any[] = [];
  view = 'hq'; destination = 'hq'; yaw = .72; radius = 17; elevation = 10;
  target = V(0, 1, 0); cameraGoal = V(); lookGoal = V(); travel: any = null;
  paused = false; reduced = false; running = true; frame = 0; last = 0; clock = 0;
  onTravelEnd: (() => void) | null = null; onFrame: ((pins: any[]) => void) | null = null;
  width = 0; height = 0; hqLevel = 0; ready: Promise<void>; textureErrors: string[] = [];
  currentArea = 'hq'; framingKey = ''; selectedNodeKey = '';
  resizeObserver: ResizeObserver;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6)); this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping; this.renderer.toneMappingExposure = 1.2;
    this.scene = new THREE.Scene(); this.scene.background = new THREE.Color(0xb9cdd1);
    paint.map = surfaceTexture(); edge.map = paint.map; blue.map = paint.map;
    this.scene.fog = new THREE.FogExp2(0xb9cdd1, .009);
    this.camera = new THREE.PerspectiveCamera(42, 1, .1, 300); this.camera.position.set(15, 10, 18);
    this.scene.add(new THREE.HemisphereLight(0xe8f3ff, 0x6a7053, 2));
    const sun = new THREE.DirectionalLight(0xfff2d9, 3.2); sun.position.set(-20, 35, 15); sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -50, right: 50, top: 50, bottom: -50, near: .5, far: 110 });
    sun.shadow.normalBias = .045; this.scene.add(sun);
    this.group = new THREE.Group(); this.scene.add(this.group);
    this.group.add(this.routeLayer, this.waypoint); this.waypoint.visible = false;
    this.waypointRing = mesh(this.waypoint, new THREE.TorusGeometry(1.05, .11, 12, 40), waypointMat, 0, .18, 0); this.waypointRing.rotation.x = Math.PI / 2;
    const beam = cylinder(this.waypoint, .045, .11, 3.7, waypointMat, 0, 1.95, 0, 14); beam.castShadow = false;
    this.ready = this.createLandscape();
    this.hq = new THREE.Group(); this.group.add(this.hq); this.createBase(1);
    this.createHarbour(); this.createScienceBase(); this.tank = this.createTank();
    this.tank.position.set(2.4, .02, 4.5); this.tank.rotation.y = .3; this.group.add(this.tank);
    this.createDust();
    this.resizeObserver = new ResizeObserver(() => this.resize()); this.resizeObserver.observe(canvas.parentElement!);
    let dragging = false, lastX = 0;
    canvas.addEventListener('pointerdown', e => { if (this.travel) return; dragging = true; lastX = e.clientX; canvas.setPointerCapture(e.pointerId); });
    canvas.addEventListener('pointermove', e => { if (dragging) { this.yaw += (lastX - e.clientX) * .005; lastX = e.clientX; } });
    for (const type of ['pointerup', 'pointercancel']) canvas.addEventListener(type, () => { dragging = false; });
    canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); this.running = false; canvas.dispatchEvent(new CustomEvent('world-error', { detail: 'Graphics paused. Reload to restore the scene; your saved progress is safe.' })); });
    this.resize(); this.setView('hq'); this.animate(0);
  }
  createDust() {
    const geo = new THREE.SphereGeometry(.48, 8, 5);
    for (let i = 0; i < 9; i++) {
      const mat = new THREE.MeshBasicMaterial({ color: 0xb7aa8b, transparent: true, opacity: 0, depthWrite: false });
      const puff = mesh(this.group, geo, mat); puff.castShadow = false; puff.visible = false; this.dustPuffs.push(puff);
    }
  }
  async createLandscape() {
    const loader = new THREE.TextureLoader();
    const load = async (path: string) => {
      try { return await loader.loadAsync(new URL(`./assets/${path}`, document.baseURI).href); }
      catch { this.textureErrors.push(path); return null; }
    };
    // Geometry remains available while textures stream in; no blank loading scene.
    const geo = new THREE.PlaneGeometry(180, 180, 120, 120); geo.rotateX(-Math.PI / 2);
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), z = p.getZ(i), distance = Math.max(Math.abs(x) - 39, Math.abs(z) - 38, 0);
      p.setY(i, distance * .17 * (1.1 + Math.sin(x * .13) * Math.cos(z * .1)) - .08);
    }
    geo.computeVertexNormals();
    const ground = new THREE.MeshStandardMaterial({ color: 0x7b8061, roughness: .96 });
    mesh(this.group, geo, ground).castShadow = false;
    const road = material('road', 0x777970, .03, .97);
    for (const endpoint of [LOCATIONS.harbour, LOCATIONS.grove]) {
      const mid = endpoint.clone().multiplyScalar(.5); const length = endpoint.length();
      const obj = box(this.group, 5, .07, length + 8, road, mid.x, .02, mid.z);
      obj.rotation.y = Math.atan2(endpoint.x, endpoint.z);
      for (let i = 1; i < 14; i++) {
        const t = i / 14; const marking = box(this.group, .1, .01, .8, material('line', 0xc1bca0), endpoint.x * t, .067, endpoint.z * t);
        marking.rotation.y = obj.rotation.y;
      }
    }
    const rockMat = material('rock', 0x686d63, 0, .97);
    const rockGeo = new THREE.DodecahedronGeometry(1, 1);
    const rocks = new THREE.InstancedMesh(rockGeo, rockMat, 140); const temp = new THREE.Object3D();
    let seed = 18; const rand = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    for (let i = 0; i < 140; i++) {
      const angle = rand() * Math.PI * 2, r = 39 + rand() * 27;
      const s = .3 + rand() * 1.15; temp.position.set(Math.cos(angle) * r, .1, Math.sin(angle) * r);
      temp.scale.set(s * 1.65, s * .72, s * 1.15); temp.rotation.set(rand() * .25, rand() * 6, rand() * .18); temp.updateMatrix(); rocks.setMatrixAt(i, temp.matrix);
    }
    rocks.castShadow = true; rocks.receiveShadow = true; this.group.add(rocks);
    for (let i = 0; i < 32; i++) {
      const angle = rand() * 6.28, r = 36 + rand() * 20, x = Math.cos(angle) * r, z = Math.sin(angle) * r;
      this.tree(x, z, .7 + rand() * .8);
    }
    const colour = await load('ground-colour.jpg'); const normal = await load('ground-normal.jpg');
    for (const tex of [colour, normal]) if (tex) { tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(24, 24); tex.anisotropy = 8; }
    if (colour) { colour.colorSpace = THREE.SRGBColorSpace; ground.map = colour; ground.color.set(0xd6d6c3); }
    if (normal) { ground.normalMap = normal; ground.normalScale.set(.6, .6); }
    ground.needsUpdate = true;
    const concreteMap = await load('concrete-colour.jpg'); const concreteNormal = await load('concrete-normal.jpg');
    for (const tex of [concreteMap, concreteNormal]) if (tex) { tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(6, 6); tex.anisotropy = 8; }
    if (concreteMap) { concreteMap.colorSpace = THREE.SRGBColorSpace; concrete.map = concreteMap; concrete.color.set(0xd3d4ca); }
    if (concreteNormal) { concrete.normalMap = concreteNormal; concrete.normalScale.set(.4, .4); }
    concrete.needsUpdate = true;
  }
  tree(x: number, z: number, s: number) {
    const g = new THREE.Group(); g.position.set(x, 0, z); g.scale.setScalar(s); this.group.add(g);
    cylinder(g, .1, .25, 5.3, material('bark', 0x514b3d), 0, 2.65, 0, 9);
    const foliage = [material('pine0', 0x2f4939), material('pine1', 0x3d5841), material('pine2', 0x516a4b)];
    for (let i = 0; i < 7; i++) {
      const y = 2.1 + i * .55; const width = 1.55 - i * .13;
      const geo = new THREE.DodecahedronGeometry(1, 1); const canopy = mesh(g, geo, foliage[i % foliage.length], (i % 2 ? .18 : -.12), y, (i % 3 - 1) * .14);
      canopy.scale.set(width, .72, width * .9); canopy.rotation.set(i * .17, i * .83, i * .08);
    }
    const tip = mesh(g, new THREE.ConeGeometry(.62, 1.5, 12), foliage[0], 0, 5.55, 0); tip.rotation.y = .4;
  }
  fieldNode(g: any, x: number, z: number, number: number, accent: any) {
    cylinder(g, 1.32, 1.44, .14, material('node-pad', 0x555b55, .08, .94), x, .16, z, 24);
    const ring = mesh(g, new THREE.TorusGeometry(1.03, .08, 10, 32), accent, x, .26, z); ring.rotation.x = Math.PI / 2;
    cylinder(g, .09, .14, 2.6, steel, x, 1.42, z, 10);
    const light = cylinder(g, .21, .21, .12, lamp, x, 2.76, z, 16); light.castShadow = false;
    label(g, `0${number}`, x, .82, z + 1.47, .9).rotation.x = -Math.PI / 2;
  }
  createTank() {
    const tank = new THREE.Group();
    armour(tank, 2.45, .52, 4.6, edge, 0, .96, 0);
    armour(tank, 2.58, .48, 3.9, paint, 0, 1.37, -.08, .32);
    const front = box(tank, 2.36, .11, .91, paint, 0, 1.28, 1.91); front.rotation.x = -.38;
    for (const side of [-1, 1]) {
      const track = new THREE.InstancedMesh(new THREE.BoxGeometry(.59, .095, .21), dark, 64); track.castShadow = true; track.receiveShadow = true;
      const shoe = new THREE.InstancedMesh(new THREE.BoxGeometry(.63, .045, .11), steel, 64); shoe.castShadow = true;
      tank.add(track, shoe); this.tracks.push({ track, shoe, side });
      for (let i = 0; i < 7; i++) {
        const wheel = cylinder(tank, .39, .39, .42, dark, side * 1.39, .58, -1.62 + i * .54, 20); wheel.rotation.z = Math.PI / 2; this.wheels.push(wheel);
        const hub = cylinder(tank, .27, .27, .045, paint, side * 1.62, .58, -1.62 + i * .54); hub.rotation.z = Math.PI / 2;
        const bolt = cylinder(tank, .09, .09, .055, steel, side * 1.66, .58, -1.62 + i * .54, 6); bolt.rotation.z = Math.PI / 2;
      }
      for (let i = 0; i < 5; i++) armour(tank, .12, .45, .65, paint, side * 1.64, 1.24, -1.58 + i * .76, .035);
      line(tank, V(side * 1.05, 1.63, -1.3), V(side * 1.05, 1.63, 1.35), .025, steel);
      box(tank, .5, .06, 4.45, edge, side * 1.36, 1.54, 0);
      mesh(tank, new THREE.TorusGeometry(.12, .027, 6, 12), steel, side * .8, 1.07, 2.44);
      box(tank, .2, .12, .08, lamp, side * 1.08, 1.49, 1.84);
      box(tank, .17, .08, .05, material('rear-lamp', 0x963c29, .1), side * 1.1, 1.46, -2);
    }
    const turret = new THREE.Group(); tank.add(turret); turret.position.set(0, 1.64, .03);
    cylinder(turret, .78, .85, .17, dark, 0, .05, 0, 32);
    armour(turret, 1.82, .6, 1.92, paint, 0, .44, -.2, .3);
    const mantle = armour(turret, .7, .49, .38, edge, 0, .41, .91, .11);
    const barrel = cylinder(turret, .092, .14, 2.35, paint, 0, .44, 2.08, 20); barrel.rotation.x = Math.PI / 2;
    for (const z of [1.1, 1.43, 2.64, 3.1]) { const ring = cylinder(turret, .145, .145, .09, steel, 0, .44, z, 20); ring.rotation.x = Math.PI / 2; }
    const cap = cylinder(turret, .091, .091, .03, dark, 0, .44, 3.26, 20); cap.rotation.x = Math.PI / 2;
    cylinder(turret, .32, .35, .08, edge, .4, .81, -.24, 24);
    cylinder(turret, .23, .25, .1, paint, -.4, .79, -.45, 24);
    box(turret, .38, .16, .24, edge, -.45, .9, .25); box(turret, .3, .07, .025, glass, -.45, .93, .385);
    line(turret, V(.73, .7, -.85), V(.76, 2.9, -.93), .012, dark);
    for (let i = 0; i < 8; i++) box(tank, 1.3, .035, .035, dark, 0, 1.644, -1.55 + i * .055);
    for (const x of [-.75, .75]) { armour(tank, .46, .38, .75, edge, x, 1.77, -1.56, .055); }
    label(turret, '07', -.91, .46, -.15, .64).rotation.y = -Math.PI / 2;
    label(turret, '07', .91, .46, -.15, .64).rotation.y = Math.PI / 2;
    label(tank, 'ATLAS', 0, 1.35, 2.07, .9);
    const bolts = new THREE.InstancedMesh(new THREE.CylinderGeometry(.026, .026, .025, 6), steel, 48); const t = new THREE.Object3D();
    for (let i = 0; i < 48; i++) { const side = i < 24 ? -1 : 1; t.position.set(side * 1.13, 1.64, -1.8 + (i % 24) * .153); t.updateMatrix(); bolts.setMatrixAt(i, t.matrix); } tank.add(bolts);
    this.updateTracks(0); return tank;
  }
  updateTracks(offset: number) {
    const dummy = new THREE.Object3D();
    // Closed capsule path: pads stay on the wheel envelope and touch the ground.
    for (const { track, shoe, side } of this.tracks) for (let i = 0; i < 64; i++) {
      const length = 6.6 + Math.PI * .96, dist = ((i / 64 * length + offset) % length + length) % length;
      let z, y, a;
      if (dist < 3.3) { z = -1.65 + dist; y = 1.06; a = 0; }
      else if (dist < 3.3 + Math.PI * .48) { a = (dist - 3.3) / .48; z = 1.65 + Math.sin(a) * .48; y = .58 + Math.cos(a) * .48; }
      else if (dist < 6.6 + Math.PI * .48) { z = 1.65 - (dist - 3.3 - Math.PI * .48); y = .1; a = Math.PI; }
      else { const b = (dist - 6.6 - Math.PI * .48) / .48; a = Math.PI + b; z = -1.65 - Math.sin(b) * .48; y = .58 - Math.cos(b) * .48; }
      dummy.position.set(side * 1.4, y, z); dummy.rotation.set(a, 0, 0); dummy.updateMatrix(); track.setMatrixAt(i, dummy.matrix);
      dummy.position.y += Math.cos(a) * .06; dummy.position.z += Math.sin(a) * .06; dummy.updateMatrix(); shoe.setMatrixAt(i, dummy.matrix);
    }
    for (const { track, shoe } of this.tracks) { track.instanceMatrix.needsUpdate = true; shoe.instanceMatrix.needsUpdate = true; }
  }
  createBase(level: number) {
    this.hqLevel = level;
    while (this.hq.children.length) this.hq.remove(this.hq.children[0]);
    box(this.hq, 20, .18, 17, concrete, 0, .02, -1.5);
    this.building(this.hq, -3.7, -4.3, 7, 4.8, level === 1 ? 2.4 : 4.3, 'COMMAND', blue);
    this.building(this.hq, 5, -5, 4.3, 5, 2.4, 'ENGINEERING', edge);
    for (let i = 0; i < 3; i++) this.crate(this.hq, -7 + i * 1.2, 3.5, i === 1 ? blue : edge);
    for (const x of [-8.4, 8.4]) {
      this.lightPole(this.hq, x, 4.5);
      for (let i = 0; i < 8; i++) box(this.hq, .13, 1, .13, steel, x, .6, 3.2 - i * 1.5);
      line(this.hq, V(x, 1.1, -7.5), V(x, 1.1, 3.2), .026, steel);
    }
    for (let i = 0; i < 4; i++) {
      box(this.hq, .75, .65, 1.8, concrete, -7.3 + i * 1.7, .4, 6.3);
      box(this.hq, .76, .12, 1.81, ochre, -7.3 + i * 1.7, .7, 6.3);
    }
    const mast = new THREE.Group(); mast.position.set(-7, 0, -7); this.hq.add(mast);
    for (const x of [-.45, .45]) line(mast, V(x, 0, 0), V(0, 7, 0), .05, steel);
    for (let y = 1; y < 7; y++) line(mast, V(-.45 + y * .06, y, 0), V(.4 - y * .05, y + .7, 0), .035, steel);
    this.dish = new THREE.Group(); mast.add(this.dish); this.dish.position.set(0, 6.1, 0);
    const dish = mesh(this.dish, new THREE.SphereGeometry(1.05, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), material('dish', 0xd4d4c7, .5, .5)); dish.rotation.x = 1.1;
    line(this.dish, V(0, 0, 0), V(0, .4, 1.15), .035, steel);
    if (level > 1) for (let i = 0; i < 4; i++) {
      const solar = box(this.hq, 2.4, .08, 1.5, glass, -5.8 + i * 2.1, 4.65, -5.3); solar.rotation.x = .3;
    }
    if (level > 2) {
      const tower = new THREE.Group(); tower.position.set(-3.7, 4.5, -3.4); this.hq.add(tower);
      this.building(tower, 0, 0, 4.5, 2.5, 2, 'BEACON', concrete);
      for (const x of [-1.8, 1.8]) cylinder(tower, .04, .05, 2.2, steel, x, 3.2, -.6, 8);
      cylinder(tower, .14, .2, .24, lamp, 1.8, 4.35, -.6, 12);
      box(this.hq, 4.8, .16, 3.4, steel, 5, 4, -5);
      for (const x of [3, 7]) cylinder(this.hq, .08, .08, 1.5, steel, x, 3.25, -5, 8);
      label(this.hq, '03', 5, 3.5, -3.22, 1.3);
    }
  }
  building(g: any, x: number, z: number, w: number, d: number, h: number, name: string, mat: any) {
    const building = new THREE.Group(); building.position.set(x, 0, z); g.add(building);
    box(building, w + .4, .28, d + .4, concrete, 0, .2, 0);
    box(building, w, h, d, mat, 0, h / 2 + .3, 0);
    box(building, w + .3, .18, d + .3, steel, 0, h + .4, 0);
    for (let i = 0; i < Math.floor(w); i++) {
      box(building, .63, .67, .06, glass, -w / 2 + .65 + i, h * .68, d / 2 + .035);
      box(building, .66, .03, .09, steel, -w / 2 + .65 + i, h * .68 - .34, d / 2 + .06);
    }
    box(building, 1.2, 1.75, .07, dark, w * .27, 1.17, d / 2 + .06);
    for (let i = 0; i < 12; i++) box(building, .015, h - .2, .035, edge, -w / 2 + i * w / 12, h / 2 + .3, d / 2 + .08);
    label(building, name, -w * .12, h - .04, d / 2 + .12, Math.min(w - .7, 3.8));
    box(building, 1.2, .5, 1.15, concrete, -w / 3, h + .73, -.6);
  }
  crate(g: any, x: number, z: number, mat = edge) {
    box(g, 1, .8, .85, mat, x, .54, z);
    for (const dx of [-.32, .32]) box(g, .06, .87, .9, steel, x + dx, .54, z);
    box(g, .3, .12, .03, ochre, x, .57, z + .44);
  }
  lightPole(g: any, x: number, z: number) {
    cylinder(g, .055, .09, 4.3, steel, x, 2.15, z, 8);
    line(g, V(x, 4.1, z), V(x + .65, 4.1, z), .045, steel); box(g, .4, .1, .25, lamp, x + .65, 4.06, z);
  }
  createHarbour() {
    const g = new THREE.Group(); g.position.copy(LOCATIONS.harbour); this.group.add(g);
    box(g, 21, .22, 18, concrete, 0, .02, -2);
    this.building(g, 3, -5.5, 7, 4, 2.7, 'SUPPLY HARBOUR', blue);
    for (let i = 0; i < 8; i++) this.crate(g, -6 + i % 4 * 1.3, -4 - Math.floor(i / 4) * 1.4, i % 2 ? blue : edge);
    const crane = new THREE.Group(); crane.position.set(-5, 0, 1); g.add(crane);
    for (const x of [-1.4, 1.4]) {
      line(crane, V(x, 0, -1), V(x, 6, 0), .13, ochre); line(crane, V(x, 0, 1), V(x, 6, 0), .13, ochre);
    }
    line(crane, V(-2, 6, 0), V(5, 6, 0), .18, ochre);
    line(crane, V(3, 6, 0), V(3, 2, 0), .025, dark);
    const cargo = new THREE.Group(); cargo.position.set(3, .9, 0); crane.add(cargo); this.crate(cargo, 0, 0, blue);
    this.water = mesh(g, new THREE.PlaneGeometry(16, 32), new THREE.MeshStandardMaterial({ color: 0x597f85, metalness: .5, roughness: .24 }), -16, -.12, -2);
    this.water.rotation.x = -Math.PI / 2; this.water.castShadow = false;
    for (let i = 0; i < 3; i++) { box(g, 4, .15, 2, edge, -10, .1, -10 + i * 7); this.lightPole(g, -8.5, -9 + i * 7); }
    const nodes = REGION_NODES.harbour.map(n => n.position.clone().sub(LOCATIONS.harbour));
    const entry = V(2.4, 0, 4.5);
    nodes.forEach((node, i) => { track(g, entry, node, 1.45); this.fieldNode(g, node.x, node.z, i + 1, ochre); });
    this.building(g, 5.6, 4.2, 4.5, 3.2, 2.1, 'WORKSHOP', edge);
    for (let i = 0; i < 5; i++) { const container = box(g, 3.1, 1.25, 1.25, i % 2 ? blue : edge, -1.8 + (i % 2) * 3.4, .75 + Math.floor(i / 4) * 1.25, -8 + Math.floor(i / 2) * 1.45); container.rotation.y = i % 2 ? .04 : -.03; }
    for (let i = 0; i < 7; i++) cylinder(g, .08, .12, 1.3, steel, 8.7, .72, -8 + i * 2.35, 8);
    line(g, V(8.7, 1.35, -8), V(8.7, 1.35, 6.1), .028, steel);
    this.rig = cargo;
  }
  createScienceBase() {
    const g = new THREE.Group(); g.position.copy(LOCATIONS.grove); this.group.add(g);
    box(g, 18, .2, 16, concrete, 0, 0, -2);
    this.building(g, -3, -4.5, 7, 5, 3.1, 'FIELD RESEARCH', material('lab', 0xb7bcb0, .24, .74));
    const domeMat = new THREE.MeshStandardMaterial({ color: 0x728d8d, metalness: .32, roughness: .46, transparent: true, opacity: .92 });
    const dome = mesh(g, new THREE.SphereGeometry(2.25, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), domeMat, 5, .3, -4); dome.scale.y = .68;
    const domeRing = mesh(g, new THREE.TorusGeometry(2.1, .045, 8, 40), steel, 5, .38, -4); domeRing.rotation.x = Math.PI / 2;
    for (const x of [-1.6, 1.6]) {
      cylinder(g, .85, .85, 2.7, steel, x + 4, 1.6, 1.6, 24);
      cylinder(g, .87, .87, .09, blue, x + 4, .5, 1.6, 24);
      cylinder(g, .87, .87, .09, blue, x + 4, 2.65, 1.6, 24);
    }
    line(g, V(2.4, 2.2, 1.6), V(5.6, 2.2, 1.6), .1, steel);
    for (let i = 0; i < 3; i++) {
      box(g, 1.5, .1, .8, concrete, -5 + i * 1.9, 1.15, 2);
      for (const dx of [-.6, .6]) cylinder(g, .035, .035, 1.1, steel, -5 + i * 1.9 + dx, .6, 2);
      cylinder(g, .12, .12, .35, [paint, blue, ochre][i], -5 + i * 1.9, 1.38, 2);
    }
    const nodes = REGION_NODES.grove.map(n => n.position.clone().sub(LOCATIONS.grove));
    const entry = V(2.4, 0, 4.5);
    nodes.forEach((node, i) => { track(g, entry, node, 1.35); this.fieldNode(g, node.x, node.z, i + 1, blue); });
    this.building(g, 5.7, 4.1, 4.2, 3.1, 2.1, 'OUTPOST', blue);
    for (let i = 0; i < 4; i++) {
      const panel = box(g, 1.7, .08, 1.05, glass, -7 + (i % 2) * 2, 1.2, -6.2 + Math.floor(i / 2) * 1.5); panel.rotation.x = .38;
      cylinder(g, .05, .07, 1.1, steel, panel.position.x, .62, panel.position.z, 8);
    }
    for (const [x, z, s] of [[8, -7, .65], [8.5, 1, .7], [-8, -1, .6], [-7, 6, .7]] as any[]) this.tree(LOCATIONS.grove.x + x, LOCATIONS.grove.z + z, s);
    this.lightPole(g, 7, 4); this.tree(34, -24, 1.2); this.tree(29, -31, 1.4);
  }
  stationNode(region: string, index: number) { return REGION_NODES[region]?.[index] || null; }
  clearRoute() { while (this.routeLayer.children.length) this.routeLayer.remove(this.routeLayer.children[0]); }
  stationRoute(region: string, end: any) {
    const start = this.tank.position.clone(); const hub = (LOCATIONS[region] || LOCATIONS.hq).clone().add(V(2.4, .02, 4.5)); const points = [start];
    if (start.distanceTo(hub) > 1.2 && end.distanceTo(hub) > 1.2) points.push(hub); points.push(end.clone()); return points;
  }
  showRoutePath(points: any[]) {
    this.clearRoute();
    for (let segment = 0; segment < points.length - 1; segment++) {
      const start = points[segment], end = points[segment + 1], distance = start.distanceTo(end); const count = Math.max(4, Math.floor(distance / 1.05));
      for (let i = segment ? 0 : 1; i < count; i++) {
        if (i % 2 === 0) continue;
        const p = start.clone().lerp(end, i / count); const marker = cylinder(this.routeLayer, .15, .2, .07, routeMat, p.x, .24, p.z, 10); marker.castShadow = false;
      }
    }
  }
  selectStation(region: string, index: number | null) {
    const key = index === null ? '' : `${region}:${index}`;
    if (key === this.selectedNodeKey) return;
    this.selectedNodeKey = key;
    if (index === null) { this.waypoint.visible = false; this.clearRoute(); return; }
    const node = this.stationNode(region, index); if (!node) return;
    this.waypoint.position.copy(node.position); this.waypoint.visible = true; this.showRoutePath(this.stationRoute(region, node.position));
  }
  setView(view: string, region = 'hq') {
    this.view = view; this.destination = region;
    if (view === 'travel') return;
    const key = `${view}:${region}`; const changed = key !== this.framingKey; this.framingKey = key;
    if (view === 'map') {
      this.target.set(0, 0, -11); this.radius = 60; this.elevation = 52;
      if (changed) this.yaw = .1;
      return;
    }
    const loc = LOCATIONS[region] || LOCATIONS.hq;
    if (!this.travel && this.currentArea !== region) {
      this.tank.position.copy(loc).add(V(2.4, .02, 4.5)); this.tank.rotation.y = .3; this.currentArea = region;
    }
    const selected = this.selectedNodeKey.startsWith(`${region}:`) ? this.stationNode(region, Number(this.selectedNodeKey.split(':')[1]))?.position : null;
    this.target.copy(view === 'station' && selected ? selected : loc).add(V(0, 1, 0));
    if (view === 'region') { this.radius = 29; this.elevation = 24; }
    else if (view === 'station') { this.radius = 23; this.elevation = 17; }
    else { this.radius = 18; this.elevation = 11; }
    if (changed) this.yaw = view === 'region' || view === 'station' ? .28 : .73;
  }
  drive(region: string, callback: () => void) {
    const end = (LOCATIONS[region] || LOCATIONS.hq).clone().add(V(2.4, .02, 4.5));
    this.beginTravel([this.tank.position.clone(), end], callback, { kind: 'region', region, label: region === 'hq' ? 'Headquarters' : region === 'harbour' ? 'Supply Harbour' : 'Discovery Grove' });
  }
  driveToStation(region: string, index: number, callback: () => void) {
    const node = this.stationNode(region, index); if (!node) return;
    this.selectStation(region, index); this.beginTravel(this.stationRoute(region, node.position.clone().add(V(0, .02, 0))), callback, { kind: 'station', region, index, label: node.label });
  }
  beginTravel(path: any[], callback: () => void, meta: any) {
    const lengths = path.slice(1).map((point, i) => path[i].distanceTo(point)); const totalLength = lengths.reduce((sum, length) => sum + length, 0); const end = path.at(-1);
    this.showRoutePath(path);
    this.travel = { ...meta, path, lengths, totalLength, start: path[0], end, elapsed: 0, duration: this.reduced ? 1 : meta.kind === 'station' ? 5.2 : 6.5 };
    this.onTravelEnd = callback; this.view = 'travel'; this.destination = meta.region;
  }
  zoom(delta: number) { this.radius = clamp(this.radius + delta, this.view === 'map' ? 34 : 12, this.view === 'map' ? 68 : 36); }
  resize() {
    const rect = this.canvas.parentElement!.getBoundingClientRect(); this.width = rect.width; this.height = rect.height;
    this.camera.aspect = rect.width / rect.height; this.camera.updateProjectionMatrix(); this.renderer.setSize(rect.width, rect.height, false);
  }
  animate = (time: number) => {
    if (!this.running) return;
    requestAnimationFrame(this.animate); const dt = Math.min((time - this.last) / 1000 || 0, .05); this.last = time;
    if (!this.paused && !document.hidden) {
      this.clock += dt; this.frame++;
      if (this.dish && !this.reduced) this.dish.rotation.y = Math.sin(this.clock * .18) * .7;
      if (this.rig && !this.reduced) this.rig.position.y = 1 + Math.sin(this.clock * .45) * .06;
      if (this.travel) {
        const tr = this.travel; tr.elapsed += dt; const t = clamp(tr.elapsed / tr.duration, 0, 1); const eased = t * t * (3 - 2 * t);
        let remaining = eased * tr.totalLength, segment = 0;
        while (segment < tr.lengths.length - 1 && remaining > tr.lengths[segment]) { remaining -= tr.lengths[segment]; segment++; }
        const a = tr.path[segment], b = tr.path[segment + 1] || tr.end; const segmentT = tr.lengths[segment] ? clamp(remaining / tr.lengths[segment], 0, 1) : 1;
        this.tank.position.lerpVectors(a, b, segmentT); this.tank.rotation.y = Math.atan2(b.x - a.x, b.z - a.z);
        this.tank.position.y = .02 + (this.reduced ? 0 : Math.sin(this.clock * 22) * .013);
        this.updateTracks(this.clock * 2.7); this.target.copy(this.tank.position).lerp(tr.end, .16).add(V(0, 1, 0)); this.radius = 24; this.elevation = 19; this.yaw = .34;
        const direction = b.clone().sub(a).normalize();
        this.dustPuffs.forEach((puff, i) => {
          const phase = (this.clock * .72 + i / this.dustPuffs.length) % 1; const side = i % 2 ? 1 : -1;
          puff.visible = !this.reduced; puff.position.copy(this.tank.position).addScaledVector(direction, -1.7 - phase * 4.3).add(V(direction.z * side * (.3 + phase), .18 + phase * .8, -direction.x * side * (.3 + phase)));
          puff.scale.setScalar(.35 + phase * 1.25); puff.material.opacity = (1 - phase) * .24;
        });
        if (t >= 1) {
          this.currentArea = tr.region; this.travel = null; this.clearRoute(); this.dustPuffs.forEach(p => { p.visible = false; p.material.opacity = 0; });
          const done = this.onTravelEnd; this.onTravelEnd = null; done?.();
        }
      }
    }
    if (this.waypoint.visible && !this.reduced) {
      const pulse = 1 + Math.sin(this.clock * 3.8) * .12; this.waypointRing.scale.setScalar(pulse); this.waypoint.rotation.y = this.clock * .18;
    }
    if (this.water && !this.reduced) this.water.position.y = -.12 + Math.sin(this.clock * .55) * .035;
    const mobile = this.width < 650; const factor = mobile ? (this.view === 'map' ? 3 : 1.32) : 1;
    this.scene.fog.density = this.view === 'map' ? .0015 : .009;
    this.cameraGoal.copy(this.target).add(V(Math.sin(this.yaw) * this.radius * factor, this.elevation * factor, Math.cos(this.yaw) * this.radius * factor));
    this.lookGoal.copy(this.target);
    if (this.view !== 'map' && this.view !== 'travel') {
      if (mobile) this.lookGoal.y -= 7;
      else this.lookGoal.add(V(3.4, 0, -2.8));
    }
    if (this.view === 'map') this.lookGoal.add(mobile ? V(0, -56, 0) : V(8, 0, 0));
    this.camera.position.lerp(this.cameraGoal, this.reduced ? 1 : 1 - Math.exp(-dt * 4));
    this.camera.lookAt(this.lookGoal); this.renderer.render(this.scene, this.camera);
    if (this.onFrame) {
      const source = this.view === 'region' || this.view === 'station'
        ? (REGION_NODES[this.destination] || []).map((node: any) => [node.id, node.position])
        : Object.entries(LOCATIONS);
      this.onFrame(source.map(([id, loc]: any) => {
        const p = loc.clone().add(V(0, 3.5, -1)).project(this.camera);
        return { id, x: (p.x + 1) / 2 * this.width, y: (-p.y + 1) / 2 * this.height, visible: p.z > -1 && p.z < 1 && p.x > -1.12 && p.x < 1.12 && p.y > -1.12 && p.y < 1.12 };
      }));
    }
  };
}
