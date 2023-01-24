// 🐱 Nestjs imports
import { Injectable } from '@nestjs/common';

// 🌏 Project imports
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async createComment(commentData: CreateCommentDto) {
    return this.commentsRepository.createComment(commentData.toEntity());
  }
}
