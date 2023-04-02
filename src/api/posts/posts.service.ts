// 🐱 Nestjs imports
import { Injectable } from '@nestjs/common';

// 📦 Package imports
import { LocalDateTime } from '@js-joda/core';

// 🌏 Project imports
import { PageDto } from '@posts/dto/page.dto';
import { GetPostRequestDto } from '@posts/dto/request.dto/get-post-request.dto';

import { CreatePostDto } from './dto/create-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { GetPostDto } from './dto/get-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostsRepository) {}

  async createPost(postData: CreatePostDto): Promise<void> {
    const createPost = postData.toEntity(LocalDateTime.now());

    return this.postRepository.createPost(createPost);
  }

  async getPosts(
    getPostRequestDto: GetPostRequestDto,
  ): Promise<PageDto<GetPostDto>> {
    const posts = await this.postRepository.getPosts(
      getPostRequestDto.toEntityForPagination(),
    );

    return new PageDto(
      posts[1],
      getPostRequestDto.size,
      posts[0].map((post) => new GetPostDto(post)),
    );
  }

  async getPost(postId: number): Promise<GetPostDto> {
    const { wherePost, select } = GetPostDto.toGetOneEntity({
      postId,
    });

    return new GetPostDto(await this.postRepository.getPost(wherePost, select));
  }

  async updatePost(postData: UpdatePostDto): Promise<void> {
    const { wherePost, updatePost } = postData.toEntity(LocalDateTime.now());

    return this.postRepository.updatePost(wherePost, updatePost);
  }

  async removePost(postId: number, password: string): Promise<void> {
    const wherePost = new DeletePostDto({ postId, password }).toEntity();

    return this.postRepository.removePost(wherePost);
  }
}
