import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import typeormConfig from '@src/configs/typeorm.config';

import { AuthModule } from '@auth/auth.module';

import { User } from '@users/entities/user.entity';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeormConfig()[process.env.NODE_ENV]),
        AuthModule,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    dataSource = module.get<DataSource>(DataSource);

    await dataSource.synchronize(true);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
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

      expect(result.id).toBe(1);
      expect(result.nickname).toBe('nickname');
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
