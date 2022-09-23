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
      <Header></Header>
      <main>
        <div className="main">
          <div className="app__block">
            <div className="app__background">
              <h1>Conversor PDF-IMG</h1>
              <div className="main__button">
                {/* <button onClick={() => setCount((count) => count + 1)}>
                  count is {count}
                </button> */}
              </div>
              <div className="main__convert-opts">
                <h2>Opções de conversão</h2>
                <Range></Range>
                <label htmlFor="extensão">
                  Selecione um formato de imagem:{" "}
                </label>
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
                  <Button
                    variant="outline-primary"
                    type="submit"
                    className="button"
                  >
                    Selecionar Arquivo PDF
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
