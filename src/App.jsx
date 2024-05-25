import cloudImg from './assets/vaporwaveCloud.png'
import gridImg from './assets/vaporwaveGrid.png'

export default function App() {

  return (
    <>
      <img className="cloud left" src={cloudImg} alt="a cloud"/>
      <img className="cloud right" src={cloudImg} alt="a cloud"/>
      <h1>Drum Machine</h1>
    </>
  )
}