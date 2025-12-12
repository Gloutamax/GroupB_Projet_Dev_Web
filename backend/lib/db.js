const { Sequelize } = require("sequelize");

const connection = new Sequelize(process.env.DATABASE_URL);

const DB = {
  connection: null,
  getConnection: async () => {
    if (DB.connection) return DB.connection;

    await connection.authenticate();
    console.log("Database connected");
    DB.connection = connection;
    return connection;
  },
};

module.exports = DB;
module.exports.connection = connection;
