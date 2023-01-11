import { Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsRepository {
  private posts: Board[] = [];

  createPost(board: Board): Board[] {
    this.posts = [...this.posts, board];
    return this.posts;
  }

  getAllPosts() {
    return this.posts;
  }

  getOnePost(postData): Board {
    return this.posts.filter((post) => post.id === postData.postId)[0];
  }
}
