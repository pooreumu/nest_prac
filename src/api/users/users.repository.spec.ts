// 🐱 Nestjs imports
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

// 🌏 Project imports
import typeormConfig from '../../configs/typeorm.config';

import { UsersModule } from './users.module';
import { UsersRepository } from './users.repository';

describe('Users', () => {
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        TypeOrmModule.forRoot(typeormConfig()[process.env.NODE_ENV]),
      ],
    }).compile();

    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(usersRepository).toBeDefined();
  });
});
