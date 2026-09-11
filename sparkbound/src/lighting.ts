import * as THREE from '../../cave-river-quest/vendor/three.module.js';

// Broad off-camera reflectors give machined metal readable edges without an HDR download.
export function guardianEnvironment(renderer: THREE.WebGLRenderer) {
  const room = new THREE.Scene();
  const shell = new THREE.Mesh(new THREE.SphereGeometry(30,24,12),new THREE.MeshBasicMaterial({color:0x9faeb1,side:THREE.BackSide}));
  room.add(shell);
  for (const [x,y,z,w,h,power] of [[-9,9,8,9,15,2.5],[8,5,-7,6,13,1.8],[0,18,0,16,12,1.4]]) {
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color().setScalar(power),side:THREE.DoubleSide}));
    panel.position.set(x,y,z);panel.lookAt(0,0,0);room.add(panel);
  }
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(60,60),new THREE.MeshBasicMaterial({color:0x495552,side:THREE.DoubleSide}));
  floor.rotation.x=-Math.PI/2;floor.position.y=-12;room.add(floor);
  const generator = new THREE.PMREMGenerator(renderer), environment=generator.fromScene(room,.02,.1,100);
  generator.dispose();
  room.traverse(object=>{const mesh=object as THREE.Mesh;if(mesh.isMesh){mesh.geometry.dispose();(mesh.material as THREE.Material).dispose();}});
  return environment;
}
