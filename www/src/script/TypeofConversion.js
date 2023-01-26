import { Base64toPDF } from "./Base64toPDF.js";
import { URLtoPDF } from "./URLtoPDF.js";

class TypeofConversion {
  constructor(data, data_time) {
    this.__data = data;
    this.__data_time = data_time;
  }

  async whichTypeofConversion(cacheData, ticketNum) {
    const data_of_Base64toPDF = new Base64toPDF(
      this.__data,
      this.__data_time,
      cacheData,
      ticketNum
    );
    const data_of_URLtoPDF = new URLtoPDF(
      this.__data,
      this.__data_time,
      cacheData,
      ticketNum
    );
    this.__data.pdf_is_stored_locally_boolean == true
      ? await data_of_Base64toPDF.createBase64File()
      : await data_of_URLtoPDF.exec_ConvertPDFtoIMG();
  }
}

export { TypeofConversion };
