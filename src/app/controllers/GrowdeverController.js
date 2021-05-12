import Growdever from '../models/Growdever';
import ClassUser from '../models/ClassUser';
import User from '../models/User';
import Class from '../models/Class';
import ApiResult from '../utils/ApiResult';

class GrowdeverController {
  async index(req, res) {
    try {
      const growdevers = await Growdever.findAll({
        attributes: ['uid', 'name', 'email', 'phone', 'program'],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['uid', 'type'],
          },
          {
            model: ClassUser,
            as: 'scheduled_class',
            attributes: ['class_uid'],
            include: [
              {
                model: Class,
                as: 'class',
                attributes: ['date', 'hour', 'status'],
              },
            ],
          },
        ],
      });
      const response = ApiResult.parseResult(
        true,
        { growdevers },
        'growdeverIndex'
      );
      return res.status(ApiResult.OK).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'growdeverIndex',
        error.message
      );
      return res.status(ApiResult.NOT_FOUND).json(response);
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const growdeverExists = await Growdever.findByPk(uid, {
        attributes: ['uid', 'name', 'email', 'phone', 'program'],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['uid', 'type'],
          },
          {
            model: ClassUser,
            as: 'scheduled_class',
            attributes: ['class_uid'],
            include: [
              {
                model: Class,
                as: 'class',
                attributes: ['date', 'hour', 'status'],
              },
            ],
          },
        ],
      });

      if (!growdeverExists) {
        throw error;
      }
      const response = ApiResult.parseResult(
        true,
        { growdeverExists },
        'growdeverShow'
      );
      return res.status(ApiResult.OK).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'growdeverShow',
        error.message
      );
      return res.status(ApiResult.NOT_FOUND).json(response);
    }
  }

  async store(req, res) {
    const t = await Growdever.sequelize.transaction();
    try {
      const growdever = await Growdever.create(req.body, {
        transaction: t,
      });

      const { classes } = req.body;

      await Promise.all(
        classes.map(async (class_uid) => {
          const newClassUser = await ClassUser.create(
            {
              growdever_uid: growdever.uid,
              class_uid,
            },
            { transaction: t }
          );
          return newClassUser;
        })
      );

      await t.commit();

      const response = ApiResult.parseResult(
        true,
        { newClassUser },
        'growdeverStore'
      );
      return res.status(ApiResult.OK).json(response);
    } catch (error) {
      await t.rollback();
      const response = ApiResult.parseError(
        false,
        'growdeverStore',
        error.message
      );
      return res.status(ApiResult.NOT_FOUND).json(response);
    }
  }

  // async store(req, res) {
  //   const t = await Growdever.sequelize.transaction();
  //   try {
  //     // checkPlaces
  //     // const { user_uid, classes } = req.body;
  //     const { classes } = req.body;
  //     const ClassData = await ClassUser.findByPk(classes);
  //     // const a = ClassData.map() ;
  //     // classes.map(async (class_uid) => {
  //     //   await ClassUser.findOne({ where: { classes } });
  //     //   return class_uid;
  //     // });
  //     // growdever.uid
  //     if (1) {
  //       throw `${growdever.uid}`;
  //     }

  //     const growdever = await Growdever.create(req.body, {
  //       transaction: t,
  //     });

  //     // const { classes } = req.body;

  //     await Promise.all(
  //       classes.map(async (class_uid) => {
  //         const newClassUser = await ClassUser.create(
  //           {
  //             growdever_uid: growdever.uid,
  //             class_uid,
  //           },
  //           { transaction: t }
  //         );
  //         return newClassUser;
  //       })
  //     );

  //     await t.commit();
  //     return res.status(201).json({
  //       success: true,
  //     });
  //   } catch (error) {
  //     await t.rollback();
  //     return res.status(ApiResult.NOT_FOUND).json({
  //       success: false,
  //       error,
  //     });
  //   }
  // }

  async update(req, res) {
    try {
      const { uid } = req.params;
      const [updated] = await Growdever.update(req.body, {
        where: { uid },
      });

      if (!updated) {
        throw error;
      }
      const response = ApiResult.parseResult(
        true,
        { updated },
        'growdeverUpdate'
      );
      return res.status(ApiResult.OK).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'growdeverUpdate',
        error.message
      );
      return res.status(ApiResult.NOT_FOUND).json(response);
    }
  }

  async delete(req, res) {
    try {
      const { uid } = req.params;
      const deleted = await Growdever.destroy({
        where: { uid },
      });

      if (!deleted) {
        throw error;
      }
      const response = ApiResult.parseResult(
        true,
        { deleted },
        'growdeverDelete'
      );
      return res.status(ApiResult.OK).json(response);
    } catch (error) {
      const response = ApiResult.parseError(
        false,
        'growdeverDelete',
        error.message
      );
      return res.status(ApiResult.NOT_FOUND).json(response);
    }
  }
}

export default new GrowdeverController();
