import jwt from 'jsonwebtoken';
import User from '../models/User';

import authConfig from '../../config/auth';

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
        return res.status(401).json({
          error: 'Usuario não encontrado',
        });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({
          error: 'Senha incorreta',
        });
      }

      const { uid, name } = user;

      return res.json({
        success: true,
        user: {
          uid,
          name,
          email,
        },
        token: jwt.sign({ uid }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (error) {
      return res.json({
        success: false,
        error: 'Não foi possível realizar o login. Por favor, tente novamente.',
      });
    }
  }
}

export default new AuthController();
