// 🐱 Nestjs imports
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// 🌏 Project imports
import { CreatePostUseCase } from '@src/api/post/use-case/create-post.use-case';

import { PostController } from './controller/post.controller';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';
import { PostRepository } from './repository/post.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService, PostRepository, CreatePostUseCase],
})
export class PostModule {}
