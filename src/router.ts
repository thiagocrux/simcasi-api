import { Router } from 'express';

import {
  createAccountsController,
  createAuthenticationMiddleware,
  createAuthorizationMiddleware,
} from './factories';

import {
  PermissionsController,
  RolesController,
  SessionsController,
} from './controllers';

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

router.post('/sessions/sign-in', SessionsController.create);
router.post('/sessions/refresh-token', SessionsController.refreshToken);

router.get(
  '/sessions',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('sessions:read'),
  SessionsController.index
);
router.get(
  '/sessions/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('sessions:read'),
  SessionsController.show
);

router.delete(
  '/sessions/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('sessions:delete'),
  SessionsController.delete
);

/* Roles */

router.get(
  '/roles',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('roles:read'),
  RolesController.index
);

router.get(
  '/roles/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('roles:read'),
  RolesController.show
);

router.post(
  '/roles',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('roles:create'),
  RolesController.create
);

router.put(
  '/roles/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('roles:update'),
  RolesController.update
);

router.delete(
  '/roles/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('roles:read'),
  RolesController.delete
);

/* Permissions */

router.get(
  '/permissions',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('permissions:read'),
  PermissionsController.index
);

router.get(
  '/permissions/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('permissions:read'),
  PermissionsController.show
);

router.post(
  '/permissions',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('permissions:create'),
  PermissionsController.create
);

router.put(
  '/permissions/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('permissions:update'),
  PermissionsController.update
);

router.delete(
  '/permissions/:id',
  createAuthenticationMiddleware(),
  createAuthorizationMiddleware('permissions:delete'),
  PermissionsController.delete
);
