import { useEffect } from 'react'
import * as THREE from 'three'
import cloudImg from './assets/vaporwaveCloud.png'
import grid from './assets/myGrid.jpg'

function SoundBoard() {
  return (
  <div id="drum-machine">
    <div className="drum-pads">
      <button id="Q" className="drum-pad">Q</button>
      <button id="W" className="drum-pad">W</button>
      <button id="E" className="drum-pad">E</button>
      <button id="A" className="drum-pad">A</button>
      <button id="S" className="drum-pad">S</button>
      <button id="D" className="drum-pad">D</button>
      <button id="Z" className="drum-pad">Z</button>
      <button id="X" className="drum-pad">X</button>
      <button id="C" className="drum-pad">C</button>
    </div>
    <div id="display">Kick-n'-Hat</div>
  </div>
  );
}

export default function App() {
  useEffect(() => {
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

    const gridTexture = new THREE.TextureLoader().load( grid );

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry( 15, 32, 16 ),
      new THREE.MeshBasicMaterial({ 
        color: 0xF6F969, 
        wireframe: true 
      })
    );

    sphere.position.setY(3);

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry( 130, 25 ),
      new THREE.MeshBasicMaterial({
        map: gridTexture
      })
    );

    plane.rotateX(-45);
    plane.position.setY(-20);

    scene.add( sphere );
    scene.add( plane );

    function animate() {
      requestAnimationFrame( animate );

      sphere.rotation.x += 0.005;
      sphere.rotation.y += 0.001;
      sphere.rotation.z += 0.005;


      renderer.render( scene, camera );
    }

    animate();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );
    });
  });
  
  return (
    <>
      <canvas id="background"></canvas>
      <img className="cloud left" src={cloudImg} alt="a cloud"/>
      <img className="cloud right" src={cloudImg} alt="a cloud"/>
      <SoundBoard />
      <div id="title">Drum Machine</div>
    </>
  )
}