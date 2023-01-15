// 🐱 Nestjs imports
import {
  Body,
  Controller,
  Delete,
  Get,
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
    return this.boardService.getAllPosts();
  }

  @Get('/:id')
  getOnePost(@Param('id') postId: number): Board {
    return this.boardService.getOnePost(postId);
  }

  @Patch('/:id')
  async updatePost(
    @Param('id') postId: number,
    @Body() postData: UpdatePostRequestDto,
  ) {
    const updatePostDto = new UpdatePostDto(postData);

    return await this.boardService.updatePost(postId, updatePostDto);
  }

  @Delete('/:id')
  removePost(@Param('id') postId: number) {
    return this.boardService.removePost(postId);
  }
}
