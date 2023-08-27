import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from '@src/api/user/entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userTypeOrmRepository: Repository<User>,
  ) {}

  async insert(user: User) {
    try {
      return await this.userTypeOrmRepository.insert(user);
    } catch (e) {
      throw e.code === 'ER_DUP_ENTRY'
        ? new BadRequestException('이미 사용중인 닉네임입니다.')
        : new InternalServerErrorException();
    }
  }
}
