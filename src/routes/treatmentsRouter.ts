import { Router } from 'express';

import {
  authenticationMiddleware,
  authorizationMiddleware,
  treatmentsController,
} from '../factories';

const treatmentsRouter = Router();

treatmentsRouter.get(
  '/',
  authenticationMiddleware(),
  authorizationMiddleware('treatments:read'),
  async (request, response) => treatmentsController().index(request, response)
);

treatmentsRouter.get(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('treatments:read'),
  async (request, response) => treatmentsController().show(request, response)
);

treatmentsRouter.post(
  '/',
  authenticationMiddleware(),
  authorizationMiddleware('treatments:create'),
  async (request, response) => treatmentsController().create(request, response)
);

treatmentsRouter.put(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('treatments:update'),
  async (request, response) => treatmentsController().update(request, response)
);

treatmentsRouter.delete(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('treatments:delete'),
  async (request, response) => treatmentsController().delete(request, response)
);

export default treatmentsRouter;
