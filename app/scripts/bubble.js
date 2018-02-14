import { getTextureCube } from './scene'

export const createBubbles = scene => {
  for (let i = 0; i < 100; i++) {
    var mesh = new THREEx.BubbleMesh(getTextureCube())
    scene.add(mesh)
    // position the mesh
    mesh.position.x = (Math.random() - 0.5) * 10
    mesh.position.y = -10
    mesh.position.z = 0
    // set the scale of the mesh
    mesh.scale.multiplyScalar( Math.random() * -.75 + 1 );
  }
}