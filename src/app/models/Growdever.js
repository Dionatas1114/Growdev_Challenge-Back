import Sequelize, { Model } from 'sequelize';

class Growdever extends Model {
  static init(sequelize) {
    super.init(
      {
        uid: {
          allowNull: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        phone: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        program: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        user_uid: {
          type: Sequelize.UUID,
          references: {
            model: 'users',
            key: 'uid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    );

    // this.addHook('beforeCreate', async (growdever) => {
    //   if (condition) {
    //     a;
    //   }
    // });

    return this;
  }
  // check places available in classes
  // checkPlaces(password) {
  //   return bcrypt.compare(password, this.password_hash);
  // }

  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_uid',
    });

    this.hasMany(models.ClassUser, {
      as: 'scheduled_class',
      foreignKey: 'growdever_uid',
    });
  }
}

export default Growdever;
