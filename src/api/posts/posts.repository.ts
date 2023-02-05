// 🐱 Nestjs imports
import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
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

  async createPost(post: Post): Promise<void> {
    try {
      await this.posts.insert(post);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async getPosts(
    select: SelectPostModel,
    order: OrderPostModel,
  ): Promise<Post[]> {
    try {
      return await this.posts.find({ select, order });
    } catch (e) {
      throw new InternalServerErrorException(e);
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
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async updatePost(wherePost: Post, updatePost: Post): Promise<void> {
    try {
      const result = await this.posts.update(
        { id: wherePost.id, password: wherePost.password },
        updatePost,
      );
      if (!result.affected) return Promise.reject(new ForbiddenException());
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async removePost(where: Post): Promise<void> {
    try {
      const result = await this.posts.delete({
        id: where.id,
        password: where.password,
      });
      if (!result.affected) return Promise.reject(new ForbiddenException());
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
