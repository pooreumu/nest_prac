// 🐱 Nestjs imports
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// 📦 Package imports
import { Repository } from 'typeorm';

// 🌏 Project imports
import { Board } from './entities/board.entity';
import { OrderBoardModel, SelectBoardModel } from './entities/board.model';

@Injectable()
export class BoardsRepository {
  private posts: Board[] = [];
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
    return this.boards.find({
      select,
      order,
    });
  }

  getOnePost(postId: number): Board {
    return this.posts.filter((post) => post.id === postId)[0];
  }

  async updatePost(whereBoard: Board, updateBoard: Board): Promise<void> {
    try {
      await this.boards.update({ ...whereBoard }, updateBoard);
    } catch (error) {
      throw error;
    }
  }

  removePost(postId: number) {
    this.posts = [...this.posts.filter((v) => v.id !== postId)];
    return this.posts;
  }
}
