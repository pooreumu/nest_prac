// 🐱 Nestjs imports
import { ApiProperty } from '@nestjs/swagger';

// 📦 Package imports
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

// 🌏 Project imports
import { CreatePostDto } from '../create-post.dto';

export class CreatePostRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

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

  public toCreatePostDto(membership: boolean) {
    return new CreatePostDto({
      title: this.title,
      content: this.content,
      authorId: this.authorId,
      password: this.password,
      membership: membership,
    });
  }
}
