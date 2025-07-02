import { describe, expect, it } from 'vitest';

import { createGenerateNewAccessTokenUseCase } from '../../../../../src/factories/useCases/sessions/createGenerateNewAccessTokenUseCase';
import { GenerateNewAccessTokenUseCase } from '../../../../../src/useCases/sessions/GenerateNewAccessTokenUseCase';

describe('createGenerateNewAccessTokenUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof createGenerateNewAccessTokenUseCase).toBe('function');
  });

  it('should return an instance of GenerateNewAccessTokenUseCase', () => {
    const useCase = createGenerateNewAccessTokenUseCase();
    expect(useCase).toBeInstanceOf(GenerateNewAccessTokenUseCase);
  });
});
