import { Router } from 'express';

import { middlewareAdapter } from './adapters';
import { makeAuthorizationMiddleware } from './factories';
import { authenticationMiddleware } from './middlewares';

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
  authenticationMiddleware,
  middlewareAdapter(makeAuthorizationMiddleware(['accounts:read'])),
  AccountsController.index
);

router.get(
  '/accounts/:id',
  authenticationMiddleware,
  middlewareAdapter(makeAuthorizationMiddleware(['accounts:read'])),
  AccountsController.show
);

router.post(
  '/accounts',
  authenticationMiddleware,
  middlewareAdapter(makeAuthorizationMiddleware(['accounts:create'])),
  AccountsController.create
);

router.put(
  '/accounts/:id',
  authenticationMiddleware,
  middlewareAdapter(makeAuthorizationMiddleware(['accounts:update'])),
  AccountsController.update
);

router.delete(
  '/accounts/:id',
  authenticationMiddleware,
  middlewareAdapter(makeAuthorizationMiddleware(['accounts:delete'])),
  AccountsController.delete
);

/* Sessions */

router.post('/sessions', SessionsController.create);
router.post('/sessions/refresh-token', SessionsController.refreshToken);

router.get(
  '/sessions',
  authenticationMiddleware,
  middlewareAdapter(makeAuthorizationMiddleware(['sessions:read'])),
  SessionsController.index
);
router.get(
  '/sessions/:id',
  authenticationMiddleware,
  middlewareAdapter(makeAuthorizationMiddleware(['sessions:read'])),
  SessionsController.show
);

router.delete(
  '/sessions/:id',
  authenticationMiddleware,
  middlewareAdapter(makeAuthorizationMiddleware(['sessions:delete'])),
  SessionsController.delete
);

/* Roles */

router.get(
  '/roles',
  authenticationMiddleware,
  middlewareAdapter(makeAuthorizationMiddleware(['roles:read'])),
  RolesController.index
);

router.get(
  '/roles/:id',
  authenticationMiddleware,
  middlewareAdapter(makeAuthorizationMiddleware(['roles:read'])),
  RolesController.show
);

router.post(
  '/roles',
  authenticationMiddleware,
  middlewareAdapter(makeAuthorizationMiddleware(['roles:create'])),
  RolesController.create
);

router.put(
  '/roles/:id',
  authenticationMiddleware,
  middlewareAdapter(makeAuthorizationMiddleware(['roles:update'])),
  RolesController.update
);

router.delete(
  '/roles/:id',
  authenticationMiddleware,
  middlewareAdapter(makeAuthorizationMiddleware(['roles:read'])),
  RolesController.delete
);

/* Permissions */

router.get(
  '/permissions',
  authenticationMiddleware,
  middlewareAdapter(makeAuthorizationMiddleware(['permissions:read'])),
  PermissionsController.index
);

router.get(
  '/permissions/:id',
  authenticationMiddleware,
  middlewareAdapter(makeAuthorizationMiddleware(['permissions:read'])),
  PermissionsController.show
);

router.post(
  '/permissions',
  authenticationMiddleware,
  middlewareAdapter(makeAuthorizationMiddleware(['permissions:create'])),
  PermissionsController.create
);

router.put(
  '/permissions/:id',
  authenticationMiddleware,
  middlewareAdapter(makeAuthorizationMiddleware(['permissions:update'])),
  PermissionsController.update
);

router.delete(
  '/permissions/:id',
  authenticationMiddleware,
  middlewareAdapter(makeAuthorizationMiddleware(['permissions:delete'])),
  PermissionsController.delete
);
