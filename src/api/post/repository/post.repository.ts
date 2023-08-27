// 🐱 Nestjs imports
import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// 📦 Package imports
import { EntityNotFoundError, Repository } from 'typeorm';

// 🌏 Project imports
import { Post } from '../entities/post.entity';
import { PostModel } from '../entities/post.model';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post) private readonly post: Repository<Post>,
  ) {}

  async createPost(post: Post): Promise<void> {
    try {
      await this.post.insert(post);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getPosts(post: PostModel) {
    try {
      const selectQueryBuilder = this.post
        .createQueryBuilder('p')
        .select(['p.id', 'p.title', 'p.userId', 'p.createdAt', 'p.updatedAt'])
        .orderBy('p.id', 'DESC')
        .offset(post.getOffset())
        .limit(post.getLimit());

      if (post.getSearch()) {
        selectQueryBuilder.andWhere(
          'p.title like :search or p.content like :search',
          { search: `%${post.getSearch()}%` },
        );
      }

      return await selectQueryBuilder.getManyAndCount();
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getPost(postId: number): Promise<Post> {
    try {
      return await this.post.findOneOrFail({
        select: {
          id: true,
          title: true,
          content: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
          comments: {
            id: true,
            content: true,
            userId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        where: {
          id: postId,
        },
        relations: {
          comments: true,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) throw new NotFoundException();
      throw new InternalServerErrorException();
    }
  }

  async updatePost(wherePost: Post, updatePost: Post): Promise<void> {
    try {
      const result = await this.post.update(
        {
          id: wherePost.id,
          userId: wherePost.userId,
        },
        updatePost,
      );
      if (!result.affected) return Promise.reject(new ForbiddenException());
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async removePost(where: Post): Promise<void> {
    try {
      const result = await this.post.delete({
        id: where.id,
        userId: where.userId,
      });
      if (!result.affected) return Promise.reject(new ForbiddenException());
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
