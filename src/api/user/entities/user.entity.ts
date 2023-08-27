import { ApiProperty } from '@nestjs/swagger';

import bcrypt from 'bcrypt';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';

import { Comment } from '@src/api/comment/entities/comment.entity';
import { Post } from '@src/api/post/entities/post.entity';

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

  @OneToMany(() => Post, (post: Post) => post.user, { cascade: true })
  posts: Post[];

  @OneToMany(() => Comment, (comment: Comment) => comment.user, {
    cascade: true,
  })
  comments: Comment[];

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
