import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

import { CreateCommentDto } from '@src/api/comment/dto/create-comment.dto';

export class CreateCommentRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  toCreateCommentDto(postId: number, userId: number) {
    return new CreateCommentDto({
      postId,
      userId,
      content: this.content,
    });
  }
}
