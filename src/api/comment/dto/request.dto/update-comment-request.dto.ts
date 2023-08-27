import { PickType } from '@nestjs/swagger';

import { UpdateCommentDto } from '@src/api/comment/dto/update-comment.dto';

import { CreateCommentRequestDto } from './create-comment-request.dto';

export class UpdateCommentRequestDto extends PickType(CreateCommentRequestDto, [
  'content',
] as const) {
  toUpdateCommentDto(id: number, userId) {
    return new UpdateCommentDto({
      id,
      userId,
      content: this.content,
    });
  }
}
