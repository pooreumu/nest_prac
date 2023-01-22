// 🌏 Project imports
import { Post } from '../entities/post.entity';

export class DeletePostDto {
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
    return Post.deleteBy({
      id: this._postId,
      password: this._password,
    });
  }
}
