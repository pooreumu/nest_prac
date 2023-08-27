import { Injectable } from '@nestjs/common';

import { CreatePostDto } from '@src/api/post/dto/create-post.dto';
import { PostRepository } from '@src/api/post/repository/post.repository';
import { UseCase } from '@src/api/post/use-case/use-case';

@Injectable()
export class CreatePostUseCase implements UseCase<CreatePostDto, void> {
  constructor(private readonly postRepository: PostRepository) {}

  execute(createPostDto: CreatePostDto): Promise<void> {
    const createPost = createPostDto.toEntity();

    return this.postRepository.createPost(createPost);
  }
}
