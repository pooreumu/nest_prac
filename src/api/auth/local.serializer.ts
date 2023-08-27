import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from '@src/api/user/entities/user.entity';

import { AuthService } from './auth.service';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super();
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    return await this.userRepository
      .findOneOrFail({
        where: {
          id: +userId,
        },
        select: {
          id: true,
          nickname: true,
        },
      })
      .then((user) => {
        done(null, user); // req.user
      })
      .catch((e) => done(e));
  }

  serializeUser(user: User, done: CallableFunction) {
    done(null, user.id);
  }
}
