import { PickType } from '@nestjs/swagger';

import { User } from '../entities/user.entity';

export class CreateUserDto extends PickType(User, [
  'nickname',
  'password',
] as const) {
  async toEntity() {
    return await User.from(this.nickname, this.password);
  }
}
