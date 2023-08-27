import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { QueryFailedError, Repository } from 'typeorm';

import { User } from '@user/entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userTypeOrmRepository: Repository<User>,
  ) {}

  async insert(user: User) {
    try {
      return await this.userTypeOrmRepository.insert(user);
    } catch (e: unknown) {
      if (e instanceof QueryFailedError)
        throw e.driverError.code === 'ER_DUP_ENTRY'
          ? new BadRequestException('이미 사용중인 닉네임입니다.')
          : new InternalServerErrorException();
    }
  }
}
