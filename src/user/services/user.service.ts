import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from '../models/dtos/create-user.dto';
import { UserDto } from '../models/dtos/user.dto';
import { GetUsersQuery } from '../models/types/get-users-query.model';
import { UserRepository } from '../models/entities/user.repository';
import { User } from '../models/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
  /**
   * Create User
   * @param {CreateUserDto} createUserDto - User data
   * @returns {Promise<UserDto>} Returns the created user
   */
  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      const user = await this.userRepository.createUser(createUserDto);
      return this.mapUserToUserDto(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * Retrieve Users
   * @param {GetUsersQuery} getUsersQuery - Query parameters including created: "asc" | "desc"
   * @returns {Promise<UserDto>} Returns all existing users
   */
  async getUsers(getUsersQuery?: GetUsersQuery): Promise<UserDto[]> {
    const users = await this.userRepository.getUsers(getUsersQuery?.created);
    return this.mapUsersToUserDtos(users);
  }

  private mapUsersToUserDtos(users: User[]): UserDto[] {
    return users.map((user) => this.mapUserToUserDto(user));
  }

  private mapUserToUserDto({
    id,
    username,
    fullName,
    age,
    gender,
  }: User): UserDto {
    return { id, username, fullName, age, gender };
  }
}
