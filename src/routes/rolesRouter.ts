import { Router } from 'express';

import {
  authenticationMiddleware,
  authorizationMiddleware,
  rolesController,
} from '../factories';

const rolesRouter = Router();

rolesRouter.get(
  '/',
  authenticationMiddleware(),
  authorizationMiddleware('roles:read'),
  async (request, response) => rolesController().index(request, response)
);

rolesRouter.get(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('roles:read'),
  async (request, response) => rolesController().show(request, response)
);

rolesRouter.post(
  '/',
  authenticationMiddleware(),
  authorizationMiddleware('roles:create'),
  async (request, response) => rolesController().create(request, response)
);

rolesRouter.put(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('roles:update'),
  async (request, response) => rolesController().update(request, response)
);

rolesRouter.delete(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('roles:delete'),
  async (request, response) => rolesController().delete(request, response)
);

export default rolesRouter;
