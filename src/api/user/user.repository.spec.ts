// 🐱 Nestjs imports
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

// 🌏 Project imports
import { DataSource } from 'typeorm';

import { User } from '@src/api/user/entities/user.entity';
import { TypeormConfigModule } from '@src/configs/typeorm-config.module';

import { UserModule } from './user.module';
import { UserRepository } from './user.repository';

describe('Users', () => {
  let usersRepository: UserRepository;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, TypeormConfigModule],
    }).compile();

    usersRepository = module.get<UserRepository>(UserRepository);
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
