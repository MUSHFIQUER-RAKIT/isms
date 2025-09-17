export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("clients_tb", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
    },
    job: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    isactive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("clients_tb");
}
