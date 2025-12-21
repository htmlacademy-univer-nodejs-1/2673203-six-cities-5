import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, HttpError, HttpMethod, PrivateRouteMiddleware } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../../types/index.js';
import { CommentService } from './comment.service.interface.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { ValidateObjectIdMiddleware } from '../../libs/rest/middleware/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../libs/rest/middleware/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../libs/rest/middleware/document-exist.middleware.js';
import { OfferService } from '../offer/offer.service.interface.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../helpers/index.js';
import { CommentRdo } from './rdo/comment.rdo.js';

declare module 'express-serve-static-core' {
  interface Request {
    user: { id: string };
  }
}

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateDtoMiddleware(CreateCommentDto)
      ]
    });
  }

  public async create(req: Request, res: Response): Promise<void> {
    const userId = req.tokenPayload?.id;
    if (!userId) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Unauthorized', 'CommentController');
    }

    const dto = { ...req.body, userId };
    const comment = await this.commentService.create(dto);
    this.created(res, fillDTO(CommentRdo, comment));
  }

  public async index(req: Request, res: Response): Promise<void> {
    const userId = req.tokenPayload?.id;
    if (!userId) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Unauthorized', 'CommentController');
    }

    const { offerId } = req.params;
    const comments = await this.commentService.findByOfferId(offerId);
    this.ok(res, comments);
  }
}
