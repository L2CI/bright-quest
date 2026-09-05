import * as THREE from '../../cave-river-quest/vendor/three.module.js';
import { ValleyScenery, disposeScenery } from './scenery';

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
  onDestinationPick: ((id: string) => void) | null = null;
  width = 0; height = 0; hqLevel = 0; ready: Promise<void>; textureErrors: string[] = [];
  currentArea = 'hq'; framingKey = ''; selectedNodeKey = '';
  mapSelection = false;
  markerLayer = new THREE.Group(); mapMarkers = new Map<string, any>(); stationMarkers = new Map<string, any>();
  animatedProps: any[] = []; completedMarkerTexture = markerTexture('check', 0x54ef9b, true);
  resizeObserver: ResizeObserver; scenery: ValleyScenery;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6)); this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping; this.renderer.toneMappingExposure = 1.06;
    this.scene = new THREE.Scene(); this.scene.background = new THREE.Color(0xc5d3cf);
    paint.map = surfaceTexture(); edge.map = paint.map; blue.map = paint.map;
    this.scene.fog = new THREE.FogExp2(0xc5d3cf, .007);
    this.camera = new THREE.PerspectiveCamera(42, 1, .1, 650); this.camera.position.set(15, 10, 18);
    this.scene.add(new THREE.HemisphereLight(0xe9efed, 0x646c54, 1.65));
    const sun = new THREE.DirectionalLight(0xffe8c7, 2.4); sun.position.set(-38, 65, 25); sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -78, right: 78, top: 78, bottom: -78, near: .5, far: 190 });
    sun.shadow.normalBias = .06; sun.shadow.bias = -.00015; sun.target.position.set(0, 0, -15); this.scene.add(sun, sun.target);
    this.group = new THREE.Group(); this.scene.add(this.group);
    this.group.add(this.routeLayer, this.waypoint, this.markerLayer); this.waypoint.visible = false;
    this.waypointRing = mesh(this.waypoint, new THREE.TorusGeometry(1.05, .11, 12, 40), waypointMat, 0, .18, 0); this.waypointRing.rotation.x = Math.PI / 2;
    const beam = cylinder(this.waypoint, .045, .11, 3.7, waypointMat, 0, 1.95, 0, 14); beam.castShadow = false;
    this.ready = this.createLandscape();
    this.hq = new THREE.Group(); this.group.add(this.hq); this.createBase(1);
    this.createHarbour(); this.createEnglishDistrict(); this.createPhysicsDistrict(); this.createChemistryDistrict(); this.createScienceBase(); this.tank = this.createTank();
    this.createWorldMarkers();
    this.tank.position.copy(LOCATIONS.hq).add(V(2.4, .02, 4.5)); this.tank.rotation.y = .3; this.group.add(this.tank);
    this.createDust();
    this.resizeObserver = new ResizeObserver(() => this.resize()); this.resizeObserver.observe(canvas.parentElement!);
    let pointer: number | null = null, lastX = 0, startX = 0, startY = 0, dragged = false;
    canvas.addEventListener('pointerdown', e => {
      if (this.travel || !e.isPrimary || e.button !== 0) return;
      pointer = e.pointerId; startX = lastX = e.clientX; startY = e.clientY; dragged = false; canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener('pointermove', e => {
      if (e.pointerId !== pointer) return;
      if (Math.hypot(e.clientX - startX, e.clientY - startY) > 8) dragged = true;
      if (dragged) this.yaw += (lastX - e.clientX) * .005;
      lastX = e.clientX;
    });
    canvas.addEventListener('pointerup', e => {
      if (e.pointerId !== pointer) return;
      const tap = !dragged && Math.hypot(e.clientX - startX, e.clientY - startY) <= 8;
      pointer = null; if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
      if (tap && this.view === 'map' && !this.travel) this.pickDestination(e.clientX, e.clientY);
    });
    for (const type of ['pointercancel', 'lostpointercapture']) canvas.addEventListener(type, () => { pointer = null; });
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
    this.mapSelection = !!options.selectedRegion;
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
    this.scenery = new ValleyScenery(this.group, LOCATIONS, REGION_NODES, this.textureErrors);
    this.water = this.scenery.water;
    await this.scenery.ready;
  }
  syncCampaign(campaign: any, totalResolved?: number) {
    this.scenery.syncCampaign(campaign, totalResolved);
  }
  setLoadout(loadoutId: string) { this.scenery.setLoadout(this.tank, loadoutId); }
  pickDestination(clientX: number, clientY: number) {
    if (this.view !== 'map' || this.travel) return null;
    const rect = this.canvas.getBoundingClientRect();
    const ray = new THREE.Raycaster(); ray.setFromCamera(new THREE.Vector2((clientX - rect.left) / rect.width * 2 - 1, 1 - (clientY - rect.top) / rect.height * 2), this.camera);
    const hit = ray.intersectObjects([...this.scenery.campuses.values()], true)[0];
    let object = hit?.object;
    while (object && !object.userData.destination) object = object.parent;
    const id = object?.userData.destination;
    if (id) this.onDestinationPick?.(id);
    return id || null;
  }
  focusProject(id: string) {
    const locations: Record<string, any> = { bridge: V(10, 0, 19.7), observatory: V(12, 0, -48), greenhouse: V(44, 0, 6) };
    if (!locations[id]) return false;
    this.view = 'project'; this.framingKey = `project:${id}`; this.target.copy(locations[id]).add(V(0, 1.2, 0));
    this.radius = id === 'bridge' ? 20 : 14; this.elevation = id === 'bridge' ? 16 : 10; this.yaw = .52;
    return true;
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
    disposeScenery(this.hq);
    this.hq.position.copy(LOCATIONS.hq);
    this.scenery.campus('hq', this.hq, level);
    const mast = cylinder(this.hq, .08, .14, 5.5, steel, -6.5, 2.75, -5.3, 10);
    this.dish = new THREE.Group(); this.dish.position.set(-6.5, 5.1, -5.3); this.hq.add(this.dish);
    const dish = mesh(this.dish, new THREE.SphereGeometry(.85, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), concrete);
    dish.rotation.x = 1.1; line(this.dish, V(), V(0, .3, 1), .025, steel);
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
  createHarbour() { this.scenery.campus('harbour'); }
  createEnglishDistrict() { this.scenery.campus('english'); }
  createPhysicsDistrict() { this.scenery.campus('physics'); }
  createChemistryDistrict() { this.scenery.campus('chemistry'); }
  createScienceBase() { this.scenery.campus('grove'); }
  stationNode(region: string, index: number) { return REGION_NODES[region]?.[index] || null; }
  clearRoute() { this.routeLayer.traverse((o: any) => { if (o.isMesh) o.geometry.dispose(); }); this.routeLayer.clear(); }
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
        const p = start.clone().lerp(end, i / count); const marker = cylinder(this.routeLayer, .15, .2, .07, routeMat, p.x, this.scenery.height(p.x, p.z) + .24, p.z, 10); marker.castShadow = false;
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
    this.beginTravel(this.scenery.roadPath(this.tank.position, region, this.currentArea), callback, { kind: 'region', region, label: REGION_LABELS[region] || 'Destination' });
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
        this.tank.position.y = this.scenery.height(this.tank.position.x, this.tank.position.z) + .085 + (this.reduced ? 0 : Math.sin(this.clock * 22) * .013);
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
    if (this.water && !this.reduced) {
      this.water.position.y = Math.sin(this.clock * .55) * .012;
      if (this.water.material.normalMap) this.water.material.normalMap.offset.y = this.clock * .012;
    }
    const mobile = this.width < 650; const strategic = this.view === 'map' || this.view === 'region';
    const factor = mobile ? (this.view === 'map' ? 2.73 : this.view === 'region' ? 3 : this.view === 'travel' ? 1.8 : 1.32) : 1;
    this.scene.fog.density = strategic || this.view === 'travel' ? .0015 : .009;
    this.cameraGoal.copy(this.target).add(V(Math.sin(this.yaw) * this.radius * factor, this.elevation * factor, Math.cos(this.yaw) * this.radius * factor));
    this.lookGoal.copy(this.target);
    if (!strategic && this.view !== 'travel' && this.view !== 'project') {
      if (mobile) this.lookGoal.y -= 7;
      else this.lookGoal.add(V(3.4, 0, -2.8));
    }
    if (strategic) this.lookGoal.add(mobile ? this.view === 'map' ? V(0, this.mapSelection ? -26 : 0, 0) : V(0, -8, 0) : this.view === 'map' ? V(0, 0, 0) : V(2, 0, 0));
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
