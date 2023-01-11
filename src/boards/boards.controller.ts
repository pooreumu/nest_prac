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
  createPost(@Body() postData: CreatePostDto): Board[] {
    return this.boardService.createPost(postData);
  }

  @Get()
  getAllPosts(): Board[] {
    return this.boardService.getAllPosts();
  }

  @Get('/:id')
  getOnePost(@Param('id') postId: number): Board {
    return this.boardService.getOnePost({ postId });
  }

  @Patch('/:id')
  updatePost(@Param('id') postId: number, @Body() postData: UpdatePostDto) {
    return { postId, postData };
  }

  @Delete('/:id')
  removePost(@Param('id') postId: number) {
    return `delete ${postId}`;
  }
}
