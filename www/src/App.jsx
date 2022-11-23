import axios from "axios";
import { useState } from "react";
import "./styl/app.styl";
import Footer from "./Footer";
import Header from "./Header";
import Button from "react-bootstrap/Button";
import Base64 from "./Base64";
import font from "./styl/fonts.styl";
// import DPI_Range from "./DPI_Range";
// import Select_PDF_options from "./Select_PDF_options";
import PDF_URL from "./PDF_URL";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState();
  const urlWithProxy = "/api";
  // axios
  //   .get(urlWithProxy, data)
  //   .then((res) => setData(res.data))
  //   .catch((err) => {
  //     console.error(err);
  //   });

  const get = () => {
    const data = {
      user: {
        email: "teste@gmail.com",
        password: "12345",
        base64: "s",
      },
    };

    axios
      .get(urlWithProxy, data)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="app">
      <Header></Header>
      <main>
        <div className="main">
          <div className="app__block">
            <div className="app__block--child">
              <div className="app__background">
                <h1>Conversor PDF-IMG</h1>
                {/* <div>
                  <button onClick={get}>
                    Access server using proxy
                  </button>
                  <p>data : {data}</p>
                </div> */}
                <div className="main__button">
                  {/* <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                  </button> */}
                </div>
                {/* <div className="main__convert-opts">
                  <h2>Opções de conversão</h2>
                  <DPI_Range></DPI_Range>
                  <Select_PDF_options></Select_PDF_options>
                </div> */}
                <Base64></Base64>
                {/* <div className="main__pdf"> */}
                {/* </div> */}
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
