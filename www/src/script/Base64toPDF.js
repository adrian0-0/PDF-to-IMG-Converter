import { TransformPDFtoIMG } from "./TransformPDFtoIMG.js";
import { exec, execSync } from "child_process";
import util from "util";
import { writeFile } from "fs";

class Base64toPDF {
  constructor(data, data_time, cacheData, ticketNum) {
    this.__data = data;
    this.__data_time = data_time;
    this.__cacheData = cacheData;
    this.__ticketNum = ticketNum;
  }

  async createBase64File() {
    let base64Data = this.__data.base64;
    let base64encoded = base64Data.replace("data:application/pdf;base64,", "");
    const writeBase64file = util.promisify(writeFile);
    await writeBase64file(
      `./www/src/server/api/api_input/${this.__ticketNum}.b64`,
      base64encoded,
      async function (error) {
        if (error) throw error;
      }
    );
    await this.base64toPDF();
  }
  async base64toPDF() {
    let output =
      `cd www/src/server/api` +
      ` && base64 --decode --ignore-garbage ./api_input/${this.__ticketNum}.b64 > ./api_output/${this.__ticketNum}.pdf`;

    const exec_base64topdf = util.promisify(exec);
    await exec_base64topdf(output);
    const data_of_PDFtoIMG = new TransformPDFtoIMG(
      this.__data,
      this.__data_time,
      this.__cacheData,
      this.__ticketNum
    );
    await data_of_PDFtoIMG.exec_TransformPDFtoHTML();
  }
}
export { Base64toPDF };
