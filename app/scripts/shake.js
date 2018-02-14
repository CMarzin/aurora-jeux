import pop from './audio'

// SHAKER
export default new Shake({
  threshold: 15, // optional shake strength threshold
  timeout: 10 // optional, determines the frequency of event generation
});

//function to call when shake occurs
export const shakeEventDidOccur = () => {
  pop()

  var mesh = new THREEx.BubbleMesh(textureCube)
  scene.add(mesh)

  mesh.position.x = Math.random() * window.innerWidth
  mesh.position.y = 0
  mesh.position.z = (Math.random() - 0.5) * 4 - 4
}