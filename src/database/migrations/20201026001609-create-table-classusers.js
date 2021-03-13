module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('class_users', {
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
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('class_users');
  },
};
