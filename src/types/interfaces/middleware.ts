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

export interface Data<T = unknown> {
  data: Record<string, T>;
}

export interface Middleware<T = unknown> {
  handle(request: Request): Promise<Response | Data<T>>;
}
