import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardsRepository } from './boards.repository';

import { CreatePostDto } from './dtos/create-post.dto';

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
    const board: CreatePostDto = {
      title: 'title',
      content: 'content',
      authorId: 'author',
      authorPassword: 'password',
    };

    it('BoardsRepository.createPost를 실행하면 this.boards.insert 실행하나?', async () => {
      boards.insert = jest.fn();

      repository.createPost(board);

      expect(boards.insert).toBeCalledTimes(1);
      expect(boards.insert).toBeCalledWith(board);
    });
  });
});
