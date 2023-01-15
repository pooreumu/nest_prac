// 🐱 Nestjs imports
import { Test, TestingModule } from '@nestjs/testing';

// 🌏 Project imports
import { BoardsService } from './boards.service';
import { BoardsRepository } from './boards.repository';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Board } from './entities/board.entity';
import { OrderBoardModel, SelectBoardModel } from './entities/board.model';

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
        membership: false,
      });

      const createBoard = Board.createBoard(postData);

      service.createPost(postData);

      expect(repository.createPost).toBeCalledTimes(1);
      expect(repository.createPost).toBeCalledWith(createBoard);
    });
  });

  describe('게시글 전체 조회: getAllPosts', () => {
    it('service.getAllPosts 실행하면 boardsRepository.getAllPosts 실행하나?', () => {
      const select = SelectBoardModel.selectBoardList();

      const order = OrderBoardModel.orderBoardList();

      service.getAllPosts();

      expect(repository.getAllPosts).toBeCalledTimes(1);
      expect(repository.getAllPosts).toBeCalledWith(select, order);
    });
  });

  describe('게시글 상세 조회: getOnePost', () => {
    it('service.getOnePost 실행하면 boardsRepository.getOnePost 실행하나?', () => {
      const postId = 1;

      const select = SelectBoardModel.selectBoard();
      const whereBoard = Board.byPk(postId);

      service.getOnePost(postId);

      expect(repository.getOnePost).toBeCalledTimes(1);
      expect(repository.getOnePost).toBeCalledWith(whereBoard, select);
    });
  });

  describe('게시글 수정: updatePost', () => {
    it('service.updatePost 실행하면 boardsRepository.updatePost 실행하나?', () => {
      const postId = 1;
      const postData = new UpdatePostDto({
        title: 'update title',
        password: 'password',
      });

      const { whereBoard, updateBoard } = Board.updateBoard(postId, postData);

      service.updatePost(postId, postData);

      expect(repository.updatePost).toBeCalledTimes(1);
      expect(repository.updatePost).toBeCalledWith(whereBoard, updateBoard);
    });
  });

  describe('게시글 삭제: removePost', () => {
    it('service.removePost 실행하면 boardsRepository.removePost 실행하나?', () => {
      const postId = 1;
      const password = 'password';

      const whereBoard = Board.deleteBy(postId, password);

      service.removePost(postId, password);

      expect(repository.removePost).toBeCalledTimes(1);
      expect(repository.removePost).toBeCalledWith(whereBoard);
    });
  });
});
