// 🐱 Nestjs imports
import { ApiProperty } from '@nestjs/swagger';

// 📦 Package imports
import {
  IsAlphanumeric,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

// 🌏 Project imports
import { Comment } from '../entities/comment.entity';

export class CreateCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  post: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  authorId?: string;

  @ApiProperty()
  @IsOptional()
  @IsAlphanumeric()
  password?: string;

  toEntity() {
    return Comment.createComment({
      post: this.post,
      authorId: this.authorId,
      password: this.password,
      content: this.content,
    });
  }
}
