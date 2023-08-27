import { Test, TestingModule } from '@nestjs/testing';

import { LocalDateTime } from '@js-joda/core';

import { Post } from '@post/entities/post.entity';
import {
  POST_REPOSITORY,
  PostRepository,
} from '@post/repository/post.repository';
import { PostTypeormRepository } from '@post/repository/post.typeorm-repository';
import { CreatePostCommand } from '@post/use-case/command/create-post.command';
import { CreatePostUseCase } from '@post/use-case/create-post/create-post.use-case';
import { CreatePostDto } from '@post/use-case/dto/create-post.dto';

import { User } from '@user/entities/user.entity';

jest.mock('@post/repository/post.typeorm-repository');

describe('create post use case', () => {
  let module: TestingModule;
  let useCase: CreatePostUseCase;
  let repository: PostRepository;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [],
      providers: [
        CreatePostUseCase,
        {
          provide: POST_REPOSITORY,
          useClass: PostTypeormRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreatePostUseCase>(CreatePostUseCase);
    repository = module.get<PostRepository>(POST_REPOSITORY);
  });

  afterEach(async () => {
    await module.close();
  });

  describe('게시글 작성', () => {
    it('CreatePostUseCase.execute를 실행 하면 dto를 반환 해야 한다.', async () => {
      const title = 'title';
      const content = 'content';
      const userId = 1;

      const command = new CreatePostCommand({
        title,
        content,
        userId,
      });
      const entity = Post.of({
        id: 1,
        title,
        content,
        userId,
        user: { id: userId } as User,
        comments: [],
        createdAt: LocalDateTime.now(),
        updatedAt: LocalDateTime.now(),
      });

      repository.save = jest.fn().mockResolvedValue(entity);

      const post = await useCase.execute(command);
      const dto = new CreatePostDto(entity);

      expect(post).toStrictEqual(dto);
    });
  });
});
