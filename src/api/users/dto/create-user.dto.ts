// 🐱 Nestjs imports
import { PickType } from '@nestjs/swagger';

// 📦 Package imports
import * as bcrypt from 'bcrypt';

// 🌏 Project imports
import { User } from '../entities/user.entity';

export class CreateUserDto extends PickType(User, [
  'nickname',
  'password',
] as const) {
  async toEntity() {
    const user = new User();
    user.nickname = this.nickname;
    user.password = await this.hashedPassword(this.password);

    return user;
  }

  private hashedPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
}
