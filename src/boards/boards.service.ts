// 🐱 Nestjs imports
import { Injectable } from '@nestjs/common';

// 🌏 Project imports
import { BoardsRepository } from './boards.repository';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepository) {}

  async createPost(postData: CreatePostDto): Promise<void> {
    const board = new Board();
    board.title = postData.title;
    board.content = postData.content;
    board.authorId = postData.authorId;
    board.authorPassword = postData.authorPassword;
    board.membership = postData.mebership;

    return this.boardsRepository.createPost(board);
  }

  async getAllPosts(): Promise<Board[]> {
    return this.boardsRepository.getAllPosts();
  }

  getOnePost(postId: number) {
    return this.boardsRepository.getOnePost(postId);
  }

  updatePost(postId: number, postData: UpdatePostDto) {
    return this.boardsRepository.updatePost(postId, postData);
  }

  removePost(postId: number) {
    return this.boardsRepository.removePost(postId);
  }
}
