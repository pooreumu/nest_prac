import { Test, TestingModule } from '@nestjs/testing';

import { DataSource } from 'typeorm';

import { TypeormConfigModule } from '@src/configs/typeorm-config.module';

import { AuthModule } from '@auth/auth.module';

import { User } from '@user/entities/user.entity';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let module: TestingModule;
  let authService: AuthService;
  let dataSource: DataSource;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [TypeormConfigModule, AuthModule],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    dataSource = module.get<DataSource>(DataSource);

    await dataSource.synchronize(true);
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await module.close();
  });

  describe('validateUser test', () => {
    it('유저가 없을 때 테스트', async () => {
      const nickname = 'nickname';
      const password = 'password';

      const result = await authService.validateUser(nickname, password);

      expect(result).toBe(null);
    });

    it('유저가 있을 때 테스트', async () => {
      const nickname = 'nickname';
      const password = 'password';

      await dataSource
        .getRepository(User)
        .insert(await User.from(nickname, password));

      const result = await authService.validateUser(nickname, password);

      expect(result?.id).toBe(1);
      expect(result?.nickname).toBe('nickname');
    });

    it('유저 비밀번호 틀렸을 때 테스트', async () => {
      const nickname = 'nickname';
      const password = 'password';
      const wrongPassword = 'wrongPassword';

      await dataSource
        .getRepository(User)
        .insert(await User.from(nickname, password));

      const result = await authService.validateUser(nickname, wrongPassword);

      expect(result).toBe(null);
    });
  });
});
