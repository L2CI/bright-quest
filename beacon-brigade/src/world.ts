import * as THREE from '../../cave-river-quest/vendor/three.module.js';

const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
const LOCATIONS: Record<string, any> = {
  hq: V(0, 0, 5), harbour: V(-31, 0, -7), english: V(-19, 0, -30),
  physics: V(4, 0, -38), chemistry: V(30, 0, -25), grove: V(33, 0, 3)
};
const nodesAround = (location: any, labels: string[]) => [
  V(-7.7, 0, -4.5), V(7.4, 0, -4), V(-9.9, 0, 6.9), V(9.3, 0, 7.5), V(0, 0, 12.3)
].map((offset, index) => ({ id: `station-${index}`, label: labels[index], position: location.clone().add(offset) }));
const REGION_NODES: Record<string, any[]> = {
  harbour: nodesAround(LOCATIONS.harbour, ['Multiplication Depot', 'Addition Dispatch', 'Division Workshop', 'Subtraction Yard', 'Place Value Tower']),
  english: nodesAround(LOCATIONS.english, ['Word Archive', 'Sentence Studio', 'Spelling Signal', 'Reading Room', 'Story Press']),
  physics: nodesAround(LOCATIONS.physics, ['Force Track', 'Light Observatory', 'Sound Lab', 'Circuit Station', 'Energy Workshop']),
  chemistry: nodesAround(LOCATIONS.chemistry, ['Matter Hall', 'Mixture Lab', 'Changes Chamber', 'Properties Bay', 'Particle Observatory']),
  grove: nodesAround(LOCATIONS.grove, ['Seed Lab', 'Habitat Dome', 'Life-Cycle Nursery', 'Food-Web Field', 'Adaptation Clinic'])
};
const REGION_LABELS: Record<string, string> = { hq: 'Headquarters', harbour: 'Maths Operations', english: 'English Communications', physics: 'Physics Research', chemistry: 'Chemistry Laboratory', grove: 'Life Sciences BioDome' };
const SUBJECT_STYLE: Record<string, { colour: number; symbol: string }> = {
  hq: { colour: 0x37a88a, symbol: 'HQ' },
  harbour: { colour: 0x13b7b1, symbol: 'x' },
  english: { colour: 0xf06f73, symbol: 'Aa' },
  physics: { colour: 0x7868e8, symbol: 'atom' },
  chemistry: { colour: 0x24c4a5, symbol: 'flask' },
  grove: { colour: 0xa8cf43, symbol: 'leaf' }
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

function markerTexture(symbol: string, colour: number, completed = false) {
  const canvas = document.createElement('canvas'); canvas.width = canvas.height = 256;
  const ctx = canvas.getContext('2d')!; const hex = `#${colour.toString(16).padStart(6, '0')}`;
  const glow = ctx.createRadialGradient(128, 128, 12, 128, 128, 116);
  glow.addColorStop(0, completed ? '#d9ff8d' : '#ffffff'); glow.addColorStop(.38, completed ? '#54ef9b' : hex);
  glow.addColorStop(.7, `${completed ? '#2fe48d' : hex}a8`); glow.addColorStop(1, `${completed ? '#2fe48d' : hex}00`);
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(128, 128, 116, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = completed ? '#176844' : '#fff'; ctx.strokeStyle = completed ? '#edffd8' : '#ffffff';
  ctx.lineWidth = 11; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (completed) {
    ctx.beginPath(); ctx.moveTo(78, 129); ctx.lineTo(112, 161); ctx.lineTo(181, 88); ctx.stroke();
  } else if (symbol === 'atom') {
    ctx.lineWidth = 7;
    for (const angle of [0, Math.PI / 3, -Math.PI / 3]) { ctx.save(); ctx.translate(128, 128); ctx.rotate(angle); ctx.beginPath(); ctx.ellipse(0, 0, 63, 25, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
    ctx.beginPath(); ctx.arc(128, 128, 10, 0, Math.PI * 2); ctx.fill();
  } else if (symbol === 'flask') {
    ctx.beginPath(); ctx.moveTo(108, 70); ctx.lineTo(148, 70); ctx.moveTo(117, 70); ctx.lineTo(117, 111); ctx.lineTo(82, 169); ctx.quadraticCurveTo(78, 185, 98, 187); ctx.lineTo(158, 187); ctx.quadraticCurveTo(178, 185, 174, 169); ctx.lineTo(139, 111); ctx.lineTo(139, 70); ctx.stroke();
    ctx.fillStyle = '#fff9'; ctx.beginPath(); ctx.moveTo(99, 159); ctx.lineTo(157, 159); ctx.lineTo(170, 181); ctx.lineTo(86, 181); ctx.closePath(); ctx.fill();
  } else if (symbol === 'leaf') {
    ctx.beginPath(); ctx.moveTo(83, 165); ctx.bezierCurveTo(72, 97, 118, 63, 181, 73); ctx.bezierCurveTo(185, 137, 146, 177, 83, 165); ctx.fill();
    ctx.strokeStyle = hex; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(91, 158); ctx.lineTo(166, 89); ctx.stroke();
  } else {
    ctx.font = symbol === 'Aa' ? '800 74px Arial' : '900 96px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(symbol, 128, 130);
  }
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; texture.needsUpdate = true;
  return texture;
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
  markerLayer = new THREE.Group(); mapMarkers = new Map<string, any>(); stationMarkers = new Map<string, any>();
  animatedProps: any[] = []; completedMarkerTexture = markerTexture('check', 0x54ef9b, true);
  resizeObserver: ResizeObserver;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6)); this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping; this.renderer.toneMappingExposure = .96;
    this.scene = new THREE.Scene(); this.scene.background = new THREE.Color(0xccecf1);
    paint.map = surfaceTexture(); edge.map = paint.map; blue.map = paint.map;
    this.scene.fog = new THREE.FogExp2(0xccecf1, .007);
    this.camera = new THREE.PerspectiveCamera(42, 1, .1, 300); this.camera.position.set(15, 10, 18);
    this.scene.add(new THREE.HemisphereLight(0xf2fbff, 0x547b59, 1.75));
    const sun = new THREE.DirectionalLight(0xffedc3, 2.75); sun.position.set(-20, 35, 15); sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -50, right: 50, top: 50, bottom: -50, near: .5, far: 110 });
    sun.shadow.normalBias = .045; this.scene.add(sun);
    this.group = new THREE.Group(); this.scene.add(this.group);
    this.group.add(this.routeLayer, this.waypoint, this.markerLayer); this.waypoint.visible = false;
    this.waypointRing = mesh(this.waypoint, new THREE.TorusGeometry(1.05, .11, 12, 40), waypointMat, 0, .18, 0); this.waypointRing.rotation.x = Math.PI / 2;
    const beam = cylinder(this.waypoint, .045, .11, 3.7, waypointMat, 0, 1.95, 0, 14); beam.castShadow = false;
    this.ready = this.createLandscape();
    this.hq = new THREE.Group(); this.group.add(this.hq); this.createBase(1);
    this.createHarbour(); this.createEnglishDistrict(); this.createPhysicsDistrict(); this.createChemistryDistrict(); this.createScienceBase(); this.tank = this.createTank();
    this.createWorldMarkers();
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
  createBeacon(id: string, position: any, station = false, region = id) {
    const style = SUBJECT_STYLE[region] || SUBJECT_STYLE.hq;
    const root = new THREE.Group(); root.position.copy(position); root.position.y = station ? 3.25 : 5.5; root.visible = false;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: markerTexture(station ? '' : style.symbol, style.colour), transparent: true, depthTest: false, depthWrite: false }));
    sprite.scale.setScalar(station ? 2.8 : 4.35); sprite.renderOrder = 20; root.add(sprite);
    const ringMat = new THREE.MeshBasicMaterial({ color: style.colour, transparent: true, opacity: .48, blending: THREE.AdditiveBlending, depthWrite: false });
    const halo = mesh(root, new THREE.RingGeometry(station ? .58 : .9, station ? .76 : 1.18, 40), ringMat, 0, -root.position.y + .19, 0);
    halo.rotation.x = -Math.PI / 2; halo.castShadow = false; halo.renderOrder = 3;
    const beamMat = new THREE.MeshBasicMaterial({ color: style.colour, transparent: true, opacity: .16, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
    const beam = cylinder(root, station ? .18 : .3, station ? .48 : .72, station ? 2.5 : 4.4, beamMat, 0, -root.position.y / 2 + .28, 0, 32);
    beam.castShadow = false; beam.renderOrder = 2;
    const marker = { id, root, sprite, halo, beam, style, station, selected: false, completed: false, baseY: root.position.y };
    this.markerLayer.add(root); return marker;
  }
  createWorldMarkers() {
    for (const [id, position] of Object.entries(LOCATIONS)) this.mapMarkers.set(id, this.createBeacon(id, position));
    for (const [region, nodes] of Object.entries(REGION_NODES)) for (const node of nodes) {
      const marker = this.createBeacon(node.id, node.position, true, region); marker.region = region; marker.index = Number(node.id.split('-')[1]);
      marker.sprite.material.map = markerTexture(String(marker.index + 1), SUBJECT_STYLE[region].colour); marker.sprite.material.needsUpdate = true;
      this.stationMarkers.set(`${region}:${node.id}`, marker);
    }
  }
  syncMarkers(options: any) {
    const mapVisible = options.view === 'map' || options.view === 'region-info';
    for (const [id, marker] of this.mapMarkers) {
      marker.root.visible = mapVisible || (options.view === 'region' && id === 'hq');
      const completed = options.completedRegions?.includes(id) || false; const selected = options.selectedRegion === id;
      if (marker.completed !== completed) {
        marker.completed = completed;
        marker.sprite.material.map = completed ? this.completedMarkerTexture : markerTexture(marker.style.symbol, marker.style.colour);
        marker.sprite.material.needsUpdate = true;
      }
      marker.selected = selected; marker.halo.material.opacity = selected ? .64 : completed ? .5 : .18;
      marker.beam.material.opacity = selected ? .19 : completed ? .13 : .04;
      marker.halo.userData.baseOpacity = marker.halo.material.opacity; marker.beam.userData.baseOpacity = marker.beam.material.opacity;
    }
    for (const marker of this.stationMarkers.values()) {
      const visible = options.view === 'region' && marker.region === options.region; marker.root.visible = visible;
      if (!visible) continue;
      const station = options.stations?.[marker.index]; const completed = !!station?.resolved; const selected = options.selectedStation === station?.id;
      if (marker.completed !== completed) {
        marker.completed = completed;
        marker.sprite.material.map = completed ? this.completedMarkerTexture : markerTexture(String(marker.index + 1), SUBJECT_STYLE[marker.region].colour);
        marker.sprite.material.needsUpdate = true;
      }
      marker.selected = selected; marker.halo.material.opacity = selected ? .66 : completed ? .48 : .18;
      marker.beam.material.opacity = selected ? .18 : .04;
      marker.halo.userData.baseOpacity = marker.halo.material.opacity; marker.beam.userData.baseOpacity = marker.beam.material.opacity;
    }
  }
  async createLandscape() {
    const loader = new THREE.TextureLoader();
    const load = async (path: string) => {
      try { return await loader.loadAsync(new URL(`./assets/${path}`, document.baseURI).href); }
      catch { this.textureErrors.push(path); return null; }
    };
    // Geometry remains available while textures stream in; no blank loading scene.
    const underlayGeo = new THREE.PlaneGeometry(360, 360); underlayGeo.rotateX(-Math.PI / 2);
    const underlay = mesh(this.group, underlayGeo, new THREE.MeshStandardMaterial({ color: 0x72b96f, roughness: 1 }), 0, -.42, 0);
    underlay.castShadow = false; underlay.receiveShadow = true;
    const geo = new THREE.PlaneGeometry(180, 180, 120, 120); geo.rotateX(-Math.PI / 2);
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), z = p.getZ(i), distance = Math.max(Math.abs(x) - 39, Math.abs(z) - 38, 0);
      p.setY(i, distance * .17 * (1.1 + Math.sin(x * .13) * Math.cos(z * .1)) - .08);
    }
    geo.computeVertexNormals();
    const ground = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .92 });
    mesh(this.group, geo, ground).castShadow = false;
    const road = material('road', 0xe3d5ad, .03, .94);
    for (const endpoint of Object.entries(LOCATIONS).filter(([id]) => id !== 'hq').map(([, point]) => point)) {
      const mid = endpoint.clone().multiplyScalar(.5); const length = endpoint.length();
        const obj = box(this.group, 4.3, .07, length + 8, road, mid.x, .02, mid.z);
      obj.rotation.y = Math.atan2(endpoint.x, endpoint.z);
      for (let i = 1; i < 14; i++) {
        const t = i / 14; const marking = box(this.group, .09, .01, .68, material('line', 0xfff6d7), endpoint.x * t, .067, endpoint.z * t);
        marking.rotation.y = obj.rotation.y;
      }
    }
    const rockMat = material('rock', 0x7d8d7a, 0, .97);
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
    const colour = await load('world-biomes.jpg'); const normal = await load('ground-normal.jpg');
    if (colour) { colour.colorSpace = THREE.SRGBColorSpace; colour.anisotropy = 8; ground.map = colour; ground.color.set(0xffffff); }
    if (normal) { normal.wrapS = normal.wrapT = THREE.RepeatWrapping; normal.repeat.set(24, 24); normal.anisotropy = 8; }
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
    cylinder(g, .58, .66, .08, material('node-pad', 0x555b55, .08, .94), x, .1, z, 20);
    const ring = mesh(g, new THREE.TorusGeometry(.48, .045, 8, 24), accent, x, .17, z); ring.rotation.x = Math.PI / 2;
    const light = cylinder(g, .09, .09, .09, lamp, x, .25, z, 12); light.castShadow = false;
  }

  sitePad(g: any, node: any, w = 7.2, d = 5.6, accent: any = null) {
    const site = new THREE.Group(); site.position.set(node.x, 0, node.z); site.scale.setScalar(.54); g.add(site);
    const patch = new THREE.Shape();
    for (let i = 0; i < 18; i++) {
      const a = i / 18 * Math.PI * 2; const wobble = 1 + Math.sin(i * 2.7) * .07 + Math.cos(i * 1.9) * .04;
      const x = Math.cos(a) * w * .5 * wobble, z = Math.sin(a) * d * .5 * wobble;
      if (!i) patch.moveTo(x, z); else patch.lineTo(x, z);
    }
    patch.closePath(); const patchColour = accent?.color?.clone?.().lerp(new THREE.Color(0xcce6ac), .64) || new THREE.Color(0x91b377);
    const groundMat = new THREE.MeshStandardMaterial({ color: patchColour, roughness: .92 });
    const ground = mesh(site, new THREE.ShapeGeometry(patch), groundMat, 0, .045, 0);
    ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; ground.castShadow = false;
    return site;
  }

  missionOutpost(g: any, node: any, index: number, accent: any, tag: string) {
    const site = this.sitePad(g, node, 6.8, 5.2, accent);
    const cream = material(`mission-cream-${tag}`, 0xffefd1, .03, .82);
    const windowMat = material(`mission-window-${tag}`, 0x5fb6c2, .22, .3);
    if (tag === 'M') {
      const body = cylinder(site, 1.75, 2.05, 1.35, cream, 0, .78, 0, 24);
      for (let i = 0; i <= index + 2; i++) box(site, .58, .42, .58, i % 2 ? accent : windowMat, -1.35 + i * .62, 1.65 + (i % 2) * .24, 0);
      const arc = mesh(site, new THREE.TorusGeometry(1.35, .11, 10, 32, Math.PI), accent, 0, 2.15, 0); arc.rotation.z = Math.PI; arc.rotation.y = Math.PI / 2;
    } else if (tag === 'E') {
      cylinder(site, 1.85, 2.1, 1.2, cream, 0, .7, 0, 24);
      for (const side of [-1, 1]) { const page = box(site, 2.25, .12, 2.4, cream, side * 1.02, 1.55, 0); page.rotation.z = side * -.26; }
      const pencil = cylinder(site, .18, .18, 3.1, accent, 2.2, 1.55, .4, 12); const tip = mesh(site, new THREE.ConeGeometry(.18, .5, 12), dark, 2.2, 3.35, .4); pencil.rotation.z = tip.rotation.z = -.08;
    } else if (tag === 'P') {
      cylinder(site, 1.8, 2.05, 1.15, cream, 0, .66, 0, 24);
      const orb = mesh(site, new THREE.SphereGeometry(.72, 20, 12), windowMat, 0, 2.15, 0);
      const orbit = new THREE.Group(); orbit.position.set(0, 2.15, 0); site.add(orbit);
      for (const angle of [0, Math.PI / 3]) { const ring = mesh(orbit, new THREE.TorusGeometry(1.2, .06, 8, 36), accent); ring.rotation.set(Math.PI / 2, angle, angle); }
      this.animatedProps.push({ kind: 'spin', object: orbit, speed: .25 + index * .03, phase: index });
    } else if (tag === 'C') {
      cylinder(site, 1.75, 2.1, 1.2, cream, 0, .7, 0, 24);
      const vessel = new THREE.Group(); vessel.position.set(0, 1.4, 0); site.add(vessel);
      mesh(vessel, new THREE.SphereGeometry(.9, 20, 13), windowMat, 0, .65, 0); cylinder(vessel, .34, .42, 1.35, cream, 0, 1.65, 0, 18);
      for (let i = 0; i < 4; i++) { const bubble = mesh(vessel, new THREE.SphereGeometry(.13 + i * .035, 12, 8), accent, -.35 + i * .22, 1.9 + i * .28, 0); this.animatedProps.push({ kind: 'bubble', object: bubble, baseY: bubble.position.y, range: 1.15, speed: .34 + i * .05, phase: index + i * .24 }); }
    } else {
      cylinder(site, 1.8, 2.1, 1.05, cream, 0, .62, 0, 24);
      const canopy = mesh(site, new THREE.SphereGeometry(1.7, 22, 12, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x76d6a2, transparent: true, opacity: .78, roughness: .25 }), 0, 1.35, 0);
      for (const a of [-.9, 0, .9]) { cylinder(site, .1, .18, 1.2, material('bio-stem', 0x467b52), a, 1.2, .25, 10); const leaf = mesh(site, new THREE.SphereGeometry(.38, 12, 8), accent, a + .22, 1.7, .25); leaf.scale.set(1.35, .48, .8); leaf.rotation.z = -.45; }
      canopy.castShadow = false;
    }
    const lampOrb = mesh(site, new THREE.SphereGeometry(.17, 12, 8), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: accent.color, emissiveIntensity: 1.6 }), 0, 3.45, 0);
    this.animatedProps.push({ kind: 'bob', object: lampOrb, baseY: lampOrb.position.y, speed: 1.4, phase: index * .7, amp: .12 });
  }

  gableRoof(g: any, w: number, d: number, y: number, mat: any) {
    for (const side of [-1, 1]) {
      const roof = box(g, w * .58, .16, d + .3, mat, side * w * .235, y, 0);
      roof.rotation.z = side * -.43;
    }
  }

  supplyDepot(g: any, node: any) {
    const site = this.sitePad(g, node, 8, 6);
    box(site, 5.2, 2.25, 3.5, blue, -.65, 1.24, -.35); this.gableRoof(site, 5.5, 3.7, 2.65, steel);
    for (const x of [-1.75, -.25]) box(site, 1.15, 1.35, .08, dark, x, .86, 1.43);
    for (const x of [2.1, 3.25]) this.crate(site, x, .75, x > 3 ? edge : blue);
  }

  repairWorkshop(g: any, node: any) {
    const site = this.sitePad(g, node, 8, 6);
    box(site, 5.8, 2.2, 3.7, edge, 0, 1.22, -.35); box(site, 6.1, .16, 4, steel, 0, 2.4, -.35);
    for (const x of [-1.65, 0, 1.65]) box(site, 1.35, 1.45, .08, x === 0 ? blue : dark, x, .9, 1.54);
    for (const x of [-2.5, 2.5]) { const tyre = cylinder(site, .48, .48, .28, dark, x, .36, 2, 18); tyre.rotation.z = Math.PI / 2; }
    const hoist = new THREE.Group(); hoist.position.set(0, 0, -2.1); site.add(hoist);
    for (const x of [-.8, .8]) line(hoist, V(x, 0, 0), V(x, 2.8, 0), .07, ochre); line(hoist, V(-.9, 2.8, 0), V(.9, 2.8, 0), .08, ochre);
  }

  railYard(g: any, node: any) {
    const site = this.sitePad(g, node, 9, 6.5);
    for (const x of [-1.2, 1.2]) line(site, V(x, .14, -3), V(x, .14, 3), .06, steel);
    for (let z = -2.8; z <= 2.8; z += .65) box(site, 3.2, .09, .13, dark, 0, .09, z);
    const wagon = new THREE.Group(); wagon.position.set(0, .28, -.5); site.add(wagon);
    box(wagon, 3.2, .75, 1.55, blue, 0, .58, 0); box(wagon, 3.45, .12, 1.75, steel, 0, .14, 0);
    for (const x of [-1.15, 1.15]) for (const z of [-.68, .68]) { const wheel = cylinder(wagon, .28, .28, .16, dark, x, .08, z, 14); wheel.rotation.x = Math.PI / 2; }
    const gantry = new THREE.Group(); gantry.position.set(0, 0, 1.7); site.add(gantry);
    for (const x of [-2.4, 2.4]) line(gantry, V(x, 0, 0), V(x, 3.2, 0), .09, ochre); line(gantry, V(-2.6, 3.2, 0), V(2.6, 3.2, 0), .11, ochre);
  }

  powerSubstation(g: any, node: any) {
    const site = this.sitePad(g, node, 7.8, 6.2);
    for (const x of [-2, 0, 2]) {
      box(site, 1.15, 1.35, 1.45, steel, x, .8, 0);
      for (const dx of [-.35, .35]) cylinder(site, .09, .15, .7, material('insulator', 0x6f867e, .25, .5), x + dx, 1.85, 0, 12);
    }
    for (const x of [-3, 3]) { line(site, V(x, 0, -2), V(x, 3.4, -2), .08, edge); line(site, V(x, 0, 2), V(x, 3.4, 2), .08, edge); }
    line(site, V(-3, 3.4, -2), V(3, 3.4, -2), .08, edge); line(site, V(-3, 3.4, 2), V(3, 3.4, 2), .08, edge);
    for (const z of [-2, 2]) for (const x of [-2, 0, 2]) cylinder(site, .07, .12, .5, ochre, x, 3.7, z, 10);
  }

  materialsLab(g: any, node: any) {
    const site = this.sitePad(g, node, 8, 6);
    box(site, 5.5, 2.35, 3.8, material('lab', 0xb7bcb0, .24, .74), -.45, 1.28, -.2);
    box(site, 5.8, .16, 4.1, steel, -.45, 2.53, -.2);
    for (const x of [-2, -.7, .6, 1.9]) box(site, .95, .85, .07, glass, x, 1.45, 1.74);
    for (const x of [-1.6, .2, 2]) cylinder(site, .24, .33, 1.1 + (x === .2 ? .35 : 0), steel, x, 3.1, -.6, 14);
    const sample = new THREE.Group(); sample.position.set(2.8, 0, 1.75); site.add(sample);
    box(sample, 1.3, .1, .8, concrete, 0, .85, 0); for (const dx of [-.5, .5]) cylinder(sample, .04, .04, .85, edge, dx, .43, 0, 8);
  }

  fieldTestRig(g: any, node: any) {
    const site = this.sitePad(g, node, 8, 6);
    const ramp = box(site, 4.7, .16, 1.5, steel, -.6, 1.05, 0); ramp.rotation.z = -.25;
    box(site, 1.2, .65, 1.25, blue, -2.45, .46, 0);
    const frame = new THREE.Group(); frame.position.set(2.1, 0, 0); site.add(frame);
    line(frame, V(-1.1, 0, 0), V(0, 3.6, 0), .09, ochre); line(frame, V(1.1, 0, 0), V(0, 3.6, 0), .09, ochre);
    line(frame, V(-1.2, 2.4, 0), V(1.2, 2.4, 0), .08, ochre); line(frame, V(0, 3.55, 0), V(0, 1.25, 0), .035, dark);
    box(frame, .65, .65, .65, paint, 0, .95, 0);
  }

  researchOutpost(g: any, node: any) {
    const site = this.sitePad(g, node, 7.5, 6);
    for (const x of [-2, 2]) for (const z of [-1.3, 1.3]) cylinder(site, .08, .11, 1.2, steel, x, .62, z, 8);
    box(site, 5.1, 1.85, 3.5, blue, 0, 2.05, 0); this.gableRoof(site, 5.3, 3.7, 3.15, steel);
    box(site, 1.2, 1.05, .08, glass, 0, 2.15, 1.78);
    const mast = cylinder(site, .07, .1, 4.4, steel, 2.8, 2.2, -.9, 10);
    const dishGroup = new THREE.Group(); dishGroup.position.set(2.8, 4.05, -.9); site.add(dishGroup);
    const dish = mesh(dishGroup, new THREE.SphereGeometry(.72, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), concrete); dish.rotation.x = 1.05;
  }

  weatherStation(g: any, node: any) {
    const site = this.sitePad(g, node, 7.2, 6);
    const hut = box(site, 2.8, 1.65, 2.45, concrete, -1.45, .95, .5); this.gableRoof(site, 3, 2.65, 1.9, steel);
    const mast = cylinder(site, .06, .1, 4.7, steel, 1.45, 2.35, 0, 10);
    line(site, V(.6, 3.4, 0), V(2.3, 3.4, 0), .04, steel);
    for (const [x, z] of [[.6, 0], [2.3, 0], [1.45, .85]] as any[]) { cylinder(site, .22, .22, .1, ochre, x, 3.55, z, 12); }
    const radar = mesh(site, new THREE.SphereGeometry(.72, 18, 9, 0, Math.PI * 2, 0, Math.PI / 2), material('weather-dome', 0xc7d7d2, .15, .5), 1.45, 4.85, 0); radar.scale.y = .7;
  }

  waterAnalysis(g: any, node: any) {
    const site = this.sitePad(g, node, 8, 6.3);
    for (const x of [-1.8, .2, 2.2]) {
      cylinder(site, .82, .82, 1.75, x === .2 ? blue : steel, x, .96, -.35, 22);
      cylinder(site, .84, .84, .1, concrete, x, 1.86, -.35, 22);
    }
    line(site, V(-2.6, .75, -.35), V(3, .75, -.35), .1, material('water-pipe', 0x4e858f, .35, .45));
    box(site, 4.8, .16, 1.5, steel, .2, 1.95, 1.65);
    for (const x of [-1.7, 2.1]) cylinder(site, .07, .08, 2, steel, x, 1, 1.65, 8);
    for (const x of [-1.2, .2, 1.6]) cylinder(site, .22, .15, .55, glass, x, 2.35, 1.65, 16);
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
    const command = material('hq-teal', 0x2c9f91, .08, .55), roof = material('hq-roof', 0x245f68, .12, .56), warm = material('hq-warm', 0xffc857, .06, .56), cream = material('hq-cream', 0xf6edcf, .02, .82), coral = material('hq-coral', 0xef746f, .05, .58);
    this.districtGarden(this.hq, 0x55c5a0);
    const commandHeight = level === 1 ? 1.65 : level === 2 ? 2.65 : 3.25;
    cylinder(this.hq, 3.4, 3.9, commandHeight, cream, -3.2, commandHeight / 2 + .16, -3.1, 32);
    const commandDome = mesh(this.hq, new THREE.SphereGeometry(3.5, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), command, -3.2, commandHeight + .14, -3.1); commandDome.scale.y = .48; commandDome.castShadow = true;
    for (let i = 0; i < 7; i++) {
      const a = -.9 + i * .3; const window = mesh(this.hq, new THREE.PlaneGeometry(.72, .82), glass, -3.2 + Math.sin(a) * 3.42, commandHeight * .62, -3.1 + Math.cos(a) * 3.42);
      window.rotation.y = a; window.castShadow = false;
    }
    cylinder(this.hq, 2.45, 2.8, 1.7, command, 4.4, 1.02, -3.5, 28);
    const workshopRoof = mesh(this.hq, new THREE.SphereGeometry(2.55, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), roof, 4.4, 1.86, -3.5); workshopRoof.scale.y = .38;
    const wrench = new THREE.Group(); wrench.position.set(4.4, 2.55, -3.5); this.hq.add(wrench);
    const wrenchRing = mesh(wrench, new THREE.TorusGeometry(.63, .15, 10, 24, Math.PI * 1.45), warm); wrenchRing.rotation.z = .7; line(wrench, V(-.5, -.45, 0), V(.65, .62, 0), .16, warm);
    for (let i = 0; i < 4; i++) { const crate = cylinder(this.hq, .55, .66, .58, i % 2 ? coral : warm, -6.5 + i * 1.38, .34, 3.8, 16); crate.rotation.y = i * .3; }
    for (let i = 0; i < 6; i++) {
      const lampStem = cylinder(this.hq, .055, .08, 1.2, roof, -7 + i * 2.4, .65, 6, 10);
      const orb = mesh(this.hq, new THREE.SphereGeometry(.18, 12, 8), i % 2 ? warm : coral, -7 + i * 2.4, 1.35, 6); this.animatedProps.push({ kind: 'bob', object: orb, baseY: orb.position.y, speed: 1.1, phase: i * .6, amp: .07 });
    }
    const mast = new THREE.Group(); mast.position.set(-6.4, 0, -5.5); this.hq.add(mast);
    cylinder(mast, .12, .22, 5.7, roof, 0, 2.85, 0, 12);
    this.dish = new THREE.Group(); mast.add(this.dish); this.dish.position.set(0, 5.1, 0);
    const dish = mesh(this.dish, new THREE.SphereGeometry(1.05, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), cream); dish.rotation.x = 1.1;
    line(this.dish, V(0, 0, 0), V(0, .4, 1.15), .035, roof);
    if (level > 1) for (let i = 0; i < 5; i++) {
      const a = i / 5 * Math.PI * 2; const solar = box(this.hq, 2.25, .08, 1.25, glass, Math.cos(a) * 5.5, .72, Math.sin(a) * 4.7 - 1.2); solar.rotation.x = .28; solar.rotation.y = -a;
    }
    if (level > 2) {
      const beacon = new THREE.Group(); beacon.position.set(-3.2, commandHeight + 1.2, -3.1); this.hq.add(beacon);
      cylinder(beacon, .42, .68, 2.4, warm, 0, 1.2, 0, 18); const crown = mesh(beacon, new THREE.SphereGeometry(.48, 16, 10), lamp, 0, 2.55, 0);
      const halo = mesh(beacon, new THREE.TorusGeometry(.9, .08, 10, 36), coral, 0, 2.55, 0); halo.rotation.x = Math.PI / 2; this.animatedProps.push({ kind: 'spin', object: halo, speed: .35, phase: 0 }); crown.castShadow = false;
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
  districtGarden(g: any, colour: number) {
    const shape = new THREE.Shape();
    for (let i = 0; i < 28; i++) {
      const a = i / 28 * Math.PI * 2; const r = 7.1 + Math.sin(i * 1.9) * .55 + Math.cos(i * 3.1) * .28;
      if (!i) shape.moveTo(Math.cos(a) * r, Math.sin(a) * r * .82 + 1); else shape.lineTo(Math.cos(a) * r, Math.sin(a) * r * .82 + 1);
    }
    shape.closePath(); const mat = new THREE.MeshBasicMaterial({ color: colour, transparent: true, opacity: .27, depthWrite: false });
    const garden = mesh(g, new THREE.ShapeGeometry(shape), mat, 0, .085, 0); garden.rotation.x = -Math.PI / 2; garden.castShadow = false;
    const bloom = new THREE.MeshStandardMaterial({ color: colour, emissive: colour, emissiveIntensity: .18, roughness: .7 });
    for (let i = 0; i < 22; i++) {
      const a = i / 22 * Math.PI * 2 + Math.sin(i) * .16, r = 6 + (i % 3) * .5;
      const flower = mesh(g, new THREE.SphereGeometry(.11 + (i % 2) * .04, 9, 6), bloom, Math.cos(a) * r, .19, Math.sin(a) * r * .82 + 1);
      flower.castShadow = false;
    }
  }
  createHarbour() {
    const g = new THREE.Group(); g.position.copy(LOCATIONS.harbour); this.group.add(g);
    const aqua = material('math-aqua', 0x12b8b1, .08, .55), gold = material('math-gold', 0xffc857, .08, .55), ink = material('math-ink', 0x215b6a, .12, .6);
    this.districtGarden(g, 0x33d5c8);
    cylinder(g, 3.3, 3.8, 1.3, material('math-cream', 0xfff0c6, .02, .86), 0, .72, -1.1, 32);
    for (let i = 0; i < 4; i++) cylinder(g, 2.8 - i * .45, 3.12 - i * .45, .55, i % 2 ? aqua : gold, -1.5 + i * 1.02, 1.45 + i * .53, -1.1, 24);
    const abacus = new THREE.Group(); abacus.position.set(3.9, 0, 2); g.add(abacus);
    for (const x of [-2, 2]) { const post = cylinder(abacus, .15, .2, 4, gold, x, 2, 0, 16); post.rotation.z = -.06 * x; }
    for (let y = .85; y < 3.7; y += .66) {
      line(abacus, V(-2.05, y, 0), V(2.05, y, 0), .055, ink);
      for (let i = 0; i < 5; i++) { const bead = mesh(abacus, new THREE.SphereGeometry(.24, 14, 8), i % 2 ? aqua : gold, -1.25 + i * .62, y, 0); bead.scale.x = 1.35; this.animatedProps.push({ kind: 'slide', object: bead, baseX: bead.position.x, speed: .35 + y * .05, phase: i + y }); }
    }
    const arch = mesh(g, new THREE.TorusGeometry(2.1, .18, 12, 48, Math.PI), ink, -4.2, 2.1, 2.2); arch.rotation.set(0, Math.PI / 2, Math.PI);
    for (let i = 0; i < 7; i++) cylinder(g, .14, .2, .22 + i * .08, gold, -5.8 + i * .52, .2 + i * .04, 2.2, 12);
    const nodes = REGION_NODES.harbour.map(n => n.position.clone().sub(LOCATIONS.harbour));
    nodes.forEach((node, i) => { this.fieldNode(g, node.x, node.z, i + 1, aqua); this.missionOutpost(g, node, i, aqua, 'M'); });
  }

  createEnglishDistrict() {
    const g = new THREE.Group(); g.position.copy(LOCATIONS.english); this.group.add(g);
    const paper = material('paper-stone', 0xffefcf, .02, .86), coral = material('english-coral', 0xf16f73, .05, .58), plum = material('english-plum', 0x8d4c8e, .08, .58), blueInk = material('english-ink', 0x385a7d, .08, .62), gold = material('english-gold', 0xffc857, .04, .56);
    this.districtGarden(g, 0xff8588);
    cylinder(g, 3.45, 3.9, 1.35, paper, 0, .75, -1.3, 32);
    for (const side of [-1, 1]) {
      const page = box(g, 4.35, .18, 4.4, paper, side * 1.85, 2.15, -1.3); page.rotation.z = side * -.28;
      for (let z = -2.9; z < .5; z += .55) { const rule = box(g, 2.8, .035, .05, blueInk, side * 1.8, 2.26, z); rule.rotation.z = side * -.28; }
    }
    const pencil = new THREE.Group(); pencil.position.set(4.6, 0, 2); pencil.rotation.z = -.09; g.add(pencil);
    cylinder(pencil, .38, .38, 5.2, coral, 0, 2.6, 0, 12); mesh(pencil, new THREE.ConeGeometry(.38, 1.1, 12), material('pencil-wood', 0xf0c98f), 0, 5.75, 0); cylinder(pencil, .39, .39, .5, plum, 0, .25, 0, 12);
    const quill = new THREE.Group(); quill.position.set(-4.6, 1, 2.1); quill.rotation.z = -.3; g.add(quill);
    line(quill, V(0, 0, 0), V(0, 3.9, 0), .08, gold); for (let i = 0; i < 7; i++) { const feather = mesh(quill, new THREE.SphereGeometry(.32, 12, 7), i % 2 ? coral : plum, i % 2 ? .32 : -.32, 1.2 + i * .38, 0); feather.scale.set(1.15, .38, .42); feather.rotation.z = i % 2 ? -.55 : .55; }
    const nodes = REGION_NODES.english.map(n => n.position.clone().sub(LOCATIONS.english));
    nodes.forEach((node, i) => { this.fieldNode(g, node.x, node.z, i + 1, coral); this.missionOutpost(g, node, i, coral, 'E'); });
  }

  createPhysicsDistrict() {
    const g = new THREE.Group(); g.position.copy(LOCATIONS.physics); this.group.add(g);
    const violet = material('physics-violet', 0x7565e8, .12, .48), electric = material('physics-electric', 0x36c6e8, .05, .42), copper = material('physics-copper', 0xffb34e, .2, .48), white = material('physics-white', 0xeef4ff, .02, .75);
    this.districtGarden(g, 0x8374f4);
    cylinder(g, 3.45, 4, 1.3, white, -1, .72, -1.3, 32);
    const core = mesh(g, new THREE.SphereGeometry(1.7, 28, 18), new THREE.MeshStandardMaterial({ color: 0x3b51a7, emissive: 0x25347a, emissiveIntensity: .5, roughness: .25 }), -1, 3.1, -1.3);
    const orbit = new THREE.Group(); orbit.position.copy(core.position); g.add(orbit);
    for (const angle of [0, Math.PI / 3, -Math.PI / 3]) { const ring = mesh(orbit, new THREE.TorusGeometry(2.45, .095, 10, 56), angle ? electric : copper); ring.rotation.set(Math.PI / 2, angle, angle * .7); }
    for (let i = 0; i < 3; i++) { const electron = mesh(orbit, new THREE.SphereGeometry(.22, 14, 8), i === 1 ? copper : electric, Math.cos(i * 2.1) * 2.4, Math.sin(i * 1.7) * 1.2, Math.sin(i * 2.1) * 2.4); electron.castShadow = false; }
    this.animatedProps.push({ kind: 'spin', object: orbit, speed: .28, phase: 0 });
    const pendulum = new THREE.Group(); pendulum.position.set(4.5, 0, 2.2); g.add(pendulum);
    for (const x of [-1.35, 1.35]) line(pendulum, V(x, 0, 0), V(x, 4.5, 0), .12, violet); line(pendulum, V(-1.55, 4.5, 0), V(1.55, 4.5, 0), .13, violet);
    const arm = new THREE.Group(); arm.position.set(0, 4.4, 0); pendulum.add(arm); line(arm, V(), V(0, -3.2, 0), .045, white); mesh(arm, new THREE.SphereGeometry(.52, 18, 12), copper, 0, -3.25, 0); this.animatedProps.push({ kind: 'swing', object: arm, speed: 1.15, phase: 0, amp: .45 });
    for (let i = 0; i < 5; i++) { const ray = box(g, .45, .03, 2.3, [material('rainbow-r',0xf25e62),material('rainbow-o',0xffae4b),material('rainbow-y',0xffdf63),material('rainbow-g',0x59cf8a),material('rainbow-b',0x51aee8)][i], -5 + i * .42, .18, 2.9); ray.rotation.y = -.28; }
    const nodes = REGION_NODES.physics.map(n => n.position.clone().sub(LOCATIONS.physics));
    nodes.forEach((node, i) => { this.fieldNode(g, node.x, node.z, i + 1, violet); this.missionOutpost(g, node, i, violet, 'P'); });
  }

  createChemistryDistrict() {
    const g = new THREE.Group(); g.position.copy(LOCATIONS.chemistry); this.group.add(g);
    const chem = material('chemistry-teal', 0x18bfa5, .05, .45), reaction = material('chemistry-lime', 0xbfe847, .03, .45), orange = material('chemistry-orange', 0xff8b55, .05, .5), cream = material('chemistry-cream', 0xf7f5dc, .02, .78);
    this.districtGarden(g, 0x28d8bd);
    cylinder(g, 3.5, 4, 1.3, cream, -1, .72, -1.2, 32);
    const flask = new THREE.Group(); flask.position.set(-1, 1.25, -1.2); g.add(flask);
    const flaskGlass = new THREE.MeshStandardMaterial({ color: 0x88f1e8, emissive: 0x1b8d82, emissiveIntensity: .35, transparent: true, opacity: .76, roughness: .2 });
    mesh(flask, new THREE.SphereGeometry(2.05, 28, 18), flaskGlass, 0, 1.45, 0); cylinder(flask, .65, .85, 2.55, cream, 0, 3.2, 0, 22); cylinder(flask, .82, .82, .16, orange, 0, 4.5, 0, 22);
    const liquid = mesh(flask, new THREE.SphereGeometry(1.83, 26, 14, 0, Math.PI * 2, Math.PI * .49, Math.PI * .5), reaction, 0, 1.38, 0); liquid.castShadow = false;
    for (let i = 0; i < 11; i++) { const bubble = mesh(flask, new THREE.SphereGeometry(.11 + (i % 3) * .04, 12, 8), i % 2 ? orange : reaction, -.9 + (i % 5) * .42, 1.3 + (i % 4) * .48, -.35 + (i % 3) * .32); bubble.castShadow = false; this.animatedProps.push({ kind: 'bubble', object: bubble, baseY: bubble.position.y, range: 2.1, speed: .3 + (i % 4) * .07, phase: i * .17 }); }
    for (const x of [3.3, 5]) { cylinder(g, .58, .78, 2.5 + (x - 3.3) * .45, x > 4 ? orange : chem, x, 1.35, 2.2, 22); cylinder(g, .18, .28, 1.1, cream, x, 3.1 + (x - 3.3) * .22, 2.2, 16); }
    const molecule = new THREE.Group(); molecule.position.set(-4.8, 2.6, 2.8); g.add(molecule);
    const atoms = [V(0, 0, 0), V(1.2, .7, 0), V(-.9, 1, .25), V(.15, 1.8, -.2)]; atoms.slice(1).forEach(point => line(molecule, V(), point, .1, cream)); atoms.forEach((point, i) => mesh(molecule, new THREE.SphereGeometry(i ? .34 : .5, 16, 10), [chem, orange, reaction][i % 3], point.x, point.y, point.z)); this.animatedProps.push({ kind: 'spin', object: molecule, speed: .18, phase: 0 });
    const nodes = REGION_NODES.chemistry.map(n => n.position.clone().sub(LOCATIONS.chemistry));
    nodes.forEach((node, i) => { this.fieldNode(g, node.x, node.z, i + 1, chem); this.missionOutpost(g, node, i, chem, 'C'); });
  }
  createScienceBase() {
    const g = new THREE.Group(); g.position.copy(LOCATIONS.grove); this.group.add(g);
    const leaf = material('bio-leaf', 0x66b94d, .03, .6), lime = material('bio-lime', 0xb9dc48, .03, .56), bark = material('bio-bark', 0x8c6748, .03, .76), flower = material('bio-flower', 0xffd54f, .02, .55), white = material('bio-white', 0xf3f4d9, .02, .78);
    this.districtGarden(g, 0x9edb52);
    cylinder(g, 3.7, 4.15, 1.2, white, -1.4, .67, -1.4, 32);
    const tree = new THREE.Group(); tree.position.set(-1.4, .8, -1.4); g.add(tree);
    cylinder(tree, .72, 1.12, 4.5, bark, 0, 2.25, 0, 18);
    for (const [x,y,z,s] of [[0,4.7,0,2.25],[-1.4,4.1,.2,1.45],[1.3,4.2,-.3,1.55],[-.4,5.4,-.8,1.4],[.7,5.2,.8,1.3]] as any[]) { const crown = mesh(tree, new THREE.SphereGeometry(1, 18, 12), (x + z) > 0 ? lime : leaf, x, y, z); crown.scale.set(s, s * .72, s); }
    const house = cylinder(tree, 1.2, 1.45, 1.25, material('treehouse', 0xffd68a, .02, .72), 0, 3.2, 0, 18); for (let i = 0; i < 7; i++) cylinder(tree, .07, .07, 1.1, bark, -1.3 + i * .42, 2.1 + i * .1, 1.1, 8).rotation.z = -.18;
    const domeMat = new THREE.MeshStandardMaterial({ color: 0x75e1c3, emissive: 0x237d65, emissiveIntensity: .18, transparent: true, opacity: .68, roughness: .22 });
    const dome = mesh(g, new THREE.SphereGeometry(2.35, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), domeMat, 4.2, .35, -1.8); dome.scale.y = .72; dome.castShadow = false;
    for (const x of [3.4, 4.2, 5]) { cylinder(g, .09, .14, 1.5, bark, x, .9, -1.8, 10); const sprout = mesh(g, new THREE.SphereGeometry(.38, 12, 8), x === 4.2 ? flower : leaf, x + .2, 1.75, -1.8); sprout.scale.set(1.25, .45, .7); sprout.rotation.z = -.45; }
    const dna = new THREE.Group(); dna.position.set(4.5, .3, 2.8); g.add(dna);
    for (let i = 0; i < 12; i++) { const a = i * .7, y = i * .32; const p1 = V(Math.sin(a) * .72, y, Math.cos(a) * .72), p2 = V(-p1.x, y, -p1.z); mesh(dna, new THREE.SphereGeometry(.13, 10, 6), i % 2 ? lime : leaf, p1.x, p1.y, p1.z); mesh(dna, new THREE.SphereGeometry(.13, 10, 6), i % 2 ? leaf : lime, p2.x, p2.y, p2.z); line(dna, p1, p2, .035, white); }
    this.animatedProps.push({ kind: 'spin', object: dna, speed: .16, phase: 0 });
    const nodes = REGION_NODES.grove.map(n => n.position.clone().sub(LOCATIONS.grove));
    nodes.forEach((node, i) => { this.fieldNode(g, node.x, node.z, i + 1, leaf); this.missionOutpost(g, node, i, leaf, 'L'); });
    for (const [x, z, s] of [[8, -7, .65], [8.5, 1, .7], [-8, -1, .6], [-7, 6, .7]] as any[]) this.tree(LOCATIONS.grove.x + x, LOCATIONS.grove.z + z, s);
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
      this.target.set(0, 0, -10); this.radius = 63; this.elevation = 55;
      if (changed) this.yaw = .1;
      return;
    }
    const loc = LOCATIONS[region] || LOCATIONS.hq;
    if (!this.travel && this.currentArea !== region) {
      this.tank.position.copy(loc).add(V(2.4, .02, 4.5)); this.tank.rotation.y = .3; this.currentArea = region;
    }
    const selected = this.selectedNodeKey.startsWith(`${region}:`) ? this.stationNode(region, Number(this.selectedNodeKey.split(':')[1]))?.position : null;
    this.target.copy(view === 'region' ? loc : view === 'station' && selected ? selected : loc).add(V(0, 1, 0));
    if (view === 'region' && this.width < 650) this.target.lerp(LOCATIONS.hq.clone().add(V(0, 1, 0)), .5);
    if (view === 'region') { this.radius = 38; this.elevation = 31; }
    else if (view === 'station') { this.radius = 23; this.elevation = 17; }
    else { this.radius = 18; this.elevation = 11; }
    if (changed) this.yaw = view === 'region' ? .1 : view === 'station' ? .28 : .73;
  }
  drive(region: string, callback: () => void) {
    const end = (LOCATIONS[region] || LOCATIONS.hq).clone().add(V(2.4, .02, 4.5));
    this.beginTravel([this.tank.position.clone(), end], callback, { kind: 'region', region, label: REGION_LABELS[region] || 'Destination' });
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
  zoom(delta: number) { const strategic = this.view === 'map' || this.view === 'region'; this.radius = clamp(this.radius + delta, strategic ? 34 : 12, strategic ? 68 : 44); }
  resetCamera() { this.framingKey = ''; this.setView(this.view, this.destination); }
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
      if (!this.reduced) for (const prop of this.animatedProps) {
        if (prop.kind === 'spin') prop.object.rotation.y = this.clock * prop.speed + prop.phase;
        else if (prop.kind === 'swing') prop.object.rotation.z = Math.sin(this.clock * prop.speed + prop.phase) * prop.amp;
        else if (prop.kind === 'bob') prop.object.position.y = prop.baseY + Math.sin(this.clock * prop.speed + prop.phase) * prop.amp;
        else if (prop.kind === 'slide') prop.object.position.x = prop.baseX + Math.sin(this.clock * prop.speed + prop.phase) * .22;
        else if (prop.kind === 'bubble') {
          const phase = (this.clock * prop.speed + prop.phase) % 1; prop.object.position.y = prop.baseY + phase * prop.range;
          prop.object.scale.setScalar(.72 + Math.sin(phase * Math.PI) * .38);
        }
      }
      if (this.travel) {
        const tr = this.travel; tr.elapsed += dt; const t = clamp(tr.elapsed / tr.duration, 0, 1); const eased = t * t * (3 - 2 * t);
        let remaining = eased * tr.totalLength, segment = 0;
        while (segment < tr.lengths.length - 1 && remaining > tr.lengths[segment]) { remaining -= tr.lengths[segment]; segment++; }
        const a = tr.path[segment], b = tr.path[segment + 1] || tr.end; const segmentT = tr.lengths[segment] ? clamp(remaining / tr.lengths[segment], 0, 1) : 1;
        this.tank.position.lerpVectors(a, b, segmentT); this.tank.rotation.y = Math.atan2(b.x - a.x, b.z - a.z);
        this.tank.position.y = .02 + (this.reduced ? 0 : Math.sin(this.clock * 22) * .013);
        this.updateTracks(this.clock * 2.7); this.target.copy(this.tank.position).lerp(tr.end, .16).add(V(0, 1, 0)); this.radius = 42; this.elevation = 34; this.yaw = .22;
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
    for (const marker of [...this.mapMarkers.values(), ...this.stationMarkers.values()]) if (marker.root.visible) {
      const pulse = this.reduced ? 1 : 1 + Math.sin(this.clock * 2.4 + marker.root.position.x * .11) * (marker.selected ? .11 : .045);
      const mobileMarkerScale = this.width < 650 ? this.view === 'map' ? 2.7 : this.view === 'region' ? 2.05 : 1.2 : 1;
      const size = marker.station ? 2.8 : 4.35; marker.sprite.scale.setScalar(size * pulse * mobileMarkerScale);
      marker.halo.scale.setScalar((marker.selected ? 1.15 : 1) * pulse);
      const haloBase = marker.halo.userData.baseOpacity ?? marker.halo.material.opacity;
      const beamBase = marker.beam.userData.baseOpacity ?? marker.beam.material.opacity;
      marker.halo.material.opacity = haloBase * (.86 + (pulse - 1) * 1.7);
      marker.beam.material.opacity = beamBase * (.82 + (pulse - 1) * 1.4);
    }
    if (this.water && !this.reduced) this.water.position.y = -.12 + Math.sin(this.clock * .55) * .035;
    const mobile = this.width < 650; const strategic = this.view === 'map' || this.view === 'region';
    const factor = mobile ? (this.view === 'map' ? 3 : this.view === 'region' ? 3 : this.view === 'travel' ? 1.8 : 1.32) : 1;
    this.scene.fog.density = strategic || this.view === 'travel' ? .0015 : .009;
    this.cameraGoal.copy(this.target).add(V(Math.sin(this.yaw) * this.radius * factor, this.elevation * factor, Math.cos(this.yaw) * this.radius * factor));
    this.lookGoal.copy(this.target);
    if (!strategic && this.view !== 'travel') {
      if (mobile) this.lookGoal.y -= 7;
      else this.lookGoal.add(V(3.4, 0, -2.8));
    }
    if (strategic) this.lookGoal.add(mobile ? this.view === 'map' ? V(0, -28, 0) : V(0, -8, 0) : this.view === 'map' ? V(0, 0, 0) : V(2, 0, 0));
    if (strategic) this.camera.position.copy(this.cameraGoal);
    else this.camera.position.lerp(this.cameraGoal, this.reduced ? 1 : 1 - Math.exp(-dt * 4));
    this.camera.lookAt(this.lookGoal); this.renderer.render(this.scene, this.camera);
    if (this.onFrame) {
      const source = this.view === 'region' || this.view === 'station'
        ? [['hq', LOCATIONS.hq], ['atlas', this.tank.position], ...(REGION_NODES[this.destination] || []).map((node: any) => [node.id, node.position])]
        : [...Object.entries(LOCATIONS), ['atlas', this.tank.position]];
      this.onFrame(source.map(([id, loc]: any) => {
        const marker = id.startsWith('station-') ? this.stationMarkers.get(`${this.destination}:${id}`) : this.mapMarkers.get(id);
        const anchor = id === 'atlas' ? loc.clone().add(V(0, 2.7, 0)) : marker?.root.position.clone() || loc.clone().add(V(0, 3.5, 0));
        const p = anchor.project(this.camera);
        const strategicAnchor = this.view === 'region' && (id === 'hq' || id === 'atlas');
        return { id, x: (p.x + 1) / 2 * this.width, y: (-p.y + 1) / 2 * this.height,
          visible: p.z > -1 && p.z < 1 && (strategicAnchor || (p.x > -1.12 && p.x < 1.12 && p.y > -1.12 && p.y < 1.12)) };
      }));
    }
  };
}
