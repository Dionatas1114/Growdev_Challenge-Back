import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import ApiResult from '../utils/ApiResult';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const response = ApiResult.parseError(false, 'tokenNotFound');
    return res.status(ApiResult.UNAUTHORIZED).json(response);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.secret);
    req.userUid = decoded.uid;
    next();
  } catch (error) {
    const response = ApiResult.parseError(false, 'invalidToken', error.message);
    return res.status(ApiResult.UNAUTHORIZED).json(response);
  }
};
