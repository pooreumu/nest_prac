// 🐱 Nestjs imports
import { Test, TestingModule } from '@nestjs/testing';

// 🌏 Project imports
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

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

  const commentData = {
    postId: 1,
    authorId: 'author',
    content: 'content',
    password: 'password',
  };

  describe('댓글 생성', () => {
    it('controller.createComment 실행하면 service.createComment 실행함?', async () => {
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
});
