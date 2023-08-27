// 🐱 Nestjs imports
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// 🌏 Project imports
import { CommentController } from './controller/comment.controller';
import { Comment } from './entities/comment.entity';
import { CommentRepository } from './repository/comment.repository';
import { CommentService } from './service/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule {}
