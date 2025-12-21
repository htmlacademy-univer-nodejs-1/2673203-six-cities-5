import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';
import crypto from 'node:crypto';
import { jwtVerify } from 'jose';
import { Config } from '../../config/config.interface.js';
import { TokenPayload } from '../../../modules/auth/index.js';

export class AuthMiddleware implements Middleware {
  constructor(private readonly config: Config<{ JWT_SECRET: string }>) {}

  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new HttpError(StatusCodes.UNAUTHORIZED, 'Unauthorized', 'AuthMiddleware'));
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = this.config.get('JWT_SECRET');
    const secretKey = crypto.createSecretKey(jwtSecret, 'utf-8');

    try {
      const { payload } = await jwtVerify(token, secretKey) as { payload: TokenPayload };
      req.tokenPayload = payload;
      return next();
    } catch (err) {
      return next(new HttpError(StatusCodes.UNAUTHORIZED, 'Invalid token', 'AuthMiddleware'));
    }
  }
}

