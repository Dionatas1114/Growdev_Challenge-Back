import Class from '../models/Class';

class ClassController {
  async index(req, res) {
    try {
      const classes = await Class.findAll({
        attributes: ['uid', 'date', 'hour', 'status'],
      });
      return res.status(200).json({
        success: true,
        classes,
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
      const classExists = await Class.findByPk(uid, {
        attributes: ['uid', 'date', 'hour', 'status'],
      });

      if (!classExists) {
        throw 'Aula não encontrada';
      }
      return res.status(200).json({
        success: true,
        classExists,
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
      const newClass = await Class.create(req.body);
      return res.status(201).json({
        success: true,
        newClass,
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
      const [updated] = await Class.update(req.body, {
        where: {
          uid,
        },
      });

      if (!updated) {
        throw 'erro ao atualizar os dados';
      }
      return res.status(200).json({
        success: true,
        updated,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error,
      });
    }
  }

  async delete(req, res) {
    try {
      const { uid } = req.params;

      const deleted = await Class.destroy({
        where: { uid },
      });

      if (!deleted) {
        throw 'Aula não encontrada';
      }
      return res.status(200).json({
        success: true,
        deleted,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error,
      });
    }
  }
}

export default new ClassController();
