// 🐱 Nestjs imports
import { Injectable } from '@nestjs/common';

// 🌏 Project imports
import { BoardsRepository } from './boards.repository';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Board } from './entities/board.entity';
import { OrderBoardModel, SelectBoardModel } from './entities/board.model';

@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepository) {}

  async createPost(postData: CreatePostDto): Promise<void> {
    const createBoard = Board.createBoard(
      postData.title,
      postData.content,
      postData.authorId,
      postData.password,
      postData.membership,
    );

    return this.boardsRepository.createPost(createBoard);
  }

  async getAllPosts(): Promise<Board[]> {
    const select = SelectBoardModel.selectBoardList();

    const order = OrderBoardModel.orderBoardList();

    return this.boardsRepository.getAllPosts(select, order);
  }

  async getOnePost(postId: number) {
    const select = SelectBoardModel.selectBoard();

    const whereBoard = Board.byPk(postId);

    return this.boardsRepository.getOnePost(whereBoard, select);
  }

  async updatePost(postId: number, postData: UpdatePostDto) {
    const { whereBoard, updateBoard } = Board.updateBoard(
      postId,
      postData.password,
      postData.title,
      postData.content,
    );

    return this.boardsRepository.updatePost(whereBoard, updateBoard);
  }

  async removePost(postId: number, password: string): Promise<void> {
    const whereBoard = Board.deleteBy(postId, password);

    return this.boardsRepository.removePost(whereBoard);
  }
}
