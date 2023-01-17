// 🐱 Nestjs imports
import { Injectable } from '@nestjs/common';

// 🌏 Project imports
import { BoardsRepository } from './boards.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { DeletePostDTO } from './dto/delete-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetPostDto } from './dto/get-post.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepository) {}

  async createPost(postData: CreatePostDto): Promise<void> {
    const createBoard = postData.toEntity();

    return this.boardsRepository.createPost(createBoard);
  }

  async getAllPosts(): Promise<Board[]> {
    const { select, order } = GetPostDto.toGetAllEntity();

    return this.boardsRepository.getAllPosts(select, order);
  }

  async getOnePost(postId: number): Promise<Board> {
    const { whereBoard, select } = new GetPostDto({ postId }).toGetOneEntity();

    return this.boardsRepository.getOnePost(whereBoard, select);
  }

  async updatePost(postData: UpdatePostDto): Promise<void> {
    const { whereBoard, updateBoard } = postData.toEntity();

    return this.boardsRepository.updatePost(whereBoard, updateBoard);
  }

  async removePost(postId: number, password: string): Promise<void> {
    const whereBoard = new DeletePostDTO({ postId, password }).toEntity();

    return this.boardsRepository.removePost(whereBoard);
  }
}
