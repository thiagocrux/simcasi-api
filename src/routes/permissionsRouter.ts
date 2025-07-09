import { Router } from 'express';

import {
  authenticationMiddleware,
  authorizationMiddleware,
  permissionsController,
} from '../factories';

const permissionsRouter = Router();

permissionsRouter.get(
  '/',
  authenticationMiddleware(),
  authorizationMiddleware('permissions:read'),
  async (request, response) => permissionsController().index(request, response)
);

permissionsRouter.get(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('permissions:read'),
  async (request, response) => permissionsController().show(request, response)
);

permissionsRouter.post(
  '/',
  authenticationMiddleware(),
  authorizationMiddleware('permissions:create'),
  async (request, response) => permissionsController().create(request, response)
);

permissionsRouter.put(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('permissions:update'),
  async (request, response) => permissionsController().update(request, response)
);

permissionsRouter.delete(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('permissions:delete'),
  async (request, response) => permissionsController().delete(request, response)
);

export default permissionsRouter;
