import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

import { UserGender } from '../types/user-gender.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'username must be alphanumeric' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  fullName: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  age: number;

  @IsEnum(UserGender)
  @IsNotEmpty()
  gender: UserGender;
}
