import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from '@users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(nickname: string, password: string) {
    const user = await this.userRepository.findOne({
      where: {
        nickname: User.fromNickname(nickname).nickname,
      },
    });
    if (!user) {
      return null;
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }
}
