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

  describe('createPost', () => {
    it('BoardsRepository.createPost를 실행하면 this.boards.insert 실행하나?', async () => {
      const title = 'title';
      const content = 'content';
      const authorId = 'author';
      const authorPassword = 'password';
      const membership = false;

      const board = new Board();
      board.title = title;
      board.content = content;
      board.authorId = authorId;
      board.authorPassword = authorPassword;
      board.membership = membership;

      boards.insert = jest.fn();

      repository.createPost(board);

      expect(boards.insert).toBeCalledTimes(1);
      expect(boards.insert).toBeCalledWith(board);
    });
  });
  describe('getAllPosts', () => {
    it('BoardsRepository.getAllPosts 실행하면 this.boards.find 실행하나?', async () => {
      boards.find = jest.fn();

      repository.getAllPosts();

      expect(boards.find).toBeCalledTimes(1);
      expect(boards.find).toBeCalledWith();
    });
  });
});
