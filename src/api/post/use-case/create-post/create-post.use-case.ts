import { Inject, Injectable } from '@nestjs/common';

import { Post } from '@post/entities/post.entity';
import { POST_REPOSITORY } from '@post/repository/post.repository';
import { PostTypeormRepository } from '@post/repository/post.typeorm-repository';
import { CreatePostCommand } from '@post/use-case/command/create-post.command';
import { CreatePostDto } from '@post/use-case/dto/create-post.dto';
import { UseCase } from '@post/use-case/use-case';

@Injectable()
export class CreatePostUseCase
  implements UseCase<CreatePostCommand, CreatePostDto>
{
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostTypeormRepository,
  ) {}

  async execute(createPostCommand: CreatePostCommand): Promise<CreatePostDto> {
    const post: Post = await this.postRepository.save(
      createPostCommand.toEntity(),
    );
    return post.toDto();
  }
}
