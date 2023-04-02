// 🐱 Nestjs imports
import { ApiProperty } from '@nestjs/swagger';

// 📦 Package imports
import bcrypt from 'bcrypt';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';

// 🌏 Project imports
import { BaseTimeEntity } from '@lib/entity/base-time-entity';

@Entity()
export class User extends BaseTimeEntity {
  @ApiProperty({
    required: true,
    description: '닉네임',
  })
  @IsNotEmpty()
  @IsString()
  @Column({
    type: 'varchar',
    comment: '닉네임',
    unique: true,
  })
  nickname: string;

  @ApiProperty({
    required: true,
    description: '비밀번호',
  })
  @IsNotEmpty()
  @IsString()
  @Column({
    type: 'varchar',
    comment: '비밀번호',
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
