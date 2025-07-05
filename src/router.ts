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
  accountsController().index
);

router.get(
  '/accounts/:id',
  authenticationMiddleware(),
  authorizationMiddleware('accounts:read'),
  accountsController().show
);

router.post(
  '/accounts',
  authenticationMiddleware(),
  authorizationMiddleware('accounts:create'),
  accountsController().create
);

router.put(
  '/accounts/:id',
  authenticationMiddleware(),
  authorizationMiddleware('accounts:update'),
  accountsController().update
);

router.delete(
  '/accounts/:id',
  authenticationMiddleware(),
  authorizationMiddleware('accounts:delete'),
  accountsController().delete
);

/* Sessions */

router.post('/sessions/sign-in', sessionsController().create);
router.post('/sessions/refresh-token', sessionsController().refreshToken);

router.get(
  '/sessions',
  authenticationMiddleware(),
  authorizationMiddleware('sessions:read'),
  sessionsController().index
);
router.get(
  '/sessions/:id',
  authenticationMiddleware(),
  authorizationMiddleware('sessions:read'),
  sessionsController().show
);

router.delete(
  '/sessions/:id',
  authenticationMiddleware(),
  authorizationMiddleware('sessions:delete'),
  sessionsController().delete
);

/* Roles */

router.get(
  '/roles',
  authenticationMiddleware(),
  authorizationMiddleware('roles:read'),
  rolesController().index
);

router.get(
  '/roles/:id',
  authenticationMiddleware(),
  authorizationMiddleware('roles:read'),
  rolesController().show
);

router.post(
  '/roles',
  authenticationMiddleware(),
  authorizationMiddleware('roles:create'),
  rolesController().create
);

router.put(
  '/roles/:id',
  authenticationMiddleware(),
  authorizationMiddleware('roles:update'),
  rolesController().update
);

router.delete(
  '/roles/:id',
  authenticationMiddleware(),
  authorizationMiddleware('roles:delete'),
  rolesController().delete
);

/* Permissions */

router.get(
  '/permissions',
  authenticationMiddleware(),
  authorizationMiddleware('permissions:read'),
  permissionsController().index
);

router.get(
  '/permissions/:id',
  authenticationMiddleware(),
  authorizationMiddleware('permissions:read'),
  permissionsController().show
);

router.post(
  '/permissions',
  authenticationMiddleware(),
  authorizationMiddleware('permissions:create'),
  permissionsController().create
);

router.put(
  '/permissions/:id',
  authenticationMiddleware(),
  authorizationMiddleware('permissions:update'),
  permissionsController().update
);

router.delete(
  '/permissions/:id',
  authenticationMiddleware(),
  authorizationMiddleware('permissions:delete'),
  permissionsController().delete
);

/* Patients */

router.get(
  '/patients',
  authenticationMiddleware(),
  authorizationMiddleware('patients:read'),
  patientsController().index
);

router.get(
  '/patients/:id',
  authenticationMiddleware(),
  authorizationMiddleware('patients:read'),
  patientsController().show
);

router.post(
  '/patients',
  authenticationMiddleware(),
  authorizationMiddleware('patients:create'),
  patientsController().create
);

router.put(
  '/patients/:id',
  authenticationMiddleware(),
  authorizationMiddleware('patients:update'),
  patientsController().update
);

router.delete(
  '/patients/:id',
  authenticationMiddleware(),
  authorizationMiddleware('patients:delete'),
  patientsController().delete
);

/* Exams */

router.get(
  '/exams',
  authenticationMiddleware(),
  authorizationMiddleware('exams:read'),
  examsController().index
);

router.get(
  '/exams/:id',
  authenticationMiddleware(),
  authorizationMiddleware('exams:read'),
  examsController().show
);

router.post(
  '/exams',
  authenticationMiddleware(),
  authorizationMiddleware('exams:create'),
  examsController().create
);

router.put(
  '/exams/:id',
  authenticationMiddleware(),
  authorizationMiddleware('exams:update'),
  examsController().update
);

router.delete(
  '/exams/:id',
  authenticationMiddleware(),
  authorizationMiddleware('exams:delete'),
  examsController().delete
);

/* Notifications */

router.get(
  '/notifications',
  authenticationMiddleware(),
  authorizationMiddleware('notifications:read'),
  notificationsController().index
);

router.get(
  '/notifications/:id',
  authenticationMiddleware(),
  authorizationMiddleware('notifications:read'),
  notificationsController().show
);

router.post(
  '/notifications',
  authenticationMiddleware(),
  authorizationMiddleware('notifications:create'),
  notificationsController().create
);

router.put(
  '/notifications/:id',
  authenticationMiddleware(),
  authorizationMiddleware('notifications:update'),
  notificationsController().update
);

router.delete(
  '/notifications/:id',
  authenticationMiddleware(),
  authorizationMiddleware('notifications:delete'),
  notificationsController().delete
);

/* Treatments */

router.get(
  '/treatments',
  authenticationMiddleware(),
  authorizationMiddleware('treatments:read'),
  treatmentsController().index
);

router.get(
  '/treatments/:id',
  authenticationMiddleware(),
  authorizationMiddleware('treatments:read'),
  treatmentsController().show
);

router.post(
  '/treatments',
  authenticationMiddleware(),
  authorizationMiddleware('treatments:create'),
  treatmentsController().create
);

router.put(
  '/treatments/:id',
  authenticationMiddleware(),
  authorizationMiddleware('treatments:update'),
  treatmentsController().update
);

router.delete(
  '/treatments/:id',
  authenticationMiddleware(),
  authorizationMiddleware('treatments:delete'),
  treatmentsController().delete
);

/* Observations */

router.get(
  '/observations',
  authenticationMiddleware(),
  authorizationMiddleware('observations:read'),
  observationsController().index
);

router.get(
  '/observations/:id',
  authenticationMiddleware(),
  authorizationMiddleware('observations:read'),
  observationsController().show
);

router.post(
  '/observations',
  authenticationMiddleware(),
  authorizationMiddleware('observations:create'),
  observationsController().create
);

router.put(
  '/observations/:id',
  authenticationMiddleware(),
  authorizationMiddleware('observations:update'),
  observationsController().update
);

router.delete(
  '/observations/:id',
  authenticationMiddleware(),
  authorizationMiddleware('observations:delete'),
  observationsController().delete
);
