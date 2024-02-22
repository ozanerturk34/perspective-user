import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from './user.service';
import { UserGender } from '../models/types/user-gender.enum';
import { UserRepository } from '../models/entities/user.repository';
import { UserDto } from '../models/dtos/user.dto';
import { User } from '../models/entities/user.entity';
import { ConflictException } from '@nestjs/common';

const mockUserRepository = () => ({
  createUser: jest.fn((user: UserDto) => ({ id: 1, ...user })),
  getUsers: jest.fn(),
});

describe('UserService', () => {
  let service: UserService;
  let repository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get(UserService);
    repository = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should create a user', async () => {
    // Create user hasn't been called yet
    expect(repository.createUser).not.toHaveBeenCalled();

    // Create a user
    const user = await service.createUser({
      fullName: 'John Doe',
      username: 'john_doe',
      age: 25,
      gender: UserGender.male,
    });

    // Create user has been called
    expect(repository.createUser).toHaveBeenCalled();

    // Check the result
    expect(user).toEqual({
      id: 1,
      fullName: 'John Doe',
      username: 'john_doe',
      age: 25,
      gender: UserGender.male,
    });
  });

  it('should return an error on create user request if the username is already taken', async () => {
    const mockError = { code: '23505' };
    repository.createUser.mockRejectedValue(mockError);

    expect(
      service.createUser({
        fullName: 'John Doe',
        username: 'john_doe',
        age: 25,
        gender: UserGender.male,
      }),
    ).rejects.toThrow(new ConflictException('Username already exists'));
  });

  it('should get users', async () => {
    // Get users hasn't been called yet
    expect(repository.getUsers).not.toHaveBeenCalled();

    const mockUsers: User[] = [
      {
        id: 1,
        fullName: 'John Doe',
        username: 'john_doe',
        gender: UserGender.male,
        age: 25,
        createdAt: new Date('2021-08-01T00:00:00.000Z'),
      },
      {
        id: 2,
        fullName: 'Jane Doe',
        username: 'jane_doe',
        gender: UserGender.female,
        age: 20,
        createdAt: new Date('2021-07-01T00:00:00.000Z'),
      },
    ];

    const mockUserDtos: UserDto[] = mockUsers.map((user) => ({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      age: user.age,
      gender: user.gender,
    }));

    repository.getUsers.mockResolvedValue(mockUsers);

    // Get users
    const users = await service.getUsers();

    // Get users has been called
    expect(repository.getUsers).toHaveBeenCalled();

    // Check the result
    expect(users).toEqual(mockUserDtos);
  });
});
