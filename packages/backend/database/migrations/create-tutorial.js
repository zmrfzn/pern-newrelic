'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tutorials', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      author: {
        type: Sequelize.STRING,
        allowNull: true
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true
      },
      published: {
        type: Sequelize.BOOLEAN
      },
      readTime: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'Estimated read time in minutes'
      },
      difficulty: {
        type: Sequelize.ENUM('beginner', 'intermediate', 'advanced'),
        defaultValue: 'beginner',
        allowNull: true
      },
      tags: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Comma-separated tags'
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      viewCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tutorials');
  }
};