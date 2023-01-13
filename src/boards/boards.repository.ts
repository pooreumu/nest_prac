import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Board } from './entities/board.entity';
@Injectable()
export class BoardsRepository {
  private posts: Board[] = [];
  constructor(
    @InjectRepository(Board)
    private readonly boards: Repository<Board>,
  ) {}

  async createPost(board: CreatePostDto): Promise<void> {
    await this.boards.insert(board);
  }

  getAllPosts() {
    return this.posts;
  }

  getOnePost(postId: number): Board {
    return this.posts.filter((post) => post.id === postId)[0];
  }

  updatePost(postId: number, postData: UpdatePostDto): Board {
    this.posts = [
      ...this.posts.map((post) => {
        if (post.id === postId) {
          Object.entries(postData).forEach((v) => (post[v[0]] = v[1]));
        }
        return post;
      }),
    ];
    return this.posts.filter((post) => post.id === postId)[0];
  }

  removePost(postId: number) {
    this.posts = [...this.posts.filter((v) => v.id !== postId)];
    return this.posts;
  }
}
