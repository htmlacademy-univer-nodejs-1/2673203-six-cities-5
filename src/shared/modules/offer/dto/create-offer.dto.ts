import { Length, IsEnum, IsString, ArrayMinSize, ArrayMaxSize, IsBoolean, Min, Max, IsIn, IsDate } from 'class-validator';
import { Amenity, City, Coordinates, HousingType } from '../../../../types/offer.js';
import { Type } from 'class-transformer';
export class CreateOfferDto {
  @Length(10, 100)
  public title!: string;

  @Length(20, 1024)
  public description!: string;

  @Type(() => Date)
  @IsDate()
  public publicationDate!: Date;

  @IsString()
  @IsIn(['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'])
  public city!: City;

  @IsString()
  public previewImage!: string;

  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @IsString({ each: true })
  public images!: string[];

  @IsBoolean()
  public isPremium!: boolean;

  @Min(1)
  @Max(5)
  public rating!: number;

  @IsEnum(HousingType)
  public type!: HousingType;

  @Min(1)
  @Max(8)
  public bedrooms!: number;

  @Min(1)
  @Max(10)
  public maxAdults!: number;

  @Min(100)
  @Max(100000)
  public price!: number;

  @IsEnum(Amenity, { each: true })
  public amenities!: Amenity[];

  @IsString()
  public author!: string;

  public commentsCount!: number;

  public location!: Coordinates;
}

