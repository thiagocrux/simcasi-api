import { describe, expect, it } from 'vitest';

import { generateNewAccessTokenUseCase } from '../../../../../src/factories/useCases/sessions/generateNewAccessTokenUseCase';
import { GenerateNewAccessTokenUseCase } from '../../../../../src/useCases/sessions/GenerateNewAccessTokenUseCase';

describe('generateNewAccessTokenUseCase factory', () => {
  it('should export a function', () => {
    expect(typeof generateNewAccessTokenUseCase).toBe('function');
  });

  it('should return an instance of GenerateNewAccessTokenUseCase', () => {
    const useCase = generateNewAccessTokenUseCase();
    expect(useCase).toBeInstanceOf(GenerateNewAccessTokenUseCase);
  });
});
