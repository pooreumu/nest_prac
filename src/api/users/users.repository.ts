// 🐱 Nestjs imports
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// 📦 Package imports
import { Repository } from 'typeorm';

// 🌏 Project imports
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<any> {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {
    super(user.target, user.manager, user.queryRunner);
  }
}
