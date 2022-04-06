'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idSender: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users", // 'Movies' would also work
          key: 'id'
        }
      },
      idReceiver: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users", // 'Movies' would also work
          key: 'id'
        }
      },
      message: {
        type: Sequelize.STRING
      },
      fecha: {
        type: Sequelize.DATE
      },
      read: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messages');
  }
};