import { Router } from 'express';

import { PermissionsController, RolesController } from './controllers';

export const router = Router();

router.get('/roles', RolesController.index);
router.get('/roles/:id', RolesController.show);
router.post('/roles', RolesController.create);
router.put('/roles/:id', RolesController.update);
router.delete('/roles/:id', RolesController.delete);

router.get('/permissions', PermissionsController.index);
router.get('/permissions/:id', PermissionsController.show);
router.post('/permissions', PermissionsController.create);
router.put('/permissions/:id', PermissionsController.update);
router.delete('/permissions/:id', PermissionsController.delete);
