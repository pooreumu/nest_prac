import { Inject, Injectable } from '@nestjs/common';

import { CreateUserDto } from '../dto/create-user.dto';
import { UserTypeormRepository } from '../repository/user.typeorm-repository';

import { USER_REPOSITORY } from '@user/repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly usersRepository: UserTypeormRepository,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    await this.usersRepository.save(await createUserDto.toEntity());
  }
}
