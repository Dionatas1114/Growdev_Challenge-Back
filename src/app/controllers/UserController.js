import Growdever from '../models/Growdever';
import User from '../models/User';
import ApiResult from '../utils/ApiResult';

class UserController {
  async index(req, res) {
    try {
      const { type } = req.body;
      if (type !== 1) {
        const response = ApiResult.parseError(false, 'userUnauth');
        return res.status(ApiResult.FORBIDDEN).json(response);
      }

      const users = await User.findAll({
        attributes: ['uid', 'name', 'type'],
        include: [
          {
            model: Growdever,
            as: 'user',
            attributes: ['uid', 'email', 'phone', 'program'],
          },
        ],
      });

      const response = ApiResult.parseResult(
        true,
        { users },
        users.length === 0 ? 'empytUser' : 'userIndex'
      );
      return res.status(ApiResult.OK).json(response);
    } catch (error) {
      const response = ApiResult.parseError(false, 'userIndex', error.message);
      return res.status(ApiResult.BAD_REQUEST).json(response);
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const userExists = await User.findByPk(uid, {
        attributes: ['uid', 'name', 'type'],
        include: [
          {
            model: Growdever,
            as: 'user',
            attributes: ['uid', 'email', 'phone', 'program'],
          },
        ],
      });

      if (!userExists) throw res;

      const response = ApiResult.parseResult(true, { userExists }, 'userShow');
      return res.status(ApiResult.OK).json(response);
    } catch (error) {
      const response = ApiResult.parseError(false, 'userShow', error.message);
      return res.status(ApiResult.BAD_REQUEST).json(response);
    }
  }

  async store(req, res) {
    try {
      const { uid, name, email, type } = req.body;

      const userExistsByName = await User.findOne({ where: { name } });
      const userExistsByEmail = await User.findOne({ where: { email } });

      if (userExistsByName) {
        const response = ApiResult.parseError(
          false,
          'userNameAlreadyRegistered'
        );
        return res.status(ApiResult.CONFLICT).json(response);
      }

      if (userExistsByEmail) {
        const response = ApiResult.parseError(
          false,
          'userEmailAlreadyRegistered'
        );
        return res.status(ApiResult.CONFLICT).json(response);
      }

      await User.create(req.body);

      const response = ApiResult.parseResult(
        true,
        { user: { uid, name, email, type } },
        'userStore'
      );
      return res.status(ApiResult.OK).json(response);
    } catch (error) {
      const response = ApiResult.parseError(false, 'userStore', error.message);
      return res.status(ApiResult.BAD_REQUEST).json(response);
    }
  }

  async update(req, res) {
    try {
      const { uid } = req.params;
      const { name, email, oldPassword } = req.body;

      const user = await User.findByPk(uid);

      if (email !== user.email) {
        const response = ApiResult.parseError(false, 'incorrectUser');
        return res.status(ApiResult.UNAUTHORIZED).json(response);
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        const response = ApiResult.parseError(false, 'incorrectPassw');
        return res.status(ApiResult.UNAUTHORIZED).json(response);
      }

      await user.update(req.body);

      const response = ApiResult.parseResult(
        true,
        { user: { uid, name, email } },
        'userUpdate'
      );
      return res.status(ApiResult.OK).json(response);
    } catch (error) {
      const response = ApiResult.parseError(false, 'userUpdate', error.message);
      return res.status(ApiResult.BAD_REQUEST).json(response);
    }
  }
}

export default new UserController();
