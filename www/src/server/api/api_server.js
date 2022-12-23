import express, { response } from "express";
import { readFile, writeFile, readdirSync } from "fs";
import { message } from "../../script/message.js";
import { RequestData } from "../../script/RequestData.js";
import { OAuth2Client } from "google-auth-library";
import { readFileSync } from "fs";
import bodyParser from "body-parser";
import admzip from "adm-zip";
import path from "path";
import { fileURLToPath } from "url";
import util from "util";
import cors from "cors";

const port = 5000;
const app = express();

//App.use é usado para declarar modulos do express, sendo este necessário quando requisitado
//O app.use(express.json()) é necessário sempre que a gente quer que nosso servidor receba dados no formato JSON
//basicamente o servidor tem que saber como tratar os dados enviados, senão.. como ele vai entender, ne nao?
let urlencodedParser = bodyParser.urlencoded({
  limit: "50mb",
  extended: false,
});
let jsonParser = bodyParser.json({ limit: "50mb" });
app.use(urlencodedParser);
app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const date = new Date();
const zip_num = date.getTime();
const file_after_download = `${zip_num}downloaded_file.zip`;
const zip_path = `./www/src/server/api/api_output/dist/${file_after_download}`;

app.get("/api", (req, res) => {
  res.send(message());
  console.log(message());
});

app.get("/oauth", (req, res) => {
  res.send(message());
  console.log(message());
});

app.post("/oauth", urlencodedParser, (req, res) => {
  const data = JSON.parse(JSON.stringify(req.body.user));
  const client = new OAuth2Client(data.CLIENT_ID);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: data.JWT,
      audience: data.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    // If request specified a G Suite domain:
    const domain = payload["hd"];
  }
  console.log(client);
  verify().catch(console.error);
});

// o metódo post foi criado para solucionar o ERRO 404 devido a sua não declaração quando chamado pelo axios
// o que estava acontecendo antes era que a gente tava tentando enviar dados para a api usando um metodo post
// mas como a rota nao existia ainda, o server enviava justamente uma resposta de not found (codigo 404)
// o req.body server para printar os dados requisitados
app.post("/api", urlencodedParser, async (req, res) => {
  const data = JSON.parse(JSON.stringify(req.body.user));
  const promisse = new Promise(async (resolve, reject) => {
    let data_time = new Date();
    const request_Data = new RequestData(data, data_time);
    await request_Data.execTypeofConversion();
    resolve();
  });

  promisse
    .then((response) => {
      res.send(message());
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/emporio", (req, res) => {
  readFile(`www/public/emporio.json`, (err, data) => {
    if (err) throw err;
    let jsonData = JSON.parse(data);

    res.json(jsonData);
  });
});

app.get("/", async (req, res) => {
  res.download(zip_path);
  console.log(message());
});

async function download() {
  var zp = new admzip();
  let to_zip = readdirSync(`${__dirname}/api_output/dist`);

  to_zip.forEach((element) => {
    zp.addLocalFile(`${__dirname}/api_output/dist/${element}`);
  });

  const writeZipfile = util.promisify(writeFile);
  await writeZipfile(zip_path, zp.toBuffer(), function (error) {
    if (error) throw error;
  });
}

app.listen(port, () =>
  console.log(`start listening on port : http://localhost:${port}/api`)
);

export { download };
