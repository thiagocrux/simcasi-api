/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, vi } from 'vitest';

import { errorHandlerMiddleware } from '../../../src/middlewares/errorHandlerMiddleware';
import { logger } from '../../../src/utils';
import { NotFoundError } from '../../../src/utils/errors';

describe('errorHandlerMiddleware', () => {
  it('should send the correct status code and error object in the JSON response', () => {
    const error = new NotFoundError('subject');
    const req = {} as any;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      headersSent: false,
    } as any;

    const next = vi.fn();

    errorHandlerMiddleware(error, req, res, next);
    expect(res.status).toHaveBeenCalledWith(error.statusCode || 404);

    expect(res.json).toHaveBeenCalledWith({
      error: error,
    });

    expect(next).not.toHaveBeenCalled();
  });

  it('should call the logger when an error occurs', () => {
    vi.spyOn(logger, 'error').mockImplementationOnce(() => 'logger.error test');
    const error = new NotFoundError('subject');
    const req = {} as any;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      headersSent: false,
    } as any;

    const next = vi.fn();

    errorHandlerMiddleware(error, req, res, next);
    expect(logger.error).toHaveBeenCalled();
  });

  it('should call `next(error)` and not send a response if headers have already been sent', () => {
    const error = new NotFoundError('subject');
    const req = {} as any;

    const res = {
      status: vi.fn(),
      json: vi.fn(),
      headersSent: true,
    } as any;

    const next = vi.fn();
    errorHandlerMiddleware(error, req, res, next);
    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
