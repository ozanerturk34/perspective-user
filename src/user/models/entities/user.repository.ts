import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { User } from './user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { SortBy } from '../types/sort-by.enum';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser({
    username,
    fullName,
    age,
    gender,
  }: CreateUserDto): Promise<User> {
    const user = this.create({
      username,
      fullName,
      age,
      gender,
      createdAt: new Date(),
    });
    return this.save(user);
  }

  async getUsers(createdAt?: SortBy): Promise<User[]> {
    return this.find(createdAt && { order: { createdAt: createdAt } });
  }
}
