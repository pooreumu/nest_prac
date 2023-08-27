import { Test, TestingModule } from '@nestjs/testing';

import { CreateCommentRequestDto } from '@comment/dto/request.dto/create-comment-request.dto';
import { UpdateCommentDto } from '@comment/dto/update-comment.dto';
import { CommentRepository } from '@comment/repository/comment.repository';
import { CommentService } from '@comment/service/comment.service';

jest.mock('@comment/repository/comment.repository');

describe('CommentsService', () => {
  let module: TestingModule;
  let service: CommentService;
  let repository: CommentRepository;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [CommentService, CommentRepository],
    }).compile();

    service = module.get<CommentService>(CommentService);
    repository = module.get<CommentRepository>(CommentRepository);

    jest.clearAllMocks();
  });

  afterEach(async () => {
    await module.close();
  });

  const commentData = {
    postId: 1,
    userId: 1,
    content: 'content',
  };

  describe('댓글 생성', () => {
    it('service.createComment 실행하면 repository.createComment 실행 함?', async () => {
      const createCommentDto = new CreateCommentRequestDto();
      createCommentDto.content = commentData.content;

      repository.createComment = jest.fn();
      await service.createComment(
        createCommentDto.toCreateCommentDto(
          commentData.postId,
          commentData.userId,
        ),
      );

      expect(repository.createComment).toBeCalledTimes(1);
      expect(repository.createComment).toBeCalledWith(
        expect.objectContaining({
          userId: commentData.userId,
          content: commentData.content,
          postId: commentData.postId,
        }),
      );
    });
  });

  describe('댓글 수정', () => {
    it('service.updateComment 실행하면 repository.updateComment 실행 함?', async () => {
      const id = 1;
      const userId = 1;
      const content = 'new comment content';

      const updateCommentDto = new UpdateCommentDto({
        id,
        content,
        userId,
      });

      await service.updateComment(updateCommentDto);

      expect(repository.updateComment).toBeCalledTimes(1);
      expect(repository.updateComment).toBeCalledWith(
        expect.objectContaining({ id, content }),
      );
    });
  });
});
