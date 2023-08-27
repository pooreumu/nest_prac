// 🐱 Nestjs imports
import { ApiProperty } from '@nestjs/swagger';

// 📦 Package imports
import { IsNotEmpty, IsString } from 'class-validator';

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

  public toCreatePostDto(userId: number): CreatePostDto {
    return new CreatePostDto({
      title: this.title,
      content: this.content,
      userId,
    });
  }
}
