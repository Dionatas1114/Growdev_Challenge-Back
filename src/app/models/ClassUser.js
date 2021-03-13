import Sequelize, { Model } from 'sequelize';

class ClassUser extends Model {
  static init(sequelize) {
    super.init(
      {
        growdever_uid: {
          allowNull: false,
          type: Sequelize.UUID,
          primaryKey: true,
          references: {
            model: 'growdevers',
            key: 'uid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        class_uid: {
          allowNull: false,
          type: Sequelize.UUID,
          primaryKey: true,
          references: {
            model: 'classes',
            key: 'uid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Growdever, {
      as: 'scheduled_class',
      foreignKey: 'growdever_uid',
    });

    this.belongsTo(models.Class, {
      as: 'class',
      foreignKey: 'class_uid',
    });
  }
}

export default ClassUser;
