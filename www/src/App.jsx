import { useState } from 'react'
import  "./styl/App.styl";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <h1>Conversor PDF-IMG</h1>
      <div className="app__button">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
      </div>
      <div className='app__pdf'>

      </div>
      <div className='app__convert-opts'>
        <h2>Opções de conversão</h2>
        <div><p>Digite o DPI</p></div>
        <div><input type="number" className='app__input' placeholder='DPI recomendado 300'/></div>
        <div><p>Selecione o formato da imagem</p></div>
        <div>PNG <input type="checkbox" /></div>
        <div>JPEG <input type="checkbox" /></div>
      </div>    
    </div>
  )
}

export default App
