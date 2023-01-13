import { Test, TestingModule } from '@nestjs/testing';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
jest.mock('./boards.service');

import { CreatePostDto } from './dtos/create-post.dto';

describe('BoardsController', () => {
  let controller: BoardsController;
  let service: BoardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardsController],
      providers: [BoardsService],
    }).compile();

    controller = module.get<BoardsController>(BoardsController);
    service = module.get<BoardsService>(BoardsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createPost', () => {
    const postData: CreatePostDto = {
      title: 'title',
      content: 'content',
      authorId: 'author',
      authorPassword: 'password',
    };
    it('controller.createPost를 실행하면 boardService.createPost를 실행하나?', () => {
      controller.createPost(postData);

      expect(service.createPost).toBeCalledTimes(1);
      expect(service.createPost).toBeCalledWith(postData);
    });
  });
});
