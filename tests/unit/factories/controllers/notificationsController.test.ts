import { describe, expect, it } from 'vitest';

import { notificationsController } from '../../../../src/factories/controllers/notificationsController';

describe('notificationsController factory', () => {
  it('should export a function', () => {
    expect(typeof notificationsController).toBe('function');
  });

  it('should create a controller instance', () => {
    const controller = notificationsController();
    expect(controller).toBeDefined();
  });
});
