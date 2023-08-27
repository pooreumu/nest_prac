import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

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
