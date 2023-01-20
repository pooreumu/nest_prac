// 🐱 Nestjs imports
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// 📦 Package imports
import { Repository } from 'typeorm';

// 🌏 Project imports
import { Board } from './entities/board.entity';
import { OrderBoardModel, SelectBoardModel } from './entities/board.model';

@Injectable()
export class BoardsRepository {
  constructor(
    @InjectRepository(Board) private readonly boards: Repository<Board>,
  ) {}

  async createPost(board: Board): Promise<void> {
    try {
      await this.boards.insert(board);
    } catch (error) {
      throw error;
    }
  }

  async getAllPosts(
    select: SelectBoardModel,
    order: OrderBoardModel,
  ): Promise<Board[]> {
    try {
      return this.boards.find({ select, order });
    } catch (error) {
      throw error;
    }
  }

  async getOnePost(where: Board, select: SelectBoardModel): Promise<Board> {
    try {
      const result = await this.boards.findOne({
        select,
        where: { id: where.id },
      });
      if (!result) return Promise.reject(new NotFoundException());

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(whereBoard: Board, updateBoard: Board): Promise<void> {
    try {
      const result = await this.boards.update(
        { id: whereBoard.id, password: whereBoard.password },
        updateBoard,
      );
      if (!result.affected) return Promise.reject(new ForbiddenException());
    } catch (error) {
      throw error;
    }
  }

  async removePost(where: Board): Promise<void> {
    try {
      const result = await this.boards.delete({
        id: where.id,
        password: where.password,
      });
      if (!result.affected) return Promise.reject(new ForbiddenException());
    } catch (error) {
      throw error;
    }
  }
}
