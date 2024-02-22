import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from './user.service';
import { UserGender } from '../models/types/user-gender.enum';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await service.createUser({
      fullName: 'John Doe',
      username: 'john_doe',
      age: 25,
      gender: UserGender['male'],
    });
    expect(user).toEqual({
      id: 1,
      fullName: 'John Doe',
      username: 'john_doe',
      age: 25,
      gender: UserGender['male'],
    });
  });

  it('should get users', async () => {
    const users = await service.getUsers();
    expect(users).toEqual([
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
    ]);
  });
});
