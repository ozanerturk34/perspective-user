import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';
import { UserGender } from './user-gender.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  age: number;

  @IsEnum(UserGender)
  @IsNotEmpty()
  gender: UserGender;
}
