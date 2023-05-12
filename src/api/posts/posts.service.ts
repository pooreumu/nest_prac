// 🐱 Nestjs imports
import { Injectable } from '@nestjs/common';

// 📦 Package imports
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
    const createPost = postData.toEntity();

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
    return new GetPostDto(await this.postRepository.getPost(postId));
  }

  async updatePost(postData: UpdatePostDto): Promise<void> {
    const { wherePost, updatePost } = postData.toEntity();

    return this.postRepository.updatePost(wherePost, updatePost);
  }

  async removePost(postId: number, userId: number): Promise<void> {
    const wherePost = new DeletePostDto({ postId, userId }).toEntity();

    return this.postRepository.removePost(wherePost);
  }
}
