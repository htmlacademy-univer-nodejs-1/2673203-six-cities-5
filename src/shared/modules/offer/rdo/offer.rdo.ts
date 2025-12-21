import { Expose } from 'class-transformer';
import { City } from '../../../../types/index.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public price: number;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public city: City;

  @Expose({ name: 'previewImage' })
  public previewImage: string;

  @Expose()
  public favorite = false;

  @Expose()
  public author!: string;
}
