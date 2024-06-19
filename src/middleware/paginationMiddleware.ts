import { Request, Response, NextFunction } from 'express';

// Define a custom interface for the pagination options
interface PaginationOptions {
  page: number;
  limit: number;
}

// Augment the existing Request type with the pagination property
declare module 'express-serve-static-core' {
  interface Request {
    pagination?: PaginationOptions;
  }
}

export function paginate(req: Request, res: Response, next: NextFunction) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  req.pagination = {
    page,
    limit
  };

  next();
}
