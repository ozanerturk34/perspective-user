import { UserGender } from './user-gender.enum';

export class UserDto {
  id: number;
  username: string;
  fullName: string;
  age: number;
  gender: UserGender;
}
