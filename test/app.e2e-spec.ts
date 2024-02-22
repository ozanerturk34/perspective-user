import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UserService } from './../src/user/services/user.service';
import { CreateUserDto } from 'src/user/models/dtos/create-user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const userService = {
    getUsers: () => [
      {
        id: 1,
        fullName: 'John Doe',
        username: 'john_doe',
        age: 25,
        gender: 'male',
      },
      {
        id: 2,
        fullName: 'Jane Doe',
        username: 'jane_doe',
        age: 35,
        gender: 'female',
      },
    ],
    createUser: (createUserDto: CreateUserDto) => ({ id: 1, ...createUserDto }),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect(userService.getUsers());
  });

  it('/ (Post)', () => {
    return request(app.getHttpServer())
      .post('/user/create')
      .send({
        fullName: 'John Doe',
        username: 'john_doe',
        age: 25,
        gender: 'male',
      })
      .expect(201)
      .expect({
        id: 1,
        fullName: 'John Doe',
        username: 'john_doe',
        age: 25,
        gender: 'male',
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
