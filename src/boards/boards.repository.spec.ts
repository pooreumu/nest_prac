// 🐱 Nestjs imports
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

// 📦 Package imports
import { Repository } from 'typeorm';

// 🌏 Project imports
import { BoardsRepository } from './boards.repository';
import { Board } from './entities/board.entity';

describe('BoardsRepository', () => {
  let repository: BoardsRepository;
  let boards: Repository<Board>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        BoardsRepository,
        {
          provide: getRepositoryToken(Board),
          useClass: Repository<Board>,
        },
      ],
    }).compile();

    repository = module.get<BoardsRepository>(BoardsRepository);
    boards = module.get<Repository<Board>>(getRepositoryToken(Board));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('게시글 작성: createPost', () => {
    it('BoardsRepository.createPost를 실행하면 this.boards.insert 실행하나?', async () => {
      const title = 'title';
      const content = 'content';
      const authorId = 'author';
      const password = 'password';
      const membership = false;

      const board = new Board();
      board.title = title;
      board.content = content;
      board.authorId = authorId;
      board.password = password;
      board.membership = membership;

      boards.insert = jest.fn();

      repository.createPost(board);

      expect(boards.insert).toBeCalledTimes(1);
      expect(boards.insert).toBeCalledWith(board);
    });
  });
  describe('게시글 전체 조회: getAllPosts', () => {
    it('BoardsRepository.getAllPosts 실행하면 this.boards.find 실행하나?', async () => {
      boards.find = jest.fn();

      repository.getAllPosts();

      expect(boards.find).toBeCalledTimes(1);
      expect(boards.find).toBeCalledWith();
    });
  });

  describe('게시글 수정: updatePost', () => {
    it('BoardsRepository.updatePost 실행하면 this.boards.update 실행하나?', async () => {
      const id = 1;
      const password = 'password';
      const title = 'update title';

      const whereBoard = new Board();
      whereBoard.id = id;
      whereBoard.password = password;

      const updateBoard = new Board();
      updateBoard.title = title;

      boards.update = jest.fn();

      repository.updatePost({ ...whereBoard }, { ...updateBoard });

      expect(boards.update).toBeCalledTimes(1);
      expect(boards.update).toBeCalledWith(
        { ...whereBoard },
        { ...updateBoard },
      );
    });
  });
});
