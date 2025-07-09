/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock authentication and authorization middleware to always call next()
vi.mock('../../src/factories', async (importOriginal) => {
  const original = await importOriginal();

  return {
    ...(typeof original === 'object' && original !== null ? original : {}),
    authenticationMiddleware: () => (request: any, response: any, next: any) =>
      next(),
    authorizationMiddleware: () => (request: any, response: any, next: any) =>
      next(),
  };
});

import * as factories from '../../src/factories';
import { router } from '../../src/routes';

describe('API routes', () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(router);
  });

  const routeTests = [
    // Accounts
    {
      method: 'get',
      path: '/accounts',
      controller: 'accountsController',
      fn: 'index',
    },
    {
      method: 'get',
      path: '/accounts/123',
      controller: 'accountsController',
      fn: 'show',
    },
    {
      method: 'post',
      path: '/accounts',
      controller: 'accountsController',
      fn: 'create',
    },
    {
      method: 'put',
      path: '/accounts/123',
      controller: 'accountsController',
      fn: 'update',
    },
    {
      method: 'delete',
      path: '/accounts/123',
      controller: 'accountsController',
      fn: 'delete',
    },
    // Sessions
    {
      method: 'post',
      path: '/sessions/sign-in',
      controller: 'sessionsController',
      fn: 'create',
    },
    {
      method: 'post',
      path: '/sessions/refresh-token',
      controller: 'sessionsController',
      fn: 'refreshToken',
    },
    {
      method: 'get',
      path: '/sessions',
      controller: 'sessionsController',
      fn: 'index',
    },
    {
      method: 'get',
      path: '/sessions/123',
      controller: 'sessionsController',
      fn: 'show',
    },
    {
      method: 'delete',
      path: '/sessions/123',
      controller: 'sessionsController',
      fn: 'delete',
    },
    // Roles
    {
      method: 'get',
      path: '/roles',
      controller: 'rolesController',
      fn: 'index',
    },
    {
      method: 'get',
      path: '/roles/123',
      controller: 'rolesController',
      fn: 'show',
    },
    {
      method: 'post',
      path: '/roles',
      controller: 'rolesController',
      fn: 'create',
    },
    {
      method: 'put',
      path: '/roles/123',
      controller: 'rolesController',
      fn: 'update',
    },
    {
      method: 'delete',
      path: '/roles/123',
      controller: 'rolesController',
      fn: 'delete',
    },
    // Permissions
    {
      method: 'get',
      path: '/permissions',
      controller: 'permissionsController',
      fn: 'index',
    },
    {
      method: 'get',
      path: '/permissions/123',
      controller: 'permissionsController',
      fn: 'show',
    },
    {
      method: 'post',
      path: '/permissions',
      controller: 'permissionsController',
      fn: 'create',
    },
    {
      method: 'put',
      path: '/permissions/123',
      controller: 'permissionsController',
      fn: 'update',
    },
    {
      method: 'delete',
      path: '/permissions/123',
      controller: 'permissionsController',
      fn: 'delete',
    },
    // Patients
    {
      method: 'get',
      path: '/patients',
      controller: 'patientsController',
      fn: 'index',
    },
    {
      method: 'get',
      path: '/patients/123',
      controller: 'patientsController',
      fn: 'show',
    },
    {
      method: 'post',
      path: '/patients',
      controller: 'patientsController',
      fn: 'create',
    },
    {
      method: 'put',
      path: '/patients/123',
      controller: 'patientsController',
      fn: 'update',
    },
    {
      method: 'delete',
      path: '/patients/123',
      controller: 'patientsController',
      fn: 'delete',
    },
    // Exams
    {
      method: 'get',
      path: '/exams',
      controller: 'examsController',
      fn: 'index',
    },
    {
      method: 'get',
      path: '/exams/123',
      controller: 'examsController',
      fn: 'show',
    },
    {
      method: 'post',
      path: '/exams',
      controller: 'examsController',
      fn: 'create',
    },
    {
      method: 'put',
      path: '/exams/123',
      controller: 'examsController',
      fn: 'update',
    },
    {
      method: 'delete',
      path: '/exams/123',
      controller: 'examsController',
      fn: 'delete',
    },
    // Notifications
    {
      method: 'get',
      path: '/notifications',
      controller: 'notificationsController',
      fn: 'index',
    },
    {
      method: 'get',
      path: '/notifications/123',
      controller: 'notificationsController',
      fn: 'show',
    },
    {
      method: 'post',
      path: '/notifications',
      controller: 'notificationsController',
      fn: 'create',
    },
    {
      method: 'put',
      path: '/notifications/123',
      controller: 'notificationsController',
      fn: 'update',
    },
    {
      method: 'delete',
      path: '/notifications/123',
      controller: 'notificationsController',
      fn: 'delete',
    },
    // Treatments
    {
      method: 'get',
      path: '/treatments',
      controller: 'treatmentsController',
      fn: 'index',
    },
    {
      method: 'get',
      path: '/treatments/123',
      controller: 'treatmentsController',
      fn: 'show',
    },
    {
      method: 'post',
      path: '/treatments',
      controller: 'treatmentsController',
      fn: 'create',
    },
    {
      method: 'put',
      path: '/treatments/123',
      controller: 'treatmentsController',
      fn: 'update',
    },
    {
      method: 'delete',
      path: '/treatments/123',
      controller: 'treatmentsController',
      fn: 'delete',
    },
    // Observations
    {
      method: 'get',
      path: '/observations',
      controller: 'observationsController',
      fn: 'index',
    },
    {
      method: 'get',
      path: '/observations/123',
      controller: 'observationsController',
      fn: 'show',
    },
    {
      method: 'post',
      path: '/observations',
      controller: 'observationsController',
      fn: 'create',
    },
    {
      method: 'put',
      path: '/observations/123',
      controller: 'observationsController',
      fn: 'update',
    },
    {
      method: 'delete',
      path: '/observations/123',
      controller: 'observationsController',
      fn: 'delete',
    },
  ];

  for (const { method, path, controller, fn } of routeTests) {
    it(`should call ${controller}.${fn} for [${method.toUpperCase()}] ${path}`, async () => {
      const mockController = {
        [fn]: vi.fn((request, response) =>
          response.status(200).json({ ok: true })
        ),
      };

      vi.spyOn(factories, controller as keyof typeof factories).mockReturnValue(
        mockController
      );

      await request(app)[method](path);
      expect(mockController[fn]).toHaveBeenCalled();
    });
  }
});
