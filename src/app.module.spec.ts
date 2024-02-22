import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';

describe('AppModule', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const appModule = module.get<AppModule>(AppModule);

    expect(appModule).toBeDefined();
  });
});
