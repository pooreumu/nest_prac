import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Board } from './entities/board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {}

  @Post()
  async createPost(@Body() postData: CreatePostDto) {
    return await this.boardService.createPost(postData);
  }

  @Get()
  async getAllPosts(): Promise<Board[]> {
    return await this.boardService.getAllPosts();
  }

  @Get('/:id')
  getOnePost(@Param('id') postId: number): Board {
    return this.boardService.getOnePost(postId);
  }

  @Patch('/:id')
  updatePost(@Param('id') postId: number, @Body() postData: UpdatePostDto) {
    return this.boardService.updatePost(postId, postData);
  }

  @Delete('/:id')
  removePost(@Param('id') postId: number) {
    return this.boardService.removePost(postId);
  }
}
