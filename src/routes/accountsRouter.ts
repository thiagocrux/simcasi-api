import { Router } from 'express';

import {
  accountsController,
  authenticationMiddleware,
  authorizationMiddleware,
} from '../factories';

const accountsRouter = Router();

accountsRouter.get(
  '/',
  authenticationMiddleware(),
  authorizationMiddleware('accounts:read'),
  async (request, response) => accountsController().index(request, response)
);

accountsRouter.get(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('accounts:read'),
  async (request, response) => accountsController().show(request, response)
);

accountsRouter.post(
  '/',
  authenticationMiddleware(),
  authorizationMiddleware('accounts:create'),
  async (request, response) => accountsController().create(request, response)
);

accountsRouter.put(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('accounts:update'),
  async (request, response) => accountsController().update(request, response)
);

accountsRouter.delete(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('accounts:delete'),
  async (request, response) => accountsController().delete(request, response)
);

export default accountsRouter;
