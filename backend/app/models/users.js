module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('USER','ADMIN'), defaultValue: 'USER' },
  }, { timestamps: true });

  User.associate = (models) => {
    User.hasMany(models.Document, { foreignKey: 'createdBy' });
    User.hasMany(models.Permission, { foreignKey: 'userId' });
    User.hasMany(models.Notification, { foreignKey: 'userId' });
  };

  return User;
};