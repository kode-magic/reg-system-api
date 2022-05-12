import { ApolloError } from "apollo-server-express";

class HttpException extends ApolloError {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default HttpException;