import { TypeofConversion } from "./TypeofConversion.js";

class RequestData extends TypeofConversion {
  constructor(data, data_time) {
    super(data, data_time);
    this.__data = data;
    this.__data_time = data_time;
  }

  async execTypeofConversion() {
    const { cacheData, ticketNum } = this.getData();
    await super.whichTypeofConversion(cacheData, ticketNum);
  }

  getData() {
    const cacheData = this.cacheData();
    const ticketNum = this.ticketNum();
    return { cacheData, ticketNum };
  }

  cacheData() {
    let data_time = this.__data_time;
    let month = (data_time.getMonth() + 1).toString().padStart(2, "0");
    let day = data_time.getDate().toString().padStart(2, "0");
    let cache_data = day + month;
    return cache_data;
  }

  ticketNum() {
    let num_ticket = this.__data_time.getTime();
    return num_ticket;
  }
}

export { RequestData };
