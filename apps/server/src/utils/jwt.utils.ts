import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET_KEY } from '../configs';

export const verifyJwt = (req: Request): string | jwt.JwtPayload => {
  if (req.headers.hasOwnProperty('authorization')) {
    try {
      return jwt.verify((req.headers as any).authorization, TOKEN_SECRET_KEY);
    } catch (err) {
      throw new UnauthorizedException('Not authenticated!', err.message);
    }
  }
  return null;
};
