'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return Promise.all([
      queryInterface.addColumn(
        'trpeminjamans',
        'waktu_diambil',
        {
          type: Sequelize.DATE,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'trpeminjamans',
        'waktu_dikembalikan',
        {
          type: Sequelize.DATE,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'trpeminjamans',
        'denda',
        {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          allowNull:  false,
        }
      )
     ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return Promise.all([
      queryInterface.removeColumn('trpeminjamans','waktu_diambil'),
      queryInterface.removeColumn('trpeminjamans','waktu_dikembalikan'),
      queryInterface.removeColumn('trpeminjamans','denda')
    ])
  }
};
