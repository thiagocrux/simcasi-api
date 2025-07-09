import { Router } from 'express';

import {
  authenticationMiddleware,
  authorizationMiddleware,
  sessionsController,
} from '../factories';

export const sessionsRouter = Router();

// Public routes

sessionsRouter.post('/sign-in', async (request, response) =>
  sessionsController().create(request, response)
);

sessionsRouter.post('/refresh-token', async (request, response) =>
  sessionsController().refreshToken(request, response)
);

// Private routes

sessionsRouter.get(
  '/',
  authenticationMiddleware(),
  authorizationMiddleware('sessions:read'),
  async (request, response) => sessionsController().index(request, response)
);

sessionsRouter.get(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('sessions:read'),
  async (request, response) => sessionsController().show(request, response)
);

sessionsRouter.delete(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('sessions:delete'),
  async (request, response) => sessionsController().delete(request, response)
);

export default sessionsRouter;
