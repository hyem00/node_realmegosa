"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Posts, {
        // 2. Posts 모델에게 1:N 관계 설정을 합니다.
        sourceKey: "user_id", // 3. Users 모델의 userId 컬럼을
        foreignKey: "user_id", // 4. Posts 모델의 UserId 컬럼과 연결합니다.
      });
      this.hasOne(models.Users_profiles, {
        // 2. UserInfos 모델에게 1:1 관계 설정을 합니다.
        sourceKey: "user_id", // 3. Users 모델의 userId 컬럼을
        foreignKey: "user_id", // 4. UserInfos 모델의 UserId 컬럼과 연결합니다.
      });
    }
  }
  Users.init(
    {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      login_type: {
        type: DataTypes.INTEGER,
      },
      login_id: {
        type: DataTypes.STRING,
      },
      login_password: {
        type: DataTypes.STRING,
      },
      kakao_token: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
