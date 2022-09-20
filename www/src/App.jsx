import { useState } from 'react'
import  "./styl/app.styl";
import Footer from './Footer'
import Header from './Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <Header></Header>
      
      <main>
        <div className='main'>
          <h1>Conversor PDF-IMG</h1>
          <div className="app__button">
            {/* <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button> */}
          </div>
          <div className='app__convert-opts'>
            <h2>Opções de conversão</h2>
            <div><p>Digite o DPI</p></div>
            <div><input type="number" className='app__input' placeholder='DPI recomendado 300'/></div>
        
            <label htmlFor="extensão">Selecione um formato de imagem: </label>
            <select name="extensão" placeholder='Selecione o formato da imagem'>
              <option value="jpg">JPG</option>
              <option value="png">PNG</option>
            </select>
        
          </div>
          <div className='app__pdf'>
            <button type='submit'>Selecionar Arquivo PDF</button>
          </div>
        </div>
      </main>
      <footer>
        <div className='footer'></div>
        <Footer></Footer>
      </footer>

    </div>
  )
}

export default App
