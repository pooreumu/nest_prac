// 🐱 Nestjs imports
import { Test, TestingModule } from '@nestjs/testing';

// 🌏 Project imports
import { BoardsService } from './boards.service';
import { BoardsRepository } from './boards.repository';
import { CreatePostDto } from './dtos/create-post.dto';
import { Board } from './entities/board.entity';
import { UpdatePostDto } from './dtos/update-post.dto';

jest.mock('./boards.repository');

describe('BoardsService', () => {
  let service: BoardsService;
  let repository: BoardsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [BoardsService, BoardsRepository],
    }).compile();

    service = module.get<BoardsService>(BoardsService);
    repository = module.get<BoardsRepository>(BoardsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('게시글 작성: createPost', () => {
    it('service.createPost를 실행하면 this.boardsRepository.createPost를 실행하나?', () => {
      const postData = new CreatePostDto({
        title: 'title',
        content: 'content',
        authorId: 'author',
        password: 'password',
        mebership: false,
      });

      const board = new Board();
      board.title = postData.title;
      board.content = postData.content;
      board.authorId = postData.authorId;
      board.password = postData.password;
      board.membership = postData.mebership;

      service.createPost(postData);

      expect(repository.createPost).toBeCalledTimes(1);
      expect(repository.createPost).toBeCalledWith(board);
    });
  });
  describe('게시글 전체 조회: getAllPosts', () => {
    it('service.getAllPosts 실행하면 boardsRepository.getAllPosts 실행하나?', () => {
      service.getAllPosts();

      expect(repository.getAllPosts).toBeCalledTimes(1);
      expect(repository.getAllPosts).toBeCalledWith();
    });
  });

  describe('게시글 수정: updatePost', () => {
    it('service.updatePost 실행하면 boardsRepository.updatePost 실행하나?', () => {
      const postId = 1;
      const updatePostDto = new UpdatePostDto({
        title: 'update title',
        password: 'password',
      });

      const whereBoard = new Board();
      whereBoard.id = postId;
      whereBoard.password = updatePostDto.password;

      const updateBoard = new Board();
      updateBoard.title = updatePostDto.title;

      service.updatePost(postId, updatePostDto);

      expect(repository.updatePost).toBeCalledTimes(1);
      expect(repository.updatePost).toBeCalledWith(whereBoard, updateBoard);
    });
  });
});
