// models/client.js
export default (sequelize, DataTypes) => {
  const clients_tb = sequelize.define(
    "clients_tb",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      job: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      isactive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "clients_tb",
      timestamps: false,
    }
  );

  return clients_tb;
};
