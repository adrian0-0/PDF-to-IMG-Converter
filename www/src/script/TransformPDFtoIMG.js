import { TransformPDFtoHTML } from "./TransformPDFtoHTML.js";
import { exec, execSync } from "child_process";
import util from "util";

class TransformPDFtoIMG extends TransformPDFtoHTML {
  constructor(data, data_time, cacheData, ticketNum) {
    super(data, data_time, cacheData, ticketNum);
    this.__data = data;
    this.__data_time = data_time;
    this.__cacheData = cacheData;
    this.__ticketNum = ticketNum;
  }

  async exec_TransformPDFtoHTML() {
    let page_num = await this.convert();
    await super.exec_PDFtoHTML(page_num);
  }

  async convert() {
    const dist = "dist";
    let output =
      `cd www/src/server/api/api_output` +
      ` && pdftoppm ./${this.__ticketNum}.pdf -f 1000000 2>&1 | grep -o '([0-9]*)\.$' \| grep -o '[0-9]*'` +
      ` && cd ./${dist} ` +
      ` && pdftoppm -${this.__data.select_extension} -rx ${this.__data.rangeValue} -ry ${this.__data.rangeValue} -scale-to-x ${this.__data.select_dimension[0]} -scale-to-y ${this.__data.select_dimension[1]} ../${this.__ticketNum}.pdf page`;
    const exec_convert = util.promisify(exec);
    const { stdout, stderr } = await exec_convert(output);
    return stdout;
  }
}

export { TransformPDFtoIMG };
