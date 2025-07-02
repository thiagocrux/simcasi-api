/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const useMock = vi.fn();
const listenMock = vi.fn((port, cb) => cb && cb());
const jsonMock = vi.fn(() => 'json-middleware');

const expressMock = vi.fn(() => ({
  use: useMock,
  listen: listenMock,
}));

(expressMock as any).json = jsonMock;

vi.mock('express', () => ({
  __esModule: true,
  default: expressMock,
}));

vi.mock('mongoose');

vi.mock('../../src/config', () => ({
  env: {
    appPort: 3000,
    appHostname: 'localhost',
    environment: 'test',
    databaseURL: 'mongodb://localhost:27017/testdb',
  },
}));

vi.mock('../../src/middlewares', () => ({
  corsMiddleware: vi.fn(),
  errorHandlerMiddleware: vi.fn(),
}));

vi.mock('../../src/router', () => ({
  router: vi.fn(),
}));

vi.mock('../../src/utils', () => ({
  logger: { info: vi.fn() },
}));

describe('src/index', () => {
  beforeEach(() => {
    useMock.mockClear();
    listenMock.mockClear();
    jsonMock.mockClear();
    (mongoose.connect as unknown as ReturnType<typeof vi.fn>).mockReset();
    vi.resetModules();
  });

  it('should bootstrap express app and connect to database', async () => {
    (mongoose.connect as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      {}
    );

    await import('../../src/index');
    expect(mongoose.connect).toHaveBeenCalled();
    expect(useMock).toHaveBeenCalledTimes(4); // cors, json, router, errorHandler
    expect(listenMock).toHaveBeenCalledWith(3000, expect.any(Function));
  });

  it('should throw error if mongoose connection fails', async () => {
    (mongoose.connect as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      'connection error'
    );

    const unhandled: Promise<Error> = new Promise((resolve) => {
      process.once('unhandledRejection', (err: any) => {
        resolve(err);
      });
    });

    await import('../../src/index');
    const error = await unhandled;
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toMatch(/connection error/);
  });
});
