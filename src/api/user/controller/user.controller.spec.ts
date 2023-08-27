import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from '@user/controller/user.controller';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { UserService } from '@user/service/user.service';

jest.mock('@user/service/user.service');

describe('UsersController', () => {
  let controller: UserController;
  let service: UserService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  afterEach(async () => {
    await module.close();
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
