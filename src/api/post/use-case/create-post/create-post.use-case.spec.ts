import { Test, TestingModule } from '@nestjs/testing';

import {
  POST_REPOSITORY,
  PostRepository,
} from '@post/repository/post.repository';
import { PostTypeormRepository } from '@post/repository/post.typeorm-repository';
import { CreatePostCommand } from '@post/use-case/command/create-post.command';
import { CreatePostUseCase } from '@post/use-case/create-post/create-post.use-case';
import { CreatePostDto } from '@post/use-case/dto/create-post.dto';

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
    it('CreatePostUseCase.execute 를 실행하면 dto 를 반환해야 한다.', async () => {
      const command = new CreatePostCommand({
        title: 'title',
        content: 'content',
        userId: 1,
      });

      const createPost = command.toEntity();
      repository.save = jest.fn().mockResolvedValue(createPost);

      const post = await useCase.execute(command);
      const dto = new CreatePostDto(createPost);

      expect(post).toStrictEqual(dto);
    });
  });
});
