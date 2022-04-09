'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Message.hasMany(models.User)
      // Message.hasOne(models.User, { as: "sender", foreignKey: "id", through: "Messages" })
      // Message.belongsTo(models.User);
      // Message.belongsTo(Team);
      // Message.belongsTo(models.User);
      //Message.hasOne(models.User,{foreignKey:"id",otherKey:"idSender"})
    }
  }
  Message.init({
    idSender: DataTypes.INTEGER,
    idReceiver: DataTypes.INTEGER,
    message: DataTypes.STRING,
    fecha: DataTypes.DATE,
    read: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};