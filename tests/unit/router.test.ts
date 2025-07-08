/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as factories from '../../src/factories';
import { router } from '../../src/router';

describe('router', () => {
  let request: any;
  let response: any;
  let next: any;

  beforeEach(() => {
    request = {};
    response = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      sendStatus: vi.fn().mockReturnThis(),
    };
    next = vi.fn();
  });

  // Helper to extract all routes from the router
  function getRoutes() {
    return router.stack
      .filter((layer: any) => layer.route)
      .map((layer: any) => ({
        path: layer.route.path,
        methods: Object.keys(layer.route.methods),
      }));
  }

  it('should register all expected routes', () => {
    const expectedRoutes = [
      '/accounts',
      '/accounts/:id',
      '/sessions/sign-in',
      '/sessions/refresh-token',
      '/sessions',
      '/sessions/:id',
      '/roles',
      '/roles/:id',
      '/permissions',
      '/permissions/:id',
      '/patients',
      '/patients/:id',
      '/exams',
      '/exams/:id',
      '/notifications',
      '/notifications/:id',
      '/treatments',
      '/treatments/:id',
      '/observations',
      '/observations/:id',
    ];

    const routes = getRoutes().map((route) => route.path);

    expectedRoutes.forEach((route) => {
      expect(routes).toContain(route);
    });
  });

  // Test each route handler is called as expected
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
      path: '/accounts/:id',
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
      path: '/accounts/:id',
      controller: 'accountsController',
      fn: 'update',
    },
    {
      method: 'delete',
      path: '/accounts/:id',
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
      path: '/sessions/:id',
      controller: 'sessionsController',
      fn: 'show',
    },
    {
      method: 'delete',
      path: '/sessions/:id',
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
      path: '/roles/:id',
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
      path: '/roles/:id',
      controller: 'rolesController',
      fn: 'update',
    },
    {
      method: 'delete',
      path: '/roles/:id',
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
      path: '/permissions/:id',
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
      path: '/permissions/:id',
      controller: 'permissionsController',
      fn: 'update',
    },
    {
      method: 'delete',
      path: '/permissions/:id',
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
      path: '/patients/:id',
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
      path: '/patients/:id',
      controller: 'patientsController',
      fn: 'update',
    },
    {
      method: 'delete',
      path: '/patients/:id',
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
      path: '/exams/:id',
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
      path: '/exams/:id',
      controller: 'examsController',
      fn: 'update',
    },
    {
      method: 'delete',
      path: '/exams/:id',
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
      path: '/notifications/:id',
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
      path: '/notifications/:id',
      controller: 'notificationsController',
      fn: 'update',
    },
    {
      method: 'delete',
      path: '/notifications/:id',
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
      path: '/treatments/:id',
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
      path: '/treatments/:id',
      controller: 'treatmentsController',
      fn: 'update',
    },
    {
      method: 'delete',
      path: '/treatments/:id',
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
      path: '/observations/:id',
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
      path: '/observations/:id',
      controller: 'observationsController',
      fn: 'update',
    },
    {
      method: 'delete',
      path: '/observations/:id',
      controller: 'observationsController',
      fn: 'delete',
    },
  ];

  for (const { method, path, controller, fn } of routeTests) {
    it(`should call ${controller}.${fn} for [${method.toUpperCase()}] ${path}`, async () => {
      const ctrlMock = { [fn]: vi.fn().mockResolvedValue(undefined) };
      vi.spyOn(factories, controller as keyof typeof factories).mockReturnValue(
        ctrlMock
      );

      // Find the route handler
      const layer = router.stack.find(
        (l: any) => l.route && l.route.path === path && l.route.methods[method]
      );

      expect(layer).toBeDefined();

      // Simulate Express calling the handler
      if (!layer?.route) {
        throw new Error(
          `Route layer for [${method.toUpperCase()}] ${path} not found or invalid`
        );
      }

      const handler = layer.route.stack[layer.route.stack.length - 1].handle;
      await handler(request, response, next);

      expect(ctrlMock[fn]).toHaveBeenCalledWith(request, response);
    });
  }

  it('should not require authentication for /sessions/sign-in and /sessions/refresh-token', () => {
    const stack = router.stack.filter((l: any) => l.route);
    ['/sessions/sign-in', '/sessions/refresh-token'].forEach((path) => {
      const layer = stack.find(
        (layer: any) => layer.route && layer.route.path === path
      );

      expect(layer).toBeDefined();

      const middlewareNames =
        layer && layer.route
          ? layer.route.stack.map((middleware: any) => middleware.name)
          : [];

      expect(middlewareNames).not.toContain('authenticationMiddleware');
      expect(middlewareNames).not.toContain('authorizationMiddleware');
    });
  });
});
