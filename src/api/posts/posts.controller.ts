// 🐱 Nestjs imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// 🌏 Project imports
import { ResponseEntity } from '@lib/response/response-entity';

import { User } from '@decorator/user.decorator';

import { LoggedInGuard } from '@auth/logged-in.guard';

import { PageDto } from '@posts/dto/page.dto';
import { GetPostRequestDto } from '@posts/dto/request.dto/get-post-request.dto';

import { GetPostDto } from './dto/get-post.dto';
import { CreatePostRequestDto } from './dto/request.dto/create-post-request.dto';
import { UpdatePostRequestDto } from './dto/request.dto/update-post-request.dto';
import { PostsService } from './posts.service';

@ApiTags('POST')
@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @ApiOperation({ summary: '게시글 작성' })
  @Post()
  @UseGuards(LoggedInGuard)
  async createPost(
    @Body() postData: CreatePostRequestDto,
    @User() user,
  ): Promise<ResponseEntity<string>> {
    await this.postService.createPost(postData.toCreatePostDto(user.id));
    return ResponseEntity.OK();
  }

  @ApiOperation({ summary: '전체 게시글 조회' })
  @Get()
  async getPosts(
    @Query() getPostRequestDto: GetPostRequestDto,
  ): Promise<ResponseEntity<PageDto<GetPostDto>>> {
    return ResponseEntity.OK_WITH(
      await this.postService.getPosts(getPostRequestDto),
    );
  }

  @ApiOperation({ summary: '게시글 상세 조회' })
  @Get('/:id')
  async getPost(
    @Param('id') postId: number,
  ): Promise<ResponseEntity<GetPostDto>> {
    return ResponseEntity.OK_WITH(await this.postService.getPost(postId));
  }

  @ApiOperation({ summary: '게시글 수정' })
  @Patch('/:id')
  @UseGuards(LoggedInGuard)
  async updatePost(
    @Param('id') postId: number,
    @Body() postData: UpdatePostRequestDto,
    @User() user,
  ): Promise<ResponseEntity<string>> {
    await this.postService.updatePost(
      postData.toUpdatePostDto(postId, user.id),
    );
    return ResponseEntity.OK();
  }

  @ApiOperation({ summary: '게시글 삭제' })
  @Delete('/:id')
  @UseGuards(LoggedInGuard)
  async removePost(
    @Param('id') postId: number,
    @User() user,
  ): Promise<ResponseEntity<string>> {
    await this.postService.removePost(postId, user.id);
    return ResponseEntity.OK();
  }
}
