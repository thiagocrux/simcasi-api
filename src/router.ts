import { Router } from 'express';

import {
  createAccountsController,
  createAuthenticationMiddleware,
  createAuthorizationMiddleware,
  createPermissionsController,
  createRolesController,
  createSessionsController,
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
  createAuthorizationMiddleware('roles:read'),
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
