// 🐱 Nestjs imports
import { ApiProperty } from '@nestjs/swagger';

// 📦 Package imports
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsAlphanumeric,
} from 'class-validator';

// 🌏 Project imports
import { UpdatePostDto } from '../update-post.dto';

export class UpdatePostRequestDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsAlphanumeric()
  password: string;

  public toUpdatePostDto(postId: number) {
    return new UpdatePostDto({
      postId,
      title: this.title,
      content: this.content,
      password: this.password,
    });
  }
}
