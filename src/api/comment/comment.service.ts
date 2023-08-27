// 🐱 Nestjs imports
import { Injectable } from '@nestjs/common';

// 🌏 Project imports
import { CreateCommentDto } from '@src/api/comment/dto/create-comment.dto';

import { CommentRepository } from './comment.repository';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentsRepository: CommentRepository) {}

  async createComment(commentData: CreateCommentDto) {
    return this.commentsRepository.createComment(commentData.toEntity());
  }

  async updateComment(commentData: UpdateCommentDto) {
    return this.commentsRepository.updateComment(commentData.toEntity());
  }
}
