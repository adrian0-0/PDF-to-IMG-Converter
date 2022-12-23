import axios from "axios";
import { useState } from "react";
import "./styl/app.styl";
import Footer from "./Footer";
import Header from "./Header";
import Button from "react-bootstrap/Button";
import Base64 from "./Base64";
import font from "./styl/fonts.styl";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState();
  const urlWithProxy = "/api";

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
                <div className="main__button"></div>
                <Base64></Base64>
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
