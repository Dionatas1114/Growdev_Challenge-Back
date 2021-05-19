import ApiResult from './ApiResult';

export function errorMsg(msg) {
  return ApiResult.parseError(false, `${msg}`).message;
}
