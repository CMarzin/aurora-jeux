export default () => {
      var scene = new THREE.Scene();
      scene.background = new THREE.Color( 0xffffff );
			var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

      camera.position.z = 5;


      var material	= new THREEx.BubbleMaterial()
      var geometry	= new THREE.SphereGeometry(0.5, 32, 16)
      var mesh	= new THREE.Mesh(geometry, material)
      scene.add(mesh)
      // position the mesh
      mesh.position.x = 0
      mesh.position.y = 0
      mesh.position.z = 0
      mesh.material.defaultAttributeValues.color = [244, 67, 54];
      
      // set the scale of the mesh
      // mesh.scale.multiplyScalar( Math.random() * 1 + 1 );

      console.log('mesh', mesh.material.defaultAttributeValues.color);
      console.log('material', material)
      window.addEventListener('keydown', (event) => {

        switch (event.which) {
          case 32:    
            mesh.position.y =  mesh.position.y + 1
            break;
        
          default:
            break;
        }
        event.preventDefault();
      })

			var animate = function () {
				requestAnimationFrame( animate );

				renderer.render(scene, camera);
			};

			animate();
}