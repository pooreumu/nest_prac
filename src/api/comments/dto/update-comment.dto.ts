import { PickType } from '@nestjs/swagger';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PickType(CreateCommentDto, [
  'content',
  'password',
] as const) {
  toEntity(id: number) {
    const comment = new Comment();
    comment.content = this.content;
    comment.password = this.password;
    comment.id = id;

    return comment;
  }
}
