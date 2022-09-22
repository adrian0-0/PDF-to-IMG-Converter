import { useState } from "react";
import "./styl/app.styl";
import Footer from "./Footer";
import Header from "./Header";
import Button from "react-bootstrap/Button";
import Range from "./Range";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <div className="app__background">
        <Header></Header>
        <main>
          <Range></Range>
          <div className="main">
            <h1>Conversor PDF-IMG</h1>
            <div className="main__button">
              {/* <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
              </button> */}
            </div>
            <div className="main__convert-opts">
              <h2>Opções de conversão</h2>
              <div className="convert-opts--textDPI">
                <p>Digite o DPI</p>
              </div>
              <div>
                <input
                  type="number"
                  className="main__input"
                  placeholder="DPI recomendado 300"
                />
              </div>

              <label htmlFor="extensão">Selecione um formato de imagem: </label>
              <select
                name="extensão"
                placeholder="Selecione o formato da imagem"
              >
                <option value="jpg">JPG</option>
                <option value="png">PNG</option>
              </select>
            </div>
            <div className="main__pdf">
              <div className="main__pdf--submit">
                <Button type="submit" className="button"></Button>
                <button classname="button" type="submit">
                  Selecionar Arquivo PDF
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
