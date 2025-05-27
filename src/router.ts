import { Router } from 'express';

import { authenticationMiddleware } from './middlewares';

import {
  AccountsController,
  PermissionsController,
  RolesController,
  SessionsController,
} from './controllers';

export const router = Router();

router.get('/accounts', authenticationMiddleware, AccountsController.index);
router.get('/accounts/:id', authenticationMiddleware, AccountsController.show);
router.post('/accounts', authenticationMiddleware, AccountsController.create);

router.put(
  '/accounts/:id',
  authenticationMiddleware,
  AccountsController.update
);

router.delete(
  '/accounts/:id',
  authenticationMiddleware,
  AccountsController.delete
);

router.post('/sessions', SessionsController.create);
router.get('/sessions', authenticationMiddleware, SessionsController.index);
router.get('/sessions/:id', authenticationMiddleware, SessionsController.show);
router.post('/sessions/refresh-token', SessionsController.refreshToken);

router.delete(
  '/sessions/:id',
  authenticationMiddleware,
  SessionsController.delete
);

router.get('/roles', authenticationMiddleware, RolesController.index);
router.get('/roles/:id', authenticationMiddleware, RolesController.show);
router.post('/roles', authenticationMiddleware, RolesController.create);
router.put('/roles/:id', authenticationMiddleware, RolesController.update);
router.delete('/roles/:id', authenticationMiddleware, RolesController.delete);

router.get(
  '/permissions',
  authenticationMiddleware,
  PermissionsController.index
);

router.get(
  '/permissions/:id',
  authenticationMiddleware,
  PermissionsController.show
);

router.post(
  '/permissions',
  authenticationMiddleware,
  PermissionsController.create
);

router.put(
  '/permissions/:id',
  authenticationMiddleware,
  PermissionsController.update
);

router.delete(
  '/permissions/:id',
  authenticationMiddleware,
  PermissionsController.delete
);
