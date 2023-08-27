import { Injectable } from '@nestjs/common';

import { CreateCommentDto } from '@comment/dto/create-comment.dto';

import { UpdateCommentDto } from '../dto/update-comment.dto';
import { CommentRepository } from '../repository/comment.repository';

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
