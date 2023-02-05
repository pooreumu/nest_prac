// 🐱 Nestjs imports
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// 📦 Package imports
import { Repository } from 'typeorm';

// 🌏 Project imports
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectRepository(Comment) private readonly comments: Repository<Comment>,
  ) {}

  async createComment(comment: Comment): Promise<void> {
    try {
      await this.comments.insert(comment);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
