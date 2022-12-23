import { exec, execSync } from "child_process";
import util from "util";
import { TransformPDFtoIMG } from "./TransformPDFtoIMG.js";

class URLtoPDF {
  constructor(data, data_time, cacheData, ticketNum) {
    this.__data = data;
    this.__data_time = data_time;
    this.__cacheData = cacheData;
    this.__ticketNum = ticketNum;
  }

  async exec_ConvertPDFtoIMG() {
    const data_of_TransformPDFtoIMG = new TransformPDFtoIMG(
      this.__data,
      this.__data_time,
      this.__cacheData,
      this.__ticketNum
    );
    await this.requestPDF_from_webserver();
    await data_of_TransformPDFtoIMG.exec_TransformPDFtoHTML();
  }

  async requestPDF_from_webserver() {
    let output =
      `cd www/src/server/api/api_output` +
      ` && wget ${this.__data.pdf_url} -O ${this.__ticketNum}.pdf`;

    const exec_file_from_webserver = util.promisify(exec);
    await exec_file_from_webserver(output);
  }
}
export { URLtoPDF };
