import { useEffect } from 'react'
import * as THREE from 'three'
import cloudImg from './assets/Images/vaporwaveCloud.png'
import grid from './assets/Images/myGrid.jpg'
import heater1 from './assets/Audio/Heater 1.mp3'
import heater2 from './assets/Audio/Heater 2.mp3'
import heater3 from './assets/Audio/Heater 3.mp3'
import heater4 from './assets/Audio/Heater 4.mp3'
import clap from './assets/Audio/Clap.mp3'
import kick from './assets/Audio/Kick.mp3'
import kicknHat from './assets/Audio/Kick-n\'-Hat.mp3'
import openHH from './assets/Audio/Open-HH.mp3'
import closedHH from './assets/Audio/Closed-HH.mp3'

function DrumPad({ id, audio }) {
  const handleClick = () => {
    const audio = document.querySelector(`audio[ id="${ id }" ]`); 
    audio.play();
  };

  return (
    <button id={ id } className="drum-pad" onClick={ handleClick }><audio id={ id } src={ audio }></audio>{ id }</button>
  );
}

function SoundBoard() {

  return (
  <div id="drum-machine">
    <div className="drum-pads">
      <DrumPad id="Q" audio={ heater1 } />
      <DrumPad id="W" audio={ heater2 } />
      <DrumPad id="E" audio={ heater3 } />
      <DrumPad id="A" audio={ heater4 } />
      <DrumPad id="S" audio={ clap } />
      <DrumPad id="D" audio={ openHH } />
      <DrumPad id="Z" audio={ kicknHat } />
      <DrumPad id="X" audio={ kick } />
      <DrumPad id="C" audio={ closedHH } />
    </div>
    <div id="display"></div>
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
      <div id="title">Drum Machine</div>
      <SoundBoard />
    </>
  )
}