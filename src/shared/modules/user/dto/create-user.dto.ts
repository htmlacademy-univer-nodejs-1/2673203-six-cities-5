import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length
} from 'class-validator';
import { UserType } from '../../../../types/user.js';

export class CreateUserDto {
  @IsString()
  @Length(1, 15)
  public name!: string;

  @IsEmail()
  public email!: string;

  @IsOptional()
  @IsString()
  public avatar?: string;

  @IsString()
  @Length(6, 12)
  public password!: string;

  @IsEnum(UserType)
  public type!: UserType;
}

