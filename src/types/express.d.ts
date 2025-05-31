declare namespace Express {
  interface Request {
    account: {
      id?: string;
      role?: string;
    };
  }
}
