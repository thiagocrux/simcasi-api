import { Router } from 'express';

import {
  authenticationMiddleware,
  authorizationMiddleware,
  notificationsController,
} from '../factories';

const notificationsRouter = Router();

notificationsRouter.get(
  '/',
  authenticationMiddleware(),
  authorizationMiddleware('notifications:read'),
  async (request, response) =>
    notificationsController().index(request, response)
);

// Route for getting notifications by patient - MUST come before /:id
notificationsRouter.get(
  '/patient/:patientId',
  authenticationMiddleware(),
  authorizationMiddleware('notifications:read'),
  async (request, response) =>
    notificationsController().indexByPatient(request, response)
);

notificationsRouter.get(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('notifications:read'),
  async (request, response) => notificationsController().show(request, response)
);

notificationsRouter.post(
  '/',
  authenticationMiddleware(),
  authorizationMiddleware('notifications:create'),
  async (request, response) =>
    notificationsController().create(request, response)
);

notificationsRouter.put(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('notifications:update'),
  async (request, response) =>
    notificationsController().update(request, response)
);

notificationsRouter.delete(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('notifications:delete'),
  async (request, response) =>
    notificationsController().delete(request, response)
);

export default notificationsRouter;
