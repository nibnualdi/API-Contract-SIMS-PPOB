import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const databaseName = process.env.DATABASE_NAME;
const userNameDatabase = process.env.USERNAME_DATABASE || "root";
const passDatabase = process.env.PASS_DATABASE || undefined;
const hostDatabase = process.env.HOST_DATABASE || "localhost";
const dialectDatabase = process.env.DIALECT_DATABASE || "mysql";

const sequelize = new Sequelize(databaseName, userNameDatabase, passDatabase, {
  host: hostDatabase,
  dialect: dialectDatabase,
});

const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

checkConnection();

export default sequelize;