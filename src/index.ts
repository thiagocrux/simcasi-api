import express from 'express';

import { logger } from './utils';

const app = express();

app.use(express.json());

app.listen(3001, () => {
  logger.info(`Server running on http://localhost:3001`);
});
