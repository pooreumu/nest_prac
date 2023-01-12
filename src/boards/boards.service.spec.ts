import { Test, TestingModule } from '@nestjs/testing';
import { BoardsRepository } from './boards.repository';
import { BoardsService } from './boards.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { Board } from './entities/board.entity';

describe('BoardsService', () => {
  let service: BoardsService;
  let repository: BoardsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardsService, BoardsRepository],
    }).compile();

    service = module.get<BoardsService>(BoardsService);
    repository = module.get<BoardsRepository>(BoardsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createPost', () => {
    it('createPost를 실행하면 this.boardsRepository.getAllPosts를 1번 실행하나?', () => {
      const postData: CreatePostDto = { title: 'title', content: 'content' };
      const board: Board[] = [
        {
          id: 1,
          title: 'title',
          content: 'content',
        },
      ];
      jest.spyOn(repository, 'getAllPosts').mockReturnValue(board);

      service.createPost(postData);

      expect(repository.getAllPosts).toBeCalledTimes(1);
    });

    it(`createPost를 실행하면 this.boardsRepository.getAllPosts를 실행해서 id를 만들고 this.boardsRepository.createPost 를 실행하나?`, () => {
      const postData: CreatePostDto = { title: 'title', content: 'content' };
      const board: Board = {
        id: 1,
        title: postData.title,
        content: postData.content,
      };

      jest.spyOn(repository, 'getAllPosts').mockReturnValue([]);
      jest.spyOn(repository, 'createPost');

      service.createPost(postData);

      expect(repository.getAllPosts).toBeCalledTimes(1);
      expect(repository.createPost).toBeCalledWith(board);
    });
  });
});
