import Growdever from '../models/Growdever';
import User from '../models/User';
import ApiResult from '../utils/ApiResult';

class UserController {
  async index(req, res) {
    try {
      const { type } = req.body;
      if (type !== 1) {
        const response = ApiResult.parseError(false, 'userUnauth');
        return res.status(ApiResult.UNAUTHORIZED).json(response);
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

      const response = ApiResult.parseResult(true, { users }, 'userIndex');
      return res.status(ApiResult.OK).json(response);
    } catch (error) {
      const response = ApiResult.parseError(false, 'userIndex', error.message);
      return res.status(ApiResult.NOT_FOUND).json(response);
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const user = await User.findByPk(uid, {
        attributes: ['uid', 'name', 'type'],
        include: [
          {
            model: Growdever,
            as: 'user',
            attributes: ['uid', 'email', 'phone', 'program'],
          },
        ],
      });

      if (!user) {
        const response = ApiResult.parseError(false, 'incorrectUser');
        return res.status(ApiResult.NOT_FOUND).json(response);
      }

      const response = ApiResult.parseResult(true, { users }, 'userShow');
      return res.status(ApiResult.OK).json(response);
    } catch (error) {
      const response = ApiResult.parseError(false, 'userShow', error.message);
      return res.status(ApiResult.NOT_FOUND).json(response);
    }
  }

  async store(req, res) {
    try {
      const { name, type } = req.body;
      const userExist = await User.findOne({
        where: {
          name,
        },
      });

      if (userExist) {
        const response = ApiResult.parseError(false, 'userAlreadyRegistered');
        return res.status(ApiResult.CONFLICT).json(response);
      }

      if (type !== 1) {
        const response = ApiResult.parseError(false, 'userUnauth');
        return res.status(ApiResult.UNAUTHORIZED).json(response);
      }

      const user = await User.create(req.body);
      const response = ApiResult.parseResult(true, { user }, 'userStore');
      return res.status(ApiResult.OK).json(response);
    } catch (error) {
      const response = ApiResult.parseError(false, 'userStore', error.message);
      return res.status(ApiResult.NOT_FOUND).json(response);
    }
  }

  async update(req, res) {
    try {
      const { uid } = req.params;
      const { email, oldPassword } = req.body;

      const user = await User.findByPk(uid);

      if (email !== user.email) {
        const response = ApiResult.parseError(false, 'incorrectUser');
        return res.status(ApiResult.UNAUTHORIZED).json(response);
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        const response = ApiResult.parseError(false, 'incorrectPassw');
        return res.status(ApiResult.UNAUTHORIZED).json(response);
      }

      const { name } = await user.update(req.body);

      const response = ApiResult.parseResult(
        true,
        { user: { uid, name, email } },
        'userUpdate'
      );
      return res.status(ApiResult.OK).json(response);
    } catch (error) {
      const response = ApiResult.parseError(false, 'userUpdate', error.message);
      return res.status(ApiResult.NOT_FOUND).json(response);
    }
  }
}

export default new UserController();
