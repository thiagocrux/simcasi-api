import { Router } from 'express';

import {
  authenticationMiddleware,
  authorizationMiddleware,
  observationsController,
} from '../factories';

const observationsRouter = Router();

observationsRouter.get(
  '/',
  authenticationMiddleware(),
  authorizationMiddleware('observations:read'),
  async (request, response) => observationsController().index(request, response)
);

observationsRouter.get(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('observations:read'),
  async (request, response) => observationsController().show(request, response)
);

observationsRouter.post(
  '/',
  authenticationMiddleware(),
  authorizationMiddleware('observations:create'),
  async (request, response) =>
    observationsController().create(request, response)
);

observationsRouter.put(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('observations:update'),
  async (request, response) =>
    observationsController().update(request, response)
);

observationsRouter.delete(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('observations:delete'),
  async (request, response) =>
    observationsController().delete(request, response)
);

export default observationsRouter;
