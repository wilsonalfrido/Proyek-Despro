'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trpeminjaman extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  trpeminjaman.init({
    id_peminjam: DataTypes.INTEGER,
    tgl_pinjam: DataTypes.DATE,
    tgl_kembali: DataTypes.DATE,
    qrcode: DataTypes.STRING,
    id_alat: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    url_qr_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'trpeminjaman',
  });
  return trpeminjaman;
};