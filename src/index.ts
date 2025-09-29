import express from 'express';
import mongoose from 'mongoose';

import { env } from './config';
import { router } from './routes';
import { logger } from './utils';

import {
  corsMiddleware,
  errorHandlerMiddleware,
  setupHttpLoggingMiddleware,
} from './middlewares';

const app = express();
setupHttpLoggingMiddleware(app);

mongoose
  .connect(process.env.DATABASE_URL || '')
  .then(() => {
    app.use(corsMiddleware);
    app.use(express.json());
    app.use(router);
    app.use(errorHandlerMiddleware);

    app.listen(env.appPort, () => {
      logger.info(`Database running on ${env.databaseURL}`);
      logger.info(
        `Server running in ${env.environment} mode on http://${env.appHostname}:${env.appPort}`
      );
    });
  })
  .catch((error) => {
    throw Error(error);
  });
