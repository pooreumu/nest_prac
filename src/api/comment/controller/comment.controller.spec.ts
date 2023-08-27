// 🐱 Nestjs imports
import { Test, TestingModule } from '@nestjs/testing';

import { CommentController } from '@comment/controller/comment.controller';
import { CreateCommentRequestDto } from '@comment/dto/request.dto/create-comment-request.dto';
import { UpdateCommentRequestDto } from '@comment/dto/request.dto/update-comment-request.dto';
import { CommentService } from '@comment/service/comment.service';

// 🌏 Project imports

jest.mock('@comment/comment.service');

describe('CommentsController', () => {
  let controller: CommentController;
  let service: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [CommentService],
    }).compile();

    controller = module.get<CommentController>(CommentController);
    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('댓글 생성', () => {
    it('controller.createComment 실행하면 service.createComment 실행함?', async () => {
      const commentData = {
        postId: 1,
        user: { id: 1, nickname: 'nickname' },
        content: 'content',
      };

      const createCommentDto = new CreateCommentRequestDto();
      createCommentDto.content = commentData.content;

      await controller.createComment(
        commentData.postId,
        createCommentDto,
        commentData.user,
      );

      expect(service.createComment).toBeCalledTimes(1);
      expect(service.createComment).toBeCalledWith(
        createCommentDto.toCreateCommentDto(
          commentData.postId,
          commentData.user.id,
        ),
      );
    });
  });
  describe('댓글 수정', () => {
    it('controller.updateComment 실행하면 service.updateComment 실행함?', async () => {
      const id = 1;
      const user = { id: 1, nickname: 'nickname' };
      const content = 'new comment content';

      const updateCommentRequestDto = new UpdateCommentRequestDto();
      updateCommentRequestDto.content = content;

      await controller.updateComment(id, updateCommentRequestDto, user);

      expect(service.updateComment).toBeCalledTimes(1);
      expect(service.updateComment).toBeCalledWith(
        updateCommentRequestDto.toUpdateCommentDto(id, user.id),
      );
    });
  });
});
