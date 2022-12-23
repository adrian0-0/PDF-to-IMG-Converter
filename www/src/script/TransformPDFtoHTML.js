import jsdom from "jsdom";
import { writeFile } from "fs";
import util from "util";
import { download } from "../server/server.js";
import { htmlContent } from "./template/htmlContent.js";

class TransformPDFtoHTML {
  constructor(data, data_time, cacheData, ticketNum) {
    this.__data = data;
    this.__data_time = data_time;
    this.__cacheData = cacheData;
    this.__ticketNum = ticketNum;
  }

  async exec_PDFtoHTML(pages) {
    const { JSDOM } = jsdom;
    const dom = new JSDOM(`${htmlContent}`);
    const document = dom.window.document;
    await this.editHTML(pages, document);
    await this.createHTML(document);
  }

  async editHTML(pages, document) {
    let pdf_name = "page";
    let extension = this.__data.select_extension;
    const extension_name = () => {
      if (extension == "jpeg") {
        let extension_name = extension.replace("e", "");
        return extension_name;
      } else if (extension != "jpeg") {
        return extension;
      }
    };
    let count_page = 1;
    // Numera as paginas convertidas no html e realiza outras alterações seguindo o pdf convertido
    if (pages > 9) {
      for (let count_edit = 0; count_edit < pages; count_edit++) {
        let page_format = count_page.toString().padStart(2, "0");
        document.querySelector("body").innerHTML += `
          <img src="./${pdf_name}-${page_format}.${extension_name()}?t=${
          this.__cacheData
        }" loading="lazy"  alt="" style="width: 100%; max-width: none;"><br>`;
        count_page++;
      }
    } else if (pages <= 9) {
      for (let count_edit = 0; count_edit < pages; count_edit++) {
        document.querySelector("body").innerHTML += `
          <img src="./${pdf_name}-${count_page}.${extension_name()}?t=${
          this.__cacheData
        }"  loading="lazy" alt="" style="width: 100%; max-width: none;"><br>`;
        count_page++;
      }
    }
  }
  async createHTML(document) {
    const writeBase64file = util.promisify(writeFile);
    await writeBase64file(
      `www/src/server/api_output/dist/index.html`,
      document.documentElement.innerHTML,
      function (error) {
        if (error) throw error;
      }
    );
    await download();
  }
}
export { TransformPDFtoHTML };
