export const mockObjectId = '6857546d5bf8c18dd5ddb0ef';
export const mockInvalidObjectId = 'invalid_object_id';

export const mockJwtToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';

// REFACTOR: Move data below to specific file

export const mockEnv = {
  environment: 'mocked_environment',
  appHostname: 'mocked_app_hostname',
  appPort: 1234,
  databaseURL: 'mocked_database_url',
  jwtSecret: 'mocked_jwt_secret',
} as const;

export const mockFlags = {
  IS_AUTHENTICATION_DISABLED: false,
  IS_AUTHORIZATION_DISABLED: false,
} as const;

export const mockRequest = {
  headers: {
    authorization: `Bearer ${mockJwtToken}`,
  },
  method: 'GET',
  url: '/api/protected-route',
  body: {},
  query: {},
  params: {},
  cookies: {},
  ip: '127.0.0.1',
  get(headerName: string) {
    return this.headers[headerName.toLowerCase()];
  },
} as const;
