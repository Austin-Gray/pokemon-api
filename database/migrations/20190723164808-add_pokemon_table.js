module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pokemon', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      external_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sprite: {
        type: Sequelize.STRING,
        allowNull: true
      },
      types: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('pokemon')
}