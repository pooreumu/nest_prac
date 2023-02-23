import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from '@users/entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<any> {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {
    super(user.target, user.manager, user.queryRunner);
  }
}
