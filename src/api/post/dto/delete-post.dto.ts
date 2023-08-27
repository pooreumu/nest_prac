import { Post } from '../entities/post.entity';

export class DeletePostDto {
  private readonly _postId: number;
  private readonly _userId: number;

  constructor(postData: { postId: number; userId: number }) {
    this._postId = postData.postId;
    this._userId = postData.userId;
  }

  public get postId(): number {
    return this._postId;
  }

  public get userId(): number {
    return this._userId;
  }

  public toEntity() {
    return Post.deleteBy({
      id: this._postId,
      userId: this._userId,
    });
  }
}
