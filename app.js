import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import authRoutes from './routes/authRoutes.js';
import { logger } from './middleware/logger.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { testConnection, syncDatabase } from './config/db.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(logger);
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Test DB connection
    await testConnection();

    // Sync DB and models
    await syncDatabase();

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('❌ Startup error:', err.message || err);
  }
}

startServer();
