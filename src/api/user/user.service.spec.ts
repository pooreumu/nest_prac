// 🐱 Nestjs imports
import { Test, TestingModule } from '@nestjs/testing';

// 📦 Package imports
import bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';

// 🌏 Project imports
import { TypeormConfigModule } from '@src/configs/typeorm-config.module';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserModule } from './user.module';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UsersService', () => {
  let service: UserService;
  let repository: UserRepository;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, TypeormConfigModule],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
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

      const user = await dataSource.getRepository(User).findOne({
        where: {
          id: 1,
        },
      });
      if (!user) {
        throw new Error();
      }
      expect(user.nickname).toBe(createUserDto.nickname);
      expect(await bcrypt.compare(createUserDto.password, user.password)).toBe(
        true,
      );
    });
  });
});
