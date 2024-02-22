import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../models/create-user.dto';
import { UserDto } from '../models/user.dto';
import { UserGender } from '../models/user-gender.enum';
import { GetUsersQuery } from '../models/get-users-query.model';

@Injectable()
export class UserService {
  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const user: UserDto = {
      id: 1,
      ...createUserDto,
    };
    return user;
  }

  async getUsers(getUsersQuery: GetUsersQuery): Promise<UserDto[]> {
    console.log('getUsersQuery', getUsersQuery);
    const users: UserDto[] = [
      {
        id: 1,
        fullName: 'John Doe',
        username: 'john_doe',
        gender: UserGender['male'],
        age: 25,
      },
      {
        id: 2,
        fullName: 'Jane Doe',
        username: 'jane_doe',
        gender: UserGender['female'],
        age: 20,
      },
    ];
    return users;
  }
}
