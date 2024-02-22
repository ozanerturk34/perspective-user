import { Test } from '@nestjs/testing';
import { UserModule } from './user.module';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

describe('UserModule', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    const userModule = module.get<UserModule>(UserModule);
    const userService = module.get<UserService>(UserService);
    const userController = module.get<UserController>(UserController);

    expect(userModule).toBeDefined();
    expect(userService).toBeInstanceOf(UserService);
    expect(userController).toBeInstanceOf(UserController);
  });
});
