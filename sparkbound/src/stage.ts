import * as THREE from '../../cave-river-quest/vendor/three.module.js';

type Placement = { p: number[]; s: number[]; r?: number[] };

/** Environment only: World owns the lighting, atmosphere, camera and render loop. */
export class ArenaStage {
  readonly forge = new THREE.Group();
  readonly root = new THREE.Group();
  private materials = new Set<THREE.Material>();
  private textures = new Set<THREE.Texture>();
  private geometries = new Set<THREE.BufferGeometry>();
  private batches = new Map<string, { geometry: THREE.BufferGeometry; material: THREE.Material; items: Placement[]; shadow: boolean }>();
  private rotors: THREE.Group[] = [];
  private progressBar: THREE.Mesh;
  private forgeGlow: THREE.MeshStandardMaterial;
  private water: THREE.Mesh;
  private disposed = false;
  private progress = 0;

  constructor(scene: THREE.Scene) {
    this.root.name = 'Sparkbound harbour arena';
    this.root.userData = { arenaRadius: 12, groundY: 0, clearCombatBounds: [-6, 6, -2.8, 9] };
    scene.add(this.root);
    const material = (colour: number, roughness = .65, metalness = .35) => this.mat(new THREE.MeshStandardMaterial({ color: colour, roughness, metalness }));
    const concreteMap = this.loadTexture('concrete-colour.jpg', true, 5);
    const concreteNormal = this.loadTexture('concrete-normal.jpg', false, 5);
    const concrete = this.mat(new THREE.MeshStandardMaterial({ color: 0xb3b8b7, map: concreteMap, normalMap: concreteNormal, normalScale: new THREE.Vector2(.35, .35), roughness: .88, metalness: .08 }));
    const deck = material(0x6d787c, .6, .65);
    const steel = material(0x343e42, .51, .72);
    const edge = material(0xc3cdcb, .38, .68);
    const dark = material(0x202a2d, .8, .38);
    const pale = material(0xd4d7cf, .76, .18);
    const amber = material(0xbca36b, .6, .25);
    const cyan = this.mat(new THREE.MeshStandardMaterial({ color: 0x77b9c0, emissive: 0x3e8f9b, emissiveIntensity: .3, roughness: .4, metalness: .5 }));
    const box = this.geo(new THREE.BoxGeometry(1, 1, 1));
    const cylinder = this.geo(new THREE.CylinderGeometry(1, 1, 1, 32));
    const slab = (key: string, mat: THREE.Material, p: number[], s: number[], r?: number[], shadow = true) => this.instance(key, box, mat, { p, s, r }, shadow);

    // All floor tops finish at y=0; markings are thin decals, not collision obstacles.
    this.mesh(this.geo(new THREE.CylinderGeometry(12, 11.65, .8, 96)), steel, [0, -.43, 0]);
    this.mesh(this.geo(new THREE.CylinderGeometry(11.9, 11.9, .12, 96)), deck, [0, -.06, 0]);
    const floorGeometry = this.geo(new THREE.CircleGeometry(9.5, 96));
    floorGeometry.rotateX(-Math.PI / 2);
    this.mesh(floorGeometry, concrete, [0, .004, 0]);
    this.ring(9.5, 9.57, .009, dark);
    this.ring(9.65, 9.71, .012, edge);
    this.ring(11.69, 11.77, .012, edge);
    this.ring(11.91, 12, -.3, dark);
    this.ring(7.25, 7.28, .013, edge);
    const circleSeam = this.mat(new THREE.MeshStandardMaterial({ color: 0x566063, roughness: .85, metalness: .2 }));
    this.ring(4.85, 4.875, .014, circleSeam);
    for (let i = 0; i < 32; i++) {
      const a = i * Math.PI / 16;
      const x = Math.sin(a), z = Math.cos(a);
      slab('deck-joints', dark, [x * 10.6, .006, z * 10.6], [.026, .014, 2.12], [0, a, 0], false);
      slab('deck-fasteners', edge, [x * 11.45, .024, z * 11.45], [.075, .022, .075], [0, a, 0], false);
      if (i % 4 === 0) slab('edge-markers', i % 8 === 0 ? amber : edge, [x * 11.78, .024, z * 11.78], [.4, .015, .1], [0, a, 0], false);
      // Ribbed fascia reads as load-bearing architecture from the elevated camera.
      slab('fascia-ribs', edge, [x * 11.86, -.48, z * 11.86], [.13, .46, .16], [0, a, 0]);
    }
    for (const z of [-6.2, 3.2, 6.3]) {
      const length = Math.sqrt(9.45 * 9.45 - z * z) * 2;
      slab('floor-joints', circleSeam, [0, .012, z], [length, .008, .018], undefined, false);
    }
    for (const x of [-6.3, 0, 6.3]) {
      const length = Math.sqrt(9.45 * 9.45 - x * x) * 2;
      slab('floor-joints', circleSeam, [x, .012, 0], [.018, .008, length], undefined, false);
    }
    for (const x of [-3.8, 3.8]) {
      for (const sign of [-1, 1]) {
        slab('home-markings', edge, [x + sign * 1.08, .023, 0], [.065, .013, 1.3], undefined, false);
        for (const z of [-.65, .65]) slab('home-markings', edge, [x + sign * .87, .023, z], [.45, .013, .065], undefined, false);
      }
    }
    for (let i = 0; i < 11; i++) slab('warning-ticks', amber, [-2.4 + i * .48, .021, 8.35], [.22, .012, .38], [0, -.45, 0], false);
    this.label('SPARKBOUND   /   SPARRING DECK 07', [0, .035, 7.5], 5.4, .3, 'floor');
    this.label('NO STEP   //   SERVICE CHANNEL', [6.8, .035, -5.9], 2.8, .22, 'floor');
    this.label('01   RELAY', [-3.8, .035, 1.4], 1.7, .23, 'floor');
    this.label('02   PRISM', [3.8, .035, 1.4], 1.7, .23, 'floor');

    // A rear-only service crescent. No railings, props or supports in front of the fighters.
    for (let i = 0; i <= 14; i++) {
      const a = -Math.PI / 2 + i * Math.PI / 14;
      const x = Math.sin(a) * 11.8, z = -Math.cos(a) * 11.8;
      if (Math.abs(x) > 10.8) continue;
      slab('rear-posts', steel, [x, .47, z], [.12, .95, .12]);
      if (i < 14) {
        const b = a + Math.PI / 14;
        this.beam([x, .88, z], [Math.sin(b) * 11.8, .88, -Math.cos(b) * 11.8], .065, edge, 'rear-rails');
      }
    }
    for (const x of [-9.6, 9.6]) {
      slab('service-housings', pale, [x, .45, -7.4], [1.4, .9, 1.1]);
      slab('service-caps', steel, [x, .96, -7.4], [1.5, .12, 1.2]);
      for (let j = 0; j < 7; j++) slab('service-vents', dark, [x - .48 + j * .16, .53, -6.842], [.07, .38, .014], undefined, false);
      slab('service-status', cyan, [x + .48, .79, -6.83], [.12, .04, .015], undefined, false);
    }

    this.forge.name = 'Forge - rear left';
    this.forge.position.set(-7, 0, -5);
    this.root.add(this.forge);
    const forgeMachine = new THREE.Group();
    forgeMachine.position.set(-1.65, 0, .65);
    this.forge.userData.machineOffset = [-1.65, 0, .65];
    this.forge.add(forgeMachine);
    const forgePart = (mat: THREE.Material, p: number[], s: number[], geometry = box) => {
      const m = this.mesh(geometry, mat, p, forgeMachine); m.scale.set(...s); return m;
    };
    forgePart(steel, [0, .12, 0], [2.8, .24, 2.4]);
    forgePart(edge, [0, .26, 0], [2.6, .06, 2.2]);
    forgePart(dark, [0, .72, -.4], [2.1, .87, 1.2]);
    forgePart(pale, [0, 1.17, -.25], [2.55, .16, 1.65]);
    forgePart(steel, [0, 1.28, -.25], [1.85, .075, 1]);
    for (const x of [-1.06, 1.06]) {
      forgePart(steel, [x, 1.56, -.84], [.2, 2.55, .22]);
      forgePart(edge, [x, 1.75, -.68], [.08, 1.55, .06]);
      forgePart(amber, [x, 2.72, -.84], [.27, .16, .28]);
    }
    forgePart(pale, [0, 2.88, -.84], [2.7, .3, .55]);
    forgePart(dark, [0, 2.69, -.7], [2.08, .09, .28]);
    forgePart(edge, [.4, 2.38, -.69], [.17, .57, .18]);
    forgePart(steel, [.4, 2.11, -.58], [.4, .16, .48]);
    this.forgeGlow = this.mat(new THREE.MeshStandardMaterial({ color: 0x80c5c8, emissive: 0x55b8be, emissiveIntensity: .4, roughness: .4, metalness: .5 }));
    forgePart(this.forgeGlow, [.4, 2.005, -.4], [.13, .08, .16]);
    forgePart(steel, [-.72, 1.4, .46], [.48, .1, .39]);
    const display = forgePart(this.forgeGlow, [-.72, 1.47, .46], [.4, .035, .29]);
    display.rotation.x = .35;
    forgePart(dark, [0, .83, .213], [1.4, .15, .035]);
    this.progressBar = forgePart(this.forgeGlow, [-.67, .83, .237], [1.34, .075, .018]);
    this.label('FORGE   /   07', [-8.65, 2.91, -4.9], 1.8, .2, 'vertical');
    this.setForgeProgress(0);
    for (const x of [-.65, 0, .65]) forgePart(edge, [x, 1.35, -.3], [.33, .09, .49]);

    // Lower infrastructure gives the terrace a credible elevation over the harbour.
    for (const x of [-8, 8]) {
      slab('foundation-piers', concrete, [x, -3.1, -4], [1.8, 5.2, 3]);
      this.beam([x, -4.8, -4], [x * .4, -.8, 1], .45, steel, 'foundation-braces');
    }
    const panorama = this.loadTexture('harbour-panorama.png', true, 1);
    panorama.wrapS = panorama.wrapT = THREE.ClampToEdgeWrapping;
    const waterMaterial = this.makeWaterMaterial(panorama);
    const waterPlane = this.geo(new THREE.PlaneGeometry(650, 650)); waterPlane.rotateX(-Math.PI / 2);
    this.water = this.mesh(waterPlane, waterMaterial, [0, -6.25, -100]);
    this.water.receiveShadow = false;
    const quayMap = concreteMap.clone(); quayMap.repeat.set(18, 45); this.textures.add(quayMap);
    const quay = this.mat(new THREE.MeshStandardMaterial({ color: 0xabb0a8, map: quayMap, roughness: .94, metalness: .05 }));
    slab('distant-quays', quay, [-34, -5.5, -18], [18, 1.5, 100]);
    slab('distant-quays', quay, [40, -5.5, -18], [24, 1.5, 100]);
    const distant = this.mesh(this.geo(new THREE.CylinderGeometry(180, 180, 120, 96, 1, true, Math.PI / 2, Math.PI)), this.mat(new THREE.MeshBasicMaterial({ map: panorama, side: THREE.BackSide, fog: false, toneMapped: false })), [0, 26, 0]);
    distant.name = 'Original harbour skyline matte'; distant.castShadow = distant.receiveShadow = false;
    for (const x of [-24.96, 27.96]) {
      const side = Math.sign(x);
      slab('quay-coping', edge, [x, -4.72, -18], [.25, .12, 100]);
      slab('quay-service-lane', deck, [x + side * 2.2, -4.739, -18], [2.2, .025, 98], undefined, false);
      for (let i = 0; i < 13; i++) {
        const z = 25 - i * 7.5;
        slab('quay-joints', dark, [x + side * 5, -4.73, z], [9, .02, .04], undefined, false);
        slab('quay-fenders', dark, [x - side * .12, -5.35, z], [.26, 1.15, .68]);
        this.instance('quay-bollards', cylinder, steel, { p: [x + side * .65, -4.55, z], s: [.18, .4, .18] }, false);
        this.instance('bollard-caps', cylinder, amber, { p: [x + side * .65, -4.33, z], s: [.26, .08, .26] }, false);
      }
    }
    for (const [x, z] of [[-29, -26], [32, -31], [-36, -2], [42, -4]]) {
      slab('industry-footings', quay, [x, -4.6, z], [6.4, .4, 7.4]);
      slab('industry-bases', pale, [x, -1.4, z], [6, 6.2, 7]);
      slab('industry-roofs', steel, [x, 1.82, z], [6.3, .3, 7.3]);
      slab('industry-bands', deck, [x, -.2, z + 3.51], [5.8, .85, .07]);
      for (const offset of [-1.1, 1.1]) {
        this.instance('industry-conduit', cylinder, steel, { p: [x + 3.13, -1, z + offset], s: [.13, 5.1, .13] }, false);
        slab('industry-conduit-brackets', edge, [x + 3.13, -.8, z + offset], [.34, .1, .34]);
      }
      slab('industry-plant', deck, [x + 1.85, 2.32, z + 1.2], [1.3, .8, 1.8]);
      for (let vent = 0; vent < 6; vent++) slab('plant-fins', dark, [x + 1.85, 2.75, z + .48 + vent * .29], [1.2, .05, .09], undefined, false);
      for (let bay = 0; bay < 5; bay++) {
        slab('industry-fins', edge, [x - 2.5 + bay * 1.25, -1.4, z + 3.6], [.12, 5.8, .23]);
        slab('industry-door', dark, [x - 2.35 + bay * 1.16, -3.35, z + 3.53], [.88, 2.5, .07]);
      }
      for (const offset of [-1.6, 1.6]) {
        this.instance('exhausts', cylinder, edge, { p: [x + offset, 2.65, z - 1], s: [.66, 1.5, .66] }, false);
        this.instance('exhaust-lips', cylinder, dark, { p: [x + offset, 3.4, z - 1], s: [.73, .13, .73] }, false);
      }
      const rotor = new THREE.Group(); rotor.position.set(x, 2.04, z + 1.7); this.root.add(rotor);
      const hub = this.mesh(cylinder, dark, [0, 0, 0], rotor); hub.scale.set(.27, .15, .27);
      for (let b = 0; b < 4; b++) {
        const blade = this.mesh(box, steel, [Math.sin(b * Math.PI / 2) * .55, 0, Math.cos(b * Math.PI / 2) * .55], rotor);
        blade.scale.set(.25, .06, .9); blade.rotation.y = b * Math.PI / 2 + .23;
      }
      this.rotors.push(rotor);
    }
    // Rear gantries stay well behind character silhouettes and below the skyline peaks.
    for (const x of [-37, 37]) {
      for (const dx of [-2, 2]) slab('gantry', steel, [x + dx, .5, -43], [.4, 10, .5]);
      slab('gantry', steel, [x, 5.35, -43], [4.6, .5, .7]);
      slab('gantry-arm', amber, [x + 2.5, 5.4, -43], [8, .28, .36]);
      this.beam([x - 1.9, 2.2, -43], [x + 1.9, 4.95, -43], .16, edge, 'gantry-braces');
    }
    this.flushBatches();
  }

  update(dt: number, time: number) {
    if (this.disposed) return;
    const delta = Number.isFinite(dt) ? THREE.MathUtils.clamp(dt, 0, .1) : 0;
    const t = Number.isFinite(time) ? time : 0;
    this.rotors.forEach((rotor, i) => { rotor.rotation.y += delta * (.34 + i * .035); });
    (this.water.material as THREE.ShaderMaterial).uniforms.uTime.value += delta;
    this.forgeGlow.emissiveIntensity = .28 + this.progress * .32 + Math.sin(t * 1.2) * .025;
  }

  setForgeProgress(fraction: number) {
    this.progress = Number.isFinite(fraction) ? THREE.MathUtils.clamp(fraction, 0, 1) : 0;
    this.progressBar.scale.x = Math.max(.001, this.progress * 1.34);
    this.progressBar.position.x = -.67 + this.progress * .67;
    this.progressBar.visible = this.progress > 0;
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.root.removeFromParent();
    this.root.traverse(object => { if ((object as THREE.InstancedMesh).isInstancedMesh) (object as THREE.InstancedMesh).dispose(); });
    this.geometries.forEach(g => g.dispose());
    this.materials.forEach(m => m.dispose());
    this.textures.forEach(t => t.dispose());
    this.root.clear(); this.rotors.length = 0;
    this.geometries.clear(); this.materials.clear(); this.textures.clear();
  }

  private mat<T extends THREE.Material>(material: T): T { this.materials.add(material); return material; }
  private geo<T extends THREE.BufferGeometry>(geometry: T): T { this.geometries.add(geometry); return geometry; }

  private loadTexture(file: string, colour: boolean, repeat: number) {
    // Root-relative URL survives the app's single-file esbuild bundle.
    const texture = new THREE.TextureLoader().load('/sparkbound/assets/environment/' + file, loaded => { if (this.disposed) loaded.dispose(); });
    if (colour) texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeat, repeat); texture.anisotropy = 4;
    this.textures.add(texture); return texture;
  }

  private mesh(geometry: THREE.BufferGeometry, material: THREE.Material, p: number[], parent = this.root) {
    const mesh = new THREE.Mesh(geometry, material); mesh.position.set(...p);
    mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  }

  private instance(key: string, geometry: THREE.BufferGeometry, material: THREE.Material, item: Placement, shadow: boolean) {
    // Include material identity so differently coloured details cannot silently share a batch.
    const id = key + ':' + material.uuid;
    if (!this.batches.has(id)) this.batches.set(id, { geometry, material, items: [], shadow });
    this.batches.get(id)!.items.push(item);
  }

  private flushBatches() {
    const dummy = new THREE.Object3D();
    this.batches.forEach(({ geometry, material, items, shadow }, key) => {
      const mesh = new THREE.InstancedMesh(geometry, material, items.length); mesh.name = key.split(':')[0];
      items.forEach((item, i) => {
        dummy.position.set(...item.p); dummy.scale.set(...item.s); dummy.rotation.set(...(item.r || [0, 0, 0]));
        dummy.updateMatrix(); mesh.setMatrixAt(i, dummy.matrix);
      });
      mesh.castShadow = shadow; mesh.receiveShadow = true; mesh.computeBoundingSphere(); this.root.add(mesh);
    });
    this.batches.clear();
  }

  private beam(from: number[], to: number[], width: number, material: THREE.Material, key: string) {
    const start = new THREE.Vector3(...from), end = new THREE.Vector3(...to);
    const mid = start.clone().add(end).multiplyScalar(.5), direction = end.clone().sub(start);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
    const rotation = new THREE.Euler().setFromQuaternion(quaternion);
    const existing = this.batches.get(key + ':' + material.uuid);
    this.instance(key, existing?.geometry || this.geo(new THREE.BoxGeometry(1, 1, 1)), material, { p: mid.toArray(), s: [width, direction.length(), width], r: [rotation.x, rotation.y, rotation.z] }, true);
  }

  private ring(inner: number, outer: number, y: number, material: THREE.Material) {
    const geometry = this.geo(new THREE.RingGeometry(inner, outer, 128)); geometry.rotateX(-Math.PI / 2);
    const mesh = this.mesh(geometry, material, [0, y, 0]); mesh.castShadow = false; return mesh;
  }

  private label(text: string, position: number[], width: number, height: number, orientation: 'floor' | 'vertical') {
    const canvas = document.createElement('canvas'); canvas.width = 1024; canvas.height = 96;
    const context = canvas.getContext('2d'); if (!context) return;
    context.clearRect(0, 0, 1024, 96); context.fillStyle = '#d2d8d2';
    context.font = '600 48px monospace'; context.textAlign = 'center'; context.textBaseline = 'middle';
    context.fillText(text, 512, 48, 1000);
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; this.textures.add(texture);
    const material = this.mat(new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1, toneMapped: false }));
    const label = this.mesh(this.geo(new THREE.PlaneGeometry(width, height)), material, position);
    if (orientation === 'floor') label.rotation.x = -Math.PI / 2;
    label.castShadow = false; label.receiveShadow = false;
  }

  private makeWaterMaterial(panorama: THREE.Texture) {
    // Cheap coherent wave normals and a blurred cylindrical skyline reflection; no extra render pass.
    return this.mat(new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uPanorama: { value: panorama }, uDeep: { value: new THREE.Color(0x536c70) } },
      vertexShader: `varying vec3 vWorld;
        void main(){vec4 world=modelMatrix*vec4(position,1.0);vWorld=world.xyz;gl_Position=projectionMatrix*viewMatrix*world;}`,
      fragmentShader: `precision highp float;
        uniform float uTime;uniform sampler2D uPanorama;uniform vec3 uDeep;varying vec3 vWorld;
        void main(){
          vec2 p=vWorld.xz;float t=uTime;
          float a=dot(p,vec2(.65,.76))*.85+sin(p.x*.12)*1.1-t*.32;
          float b=dot(p,vec2(-.8,.35))*1.7+sin(p.y*.17)*.8+t*.26;
          float c=dot(p,vec2(.22,.97))*3.7-t*.48;
          float distanceToEye=length(cameraPosition-vWorld);
          float fine=1.0-smoothstep(45.0,170.0,distanceToEye);
          vec2 slope=vec2(.65,.76)*cos(a)*.028+vec2(-.8,.35)*cos(b)*.012+vec2(.22,.97)*cos(c)*.005*fine;
          vec3 n=normalize(vec3(-slope.x,1.0,-slope.y));
          vec3 v=normalize(cameraPosition-vWorld);vec3 r=reflect(-v,n);
          float reach=180.0/max(length(r.xz),.01);
          vec3 reflectedPoint=vWorld+r*reach;
          float u=.5-atan(reflectedPoint.x,-reflectedPoint.z)/3.14159265;
          float y=clamp((reflectedPoint.y+34.0)/120.0,.26,.98);
          vec2 uv=vec2(clamp(u,0.0,1.0),y);
          vec3 blurred=(texture2D(uPanorama,uv,4.0).rgb+texture2D(uPanorama,uv+vec2(.006,.03),4.0).rgb+texture2D(uPanorama,uv-vec2(.006,.03),4.0).rgb)/3.0;
          vec3 reflection=pow(blurred,vec3(2.2));
          float fresnel=.18+.22*pow(1.0-max(dot(n,v),0.0),3.0);
          vec3 colour=mix(uDeep,reflection*.8,fresnel);
          float swell=sin(a)*.04+sin(b)*.023;
          colour*=1.0+swell;
          vec3 halfLight=normalize(normalize(vec3(-.43,.83,.36))+v);
          float glint=pow(max(dot(n,halfLight),0.0),120.0)*.008*fine;
          colour+=vec3(1.0,.95,.8)*glint;
          gl_FragColor=vec4(colour,1.0);
          #include <colorspace_fragment>
        }`, toneMapped: false,
    }));
  }
}
