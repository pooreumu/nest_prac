// 🐱 Nestjs imports
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

// 📦 Package imports
import { Repository } from 'typeorm';

// 🌏 Project imports
import { BoardsRepository } from './boards.repository';
import { Board } from './entities/board.entity';
import { OrderBoardModel, SelectBoardModel } from './entities/board.model';

describe('BoardsRepository', () => {
  let repository: BoardsRepository;
  let boards: Repository<Board>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        BoardsRepository,
        { provide: getRepositoryToken(Board), useClass: Repository<Board> },
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

      const board = Board.createBoard({
        title,
        content,
        authorId,
        membership,
        password,
      });

      boards.insert = jest.fn();

      await repository.createPost(board);

      expect(boards.insert).toBeCalledTimes(1);
      expect(boards.insert).toBeCalledWith(board);
    });
  });

  describe('게시글 전체 조회: getAllPosts', () => {
    it('BoardsRepository.getAllPosts 실행하면 this.boards.find 실행하나?', async () => {
      const select = SelectBoardModel.selectBoardList();
      const order = OrderBoardModel.orderBoardList();

      boards.find = jest.fn();

      await repository.getAllPosts(select, order);

      expect(boards.find).toBeCalledTimes(1);
      expect(boards.find).toBeCalledWith({ select, order });
    });
  });

  describe('게시글 상세 조회: getOnePost', () => {
    it('BoardsRepository.getOnePost 실행하면 this.boards.findOne 실행하나?', async () => {
      const postId = 1;

      const select = SelectBoardModel.selectBoard();
      const whereBoard = Board.byPk({ id: postId });

      boards.findOne = jest.fn().mockResolvedValue(new Board());

      await repository.getOnePost(whereBoard, select);

      expect(boards.findOne).toBeCalledTimes(1);
      expect(boards.findOne).toBeCalledWith({
        where: { id: whereBoard.id },
        select,
      });
    });

    it('게시글이 없으면 NotFoundException을 던지나?', async () => {
      const postId = 1;

      const select = SelectBoardModel.selectBoard();
      const whereBoard = Board.byPk({ id: postId });

      boards.findOne = jest.fn().mockResolvedValue(null);

      await expect(async () => {
        return await repository.getOnePost(whereBoard, select);
      }).rejects.toThrowError(new NotFoundException());
    });
  });

  describe('게시글 수정: updatePost', () => {
    it('BoardsRepository.updatePost 실행하면 this.boards.update 실행하나?', async () => {
      const postId = 1;
      const password = 'password';
      const title = 'update title';

      const { whereBoard, updateBoard } = Board.updateBoard({
        postId,
        password,
        title,
      });

      boards.update = jest.fn().mockResolvedValue({ affected: 1 });

      await repository.updatePost(whereBoard, updateBoard);

      expect(boards.update).toBeCalledTimes(1);
      expect(boards.update).toBeCalledWith(
        { id: whereBoard.id, password: whereBoard.password },
        updateBoard,
      );
    });

    it('수정이 안되면 ForbiddenException을 던지나?', async () => {
      const postId = 1;
      const password = 'password';
      const title = 'update title';

      const { whereBoard, updateBoard } = Board.updateBoard({
        postId,
        title,
        password,
      });

      boards.update = jest.fn().mockResolvedValue({ affected: 0 });

      await expect(async () => {
        await repository.updatePost(whereBoard, updateBoard);
      }).rejects.toThrowError(new ForbiddenException());
    });
  });

  describe('게시글 삭제: removePost', () => {
    it('BoardsRepository.removePost 실행하면 this.boards.delete 실행하나?', async () => {
      const postId = 1;
      const password = 'password';

      const whereBoard = Board.deleteBy({ id: postId, password });

      boards.delete = jest.fn().mockResolvedValue({ affected: 1 });

      await repository.removePost(whereBoard);

      expect(boards.delete).toBeCalledTimes(1);
      expect(boards.delete).toBeCalledWith({
        id: whereBoard.id,
        password: whereBoard.password,
      });
    });

    it('삭제가 안되면 ForbiddenException을 던지나?', async () => {
      const postId = 1;
      const password = 'password';

      const whereBoard = Board.deleteBy({ id: postId, password });

      boards.delete = jest.fn().mockResolvedValue({ affected: 0 });

      await expect(async () => {
        await repository.removePost(whereBoard);
      }).rejects.toThrowError(new ForbiddenException());
    });
  });
});
