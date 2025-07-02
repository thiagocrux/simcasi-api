import { Router } from 'express';

import {
  createAccountsController,
  createAuthenticationMiddleware,
  createAuthorizationMiddleware,
  createExamsController,
  createNotificationsController,
  createObservationsController,
  createPatientsController,
  createPermissionsController,
  createRolesController,
  createSessionsController,
  createTreatmentsController,
} from './factories';

export const router = Router();

/* Accounts */

router.get(
  '/accounts',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('accounts:read'),
  createAccountsController().index
);

router.get(
  '/accounts/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('accounts:read'),
  createAccountsController().show
);

router.post(
  '/accounts',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('accounts:create'),
  createAccountsController().create
);

router.put(
  '/accounts/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('accounts:update'),
  createAccountsController().update
);

router.delete(
  '/accounts/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('accounts:delete'),
  createAccountsController().delete
);

/* Sessions */

router.post('/sessions/sign-in', createSessionsController().create);
router.post('/sessions/refresh-token', createSessionsController().refreshToken);

router.get(
  '/sessions',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('sessions:read'),
  createSessionsController().index
);
router.get(
  '/sessions/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('sessions:read'),
  createSessionsController().show
);

router.delete(
  '/sessions/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('sessions:delete'),
  createSessionsController().delete
);

/* Roles */

router.get(
  '/roles',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('roles:read'),
  createRolesController().index
);

router.get(
  '/roles/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('roles:read'),
  createRolesController().show
);

router.post(
  '/roles',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('roles:create'),
  createRolesController().create
);

router.put(
  '/roles/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('roles:update'),
  createRolesController().update
);

router.delete(
  '/roles/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('roles:delete'),
  createRolesController().delete
);

/* Permissions */

router.get(
  '/permissions',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('permissions:read'),
  createPermissionsController().index
);

router.get(
  '/permissions/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('permissions:read'),
  createPermissionsController().show
);

router.post(
  '/permissions',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('permissions:create'),
  createPermissionsController().create
);

router.put(
  '/permissions/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('permissions:update'),
  createPermissionsController().update
);

router.delete(
  '/permissions/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('permissions:delete'),
  createPermissionsController().delete
);

/* Patients */

router.get(
  '/patients',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('patients:read'),
  createPatientsController().index
);

router.get(
  '/patients/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('patients:read'),
  createPatientsController().show
);

router.post(
  '/patients',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('patients:create'),
  createPatientsController().create
);

router.put(
  '/patients/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('patients:update'),
  createPatientsController().update
);

router.delete(
  '/patients/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('patients:delete'),
  createPatientsController().delete
);

/* Exams */

router.get(
  '/exams',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('exams:read'),
  createExamsController().index
);

router.get(
  '/exams/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('exams:read'),
  createExamsController().show
);

router.post(
  '/exams',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('exams:create'),
  createExamsController().create
);

router.put(
  '/exams/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('exams:update'),
  createExamsController().update
);

router.delete(
  '/exams/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('exams:delete'),
  createExamsController().delete
);

/* Notifications */

router.get(
  '/notifications',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('notifications:read'),
  createNotificationsController().index
);

router.get(
  '/notifications/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('notifications:read'),
  createNotificationsController().show
);

router.post(
  '/notifications',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('notifications:create'),
  createNotificationsController().create
);

router.put(
  '/notifications/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('notifications:update'),
  createNotificationsController().update
);

router.delete(
  '/notifications/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('notifications:delete'),
  createNotificationsController().delete
);

/* Treatments */

router.get(
  '/treatments',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('treatments:read'),
  createTreatmentsController().index
);

router.get(
  '/treatments/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('treatments:read'),
  createTreatmentsController().show
);

router.post(
  '/treatments',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('treatments:create'),
  createTreatmentsController().create
);

router.put(
  '/treatments/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('treatments:update'),
  createTreatmentsController().update
);

router.delete(
  '/treatments/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('treatments:delete'),
  createTreatmentsController().delete
);

/* Observations */

router.get(
  '/observations',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('observations:read'),
  createObservationsController().index
);

router.get(
  '/observations/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('observations:read'),
  createObservationsController().show
);

router.post(
  '/observations',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('observations:create'),
  createObservationsController().create
);

router.put(
  '/observations/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('observations:update'),
  createObservationsController().update
);

router.delete(
  '/observations/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('observations:delete'),
  createObservationsController().delete
);
