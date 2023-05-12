// 🐱 Nestjs imports
import { Test, TestingModule } from '@nestjs/testing';

// 🌏 Project imports
import { UpdateCommentRequestDto } from '@comments/dto/request.dto/update-comment-request.dto';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CreateCommentRequestDto } from './dto/request.dto/create-comment-request.dto';

jest.mock('./comments.service');

describe('CommentsController', () => {
  let controller: CommentsController;
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [CommentsService],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    service = module.get<CommentsService>(CommentsService);
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
