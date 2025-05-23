import { Router } from 'express';

import {
  AccountsController,
  PermissionsController,
  RolesController,
  SessionsController,
} from './controllers';

export const router = Router();

router.post('/sign-in', SessionsController.create);
router.get('/sessions', SessionsController.index);
router.get('/sessions/:id', SessionsController.show);
router.delete('/sessions/:id', SessionsController.delete);

router.get('/roles', RolesController.index);
router.get('/roles/:id', RolesController.show);
router.post('/roles', RolesController.create);
router.put('/roles/:id', RolesController.update);
router.delete('/roles/:id', RolesController.delete);

router.get('/permissions', PermissionsController.index);
router.get('/permissions/:id', PermissionsController.show);
router.post('/permissions', PermissionsController.create);
router.put('/permissions/:id', PermissionsController.update);

router.get('/accounts', AccountsController.index);
router.get('/accounts/:id', AccountsController.show);
router.post('/accounts', AccountsController.create);
router.put('/accounts/:id', AccountsController.update);
router.delete('/accounts/:id', AccountsController.delete);
