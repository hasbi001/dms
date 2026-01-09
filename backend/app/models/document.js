module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    documentType: DataTypes.STRING,
    fileUrl: { type: DataTypes.STRING, allowNull: false },
    version: { type: DataTypes.INTEGER, defaultValue: 1 },
    status: { type: DataTypes.ENUM('ACTIVE','PENDING_DELETE','PENDING_REPLACE'), defaultValue: 'ACTIVE' },
    createdBy: { type: DataTypes.INTEGER, allowNull: false },
  }, { timestamps: true });

  Document.associate = (models) => {
    Document.belongsTo(models.User, { foreignKey: 'createdBy' });
    Document.hasMany(models.Permission, { foreignKey: 'documentId' });
  };

  return Document;
};