import { Router } from 'express';

import { middlewareAdapter } from './adapters';

import {
  makeAuthenticationMiddleware,
  makeAuthorizationMiddleware,
} from './factories';

import {
  AccountsController,
  PermissionsController,
  RolesController,
  SessionsController,
} from './controllers';

export const router = Router();

/* Accounts */

router.get(
  '/accounts',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['accounts:read'])),
  AccountsController.index
);

router.get(
  '/accounts/:id',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['accounts:read'])),
  AccountsController.show
);

router.post(
  '/accounts',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['accounts:create'])),
  AccountsController.create
);

router.put(
  '/accounts/:id',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['accounts:update'])),
  AccountsController.update
);

router.delete(
  '/accounts/:id',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['accounts:delete'])),
  AccountsController.delete
);

/* Sessions */

router.post('/sessions', SessionsController.create);
router.post('/sessions/refresh-token', SessionsController.refreshToken);

router.get(
  '/sessions',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['sessions:read'])),
  SessionsController.index
);
router.get(
  '/sessions/:id',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['sessions:read'])),
  SessionsController.show
);

router.delete(
  '/sessions/:id',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['sessions:delete'])),
  SessionsController.delete
);

/* Roles */

router.get(
  '/roles',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['roles:read'])),
  RolesController.index
);

router.get(
  '/roles/:id',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['roles:read'])),
  RolesController.show
);

router.post(
  '/roles',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['roles:create'])),
  RolesController.create
);

router.put(
  '/roles/:id',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['roles:update'])),
  RolesController.update
);

router.delete(
  '/roles/:id',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['roles:read'])),
  RolesController.delete
);

/* Permissions */

router.get(
  '/permissions',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['permissions:read'])),
  PermissionsController.index
);

router.get(
  '/permissions/:id',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['permissions:read'])),
  PermissionsController.show
);

router.post(
  '/permissions',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['permissions:create'])),
  PermissionsController.create
);

router.put(
  '/permissions/:id',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['permissions:update'])),
  PermissionsController.update
);

router.delete(
  '/permissions/:id',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['permissions:delete'])),
  PermissionsController.delete
);
