// 🐱 Nestjs imports
import { Test, TestingModule } from '@nestjs/testing';

// 🌏 Project imports
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

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
        authorId: 'author',
        content: 'content',
        password: 'password',
      };

      const createCommentDto = new CreateCommentDto();
      createCommentDto.post = commentData.postId;
      createCommentDto.authorId = commentData.authorId;
      createCommentDto.content = commentData.content;
      createCommentDto.password = commentData.password;

      await controller.createComment(createCommentDto);

      expect(service.createComment).toBeCalledTimes(1);
      expect(service.createComment).toBeCalledWith(createCommentDto);
    });
  });
  describe('댓글 수정', () => {
    it('controller.updateComment 실행하면 service.updateComment 실행함?', async () => {
      const id = 1;
      const content = 'new comment content';

      const updateCommentDto = new UpdateCommentDto();
      updateCommentDto.content = content;

      await controller.updateComment(id, updateCommentDto);

      expect(service.updateComment).toBeCalledTimes(1);
      expect(service.updateComment).toBeCalledWith(1, updateCommentDto);
    });
  });
});
