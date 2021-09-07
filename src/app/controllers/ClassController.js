import Class from '../models/Class';
import ApiResult from '../utils/ApiResult';

class ClassController {
  async index(req, res) {
    try {
      const classes = await Class.findAll({
        attributes: ['uid', 'name', 'date', 'hour', 'status'],
      });

      const response = ApiResult.parseResult(
        true,
        { classes },
        classes.length === 0 ? 'emptyClass' : 'classIndex'
      );
      return res.status(ApiResult.OK).json(response);
    } catch (error) {
      const response = ApiResult.parseError(false, 'classIndex', error.message);
      return res.status(ApiResult.BAD_REQUEST).json(response);
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const classExists = await Class.findByPk(uid, {
        attributes: ['uid', 'name', 'date', 'hour', 'status'],
      });

      if (!classExists) {
        throw classExists;
      }
      const response = ApiResult.parseResult(
        true,
        { classExists },
        'classShow'
      );
      return res.status(ApiResult.OK).json(response);
    } catch (error) {
      const response = ApiResult.parseError(false, 'classShow', error.message);
      return res.status(ApiResult.BAD_REQUEST).json(response);
    }
  }

  async store(req, res) {
    try {
      const { date, hour } = req.body;
      const classAlreadyExists = await Class.findOne({
        where: {
          date,
          hour,
        },
      });

      if (!classAlreadyExists) {
        const { uid, name, date, hour, status } = await Class.create(req.body);
        const response = ApiResult.parseResult(
          true,
          { newClass: { uid, date, hour, status } },
          'classStore'
        );
        return res.status(ApiResult.OK).json(response);
      }
      throw classAlreadyExists;
    } catch (error) {
      const response = ApiResult.parseError(false, 'classStore', error.message);
      return res.status(ApiResult.BAD_REQUEST).json(response);
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
        throw updated;
      }
      const response = ApiResult.parseResult(true, { updated }, 'classUpdate');
      return res.status(ApiResult.OK).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'classUpdate',
        error.message
      );
      return res.status(ApiResult.BAD_REQUEST).json(response);
    }
  }

  async delete(req, res) {
    try {
      const { uid } = req.params;
      const deleted = await Class.destroy({
        where: { uid },
      });

      if (!deleted) {
        throw deleted;
      }
      const response = ApiResult.parseResult(true, { deleted }, 'classDelete');
      return res.status(ApiResult.OK).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'classDelete',
        error.message
      );
      return res.status(ApiResult.BAD_REQUEST).json(response);
    }
  }
}

export default new ClassController();
