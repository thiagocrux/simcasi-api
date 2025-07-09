import { Router } from 'express';

import accountsRouter from './accountsRouter';
import examsRouter from './examsRouter';
import notificationsRouter from './notificationsRouter';
import observationsRouter from './observationsRouter';
import patientsRouter from './patientsRouter';
import permissionsRouter from './permissionsRouter';
import rolesRouter from './rolesRouter';
import sessionsRouter from './sessionsRouter';
import treatmentsRouter from './treatmentsRouter';

export const router = Router();

router.use('/accounts', accountsRouter);
router.use('/exams', examsRouter);
router.use('/notifications', notificationsRouter);
router.use('/observations', observationsRouter);
router.use('/patients', patientsRouter);
router.use('/permissions', permissionsRouter);
router.use('/roles', rolesRouter);
router.use('/sessions', sessionsRouter);
router.use('/treatments', treatmentsRouter);
