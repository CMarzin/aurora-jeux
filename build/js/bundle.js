(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var myShakeEvent = new Shake({
  threshold: 15, // optional shake strength threshold
  timeout: 10 // optional, determines the frequency of event generation
});

myShakeEvent.start();

var onRenderFcts = [];
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.z = 10;

//////////////////////////////////////////////////////////////////////////////////
//		create a texture Cube						//
//////////////////////////////////////////////////////////////////////////////////
var path = "images/";
var format = '.jpg';
var urls = [path + 'posx' + format, path + 'negx' + format, path + 'posy' + format, path + 'negy' + format, path + 'posz' + format, path + 'negz' + format];
var textureCube = THREE.ImageUtils.loadTextureCube(urls);
textureCube.format = THREE.RGBFormat;

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////


for (var i = 0; i < 100; i++) {
  var mesh = new THREEx.BubbleMesh(textureCube);
  scene.add(mesh);
  // position the mesh
  mesh.position.x = (Math.random() - 0.5) * 10;
  mesh.position.y = -10;
  mesh.position.z = 0;
  // set the scale of the mesh
  // mesh.scale.multiplyScalar( Math.random() * 1 + 1 );
}

var min = 1;
var max = 100;
var random = Math.floor(Math.random() * (max - min + 1)) + min;

console.log('window.innerWidth', (Math.random() - 0.5) * 10);

//////////////////////////////////////////////////////////////////////////////////
//		Camera Controls							//
//////////////////////////////////////////////////////////////////////////////////
var mouse = { x: 0, y: 0 };
document.addEventListener('mousemove', function (event) {
  mouse.x = event.clientX / window.innerWidth - 0.5;
  mouse.y = event.clientY / window.innerHeight - 0.5;
}, false);

onRenderFcts.push(function (delta, now) {
  camera.position.x += (mouse.x * 5 - camera.position.x) * (delta * 3);
  camera.position.y += (mouse.y * 5 - camera.position.y) * (delta * 3);
  // camera.lookAt( scene.position )
});

//////////////////////////////////////////////////////////////////////////////////
//		Event						//
//////////////////////////////////////////////////////////////////////////////////
var audio = new Audio('../vendor/bulles.mp3');

window.addEventListener('shake', shakeEventDidOccur, false);

// NEED to trigger a user action in order to play the sound on IOS ....
var button = document.querySelector('button');

button.addEventListener('click', function () {
  audio.play();
  var timeleft = 10;
  var downloadTimer = setInterval(function () {
    timeleft--;
    document.getElementById("countdowntimer").textContent = timeleft;
    if (timeleft <= 0) clearInterval(downloadTimer);
  }, 1000);
});
//function to call when shake occurs
function shakeEventDidOccur() {
  var audio = new Audio('../vendor/bulles.mp3');
  audio.play();

  var mesh = new THREEx.BubbleMesh(textureCube);
  scene.add(mesh);

  mesh.position.x = Math.random() * window.innerWidth;
  mesh.position.y = 0;
  mesh.position.z = (Math.random() - 0.5) * 4 - 4;
}

window.addEventListener('keydown', function (event) {

  switch (event.which) {
    case 32:
      // var mesh	= new THREEx.BubbleMesh(textureCube)
      // scene.add(mesh)

      // mesh.position.x = (Math.random()-0.5)*5
      // mesh.position.y = -10
      // mesh.position.z = (Math.random()-0.5)*2 - 2

      var audio = new Audio('../vendor/bulles.mp3');
      audio.play();

      // console.log('Amesh.position.x', mesh.position.x);
      // console.log('Amesh.position.y', mesh.position.y);
      // console.log('ACamera.position.z', camera.position.x);
      // console.log('ACamera.position.z', camera.position.y);
      // console.log('positon', scene.position);

      // onRenderFcts.push(function(delta, now){
      //     mesh.position.x = (Math.random()-0.5)*5
      //     mesh.position.y = (Math.random()-0.5)*5
      //     camera.position.x += 0.5
      //     camera.position.y += 0.5
      // })

      // if (scene.children.length > 5) {
      //   let min = 1;
      //   let max = 6;
      //   let random = Math.floor(Math.random() * (max - min + 1)) + min;

      //   scene.remove(scene.children[random])
      // }
      var _min = 1;
      var _max = 100;
      var _random = Math.floor(Math.random() * (_max - _min + 1)) + _min;

      onRenderFcts.push(function (delta, now) {
        var angle = 0.01 * now * Math.PI * 2;
        setInterval(function () {
          angle = 0;
        }, 100);
        console.log('angle', angle);
        scene.children[_random].position.y = 4 * angle;
      });

      break;

    default:
      break;
  }
  event.preventDefault();
});

console.log('scene', scene.children);
//////////////////////////////////////////////////////////////////////////////////
//		add a skybox							//
//////////////////////////////////////////////////////////////////////////////////
var shader = THREE.ShaderLib["cube"];
shader.uniforms["tCube"].value = textureCube;
var material = new THREE.ShaderMaterial({
  fragmentShader: shader.fragmentShader,
  vertexShader: shader.vertexShader,
  uniforms: shader.uniforms,
  side: THREE.BackSide
});
var geometry = new THREE.CubeGeometry(5000, 500, 500);
var meshSkybox = new THREE.Mesh(geometry, material);
scene.add(meshSkybox);

//////////////////////////////////////////////////////////////////////////////////
//		render the scene						//
//////////////////////////////////////////////////////////////////////////////////
onRenderFcts.push(function () {
  renderer.render(scene, camera);
});

//////////////////////////////////////////////////////////////////////////////////
//		loop runner							//
//////////////////////////////////////////////////////////////////////////////////
var lastTimeMsec = null;
requestAnimationFrame(function animate(nowMsec) {
  // keep looping
  requestAnimationFrame(animate);
  // measure time
  lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
  var deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
  lastTimeMsec = nowMsec;
  // call each update function
  onRenderFcts.forEach(function (onRenderFct) {
    onRenderFct(deltaMsec / 1000, nowMsec / 1000);
  });
});

},{}],2:[function(require,module,exports){
"use strict";

/**
 * declare THREEx namespace
 * @type {[type]}
 */
var THREEx = THREEx || {};

/**
 * create a THREE.Mesh suitable for a bubble
 * @param {THREE.Texture} textureCube a texture cube to reflect in the bubble
 */
THREEx.BubbleMesh = function (textureCube) {
	var material = new THREEx.BubbleMaterial(textureCube);
	var geometry = new THREE.SphereGeometry(0.5, 32, 16);
	var mesh = new THREE.Mesh(geometry, material);
	return mesh;
};

/**
 * create a THREE.ShaderMaterial suitable for bubble
 * @param {THREE.Texture} textureCube a texture cube to reflect in the bubble
 */
THREEx.BubbleMaterial = function (textureCube) {
	var shader = THREEx.BubbleMaterial.FresnelShader;
	// var shader	= THREE.FresnelShader;
	console.assert(shader);
	var material = new THREE.ShaderMaterial({
		fragmentShader: shader.fragmentShader,
		vertexShader: shader.vertexShader,
		uniforms: THREE.UniformsUtils.clone(shader.uniforms)
	});
	// set textureCube
	material.uniforms["tCube"].value = textureCube;
	return material;
};

/**
 * Last modified by @author Mr&Mrs(2014)
 * Based  on work by alteredq / http://alteredqualia.com/
 * and derivative of Nvidia Cg tutorial
 */
THREEx.BubbleMaterial.FresnelShader = {

	uniforms: {
		mRefractionRatio: { type: "f", value: 0.988 },
		mFresnelBias: { type: "f", value: 0.9 },
		mFresnelPower: { type: "f", value: 2.0 },
		mFresnelScale: { type: "f", value: 1.0 },
		tCube: { type: "t", value: null }
	},

	vertexShader: ["uniform float mRefractionRatio;", "uniform float mFresnelBias;", "uniform float mFresnelScale;", "uniform float mFresnelPower;", "varying vec3  vReflect;", "varying vec3  vRefract[3];", "varying float vReflectionFactor;", "void main() {", "vec4 mvPosition	= modelViewMatrix * vec4( position, 1.0 );", "vec4 worldPosition	= modelMatrix*1.3 * vec4( position, 1.0 );", "vec3 worldNormal	= normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );", "vec3 I		= worldPosition.xyz - cameraPosition;", "vReflect	= reflect( I, worldNormal );", "vRefract[0]	= refract( normalize( I ), worldNormal, mRefractionRatio * 0.986 );", "vRefract[1]	= refract( normalize( I ), worldNormal, mRefractionRatio * 0.987 );", "vRefract[2]	= refract( normalize( I ), worldNormal, mRefractionRatio * 0.988 );", "vReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), mFresnelPower);", "gl_Position	= projectionMatrix * mvPosition;", "}"].join("\n"),

	fragmentShader: ["uniform samplerCube tCube;", "varying vec3 vReflect;", "varying vec3 vRefract[3];", "varying float vReflectionFactor;", "void main() {", "vec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, -vReflect.yz ) );", "vec4 refractedColor = vec4( 0.97 );", "refractedColor.r = textureCube( tCube, vec3( vRefract[0].x, vRefract[0].yz ) ).r;", "refractedColor.g = textureCube( tCube, vec3( vRefract[1].x, vRefract[1].yz ) ).g;", "refractedColor.b = textureCube( tCube, vec3( vRefract[2].x, vRefract[2].yz ) ).b;",

	//"gl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.5, 0.1 ) );",
	"gl_FragColor = mix( refractedColor*0.94, reflectedColor, clamp( vReflectionFactor, 0.5, 0.15 ) );", "}"].join("\n")

};

},{}]},{},[1,2]);
