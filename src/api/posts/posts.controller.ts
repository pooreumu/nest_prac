// π± Nestjs imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// π Project imports
import { ResponseEntity } from '@lib/response/ResponseEntity';

import { GetPostDto } from './dto/get-post.dto';
import { CreatePostRequestDto } from './dto/request.dto/create-post-request.dto';
import { UpdatePostRequestDto } from './dto/request.dto/update-post-request.dto';
import { PostsService } from './posts.service';

@ApiTags('POST')
@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @ApiOperation({ summary: 'κ²μκΈ μμ±' })
  @Post()
  async createPost(
    @Body() postData: CreatePostRequestDto,
  ): Promise<ResponseEntity<string>> {
    await this.postService.createPost(postData.toCreatePostDto());
    return ResponseEntity.OK();
  }

  @ApiOperation({ summary: 'μ μ²΄ κ²μκΈ μ‘°ν' })
  @Get()
  async getPosts(): Promise<ResponseEntity<GetPostDto[]>> {
    return ResponseEntity.OK_WITH(await this.postService.getPosts());
  }

  @ApiOperation({ summary: 'κ²μκΈ μμΈ μ‘°ν' })
  @Get('/:id')
  async getPost(
    @Param('id') postId: number,
  ): Promise<ResponseEntity<GetPostDto>> {
    return ResponseEntity.OK_WITH(await this.postService.getPost(postId));
  }

  @ApiOperation({ summary: 'κ²μκΈ μμ ' })
  @Patch('/:id')
  async updatePost(
    @Param('id') postId: number,
    @Body() postData: UpdatePostRequestDto,
  ): Promise<ResponseEntity<string>> {
    await this.postService.updatePost(postData.toUpdatePostDto(postId));
    return ResponseEntity.OK();
  }

  @ApiOperation({ summary: 'κ²μκΈ μ­μ ' })
  @Delete('/:id')
  async removePost(
    @Param('id') postId: number,
    @Headers('password') password: string,
  ): Promise<ResponseEntity<string>> {
    await this.postService.removePost(postId, password);
    return ResponseEntity.OK();
  }
}
