import { nanoid } from 'nanoid';
import multer, { diskStorage } from 'multer';
import { extension } from 'mime-types';
import { Request, Response, NextFunction } from 'express';
import { Middleware } from './middleware.interface.js';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../errors/http-error.js';

export class UploadFileMiddleware implements Middleware {
  constructor(
    private uploadDirectory: string,
    private fieldName: string,
  ) {}

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const fileExt = extension(file.mimetype) || 'bin';
        const filename = nanoid();
        callback(null, `${filename}.${fileExt}`);
      }
    });

    const uploadSingle = multer({
      storage,
      fileFilter: (_req, file, cb) => {
        if (!['image/png', 'image/jpeg'].includes(file.mimetype)) {
          cb(new HttpError(
            StatusCodes.BAD_REQUEST,
            'Avatar must be jpg or png',
            'UploadFileMiddleware'
          ));
          return;
        }
        cb(null, true);
      }
    }).single(this.fieldName);
    uploadSingle(req, res, next);
  }
}
