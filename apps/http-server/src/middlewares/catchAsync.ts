import type { Request, Response, NextFunction } from "express";

type AsyncMiddleware = (req: Request<any, any, any>, res: Response, next: NextFunction) => Promise<unknown>;

const catchAsync = (theFunc: AsyncMiddleware) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };
};

export default catchAsync;
