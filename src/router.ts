import { Router } from 'express';

import {
  accountsController,
  authenticationMiddleware,
  authorizationMiddleware,
  examsController,
  notificationsController,
  observationsController,
  patientsController,
  permissionsController,
  rolesController,
  sessionsController,
  treatmentsController,
} from './factories';

export const router = Router();

/* Accounts */

router.get(
  '/accounts',
  authenticationMiddleware(),
  authorizationMiddleware('accounts:read'),
  async (request, response) => accountsController().index(request, response)
);

router.get(
  '/accounts/:id',
  authenticationMiddleware(),
  authorizationMiddleware('accounts:read'),
  async (request, response) => accountsController().show(request, response)
);

router.post(
  '/accounts',
  authenticationMiddleware(),
  authorizationMiddleware('accounts:create'),
  async (request, response) => accountsController().create(request, response)
);

router.put(
  '/accounts/:id',
  authenticationMiddleware(),
  authorizationMiddleware('accounts:update'),
  async (request, response) => accountsController().update(request, response)
);

router.delete(
  '/accounts/:id',
  authenticationMiddleware(),
  authorizationMiddleware('accounts:delete'),
  async (request, response) => accountsController().delete(request, response)
);

/* Sessions */

router.post('/sessions/sign-in', async (request, response) =>
  sessionsController().create(request, response)
);

router.post('/sessions/refresh-token', async (request, response) =>
  sessionsController().refreshToken(request, response)
);

router.get(
  '/sessions',
  authenticationMiddleware(),
  authorizationMiddleware('sessions:read'),
  async (request, response) => sessionsController().index(request, response)
);

router.get(
  '/sessions/:id',
  authenticationMiddleware(),
  authorizationMiddleware('sessions:read'),
  async (request, response) => sessionsController().show(request, response)
);

router.delete(
  '/sessions/:id',
  authenticationMiddleware(),
  authorizationMiddleware('sessions:delete'),
  async (request, response) => sessionsController().delete(request, response)
);

/* Roles */

router.get(
  '/roles',
  authenticationMiddleware(),
  authorizationMiddleware('roles:read'),
  async (request, response) => rolesController().index(request, response)
);

router.get(
  '/roles/:id',
  authenticationMiddleware(),
  authorizationMiddleware('roles:read'),
  async (request, response) => rolesController().show(request, response)
);

router.post(
  '/roles',
  authenticationMiddleware(),
  authorizationMiddleware('roles:create'),
  async (request, response) => rolesController().create(request, response)
);

router.put(
  '/roles/:id',
  authenticationMiddleware(),
  authorizationMiddleware('roles:update'),
  async (request, response) => rolesController().update(request, response)
);

router.delete(
  '/roles/:id',
  authenticationMiddleware(),
  authorizationMiddleware('roles:delete'),
  async (request, response) => rolesController().delete(request, response)
);

/* Permissions */

router.get(
  '/permissions',
  authenticationMiddleware(),
  authorizationMiddleware('permissions:read'),
  async (request, response) => permissionsController().index(request, response)
);

router.get(
  '/permissions/:id',
  authenticationMiddleware(),
  authorizationMiddleware('permissions:read'),
  async (request, response) => permissionsController().show(request, response)
);

router.post(
  '/permissions',
  authenticationMiddleware(),
  authorizationMiddleware('permissions:create'),
  async (request, response) => permissionsController().create(request, response)
);

router.put(
  '/permissions/:id',
  authenticationMiddleware(),
  authorizationMiddleware('permissions:update'),
  async (request, response) => permissionsController().update(request, response)
);

router.delete(
  '/permissions/:id',
  authenticationMiddleware(),
  authorizationMiddleware('permissions:delete'),
  async (request, response) => permissionsController().delete(request, response)
);

/* Patients */

router.get(
  '/patients',
  authenticationMiddleware(),
  authorizationMiddleware('patients:read'),
  async (request, response) => patientsController().index(request, response)
);

router.get(
  '/patients/:id',
  authenticationMiddleware(),
  authorizationMiddleware('patients:read'),
  async (request, response) => patientsController().show(request, response)
);

router.post(
  '/patients',
  authenticationMiddleware(),
  authorizationMiddleware('patients:create'),
  async (request, response) => patientsController().create(request, response)
);

router.put(
  '/patients/:id',
  authenticationMiddleware(),
  authorizationMiddleware('patients:update'),
  async (request, response) => patientsController().update(request, response)
);

router.delete(
  '/patients/:id',
  authenticationMiddleware(),
  authorizationMiddleware('patients:delete'),
  async (request, response) => patientsController().delete(request, response)
);

/* Exams */

router.get(
  '/exams',
  authenticationMiddleware(),
  authorizationMiddleware('exams:read'),
  async (request, response) => examsController().index(request, response)
);

router.get(
  '/exams/:id',
  authenticationMiddleware(),
  authorizationMiddleware('exams:read'),
  async (request, response) => examsController().show(request, response)
);

router.post(
  '/exams',
  authenticationMiddleware(),
  authorizationMiddleware('exams:create'),
  async (request, response) => examsController().create(request, response)
);

router.put(
  '/exams/:id',
  authenticationMiddleware(),
  authorizationMiddleware('exams:update'),
  async (request, response) => examsController().update(request, response)
);

router.delete(
  '/exams/:id',
  authenticationMiddleware(),
  authorizationMiddleware('exams:delete'),
  async (request, response) => examsController().delete(request, response)
);

/* Notifications */

router.get(
  '/notifications',
  authenticationMiddleware(),
  authorizationMiddleware('notifications:read'),
  async (request, response) =>
    notificationsController().index(request, response)
);

router.get(
  '/notifications/:id',
  authenticationMiddleware(),
  authorizationMiddleware('notifications:read'),
  async (request, response) => notificationsController().show(request, response)
);

router.post(
  '/notifications',
  authenticationMiddleware(),
  authorizationMiddleware('notifications:create'),
  async (request, response) =>
    notificationsController().create(request, response)
);

router.put(
  '/notifications/:id',
  authenticationMiddleware(),
  authorizationMiddleware('notifications:update'),
  async (request, response) =>
    notificationsController().update(request, response)
);

router.delete(
  '/notifications/:id',
  authenticationMiddleware(),
  authorizationMiddleware('notifications:delete'),
  async (request, response) =>
    notificationsController().delete(request, response)
);

/* Treatments */

router.get(
  '/treatments',
  authenticationMiddleware(),
  authorizationMiddleware('treatments:read'),
  async (request, response) => treatmentsController().index(request, response)
);

router.get(
  '/treatments/:id',
  authenticationMiddleware(),
  authorizationMiddleware('treatments:read'),
  async (request, response) => treatmentsController().show(request, response)
);

router.post(
  '/treatments',
  authenticationMiddleware(),
  authorizationMiddleware('treatments:create'),
  async (request, response) => treatmentsController().create(request, response)
);

router.put(
  '/treatments/:id',
  authenticationMiddleware(),
  authorizationMiddleware('treatments:update'),
  async (request, response) => treatmentsController().update(request, response)
);

router.delete(
  '/treatments/:id',
  authenticationMiddleware(),
  authorizationMiddleware('treatments:delete'),
  async (request, response) => treatmentsController().delete(request, response)
);

/* Observations */

router.get(
  '/observations',
  authenticationMiddleware(),
  authorizationMiddleware('observations:read'),
  async (request, response) => observationsController().index(request, response)
);

router.get(
  '/observations/:id',
  authenticationMiddleware(),
  authorizationMiddleware('observations:read'),
  async (request, response) => observationsController().show(request, response)
);

router.post(
  '/observations',
  authenticationMiddleware(),
  authorizationMiddleware('observations:create'),
  async (request, response) =>
    observationsController().create(request, response)
);

router.put(
  '/observations/:id',
  authenticationMiddleware(),
  authorizationMiddleware('observations:update'),
  async (request, response) =>
    observationsController().update(request, response)
);

router.delete(
  '/observations/:id',
  authenticationMiddleware(),
  authorizationMiddleware('observations:delete'),
  async (request, response) =>
    observationsController().delete(request, response)
);
