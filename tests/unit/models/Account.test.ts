import { describe, expect, it } from 'vitest';

import { Account } from '../../../src/models/Account';

describe('Account model', () => {
  it('should not include password in toJSON output', () => {
    const doc = new Account({
      name: 'Test User',
      email: 'test@example.com',
      password: 'secret',
      role: '507f1f77bcf86cd799439011',
    });

    const json = doc.toJSON();
    expect(json).not.toHaveProperty('password');
  });
});
