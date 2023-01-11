import { Injectable } from '@nestjs/common';
import { BoardsRepository } from './boards.repository';
import { CreatePostDto } from './dtos/create-post.dto';

@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepository) {}

  createPost(postData: CreatePostDto) {
    const postId = this.boardsRepository.getAllPosts().length + 1;
    return this.boardsRepository.createPost({ ...postData, id: postId });
  }

  getAllPosts() {
    return this.boardsRepository.getAllPosts();
  }

  getOnePost(postData) {
    return this.boardsRepository.getOnePost(postData);
  }
}
