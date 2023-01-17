// 🌏 Project imports
import { Board } from '../entities/board.entity';

export class DeletePostDTO {
  private readonly _postId: number;
  private readonly _password: string;

  constructor(postData: { postId: number; password?: string }) {
    this._postId = postData.postId;
    this._password = postData.password;
  }

  public get postId(): number {
    return this._postId;
  }

  public get password(): string {
    return this._password;
  }

  public toEntity() {
    const board = Board.deleteBy({
      id: this._postId,
      password: this._password,
    });

    return board;
  }
}
