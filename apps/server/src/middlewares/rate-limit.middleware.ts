import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import {
  API_COMMENT_POST_RATE_LIMIT,
  API_REQUEST_RATE_LIMIT,
} from '../configs';
import { verifyJwt } from '../utils';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  public use = (req: Request, res: Response, next: NextFunction): void => {
    if (
      req.originalUrl.includes('/api/comments') &&
      req.method === 'POST' &&
      verifyJwt(req)
    ) {
      return rateLimit({
        windowMs: API_COMMENT_POST_RATE_LIMIT.windowMs,
        max: API_COMMENT_POST_RATE_LIMIT.max,
      })(req, res, next);
    } else if (req.originalUrl.includes('/api')) {
      return rateLimit({
        windowMs: API_REQUEST_RATE_LIMIT.windowMs,
        max: API_REQUEST_RATE_LIMIT.max,
      })(req, res, next);
    }

    next();
  };
}
