// 🐱 Nestjs imports
import { Injectable } from '@nestjs/common';

// 🌏 Project imports
import { CreateCommentDto } from '@src/api/comment/dto/create-comment.dto';

import { CommentsRepository } from './comments.repository';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async createComment(commentData: CreateCommentDto) {
    return this.commentsRepository.createComment(commentData.toEntity());
  }

  async updateComment(commentData: UpdateCommentDto) {
    return this.commentsRepository.updateComment(commentData.toEntity());
  }
}
