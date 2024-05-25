import cloudImg from './assets/vaporwaveCloud.png'
export default function App() {

  return (
    <>
      <img className="left cloud" src={cloudImg} alt="a cloud"/>
      <img className="right cloud" src={cloudImg} alt="a cloud"/>
      <h1>Drum Machine</h1>
    </>
  )
}