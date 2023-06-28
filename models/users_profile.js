"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Users_profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {
        // 2. Users 모델에게 1:1 관계 설정을 합니다.
        targetKey: "user_id", // 3. Users 모델의 user_id 컬럼을
        foreignKey: "user_id", // 4. User-profile.js 모델의 user_id 컬럼과 연결합니다.
      });
    }
  }
  Users_profiles.init(
    {
      profile_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        unique: true, // UNIQUE
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Users_profiles",
    }
  );
  return Users_profiles;
};
