import { Container } from 'inversify';
import { DefaultOfferService } from './default-offer.service.js';
import { OfferService } from './offer.service.interface.js';
import { Component } from '../../../types/index.js';
import { OfferEntity, OfferModel } from './index.js';
import { types } from '@typegoose/typegoose';

export function createOfferContainer() {
  const offerContainer = new Container();
  offerContainer.bind<OfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);

  return offerContainer;
}
