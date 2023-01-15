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
import { BoardsService } from './boards.service';
import { CreatePostRequestDto } from './dtos/request.dtos/create-post-request.dto';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostRequestDto } from './dtos/request.dtos/update-post-request.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Board } from './entities/board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {}

  @Post()
  async createPost(@Body() postData: CreatePostRequestDto) {
    const createPostDto = new CreatePostDto({
      title: postData.title,
      content: postData.content,
      authorId: postData.authorId,
      password: postData.password,
      membership: false,
    });

    return await this.boardService.createPost(createPostDto);
  }

  @Get()
  async getAllPosts(): Promise<Board[]> {
    return await this.boardService.getAllPosts();
  }

  @Get('/:id')
  async getOnePost(@Param('id') postId: number): Promise<Board> {
    return await this.boardService.getOnePost(postId);
  }

  @Patch('/:id')
  async updatePost(
    @Param('id') postId: number,
    @Body() postData: UpdatePostRequestDto,
  ): Promise<void> {
    const updatePostDto = new UpdatePostDto(postData);

    return await this.boardService.updatePost(postId, updatePostDto);
  }

  @Delete('/:id')
  async removePost(
    @Param('id') postId: number,
    @Headers('password') password: string,
  ): Promise<void> {
    return await this.boardService.removePost(postId, password);
  }
}
