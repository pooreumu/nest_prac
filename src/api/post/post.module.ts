// 🐱 Nestjs imports
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// 🌏 Project imports
import { PostController } from '@post/controller/post.controller';
import { Post } from '@post/entities/post.entity';
import { PostService } from '@post/post.service';
import { POST_REPOSITORY } from '@post/repository/post.repository';
import { PostTypeormRepository } from '@post/repository/post.typeorm-repository';
import { CreatePostUseCase } from '@post/use-case/create-post.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [
    PostService,
    CreatePostUseCase,
    {
      provide: POST_REPOSITORY,
      useClass: PostTypeormRepository,
    },
  ],
})
export class PostModule {}
