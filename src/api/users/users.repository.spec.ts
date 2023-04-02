// 🐱 Nestjs imports
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

// 🌏 Project imports
import { DataSource } from 'typeorm';

import { TypeormConfigModule } from '@src/configs/typeorm-config.module';

import { User } from '@users/entities/user.entity';

import { UsersModule } from './users.module';
import { UsersRepository } from './users.repository';

describe('Users', () => {
  let usersRepository: UsersRepository;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, TypeormConfigModule],
    }).compile();

    usersRepository = module.get<UsersRepository>(UsersRepository);
    dataSource = module.get<DataSource>(DataSource);

    await dataSource.synchronize(true);
  });

  it('should be defined', () => {
    expect(usersRepository).toBeDefined();
  });

  describe('usersRepository.insert test', () => {
    it('중복 닉네임 에러냄?', async () => {
      const nickname = 'nickname';

      await usersRepository.insert(await User.from(nickname, 'password'));

      await expect(async () => {
        await usersRepository.insert(await User.from(nickname, 'password'));
      }).rejects.toThrowError(
        new BadRequestException('이미 사용중인 닉네임입니다.'),
      );
    });
  });
});
