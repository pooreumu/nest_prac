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
import { CreatePostRequestDto } from './dto/request.dto/create-post-request.dto';
import { UpdatePostRequestDto } from './dto/request.dto/update-post-request.dto';
import { Board } from './entities/board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {}

  @Post()
  async createPost(@Body() postData: CreatePostRequestDto) {
    return await this.boardService.createPost(postData.toCreatePostDto());
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
    return await this.boardService.updatePost(postData.toUpdatePostDto(postId));
  }

  @Delete('/:id')
  async removePost(
    @Param('id') postId: number,
    @Headers('password') password: string,
  ): Promise<void> {
    return await this.boardService.removePost(postId, password);
  }
}
