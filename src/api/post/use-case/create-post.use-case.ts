import { Inject, Injectable } from '@nestjs/common';

import { CreatePostDto } from '@src/api/post/dto/create-post.dto';
import { UseCase } from '@src/api/post/use-case/use-case';

import { POST_REPOSITORY } from '@post/repository/post.repository';
import { PostTypeormRepository } from '@post/repository/post.typeorm-repository';

@Injectable()
export class CreatePostUseCase implements UseCase<CreatePostDto, void> {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostTypeormRepository,
  ) {}

  async execute(createPostDto: CreatePostDto): Promise<void> {
    const createPost = createPostDto.toEntity();
    await this.postRepository.createPost(createPost);
  }
}
