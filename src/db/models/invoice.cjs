'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Invoice.init({
    membership_is: DataTypes.INTEGER,
    transaction_type_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    total_amount: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};