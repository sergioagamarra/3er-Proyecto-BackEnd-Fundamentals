'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.User, {as: "sender", foreignKey: "idSender", otherKey:"idSender", through: models.Message});
      User.belongsToMany(models.User, {as: "receiver", foreignKey: "idReceiver", otherKey:"idReceiver", through: models.Message});
      //User.belongsToMany(models.User, { as: "sender", through: models.Message});
      //User.belongsToMany(models.User, { as: "receiver", foreignKey: "idReceiver", through: models.Message});
      // User.hasMany(models.Message);
      
    }
  }
  User.init({
    name: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    email: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    profilePic: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};