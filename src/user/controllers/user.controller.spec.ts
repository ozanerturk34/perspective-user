import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { UserGender } from '../models/types/user-gender.enum';
import { UserDto } from '../models/dtos/user.dto';
import { UserRepository } from '../models/entities/user.repository';

const mockUserRepository = () => ({
  createUser: jest.fn((user: UserDto) => ({ id: 1, ...user })),
  getUsers: jest.fn(),
});

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const result = {
      id: 1,
      fullName: 'John Doe',
      username: 'john_doe',
      age: 25,
      gender: UserGender.male,
    };
    jest.spyOn(service, 'createUser').mockImplementation(async () => result);
    expect(
      await controller.createUser({
        fullName: 'John Doe',
        username: 'john_doe',
        age: 25,
        gender: UserGender.male,
      }),
    ).toBe(result);
  });

  it('should get users', async () => {
    const result = [
      {
        id: 1,
        fullName: 'John Doe',
        username: 'john_doe',
        gender: UserGender.male,
        age: 25,
      },
      {
        id: 2,
        fullName: 'Jane Doe',
        username: 'jane_doe',
        gender: UserGender.female,
        age: 20,
      },
    ];

    jest.spyOn(service, 'getUsers').mockImplementation(async () => result);

    expect(await controller.getUsers({})).toBe(result);
  });
});
