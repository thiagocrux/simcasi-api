import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

import { ENVS } from './config';
import { corsMiddleware, errorHandlerMiddleware } from './middlewares';
import { router } from './router';
import { logger } from './utils';

const PORT = 3001;
const app = express();

mongoose
  .connect(ENVS.databaseURI)
  .then(() => {
    app.use(express.json());
    app.use(corsMiddleware);
    app.use(router);
    app.use(errorHandlerMiddleware);

    app.listen(PORT, () => {
      logger.info(`Database running on ${ENVS.databaseURI}`);
      logger.info(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    throw Error(error);
  });
