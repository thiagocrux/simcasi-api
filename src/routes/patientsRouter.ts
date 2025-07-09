import { Router } from 'express';

import {
  authenticationMiddleware,
  authorizationMiddleware,
  patientsController,
} from '../factories';

const patientsRouter = Router();

patientsRouter.get(
  '/',
  authenticationMiddleware(),
  authorizationMiddleware('patients:read'),
  async (request, response) => patientsController().index(request, response)
);

patientsRouter.get(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('patients:read'),
  async (request, response) => patientsController().show(request, response)
);

patientsRouter.post(
  '/',
  authenticationMiddleware(),
  authorizationMiddleware('patients:create'),
  async (request, response) => patientsController().create(request, response)
);

patientsRouter.put(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('patients:update'),
  async (request, response) => patientsController().update(request, response)
);

patientsRouter.delete(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('patients:delete'),
  async (request, response) => patientsController().delete(request, response)
);

export default patientsRouter;
