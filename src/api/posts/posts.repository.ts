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
import { Post } from './entities/post.entity';
import { OrderPostModel, SelectPostModel } from './entities/post.model';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Post) private readonly posts: Repository<Post>,
  ) {}

  async createPost(board: Post): Promise<void> {
    try {
      await this.posts.insert(board);
    } catch (error) {
      throw error;
    }
  }

  async getPosts(
    select: SelectPostModel,
    order: OrderPostModel,
  ): Promise<Post[]> {
    try {
      return await this.posts.find({ select, order });
    } catch (error) {
      throw error;
    }
  }

  async getPost(where: Post, select: SelectPostModel): Promise<Post> {
    try {
      const result = await this.posts.findOne({
        select,
        where: { id: where.id },
        relations: {
          comments: true,
        },
      });
      if (!result) return Promise.reject(new NotFoundException());

      return result;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(whereBoard: Post, updateBoard: Post): Promise<void> {
    try {
      const result = await this.posts.update(
        { id: whereBoard.id, password: whereBoard.password },
        updateBoard,
      );
      if (!result.affected) return Promise.reject(new ForbiddenException());
    } catch (error) {
      throw error;
    }
  }

  async removePost(where: Post): Promise<void> {
    try {
      const result = await this.posts.delete({
        id: where.id,
        password: where.password,
      });
      if (!result.affected) return Promise.reject(new ForbiddenException());
    } catch (error) {
      throw error;
    }
  }
}
