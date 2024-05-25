import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import * as THREE from 'three'
import './index.css'
import grid from './assets/myGrid.jpg'

const canvas = document.getElementById("background");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
  canvas: document.querySelector("#background"),
  alpha: true
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ( 30 );

renderer.render( scene, camera );

const gridTexture = new THREE.TextureLoader().load(grid);

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry( 15, 32, 16 ),
  new THREE.MeshBasicMaterial({ 
    color: 0xF6F969, 
    wireframe: true 
  })
);

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry( 130, 25 ),
  new THREE.MeshBasicMaterial({
    map: gridTexture
  })
);

plane.rotateX(-45);
plane.position.setY(-20);

scene.add(sphere);
scene.add(plane);

function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.x += 0.005;
  sphere.rotation.y += 0.001;
  sphere.rotation.z += 0.005;


  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
