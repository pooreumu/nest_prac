// 🐱 Nestjs imports
import { Test, TestingModule } from '@nestjs/testing';

// 📦 Package imports
import bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

// 🌏 Project imports

import { TypeormConfigModule } from '@src/configs/typeorm-config.module';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersModule } from './users.module';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, TypeormConfigModule],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
    dataSource = module.get<DataSource>(DataSource);

    await dataSource.synchronize(true);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('users.signUp test 회원가입 테스트', () => {
    const nickname = 'nickname';
    const password = 'password';

    const createUserDto = new CreateUserDto();
    createUserDto.nickname = nickname;
    createUserDto.password = password;

    it('usersService.signUp 실행되면 usersRepository.insert로 저장 함?', async () => {
      await service.signUp(createUserDto);

      const user: User = await repository.findOne({
        where: {
          id: 1,
        },
      });

      expect(user.nickname).toBe(createUserDto.nickname);
      expect(await bcrypt.compare(createUserDto.password, user.password)).toBe(
        true,
      );
    });
  });
});
