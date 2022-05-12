import HttpException from "./HttpException";

class DataNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `No data found for ${id}`);
  }
}

export default DataNotFoundException;