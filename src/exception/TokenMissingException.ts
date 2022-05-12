import AuthException from './AuthException';

class TokenMissingException extends AuthException {
  constructor() {
    super(401, 'Authentication token missing');
  }
}

export default TokenMissingException;