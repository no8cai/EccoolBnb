'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ReviewImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reviewId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Reviews' },
        onDelete: 'CASCADE'
      },
      url: {
        type: Sequelize.STRING(1000),
        unique:true
      },
      createdAt: {
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        type: Sequelize.DATE
      }
    },options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    await queryInterface.dropTable(options,options);
  }
};