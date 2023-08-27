// 🐱 Nestjs imports
import { Test, TestingModule } from '@nestjs/testing';

// 🌏 Project imports
import { CreateUserDto } from '@user/dto/create-user.dto';
import { UserController } from '@user/user.controller';
import { UserService } from '@user/user.service';

jest.mock('@user/user.service');

describe('UsersController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
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
