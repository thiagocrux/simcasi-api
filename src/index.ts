import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

import { corsMiddleware, errorHandlerMiddleware } from './middlewares';
import { logger } from './utils';

const PORT = 3001;
const DB_URI = 'mongodb://localhost:27018/simcasi';

const app = express();

mongoose
  .connect(DB_URI)
  .then(() => {
    app.use(express.json());
    app.use(corsMiddleware);
    app.use(errorHandlerMiddleware);

    app.listen(PORT, () => {
      logger.info(`Database running on ${DB_URI}`);
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => logger.error(`[mongodb] Error: `, error));
