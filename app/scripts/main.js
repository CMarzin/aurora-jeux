var renderer	= new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var myShakeEvent = new Shake({
  threshold: 15, // optional shake strength threshold
  timeout: 10 // optional, determines the frequency of event generation
});

myShakeEvent.start();

var onRenderFcts= [];
var scene	= new THREE.Scene();
var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000 )
camera.position.z = 10

//////////////////////////////////////////////////////////////////////////////////
//		create a texture Cube						//
//////////////////////////////////////////////////////////////////////////////////
var path	= "images/"
var format	= '.jpg'
var urls	= [
  path + 'posx' + format, path + 'negx' + format,
  path + 'posy' + format, path + 'negy' + format,
  path + 'posz' + format, path + 'negz' + format
]
var textureCube = THREE.ImageUtils.loadTextureCube(urls)
textureCube.format = THREE.RGBFormat

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////


var mesh	= new THREEx.BubbleMesh(textureCube)
scene.add(mesh)
// position the mesh
mesh.position.x = 0
mesh.position.y = 0
mesh.position.z = -15
// set the scale of the mesh
mesh.scale.multiplyScalar( Math.random() * 1 + 1 );

//////////////////////////////////////////////////////////////////////////////////
//		Camera Controls							//
//////////////////////////////////////////////////////////////////////////////////
var mouse	= {x : 0, y : 0}
document.addEventListener('mousemove', function(event){
  mouse.x	= (event.clientX / window.innerWidth ) - 0.5
  mouse.y	= (event.clientY / window.innerHeight) - 0.5
}, false)

//////////////////////////////////////////////////////////////////////////////////
//		Event						//
//////////////////////////////////////////////////////////////////////////////////

window.addEventListener('shake', shakeEventDidOccur, false);

window.addEventListener('click', () => {
  var audio = new Audio('../vendor/bulles.mp3');
  audio.play();
})

//function to call when shake occurs
function shakeEventDidOccur () {

var audio = new Audio('../vendor/bulles.mp3');
audio.play();

  var mesh	= new THREEx.BubbleMesh(textureCube)
  scene.add(mesh)

  mesh.position.x = (Math.random()-0.5)*5
  mesh.position.y = (Math.random()-0.5)*5
  mesh.position.z = (Math.random()-0.5)*2 - 2
}

window.addEventListener('keydown', (event) => {

  switch (event.which) {
    case 32:
    var mesh	= new THREEx.BubbleMesh(textureCube)
    scene.add(mesh)

    mesh.position.x = (Math.random()-0.5)*5
		mesh.position.y = (Math.random()-0.5)*5
    mesh.position.z = (Math.random()-0.5)*2 - 2
    
    var audio = new Audio('../vendor/bulles.mp3');
    audio.play();
    // mesh.scale.multiplyScalar(mesh.scale);
    
    console.log('Amesh.position.x', mesh.position.x);
    console.log('Amesh.position.y', mesh.position.y);
    console.log('ACamera.position.z', camera.position.x);
    console.log('ACamera.position.z', camera.position.y);
    console.log('positon', scene.position);

    // onRenderFcts.push(function(delta, now){
    //     mesh.position.x = (Math.random()-0.5)*5
    //     mesh.position.y = (Math.random()-0.5)*5
    //     camera.position.x += 0.5
    //     camera.position.y += 0.5
    // })
    
      break;
  
    default:
      break;
  }
  event.preventDefault();
})



//////////////////////////////////////////////////////////////////////////////////
//		add a skybox							//
//////////////////////////////////////////////////////////////////////////////////
var shader	= THREE.ShaderLib[ "cube" ];
shader.uniforms[ "tCube" ].value = textureCube;
var material	= new THREE.ShaderMaterial( {
  fragmentShader	: shader.fragmentShader,
  vertexShader	: shader.vertexShader,
  uniforms	: shader.uniforms,
  side		: THREE.BackSide
})
var geometry	= new THREE.CubeGeometry(5000, 500, 500)
var meshSkybox	= new THREE.Mesh(geometry, material);
scene.add( meshSkybox );


//////////////////////////////////////////////////////////////////////////////////
//		render the scene						//
//////////////////////////////////////////////////////////////////////////////////
onRenderFcts.push(function(){
  renderer.render( scene, camera );		
})

//////////////////////////////////////////////////////////////////////////////////
//		loop runner							//
//////////////////////////////////////////////////////////////////////////////////
var lastTimeMsec= null
requestAnimationFrame(function animate(nowMsec){
  // keep looping
  requestAnimationFrame( animate );
  // measure time
  lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
  var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
  lastTimeMsec	= nowMsec
  // call each update function
  onRenderFcts.forEach(function(onRenderFct){
    onRenderFct(deltaMsec/1000, nowMsec/1000)
  })
})