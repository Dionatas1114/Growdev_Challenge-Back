import errorCodes from './ErrorCodes';
import successCodes from './SuccessCodes';

class ApiResult {
  static get OK() {
    return 200;
  }

  static get BAD_REQUEST() {
    return 400;
  }

  static get UNAUTHORIZED() {
    return 401;
  }

  static get NOT_FOUND() {
    return 404;
  }

  static get CONFLICT() {
    return 409;
  }

  static parseResult(success, data, message) {
    const successCode = successCodes[message];
    return {
      success,
      message: successCode.message,
      successCode: successCode.code,
      data,
    };
  }

  static parseError(success, from, error = '') {
    const errorCode = errorCodes[from];

    return {
      success,
      message: errorCode.message,
      errorCode: errorCode.code,
      error,
    };
  }
}

export default ApiResult;
