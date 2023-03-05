// 🐱 Nestjs imports
import { Test, TestingModule } from '@nestjs/testing';

// 🌏 Project imports

import { TypeormConfigModule } from '@src/configs/typeorm-config.module';

import { UsersModule } from './users.module';
import { UsersRepository } from './users.repository';

describe('Users', () => {
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, TypeormConfigModule],
    }).compile();

    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(usersRepository).toBeDefined();
  });
});
