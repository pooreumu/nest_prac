// 🐱 Nestjs imports
import { Injectable } from '@nestjs/common';

// 📦 Package imports
import { LocalDateTime } from '@js-joda/core';

// 🌏 Project imports
import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetPostDto } from './dto/get-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly boardsRepository: PostsRepository) {}

  async createPost(postData: CreatePostDto): Promise<void> {
    const createBoard = postData.toEntity(LocalDateTime.now());

    return this.boardsRepository.createPost(createBoard);
  }

  async getPosts(): Promise<GetPostDto[]> {
    const { select, order } = GetPostDto.toGetAllEntity();

    const posts = await this.boardsRepository.getPosts(select, order);

    return posts.map((post) => new GetPostDto(post));
  }

  async getPost(postId: number): Promise<GetPostDto> {
    const { whereBoard, select } = GetPostDto.toGetOneEntity({
      postId,
    });

    return new GetPostDto(
      await this.boardsRepository.getPost(whereBoard, select),
    );
  }

  async updatePost(postData: UpdatePostDto): Promise<void> {
    const { wherePost, updatePost } = postData.toEntity(LocalDateTime.now());

    return this.boardsRepository.updatePost(wherePost, updatePost);
  }

  async removePost(postId: number, password: string): Promise<void> {
    const whereBoard = new DeletePostDto({ postId, password }).toEntity();

    return this.boardsRepository.removePost(whereBoard);
  }
}
