'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class msAlatLab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  msAlatLab.init({
    namaAlat: DataTypes.STRING,
    lokasiAlat: DataTypes.STRING,
    statusAlat: DataTypes.INTEGER,
    url: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'msAlatLab',
  });
  return msAlatLab;
};