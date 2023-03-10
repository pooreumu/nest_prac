// π± Nestjs imports
import { Test, TestingModule } from '@nestjs/testing';

// π Project imports
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

  describe('λκΈ μμ±', () => {
    it('controller.createComment μ€ννλ©΄ service.createComment μ€νν¨?', async () => {
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
  describe('λκΈ μμ ', () => {
    it('controller.updateComment μ€ννλ©΄ service.updateComment μ€νν¨?', async () => {
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
