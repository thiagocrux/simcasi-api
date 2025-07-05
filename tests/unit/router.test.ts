import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock all dependencies
const mockGet = vi.fn();
const mockPost = vi.fn();
const mockPut = vi.fn();
const mockDelete = vi.fn();

const mockRouter = {
  get: mockGet,
  post: mockPost,
  put: mockPut,
  delete: mockDelete,
};

const mockCreateController = () => ({
  index: vi.fn(),
  show: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  refreshToken: vi.fn(),
});

const mockAuthenticationMiddleware = vi.fn();
const mockAuthorizationMiddleware = vi.fn();

vi.mock('express', () => ({
  Router: vi.fn(() => mockRouter),
}));

vi.mock('../../src/factories', () => ({
  accountsController: vi.fn(() => mockCreateController()),
  examsController: vi.fn(() => mockCreateController()),
  notificationsController: vi.fn(() => mockCreateController()),
  observationsController: vi.fn(() => mockCreateController()),
  patientsController: vi.fn(() => mockCreateController()),
  permissionsController: vi.fn(() => mockCreateController()),
  rolesController: vi.fn(() => mockCreateController()),
  sessionsController: vi.fn(() => mockCreateController()),
  treatmentsController: vi.fn(() => mockCreateController()),
  authenticationMiddleware: vi.fn(() => mockAuthenticationMiddleware),
  authorizationMiddleware: vi.fn(() => mockAuthorizationMiddleware),
}));

describe('router', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  describe('Route Registration', () => {
    it('should register all account routes', async () => {
      await import('../../src/router');

      // Verify account routes are registered
      expect(mockGet).toHaveBeenCalledWith(
        '/accounts',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockGet).toHaveBeenCalledWith(
        '/accounts/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockPost).toHaveBeenCalledWith(
        '/accounts',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockPut).toHaveBeenCalledWith(
        '/accounts/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockDelete).toHaveBeenCalledWith(
        '/accounts/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );
    });

    it('should register session routes with correct middleware', async () => {
      await import('../../src/router');

      // Public routes (no authentication)
      expect(mockPost).toHaveBeenCalledWith(
        '/sessions/sign-in',
        expect.any(Function)
      );

      expect(mockPost).toHaveBeenCalledWith(
        '/sessions/refresh-token',
        expect.any(Function)
      );

      // Protected routes
      expect(mockGet).toHaveBeenCalledWith(
        '/sessions',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockGet).toHaveBeenCalledWith(
        '/sessions/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockDelete).toHaveBeenCalledWith(
        '/sessions/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );
    });

    it('should register all role routes', async () => {
      await import('../../src/router');

      expect(mockGet).toHaveBeenCalledWith(
        '/roles',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockGet).toHaveBeenCalledWith(
        '/roles/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockPost).toHaveBeenCalledWith(
        '/roles',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockPut).toHaveBeenCalledWith(
        '/roles/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockDelete).toHaveBeenCalledWith(
        '/roles/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );
    });

    it('should register all permission routes', async () => {
      await import('../../src/router');

      expect(mockGet).toHaveBeenCalledWith(
        '/permissions',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockGet).toHaveBeenCalledWith(
        '/permissions/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockPost).toHaveBeenCalledWith(
        '/permissions',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockPut).toHaveBeenCalledWith(
        '/permissions/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockDelete).toHaveBeenCalledWith(
        '/permissions/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );
    });

    it('should register all patient routes', async () => {
      await import('../../src/router');

      expect(mockGet).toHaveBeenCalledWith(
        '/patients',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockGet).toHaveBeenCalledWith(
        '/patients/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockPost).toHaveBeenCalledWith(
        '/patients',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockPut).toHaveBeenCalledWith(
        '/patients/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockDelete).toHaveBeenCalledWith(
        '/patients/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );
    });

    it('should register all exam routes', async () => {
      await import('../../src/router');

      expect(mockGet).toHaveBeenCalledWith(
        '/exams',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockGet).toHaveBeenCalledWith(
        '/exams/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockPost).toHaveBeenCalledWith(
        '/exams',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockPut).toHaveBeenCalledWith(
        '/exams/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockDelete).toHaveBeenCalledWith(
        '/exams/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );
    });

    it('should register all notification routes', async () => {
      await import('../../src/router');

      expect(mockGet).toHaveBeenCalledWith(
        '/notifications',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockGet).toHaveBeenCalledWith(
        '/notifications/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockPost).toHaveBeenCalledWith(
        '/notifications',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockPut).toHaveBeenCalledWith(
        '/notifications/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockDelete).toHaveBeenCalledWith(
        '/notifications/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );
    });

    it('should register all treatment routes', async () => {
      await import('../../src/router');

      expect(mockGet).toHaveBeenCalledWith(
        '/treatments',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockGet).toHaveBeenCalledWith(
        '/treatments/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockPost).toHaveBeenCalledWith(
        '/treatments',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockPut).toHaveBeenCalledWith(
        '/treatments/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockDelete).toHaveBeenCalledWith(
        '/treatments/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );
    });

    it('should register all observation routes', async () => {
      await import('../../src/router');

      expect(mockGet).toHaveBeenCalledWith(
        '/observations',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockGet).toHaveBeenCalledWith(
        '/observations/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockPost).toHaveBeenCalledWith(
        '/observations',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockPut).toHaveBeenCalledWith(
        '/observations/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      expect(mockDelete).toHaveBeenCalledWith(
        '/observations/:id',
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );
    });
  });

  describe('Middleware and Factory Usage', () => {
    it('should use authentication and authorization middleware for protected routes', async () => {
      const factories = await import('../../src/factories');
      await import('../../src/router');

      // Verify middleware factories are called
      expect(factories.authenticationMiddleware).toHaveBeenCalled();
      expect(factories.authorizationMiddleware).toHaveBeenCalled();
    });

    it('should call controller factories for each resource', async () => {
      const factories = await import('../../src/factories');
      await import('../../src/router');

      // Verify all controller factories are called
      expect(factories.accountsController).toHaveBeenCalled();
      expect(factories.sessionsController).toHaveBeenCalled();
      expect(factories.rolesController).toHaveBeenCalled();
      expect(factories.permissionsController).toHaveBeenCalled();
      expect(factories.patientsController).toHaveBeenCalled();
      expect(factories.examsController).toHaveBeenCalled();
      expect(factories.notificationsController).toHaveBeenCalled();
      expect(factories.treatmentsController).toHaveBeenCalled();
      expect(factories.observationsController).toHaveBeenCalled();
    });

    it('should call authorization middleware with correct permissions', async () => {
      const factories = await import('../../src/factories');
      await import('../../src/router');

      // Check that authorization middleware is called with various permission strings
      expect(factories.authorizationMiddleware).toHaveBeenCalledWith(
        'accounts:read'
      );

      expect(factories.authorizationMiddleware).toHaveBeenCalledWith(
        'accounts:create'
      );

      expect(factories.authorizationMiddleware).toHaveBeenCalledWith(
        'accounts:update'
      );

      expect(factories.authorizationMiddleware).toHaveBeenCalledWith(
        'accounts:delete'
      );

      expect(factories.authorizationMiddleware).toHaveBeenCalledWith(
        'sessions:read'
      );

      expect(factories.authorizationMiddleware).toHaveBeenCalledWith(
        'sessions:delete'
      );

      expect(factories.authorizationMiddleware).toHaveBeenCalledWith(
        'roles:read'
      );

      expect(factories.authorizationMiddleware).toHaveBeenCalledWith(
        'roles:create'
      );

      expect(factories.authorizationMiddleware).toHaveBeenCalledWith(
        'roles:update'
      );

      expect(factories.authorizationMiddleware).toHaveBeenCalledWith(
        'roles:delete'
      );

      expect(factories.authorizationMiddleware).toHaveBeenCalledWith(
        'permissions:read'
      );

      expect(factories.authorizationMiddleware).toHaveBeenCalledWith(
        'permissions:create'
      );

      expect(factories.authorizationMiddleware).toHaveBeenCalledWith(
        'permissions:update'
      );

      expect(factories.authorizationMiddleware).toHaveBeenCalledWith(
        'permissions:delete'
      );
    });
  });

  describe('Public vs Protected Routes', () => {
    it('should have sign-in and refresh-token as public routes (no authentication)', async () => {
      await import('../../src/router');

      // Find calls to /sessions/sign-in and /sessions/refresh-token
      const signInCall = mockPost.mock.calls.find(
        (call) => call[0] === '/sessions/sign-in'
      );

      const refreshTokenCall = mockPost.mock.calls.find(
        (call) => call[0] === '/sessions/refresh-token'
      );

      // These should only have the controller method (no middleware)
      expect(signInCall).toHaveLength(2); // path + controller
      expect(refreshTokenCall).toHaveLength(2); // path + controller
    });

    it('should have all other routes as protected (with authentication and authorization)', async () => {
      await import('../../src/router');

      // Find a protected route call
      const protectedCall = mockGet.mock.calls.find(
        (call) => call[0] === '/accounts'
      );

      // Should have path + auth middleware + authz middleware + controller
      expect(protectedCall).toHaveLength(4);
    });
  });

  describe('Router Export', () => {
    it('should export a router instance', async () => {
      const routerModule = await import('../../src/router');

      expect(routerModule.router).toBeDefined();
    });
  });
});
