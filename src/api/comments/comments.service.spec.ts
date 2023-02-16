// 🐱 Nestjs imports
import { Test, TestingModule } from '@nestjs/testing';

// 🌏 Project imports
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

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

    jest.clearAllMocks();
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

      repository.createComment = jest.fn();
      await service.createComment(createCommentDto);

      expect(repository.createComment).toBeCalledTimes(1);
      expect(repository.createComment).toBeCalledWith(
        expect.objectContaining({
          authorId: commentData.authorId,
          content: commentData.content,
          password: commentData.password,
          post: commentData.postId,
        }),
      );
    });
  });

  describe('댓글 수정', () => {
    it('service.updateComment 실행하면 repository.updateComment 실행 함?', async () => {
      const id = 1;
      const content = 'new comment content';
      const password = commentData.password;

      const updateCommentDto = new UpdateCommentDto();
      updateCommentDto.content = content;
      updateCommentDto.password = password;

      await service.updateComment(id, updateCommentDto);
      expect(repository.updateComment).toBeCalledTimes(1);
      expect(repository.updateComment).toBeCalledWith(
        expect.objectContaining({ id, content, password }),
      );
    });
  });
});
