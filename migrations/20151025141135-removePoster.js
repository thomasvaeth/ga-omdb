'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('favorites', 'poster');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('favorites', 'poster', Sequelize.STRING);
  }
};