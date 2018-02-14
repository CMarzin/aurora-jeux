export default (renderer) => {
  // build the scene
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  const scene = new THREE.Scene();

  //////////////////////////////////////////////////////////////////////////////////
  //		add a skybox							//
  //////////////////////////////////////////////////////////////////////////////////
  const shader = THREE.ShaderLib["cube"];
  shader.uniforms["tCube"].value = getTextureCube();
  const material = new THREE.ShaderMaterial({
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: shader.uniforms,
    side: THREE.BackSide
  })
  const geometry = new THREE.CubeGeometry(5000, 500, 500)
  const meshSkybox = new THREE.Mesh(geometry, material);
  scene.add(meshSkybox);

  return scene;
}


export const getTextureCube = () => {
  const format = '.jpg'

  const textureCube = new THREE.CubeTextureLoader()
    .setPath("images/")
    .load([
      'posx' + format, 'negx' + format,
      'posy' + format, 'negy' + format,
      'posz' + format, 'negz' + format
    ])
  textureCube.format = THREE.RGBFormat

  return textureCube
}

