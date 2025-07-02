import { describe, expect, it } from 'vitest';

import { createNotificationsController } from '../../../../src/factories/controllers/createNotificationsController';

describe('createNotificationsController factory', () => {
  it('should export a function', () => {
    expect(typeof createNotificationsController).toBe('function');
  });

  it('should create a controller instance', () => {
    const controller = createNotificationsController();
    expect(controller).toBeDefined();
  });
});
