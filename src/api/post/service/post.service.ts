import { Inject, Injectable } from '@nestjs/common';

import { PageDto } from '@post/dto/page.dto';
import { GetPostRequestDto } from '@post/dto/request.dto/get-post-request.dto';
import { POST_REPOSITORY } from '@post/repository/post.repository';

import { DeletePostDto } from '../dto/delete-post.dto';
import { GetPostDto } from '../dto/get-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostTypeormRepository } from '../repository/post.typeorm-repository';

@Injectable()
export class PostService {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostTypeormRepository,
  ) {}

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
    await this.postRepository.updatePost(postData.toEntity());
  }

  async removePost(postId: number, userId: number): Promise<void> {
    const wherePost = new DeletePostDto({ postId, userId }).toEntity();

    return this.postRepository.deletePost(wherePost);
  }
}
