// 🐱 Nestjs imports
import { Injectable } from '@nestjs/common';

// 🌏 Project imports
import { BoardsRepository } from './boards.repository';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';

@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepository) {}

  createPost(postData: CreatePostDto) {
    this.boardsRepository.createPost(postData);
  }

  getAllPosts() {
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
