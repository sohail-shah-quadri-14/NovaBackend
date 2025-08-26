import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false,
    pool: {
      max: 10,
      min: 2,
      acquire: 20000,
      idle: 10000,
    },
  }
);

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected with Sequelize');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    process.exit(1);
  }
};

// Sync all models
export const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); 
    console.log('✅ Database & models synced!');
  } catch (error) {
    console.error('❌ Error syncing database:', error.message);
  }
};

export default sequelize;
