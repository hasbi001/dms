module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    documentId: { type: DataTypes.INTEGER, allowNull: false },
    action: { type: DataTypes.ENUM('DELETE','REPLACE'), allowNull: false },
    status: { type: DataTypes.ENUM('PENDING','APPROVED','REJECTED'), defaultValue: 'PENDING' },
  }, { timestamps: true });

  Permission.associate = (models) => {
    Permission.belongsTo(models.User, { foreignKey: 'userId' });
    Permission.belongsTo(models.Document, { foreignKey: 'documentId' });
  };

  return Permission;
};