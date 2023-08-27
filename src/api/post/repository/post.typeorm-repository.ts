import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EntityNotFoundError, Repository } from 'typeorm';

import { PostRepository } from '@post/repository/post.repository';

import { Post } from '../entities/post.entity';
import { PostModel } from '../entities/post.model';

@Injectable()
export class PostTypeormRepository implements PostRepository {
  constructor(
    @InjectRepository(Post) private readonly post: Repository<Post>,
  ) {}

  async createPost(post: Post): Promise<Post> {
    return await this.post.save(post);
  }

  async getPosts(post: PostModel): Promise<[Post[], number]> {
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

  async updatePost(post: Post): Promise<Post> {
    return await this.post.save(post);
  }

  async deletePost(where: Post): Promise<void> {
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
