// 🐱 Nestjs imports
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

// 🌏 Project imports
import { PostsService } from './posts.service';
import { GetPostDto } from './dto/get-post.dto';
import { CreatePostRequestDto } from './dto/request.dto/create-post-request.dto';
import { UpdatePostRequestDto } from './dto/request.dto/update-post-request.dto';
import { ResponseEntity } from '../../lib/response/ResponseEntity';

@Controller('posts')
export class PostsController {
  constructor(private readonly boardService: PostsService) {}

  @Post()
  async createPost(
    @Body() postData: CreatePostRequestDto,
  ): Promise<ResponseEntity<string>> {
    await this.boardService.createPost(postData.toCreatePostDto());
    return ResponseEntity.OK();
  }

  @Get()
  async getPosts(): Promise<ResponseEntity<GetPostDto[]>> {
    return ResponseEntity.OK_WITH(await this.boardService.getPosts());
  }

  @Get('/:id')
  async getPost(
    @Param('id') postId: number,
  ): Promise<ResponseEntity<GetPostDto>> {
    return ResponseEntity.OK_WITH(await this.boardService.getPost(postId));
  }

  @Patch('/:id')
  async updatePost(
    @Param('id') postId: number,
    @Body() postData: UpdatePostRequestDto,
  ): Promise<ResponseEntity<string>> {
    await this.boardService.updatePost(postData.toUpdatePostDto(postId));
    return ResponseEntity.OK();
  }

  @Delete('/:id')
  async removePost(
    @Param('id') postId: number,
    @Headers('password') password: string,
  ): Promise<ResponseEntity<string>> {
    await this.boardService.removePost(postId, password);
    return ResponseEntity.OK();
  }
}
