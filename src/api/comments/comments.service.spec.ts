// 🐱 Nestjs imports
import { Test, TestingModule } from '@nestjs/testing';

// 🌏 Project imports
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';

jest.mock('./comments.repository');

describe('CommentsService', () => {
  let service: CommentsService;
  let repository: CommentsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsService, CommentsRepository],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    repository = module.get<CommentsRepository>(CommentsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const commentData = {
    postId: 1,
    authorId: 'author',
    content: 'content',
    password: 'password',
  };

  describe('댓글 생성', () => {
    it('service.createComment 실행하면 repository.createComment 실행 함?', async () => {
      const createCommentDto = new CreateCommentDto();
      createCommentDto.post = commentData.postId;
      createCommentDto.authorId = commentData.authorId;
      createCommentDto.content = commentData.content;
      createCommentDto.password = commentData.password;

      await service.createComment(createCommentDto);

      expect(repository.createComment).toBeCalledTimes(1);
      expect(repository.createComment).toBeCalledWith(
        createCommentDto.toEntity(),
      );
    });
  });
});
