import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';
import ApiResult from '../utils/ApiResult';

class AuthController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        const response = ApiResult.parseError(false, 'incorrectUser');
        return res.status(ApiResult.UNAUTHORIZED).json(response);
      }

      if (!(await user.checkPassword(password))) {
        const response = ApiResult.parseError(false, 'incorrectPassw');
        return res.status(ApiResult.UNAUTHORIZED).json(response);
      }

      const { uid, name, type } = user;

      return res.status(ApiResult.OK).json({
        success: true,
        message: 'Login realizado com sucesso', // TODO usar 'loginSuccess' de SuccessCodes
        user: {
          uid,
          name,
          email,
          type,
        },
        token: jwt.sign({ uid }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (error) {
      const response = ApiResult.parseError(false, 'authLogin', error.message);
      return res.status(ApiResult.NOT_FOUND).json(response);
    }
  }
}

export default new AuthController();
