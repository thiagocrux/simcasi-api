import { describe, expect, it } from 'vitest';

import { treatmentsController } from '../../../../src/factories/controllers/treatmentsController';

describe('treatmentsController factory', () => {
  it('should export a function', () => {
    expect(typeof treatmentsController).toBe('function');
  });

  it('should create a controller instance', () => {
    const controller = treatmentsController();
    expect(controller).toBeDefined();
  });
});
