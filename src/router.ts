import { Router } from 'express';

import { RolesController } from './controllers';

export const router = Router();

router.get('/roles', RolesController.index);
router.get('/roles/:id', RolesController.show);
router.post('/roles', RolesController.create);
router.put('/roles/:id', RolesController.update);
router.delete('/roles/:id', RolesController.delete);
