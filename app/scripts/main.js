import pop from './audio'
import shake, { shakeEventDidOccur } from './shake'
import { createBubbles } from './bubble'
import createScene from './scene'
import debugIos from './ios'

const renderer = new THREE.WebGLRenderer();
// CAMERA
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000)
camera.position.z = 10;

const scene = createScene(renderer, camera);

//////////////////////////////////////////////////////////////////////////////////
//		pregenerate bubbles								//
//////////////////////////////////////////////////////////////////////////////////
createBubbles(scene);

// shake
shake.start();
window.addEventListener('shake', shakeEventDidOccur, false);

debugIos()

var onRenderFcts= [];

const getRandomIndexFromBubbles = () => {
  const min = 1;
  const max = scene.children.length;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//////////////////////////////////////////////////////////////////////////////////
//		Camera Controls							//
//////////////////////////////////////////////////////////////////////////////////
var mouse	= {x : 0, y : 0}
document.addEventListener('mousemove', (event) => {
  mouse.x	= (event.clientX / window.innerWidth ) - 0.5
  mouse.y	= (event.clientY / window.innerHeight) - 0.5
}, false)

onRenderFcts.push((delta, now) => {
  camera.position.x += (mouse.x*5 - camera.position.x) * (delta*3)
  camera.position.y += (mouse.y*5 - camera.position.y) * (delta*3)
  // camera.lookAt( scene.position )
})

window.addEventListener('keydown', event => {
  if (event.which === 32) {
    event.preventDefault();
    pop()

    const random = getRandomIndexFromBubbles()

    onRenderFcts.push(function(delta, now){
      var angle	= 0.01  * now * Math.PI * 2;
      setInterval( () => {
        angle = 0
      }, 100)
      console.log('angle', angle)
      scene.children[random].position.y = 4 * angle;
    })
  }
})


//////////////////////////////////////////////////////////////////////////////////
//		render the scene						//
//////////////////////////////////////////////////////////////////////////////////
onRenderFcts.push(() => renderer.render( scene, camera ))

//////////////////////////////////////////////////////////////////////////////////
//		loop runner							//
//////////////////////////////////////////////////////////////////////////////////
let lastTimeMsec= null
requestAnimationFrame(function animate(nowMsec){
  // keep looping
  requestAnimationFrame( animate );
  // measure time
  lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
  const deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
  lastTimeMsec	= nowMsec
  // call each update function
  for (let i = 0; i < onRenderFcts.length; i++) {
    onRenderFcts[i](deltaMsec / 1000, nowMsec / 1000)
  }
})
