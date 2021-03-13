module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('growdevers', {
      uid: {
        allowNull: false,
        type: Sequelize.UUID,
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
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('growdevers');
  },
};
