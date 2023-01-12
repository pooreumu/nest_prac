import { Test, TestingModule } from '@nestjs/testing';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { CreatePostDto } from './dtos/create-post.dto';

describe('BoardsController', () => {
  let controller: BoardsController;
  let service: BoardsService;

  // const mockBoardsService: BoardsService = mock(BoardsService);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardsController],
      providers: [BoardsService],
    })
      // .overrideProvider(BoardsService)
      // .useValue(mockBoardsService)
      .compile();

    controller = module.get<BoardsController>(BoardsController);
    service = module.get<BoardsService>(BoardsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createPost', () => {
    it('createPost를 실행하면 boardService.createPost를 실행하나?', () => {
      const postData: CreatePostDto = { title: 'title', content: 'content' };
      service.createPost = jest.fn();
      controller.createPost(postData);

      expect(service.createPost).toBeCalledTimes(1);
      expect(service.createPost).toBeCalledWith(postData);
    });
  });
});
