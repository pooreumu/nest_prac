// 🐱 Nestjs imports
import { Test, TestingModule } from '@nestjs/testing';

// 🌏 Project imports
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

jest.mock('./users.service');

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('controller.signUp test 회원가입 테스트', () => {
    it('controller.signUp을 실행하면 usersService.signUp이 실행되나?', async () => {
      const nickname = 'nickname';
      const password = 'password';

      const createUserDto = new CreateUserDto();
      createUserDto.nickname = nickname;
      createUserDto.password = password;

      await controller.signUp(createUserDto);
      expect(service.signUp).toBeCalledTimes(1);
      expect(service.signUp).toBeCalledWith(createUserDto);
    });
  });
});
