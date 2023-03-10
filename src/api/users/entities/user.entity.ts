// π± Nestjs imports
import { ApiProperty } from '@nestjs/swagger';

// π¦ Package imports
import bcrypt from 'bcrypt';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';

// π Project imports
import { BaseTimeEntity } from '@lib/entity/BaseTimeEntity';

@Entity()
export class User extends BaseTimeEntity {
  @ApiProperty({
    required: true,
    description: 'λλ€μ',
  })
  @IsNotEmpty()
  @IsString()
  @Column({
    type: 'varchar',
    comment: 'λλ€μ',
    unique: true,
  })
  nickname: string;

  @ApiProperty({
    required: true,
    description: 'λΉλ°λ²νΈ',
  })
  @IsNotEmpty()
  @IsString()
  @Column({
    type: 'varchar',
    comment: 'λΉλ°λ²νΈ',
  })
  password: string;

  static async from(nickname: string, password: string) {
    const user = new User();
    user.nickname = nickname;
    user.password = await bcrypt.hash(password, 12);

    return user;
  }

  static fromNickname(nickname: string) {
    const user = new User();
    user.nickname = nickname;

    return user;
  }
}
