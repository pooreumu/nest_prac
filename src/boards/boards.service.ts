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
    const createBoard = Board.createBoard(postData);

    return this.boardsRepository.createPost(createBoard);
  }

  async getAllPosts(): Promise<Board[]> {
    const select = SelectBoardModel.selectBoardList();

    const order = OrderBoardModel.orderBoardList();

    return this.boardsRepository.getAllPosts(select, order);
  }

  getOnePost(postId: number) {
    return this.boardsRepository.getOnePost(postId);
  }

  async updatePost(postId: number, postData: UpdatePostDto) {
    const { whereBoard, updateBoard } = Board.updateBoard(postId, postData);

    return this.boardsRepository.updatePost(whereBoard, updateBoard);
  }

  removePost(postId: number) {
    return this.boardsRepository.removePost(postId);
  }
}
