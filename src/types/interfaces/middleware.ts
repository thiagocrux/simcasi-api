export interface Request {
  body: Record<string, unknown>;
  params: Record<string, string>;
  headers: Record<string, string>;
  account?: {
    id?: string;
    role?: string;
  };
}

export interface Response {
  statusCode: number;
  body: Record<string, unknown> | null;
}

export interface Data {
  data: Record<string, unknown>;
}

export interface Middleware {
  handle(request: Request): Promise<Response | Data>;
}
