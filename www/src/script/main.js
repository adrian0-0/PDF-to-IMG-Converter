import jsdom from "jsdom";
import sinon from "sinon";
import { mkdir, readdir, readFile, writeFile } from "fs";
const { JSDOM } = jsdom;
import { exec, execSync } from "child_process";
import { download } from "../server/server.js";
import util from "util";
//2166 × 3249

async function convertBase64toImage(data) {
  let data_time = new Date();
  let num_ticket = data_time.getTime();
  let month = (data_time.getMonth() + 1).toString().padStart(2, "0");
  let day = data_time.getDate().toString().padStart(2, "0");
  let cache_data = day + month;

  let pdfFile = "decode.pdf";
  let dist = "dist";
  let pdf_width = data.select_dimension[0];
  let pdf_height = data.select_dimension[1];
  console.log(pdf_width, pdf_height);
  let pdfName = data.pdfName;
  let extension = data.select_extension;
  let dpi = data.rangeValue;
  let readyState = data.readyState;

  const htmlContent = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cárdapio</title>
</head>
<body></body>
</html>
`;
  const dom = new JSDOM(`${htmlContent}`);
  const document = dom.window.document;

  data.pdf_is_stored_locally_boolean == true

    ? await groupBase64toPDF()
    : await groupURLtoPDF();

  async function groupURLtoPDF() {
    await request_file_from_webserver(data, num_ticket);
    console.log("finish_request_file_from_webserver");
    let page_num = await convert(
      num_ticket,
      dist,
      extension,
      dpi,
      pdf_width,
      pdf_height

    );
    await edit__html(page_num, extension, cache_data, dist, document);
    await create__html(dist, document);
    await download();
  }


  async function groupBase64toPDF() {
    await writeBase64(data, num_ticket);
    await base64ToPDF(num_ticket);
    let page_num = await convert(
      num_ticket,
      dist,
      extension,
      dpi,
      pdf_width,
      pdf_height
    );
    await edit__html(page_num, extension, cache_data, dist, document);
    await create__html(dist, document);
    await download();
  }
}

async function request_file_from_webserver(data, num_ticket) {
  let output =
    `cd www/src/server/api_output` +
    ` && wget ${data.pdf_url} -O ${num_ticket}.pdf`;

  const exec_file_from_webserver = util.promisify(exec);
  await exec_file_from_webserver(output);
}
async function writeBase64(data, num_ticket) {
  console.log("initWriteBase64");
  let base64Data = data.base64;
  let base64encoded = base64Data.replace("data:application/pdf;base64,", "");
  const writeBase64file = util.promisify(writeFile);
  await writeBase64file(
    `./www/src/server/api_input/${num_ticket}.b64`,
    base64encoded,
    async function (error) {
      if (error) throw error;
    }
  );
}
async function base64ToPDF(num_ticket) {
  let output =
    `cd www/src/server` +
    ` && base64 --decode --ignore-garbage ./api_input/${num_ticket}.b64 > ./api_output/${num_ticket}.pdf`;


  const exec_base64topdf = util.promisify(exec);
  await exec_base64topdf(output);
}
async function convert(
  num_ticket,
  dist,
  extension,
  dpi,
  pdf_width,
  pdf_height
) {
  let output =
    `cd www/src/server/api_output` +
    ` && pdftoppm ./${num_ticket}.pdf -f 1000000 2>&1 | grep -o '([0-9]*)\.$' \| grep -o '[0-9]*'` +
    ` && cd ./${dist} ` +
    ` && pdftoppm -${extension} -rx ${dpi} -ry ${dpi} -scale-to-x ${pdf_width} -scale-to-y ${pdf_height} ../${num_ticket}.pdf page`;


  const exec_convert = util.promisify(exec);
  const { stdout, stderr } = await exec_convert(output);
  return stdout;
}

//Realiza edições no html como a title
async function edit__html(
  pages,
  extension,
  cache_data,
  standard_folder,
  document
) {
  console.log(pages);
  let pdf_name = "page";
  const extension_name = () => {
    if (extension == "jpeg") {
      let extension_name = extension.replace("e", "");
      return extension_name;
    } else if ((extension = !"jpeg")) {
      return extension;
    }
  };
  let writePromise = new Promise(function (resolve) {
    // document.querySelector("title").innerHTML = `${jsonData.title}`;

    let count_page = 1;
    // Numera as paginas convertidas no html e realiza outras alterações seguindo o pdf convertido
    if (pages > 9) {
      for (let count_edit = 0; count_edit < pages; count_edit++) {
        let page_format = count_page.toString().padStart(2, "0");
        document.querySelector("body").innerHTML += `
        <img src="./${pdf_name}-${page_format}.${extension_name()}?t=${cache_data}" loading="lazy"  alt="" style="width: 100%; max-width: none;"><br>`;
        count_page++;
      }
    } else if (pages <= 9) {
      for (let count_edit = 0; count_edit < pages; count_edit++) {
        document.querySelector("body").innerHTML += `
        <img src="./${pdf_name}-${count_page}.${extension_name()}?t=${cache_data}"  loading="lazy" alt="" style="width: 100%; max-width: none;"><br>`;
        count_page++;
      }
    }

    resolve();
  });
}
//Cria o arquivo html com as alterações já recebidas
async function create__html(standard_folder, document) {
  const writeBase64file = util.promisify(writeFile);
  await writeBase64file(
    `www/src/server/api_output/${standard_folder}/index.html`,
    document.documentElement.innerHTML,
    function (error) {
      if (error) throw error;
    }
  );
}

function message() {
  return "OK";
}

export { message, convertBase64toImage };
