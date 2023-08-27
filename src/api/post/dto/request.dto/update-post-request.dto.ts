// 🐱 Nestjs imports
import { ApiProperty } from '@nestjs/swagger';

// 📦 Package imports
import { IsOptional, IsString } from 'class-validator';

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

  public toUpdatePostDto(postId: number, userId: number): UpdatePostDto {
    return new UpdatePostDto({
      postId,
      userId,
      title: this.title,
      content: this.content,
    });
  }
}
