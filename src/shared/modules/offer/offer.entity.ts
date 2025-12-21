import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { City, HousingType, Amenity } from '../../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

class CoordinatesClass {
  @prop({ required: true })
  public latitude!: number;

  @prop({ required: true })
  public longitude!: number;
}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, minlength: 10, maxlength: 100 })
  public title!: string;

  @prop({ required: true, minlength: 20, maxlength: 1024 })
  public description!: string;

  @prop({ required: true, default: Date.now })
  public publicationDate!: Date;

  @prop({ required: true, type: () => String })
  public city!: City;

  @prop({ required: true })
  public previewImage!: string;

  @prop({ type: () => [String], validate: (v) => v.length === 6 })
  public images!: string[];

  @prop({ required: true, default: false })
  public isPremium!: boolean;

  @prop({ required: true, min: 1, max: 5, default: 1 })
  public rating!: number;

  @prop({ required: true, type: () => String })
  public type!: HousingType;

  @prop({ required: true, min: 1, max: 8 })
  public bedrooms!: number;

  @prop({ required: true, min: 1, max: 10 })
  public maxAdults!: number;

  @prop({ required: true, min: 100, max: 100000 })
  public price!: number;

  @prop({ required: true, type: () => [String] })
  public amenities!: Amenity[];

  @prop({ required: true })
  public author!: string;

  @prop({ required: true, default: 0 })
  public commentsCount!: number;

  @prop({ required: true, _id: false, type: () => CoordinatesClass })
  public location!: CoordinatesClass;
}

export const OfferModel = getModelForClass(OfferEntity);
