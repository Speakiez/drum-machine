import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import * as THREE from 'three'
import './index.css'

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

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry( 15, 32, 16 ),
  new THREE.MeshBasicMaterial({ 
    color: 0xF6F969, 
    wireframe: true 
  })
);

scene.add(sphere);

function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.x += 0.005;
  sphere.rotation.y += 0.001;
  sphere.rotation.z += 0.005;


  renderer.render(scene, camera);
}

animate();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
