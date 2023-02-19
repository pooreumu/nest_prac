// 🐱 Nestjs imports
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

// 🌏 Project imports
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signUp(createUserDto: CreateUserDto) {
    try {
      await this.usersRepository.insert(await createUserDto.toEntity());
    } catch (e) {
      throw e.code === 'ER_DUP_ENTRY'
        ? new BadRequestException('이미 사용중인 닉네임입니다.')
        : new InternalServerErrorException();
    }
  }
}
