/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, vi } from 'vitest';

import { middlewareAdapter } from '../../../src/adapters';

describe('middlewareAdapter.ts', () => {
  it('should call next middleware when no error occurs', async () => {
    const req = {} as any;
    const res = {} as any;
    const next = vi.fn();

    const middleware = middlewareAdapter({
      handle: vi.fn().mockResolvedValue({ data: {} }),
    });

    await middleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should propagate errors thrown by the middleware to the caller', async () => {
    const req = {} as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;
    const next = vi.fn();

    const middleware = middlewareAdapter({
      handle: vi.fn().mockRejectedValue(new Error('Testing error')),
    });

    await expect(middleware(req, res, next)).rejects.toThrow('Testing error');
  });

  it('should pass the request and response objects to the handler', async () => {
    const req = {
      account: { id: undefined, role: undefined },
      body: undefined,
      headers: undefined,
      params: undefined,
    } as any;

    const res = {} as any;
    const next = vi.fn();
    const handle = vi.fn().mockResolvedValue({ data: {} });
    const middleware = middlewareAdapter({ handle });
    await middleware(req, res, next);
    expect(handle.mock.calls[0][0]).toStrictEqual(req);
    expect(handle.mock.calls[0][1]).toBeUndefined();
  });

  it('should send a response if statusCode is present in the handler result', async () => {
    const req = {} as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;
    const next = vi.fn();
    const result = { statusCode: 403, body: { error: 'Forbidden' } };

    const middleware = middlewareAdapter({
      handle: vi.fn().mockResolvedValue(result),
    });

    await middleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden' });
    expect(next).not.toHaveBeenCalled();
  });
});
