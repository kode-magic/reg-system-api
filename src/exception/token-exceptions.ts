import HttpException from "./HttpException";
import AuthException from './AuthException';

export class TokenInvalidException extends HttpException {
  constructor(otp: string) {
    super(401, `Invalid authentication token.`);
  }
}
export class TokenExpiredException extends HttpException {
  constructor() {
    super(401, `Unauthorized, the authentication toke has expired`);
  }
}
export class TokenMissingException extends AuthException {
  constructor() {
    super(401, 'Authentication token missing');
  }
}