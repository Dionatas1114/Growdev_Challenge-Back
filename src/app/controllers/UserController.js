import Growdever from '../models/Growdever';
import User from '../models/User';

class UserController {
  async index(req, res) {
    try {
      const { type } = req.body;
      if (type !== 1) {
        return res.status(401).json({
          error: 'Você não possui credenciais de administrador',
        });
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
      return res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error,
      });
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
        return res.status(400).json({
          error: 'Usuário não encontrado',
        });
      }
      return res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error,
      });
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
        return res.status(400).json({
          error: 'Usuário já cadastrado',
        });
      }

      if (type !== 1) {
        return res.status(401).json({
          error: 'Você não possui credenciais de administrador',
        });
      }

      const user = await User.create(req.body);

      return res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error,
      });
    }
  }

  async update(req, res) {
    try {
      const { uid } = req.params;
      const { email, oldPassword } = req.body;

      const user = await User.findByPk(uid);

      if (email !== user.email) {
        return res.status(401).json({
          error: 'usuario não encontrado',
        });
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({
          error: 'senha invalida',
        });
      }

      const { name } = await user.update(req.body);
      return res.status(401).json({
        user: { uid, name, email },
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error,
      });
    }
  }
}

export default new UserController();
