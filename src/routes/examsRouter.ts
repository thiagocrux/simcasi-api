import { Router } from 'express';

import {
  authenticationMiddleware,
  authorizationMiddleware,
  examsController,
} from '../factories';

const examsRouter = Router();

examsRouter.get(
  '/',
  authenticationMiddleware(),
  authorizationMiddleware('exams:read'),
  async (request, response) => examsController().index(request, response)
);

examsRouter.get(
  '/patient/:patientId',
  authenticationMiddleware(),
  authorizationMiddleware('exams:read'),
  async (request, response) =>
    examsController().indexByPatient(request, response)
);

examsRouter.get(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('exams:read'),
  async (request, response) => examsController().show(request, response)
);

examsRouter.post(
  '/',
  authenticationMiddleware(),
  authorizationMiddleware('exams:create'),
  async (request, response) => examsController().create(request, response)
);

examsRouter.put(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('exams:update'),
  async (request, response) => examsController().update(request, response)
);

examsRouter.delete(
  '/:id',
  authenticationMiddleware(),
  authorizationMiddleware('exams:delete'),
  async (request, response) => examsController().delete(request, response)
);

export default examsRouter;
