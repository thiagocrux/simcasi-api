import type { CorsOptions } from 'cors';
import cors from 'cors';

const corsOptions: CorsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 10,
};

export const corsMiddleware = cors(corsOptions);
