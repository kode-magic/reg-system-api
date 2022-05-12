import HttpException from "./HttpException";

export class OtpExpiredException extends HttpException {
  constructor(otp: string) {
    super(401, `The OTP code: ${otp} has expired.`);
  }
}

export class OtpUsedException extends HttpException {
  constructor(otp: string) {
    super(401, `The OTP code: ${otp} has already been used.`);
  }
}