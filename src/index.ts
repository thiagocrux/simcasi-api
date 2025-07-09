import express from 'express';
import mongoose from 'mongoose';

import { env } from './config';
import { corsMiddleware, errorHandlerMiddleware } from './middlewares';
import { router } from './routes';
import { logger } from './utils';

const app = express();

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
